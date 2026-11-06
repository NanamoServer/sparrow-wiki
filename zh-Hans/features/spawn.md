# 出生点

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/spawn>

模块 `spawn` · 配置 `features/spawn.yml`

前往配置中指定的出生点，支持其他子服。未配置目的地时命令不可用。

## 命令与权限速查

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/spawn` | 前往配置中的出生点。 | `sparrow.command.spawn` |

### 附加权限

| 权限 | 用途 |
| - | - |
| `sparrow.spawn.staff` | Spawn 默认冷却与倒计时覆盖。 |

## 使用说明

```yaml
destination:
  server: lobby  # 填写目标后端服务器的 ID
  world: world
  x: 0.5
  y: 64
  z: 0.5
  yaw: 0
  pitch: 0
teleport-options:
  cooldown: 5m
  warmup:
    duration: 0s
```

在各服的配置中填写目的地，修改后执行 `/spr reload`。直接使用指定坐标，不搜索安全落点。

Spawn 支持冷却、倒计时和权限覆盖。其倒计时字段使用 `cancel-on-move`、`cancel-on-damage` 等连字符写法。

## 复活点

`respawn` 段决定玩家死亡后在哪里复活，支持按优先级配置规则，也支持跨服复活。

玩家点击**重生**时，Sparrow 采用第一条与死亡世界、玩家权限都匹配的规则（没有匹配时用 `default-targets`），并按顺序尝试其中的目标，第一个可用的生效。所有目标都不可用时交还原版复活。

- 玩家落在目标方块的中心。
- 极限模式和离开末地始终使用原版复活。
- 支持 Paper 和 Folia，无论是玩家死亡所在的服务器，还是复活所在的服务器。

### 跨服复活

位于其他服务器的目标会把仍处于死亡状态的玩家送过去，到达后再复活。血量、死亡时的经验结算等死亡状态，需要由其他插件在服务器之间同步，例如 SparrowSync。没有这类插件时，玩家到达后使用的是目标服务器本地的数据。

### 个人重生点

开启 `record-personal-point: true` 后，玩家在床上睡觉或给重生锚设置重生点时，会被记录为跨服共享的个人重生点，供任何服务器上的 `bed` 和 `anchor` 目标使用。开启前已有的原版重生点不会导入，玩家需要重新睡一次床或点一次锚。

### 规则与目标

| 键 | 用途 |
| - | - |
| `default-targets` | 没有任何规则匹配时使用的目标。 |
| `rules[].id` | 规则名称，必填且不能重复。 |
| `rules[].worlds` | 可选，死亡世界列表。省略则不限世界。 |
| `rules[].permissions` | 可选，权限列表，拥有其中任一即可。省略则不限权限。 |
| `rules[].targets` | 必填，写法与 `default-targets` 相同。 |

规则按顺序检查，第一条匹配的规则生效。`worlds` 和 `permissions` 同时填写时，两个条件都要满足。匹配规则的目标全部不可用时交还原版复活，不会再试后面的规则或 `default-targets`。

每个目标都是一个键值表，`type` 必填。单个目标上也可以写 `worlds` 和 `permissions`，不满足时跳过这个目标。其他键是目标类型自己的参数。

| 类型 | 复活位置 | 参数 |
| - | - | - |
| `bed` | 共享个人床，可以在其他服务器。床被拆除或被挡住时跳过。 | — |
| `anchor` | 共享个人重生锚。没有充能时跳过，复活后消耗一格充能。 | — |
| `spawn` | 本文件中 `destination` 配置的 `/spawn` 位置，未配置时跳过。 | — |
| `world_spawn` | 本服某个世界的出生点。 | `world`：可选，默认为死亡所在世界 |
| `server_spawn` | 本服默认重生世界的出生点。 | — |
| `location` | 固定坐标，不搜索安全位置。 | `server`：可选，默认本服；`world`、`x`、`y`、`z`：必填；`yaw`、`pitch`：可选，默认 0 |
| `home` | 玩家的家，需要启用 Home 模块。 | `name`：可选。省略时先试默认家，再按名称顺序试其他家 |
| `warp` | 地标，需要启用 Warp 模块，玩家需要有使用该地标的权限。 | `name`：必填 |

所在服务器离线或世界没有加载的目标会被跳过。其他插件注册的类型写成 `命名空间:类型`。

### 配置示例

```yaml
respawn:
  enabled: true
  record-personal-point: true
  default-targets:
  - type: bed
  - type: anchor
  - type: world_spawn
  rules:
  - id: nether              # 下界死亡优先回重生锚
    worlds:
    - world_nether
    targets:
    - type: anchor
    - type: bed
    - type: world_spawn
      world: world
  - id: home_respawn        # 拥有该权限的玩家可以回到自己的家
    permissions:
    - sparrow.respawn.home  # 权限节点可以自行命名
    targets:
    - type: bed
    - type: anchor
    - type: home
    - type: world_spawn
  - id: lobby_fallback      # 其余玩家回到大厅服
    targets:
    - type: bed
    - type: location
      server: lobby
      world: world
      x: 0.5
      y: 64
      z: 0.5
```

`enabled` 默认为 `false`。生成的 `features/spawn.yml` 在注释中列出了所有键和目标类型。修改后执行 `/spr reload`。
