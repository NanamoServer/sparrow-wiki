# 玩家巡查

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/patrol>

模块 `patrol` · 配置 `features/patrol.yml`

依次传送到群组服玩家身边。省略目标时从可巡查玩家中轮流选择。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/patrol [targets]` | 轮流巡查玩家，支持跨服。 | `sparrow.command.patrol` |

`sparrow.bypass.patrol` 可免于被巡查；默认跳过旁观模式玩家。配置 `skip-spectators: false` 可将旁观玩家纳入。
