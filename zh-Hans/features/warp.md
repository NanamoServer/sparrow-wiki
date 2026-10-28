# 传送点

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/warp>

模块 `warp` · 配置 `features/warp.yml`

群组服共用的命名传送点。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/warp <name> [player]` | 前往传送点，支持跨服玩家。 | `sparrow.command.warp[.other]` |
| `/set_warp <name>` | 在当前位置新建传送点。 | `sparrow.command.set_warp` |
| `/del_warp <name>` | 删除传送点。 | `sparrow.command.del_warp` |
| `/warp_list [page]` | 查看传送点列表。 | `sparrow.command.warp_list` |
| `/edit_warp <name> [rename <new_name>\|relocate]` | 查看、改名或移动传送点。 | `sparrow.command.edit_warp` |

```text
/set_warp market
/warp market
/edit_warp market relocate
```

新建与移动需要玩家执行；同名传送点不会被 `/set_warp` 覆盖。名称最长 32 字符，默认允许字母、数字、下划线和连字符。

`rename`、`relocate` 另需 `sparrow.command.edit_warp.rename`、`sparrow.command.edit_warp.relocate`。删除使用 `/del_warp`。

开启 `permission-restrict` 后，查看和使用传送点需要 `sparrow.warp.use.<小写名称>`；管理操作仍用命令权限。冷却、倒计时和到达效果在 `teleport-options` 中配置，见[传送选项](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)。
