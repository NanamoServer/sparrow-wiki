# 人数上限

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/player-limit>

模块 `player_limit` · 配置 `features/player_limit.yml`

运行时修改本服人数上限，命令修改会保存到配置。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/max_players [amount]` | 查询或修改人数上限；-1 恢复原上限。 | `sparrow.command.max_players` |

`sparrow.bypass.player_limit` 允许满员时进入。`max-players: -1` 恢复模块启用前的上限，`0` 表示上限为零；停用模块也会恢复原上限。
