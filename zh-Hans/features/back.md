# 返回与死亡返回

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/back>

模块 `back` · 配置 `features/back.yaml`

`/back` 返回上一次传送前的位置，`/death-back` 返回上一次死亡位置，均支持跨服。指定玩家时，玩家须在本服。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/back [player] [--unsafe] [--silent]` | 返回上一次传送前的位置。 | `sparrow.command.back[.other]` |
| `/death-back [player] [--unsafe] [--silent]` | 返回上一次死亡位置。 | `sparrow.command.death-back[.other]` |

`--unsafe` 允许找不到安全落点时使用原坐标；`--silent` 隐藏命令反馈。

`back.teleport-causes` 默认记录 `COMMAND`、`PLUGIN`，`back.join-grace-seconds` 默认忽略进服后 3 秒内的普通传送。`deathback.record-death` 控制是否记录新的死亡位置。

两种返回分别在 `back.teleport-options`、`deathback.teleport-options` 配置冷却和倒计时，详见[传送选项](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)。
