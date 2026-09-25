# 头颅获取

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/head>

使用 `/head`，根据玩家名称或 UUID 获取头颅。命令会自动识别来源；玩家资料查询支持在线玩家和外部 API，并通过内存与 Redis 缓存减少重复请求。

## 命令与权限

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/head [source] [选项]` | 按玩家名称或 UUID 获取头颅；玩家省略来源时使用自己的名称。 | `sparrow.command.head` |

完整入口为 `/sparrow head`，所有来源共用一个命令和权限。UUID 可以带连字符，也可以使用连续的 32 位十六进制形式。

| 选项 | 说明 |
| - | - |
| `--player <targets>` | 接收头颅的玩家名或玩家选择器，玩家执行时默认自己。 |
| `--amount <amount>` | 数量，范围 1–6400，默认 1。 |
| `--force` | 跳过内存和 Redis 缓存读取，重新获取；成功取得 API 结果后刷新缓存。 |
| `--silent` / `-s` | 隐藏成功反馈；超时和失败仍会提示。 |

控制台需要明确来源和 `--player`。头颅在接收玩家处掉落，按每组最多 64 个分组处理。

```text title="示例"
/head
/head Notch --amount 1
/head Notch --player Alex --force
/head 069a79f4-44e9-4726-a5be-fca90e38aaf5
/head --force
```

## 获取来源与缓存

默认优先读取本服在线玩家的纹理，找不到时再查询 API。在线纹理不会写入 API 缓存。外部资料查询默认使用 Mojang 的名称和 UUID 资料接口；主接口失败或没有返回纹理时，默认回退到 Ashcon。

`--force` 仍遵循 `source-order`。如果在线玩家已有纹理，会直接使用当前在线资料；需要始终从外部接口获取时，将来源设置为 `source-order: [api]`。

下面是 `features.yml` 中头颅配置的一部分，保留文件中的其他分组：

```yaml title="features.yml · head"
head:
  enabled: true
  source-order:
    - online
    - api
  request-timeout: 15s
  cache:
    memory:
      enabled: true
      ttl: 5m
      max-size: 4096
    redis:
      enabled: true
      ttl: 24h
```

`source-order` 可保留一种或两种来源，但不能重复。内存缓存默认最多 4,096 个键，保留 5 分钟；Redis 缓存保留 24 小时，使用 `config.yml` 的共享 Redis 连接。两层缓存均可通过各自的 `enabled` 独立关闭，并通过 `ttl` 自定义保留时长。缓存时间从获取数据时计算，读取不会续期；从 Redis 回填内存也不会重置数据年龄。

时长支持 `d`、`h`、`m`、`s`、`ms` 及 `1m30s` 这样的组合，必须大于零。查询失败不会写入缓存；Redis 读写失败时仍会尝试获取并返回头颅资料。

### 自定义资料接口

可以在 `head.api` 中替换资料接口 URL。以下为默认配置，合并到已有的 `head` 分组中：

```yaml title="features.yml · head.api"
head:
  api:
    name-url: 'https://api.mojang.com/users/profiles/minecraft/{name}'
    profile-url: 'https://sessionserver.mojang.com/session/minecraft/profile/{uuid}'
    fallback-urls:
      - 'https://api.ashcon.app/mojang/v2/user/{player}'
    headers: {}
    connect-timeout: 3s
    request-timeout: 5s
```

`name-url` 必须包含 `{name}`，请求时会替换为经过 URL 编码的玩家名；`profile-url` 必须包含 `{uuid}`（无连字符）或 `{uuid-dashed}`（带连字符）。自定义服务需要返回 Mojang 兼容 JSON：名称查询返回 `id` 和 `name`，资料查询返回含 `textures` 属性的玩家 Profile。通过 UUID 查询时会直接使用资料接口。

`head.api.headers` 可以填写接口需要的请求头，例如 `Authorization`；这些请求头只发送到 `name-url` 和 `profile-url`，不会发送给备用接口。修改主接口地址、备用 URL 列表及其顺序或请求头后，会使用独立的缓存，避免读到旧资料源的结果。

### 自动回退

`head.api.fallback-urls` 是备用资料接口的有序列表，按希望尝试的顺序添加 URL 即可。设置为 `fallback-urls: []` 可以关闭回退。

每个 URL 都必须包含 `{player}`，请求时替换为原查询的玩家名或带连字符 UUID，并进行 URL 编码。备用接口需要在一次响应中返回完整资料，支持以下两种格式：

| 响应格式 | 玩家身份 | 纹理字段 |
| - | - | - |
| Ashcon | `uuid`、`username` | `textures.raw.value`，以及可选的 `textures.raw.signature` |
| Mojang | `id`、`name` | `properties` 中名为 `textures` 的属性，包含 `value` 和可选的 `signature` |

主接口报错、限流、单次 HTTP 请求超时、未找到玩家或没有纹理时，会按列表顺序尝试备用接口，取得有效纹理后立即停止。成功结果沿用现有内存和 Redis 缓存；`--force` 同样会跳过已缓存的备用接口结果。

所有接口都没有找到资料或纹理时，提示未找到头颅；如果过程中有接口报错且最终没有成功结果，则反馈最后一次异常。所有回退请求共用原查询的总超时，切换接口不会重新计时。

## 异步查询与超时

缓存和 HTTP 查询异步执行，等待外部服务时不会阻塞服务器主线程。读取在线玩家资料、制作和掉落头颅时会切回对应玩家线程。

| 配置 | 默认值 | 范围 |
| - | - | - |
| `head.request-timeout` | `15s` | 玩家名称和 UUID 的查询总时间，包含缓存、在线资料读取及全部主接口和备用接口请求。 |
| `head.api.connect-timeout` | `3s` | 主接口和备用接口的 HTTP 连接建立时间。 |
| `head.api.request-timeout` | `5s` | 主接口和备用接口的单次 HTTP 请求时间。 |

超时后会中断请求并提示命令执行者，即使使用 `--silent` 也会提示。停用或重载头颅模块会取消正在处理的请求，旧请求不会在模块重新启用后继续发放头颅。
