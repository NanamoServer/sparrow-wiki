# 随机传送

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/rtp>

模块 `rtp` · 配置 `features/rtp.yml`

在指定区域内寻找安全落点，支持跨服目的地。被传送玩家须在本服。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/rtp <player> <region> [--silent]` | 在配置的区域内随机传送。 | `sparrow.command.rtp[.other]` |
| `/rtp_range <player> <server> <world> <min-radius> <max-radius> [options]` | 在指定方形范围内随机传送。 | `sparrow.command.rtp_range[.other]` |

```yaml
regions:
  wild:
    server: survival
    permission: sparrow.rtp.wild
    area:
      world:
        - x: [-5000, 5000]
          z: [-5000, 5000]
```

```text
/rtp Steve wild
/rtp_range Steve survival world 500 5000 --center-x 0 --center-z 0
```

`server` 省略时使用本服，`permission` 省略时不限制区域权限。一个区域可包含多个世界和矩形，矩形可添加 `y: [60, 120]` 限制脚底高度。

`rtp_range` 使用方形环带，最小半径为 `0` 时为完整正方形。中心默认 `(0, 0)`；`--min-y` 与 `--max-y` 必须一起提供。两条命令共用 RTP 冷却，支持 `--silent` / `-s`。

冷却和倒计时见[传送选项](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)，落点选择见[落点规则](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/processors.mdx)。
