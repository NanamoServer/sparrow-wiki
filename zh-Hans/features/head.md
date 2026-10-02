# 头颅获取

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/head>

`/head` 可以按玩家名或 UUID 获取头颅，并指定数量和接收玩家。

## 命令与权限

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/head [source] [amount]` | 为自己获取头颅；省略来源时使用自己的名称。 | `sparrow.command.head` |
| `/head <source> <amount> <player> [force] [--silent]` | 为指定玩家获取头颅；`force` 为 `true` 时重新获取。 | `sparrow.command.head` + `sparrow.command.head.other` |

完整入口为 `/sparrow head`。UUID 可以带连字符，也可以使用连续的 32 位十六进制形式。参数依次为 `source`、`amount`、`player`、`force`，使用后面的参数时必须先填写前面的参数。

`source` 的 Tab 补全包含共用 Sparrow Redis 的各台服务器上的在线玩家名。也可以手动输入离线玩家名或 UUID。`player` 参数选择的是本服接收头颅的玩家。

| 参数或选项 | 说明 |
| - | - |
| `source` | 头颅纹理来源的玩家名或 UUID，默认自己的名称，只需要基础权限。 |
| `amount` | 数量，范围 1–6400，默认 1，基础权限即可使用。 |
| `player` | 接收头颅的玩家名或玩家选择器，省略时默认自己。需要 `.other`，填写自己的名字或 `@s` 也一样。 |
| `force` | 设为 `true` 时跳过缓存，重新获取。默认为 `false`，需要 `.other`。 |
| `--silent` / `-s` | 隐藏成功反馈；超时和失败仍会提示。使用前必须填完四个位置参数，不需要重新获取时也要填写 `false`。 |

没有 `.other` 时，只能使用 `source` 和 `amount`。`player` 和 `force` 所需的权限是 `commands.yml` 中的基础权限加上 `.other`。

控制台必须指定来源、数量和接收者。头颅掉在接收玩家处，每组最多 64 个。

```text title="示例"
/head
/head Notch
/head Notch 16
/head Notch 1 Alex true
/head Notch 1 @a false --silent
/head 069a79f4-44e9-4726-a5be-fca90e38aaf5
```

## 获取来源与缓存

默认优先读取本服在线玩家的纹理，找不到时再查询 API。外部资料查询默认使用 Mojang 的名称和 UUID 资料接口；主接口失败或没有返回纹理时，默认回退到 Ashcon。

`force` 为 `true` 时，按 `source-order` 选择来源。如果在线玩家已有纹理，会直接使用当前在线资料；需要始终从外部接口获取时，将来源设置为 `source-order: [api]`。

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

`source-order` 可保留一种或两种来源，但不能重复。内存缓存默认最多 4,096 个键，保留 5 分钟；Redis 缓存保留 24 小时，使用 `config.yml` 的共享 Redis 连接。两层缓存均可通过各自的 `enabled` 独立关闭，并通过 `ttl` 自定义保留时长。缓存从获取资料时开始计时，使用缓存不会延长保留时间。

时长支持 `d`、`h`、`m`、`s`、`ms` 及 `1m30s` 这样的组合，必须大于零。查询失败不会写入缓存；Redis 不可用时仍然可以获取头颅。

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

`head.api.headers` 可以填写接口需要的请求头，例如 `Authorization`；这些请求头只发送到 `name-url` 和 `profile-url`，不会发送给备用接口。修改主接口地址、备用 URL 列表及其顺序或请求头后，不会再使用按旧设置缓存的头颅。

### 自动回退

`head.api.fallback-urls` 是备用资料接口的有序列表，按希望尝试的顺序添加 URL 即可。设置为 `fallback-urls: []` 可以关闭回退。

每个 URL 都必须包含 `{player}`，请求时替换为原查询的玩家名或带连字符 UUID，并进行 URL 编码。备用接口需要在一次响应中返回完整资料，支持以下两种格式：

| 响应格式 | 玩家身份 | 纹理字段 |
| - | - | - |
| Ashcon | `uuid`、`username` | `textures.raw.value`，以及可选的 `textures.raw.signature` |
| Mojang | `id`、`name` | `properties` 中名为 `textures` 的属性，包含 `value` 和可选的 `signature` |

主接口报错、限流、单次 HTTP 请求超时、未找到玩家或没有纹理时，会按列表顺序尝试备用接口，取得有效纹理后立即停止。成功结果沿用现有内存和 Redis 缓存；`force` 为 `true` 时，也会跳过备用接口的缓存。

所有接口都没有找到玩家或纹理时，提示未找到头颅；如果有接口出错且最终没有成功，提示最后一次错误。尝试备用接口不会延长 `head.request-timeout` 的总时间。

## 超时

| 配置 | 默认值 | 范围 |
| - | - | - |
| `head.request-timeout` | `15s` | 玩家名称和 UUID 的查询总时间，包含缓存、在线资料读取及全部主接口和备用接口请求。 |
| `head.api.connect-timeout` | `3s` | 主接口和备用接口的 HTTP 连接建立时间。 |
| `head.api.request-timeout` | `5s` | 主接口和备用接口的单次 HTTP 请求时间。 |

超时后会提示命令执行者，即使使用 `--silent` 也会提示。停用或重载头颅功能会取消尚未完成的查询。
