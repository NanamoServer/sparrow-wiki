# 出生点

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/spawn>

模块 `spawn` · 配置 `features/spawn.yml`

前往配置中指定的出生点，支持其他子服。未配置目的地时命令不可用。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/spawn` | 前往配置中的出生点。 | `sparrow.command.spawn` |

```yaml
destination:
  server: lobby
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
