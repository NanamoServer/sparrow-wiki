# Warps

Source: <https://nanamoserver.github.io/sparrow-wiki/features/warp>

Module `warp` · Configuration `features/warp.yml`

Named destinations shared across your Sparrow servers. Players can open details from `/warp-list` or `/edit-warp <name>` to travel, rename, relocate or delete, subject to permissions. Relocation and deletion from the dialog require confirmation.

| Command | Purpose | Default permission |
| - | - | - |
| `/warp <name> [player]` | Travel to a warp, with support for cross-server players. | `sparrow.command.warp[.other]` |
| `/set-warp <name>` | Create a warp at your position. | `sparrow.command.set_warp` |
| `/del-warp <name>` | Delete a warp. | `sparrow.command.del_warp` |
| `/warp-list` | Open the list of visible warps (players only). | `sparrow.command.warp_list` |
| `/edit-warp <name> [rename <new_name>\|relocate]` | View, rename or relocate a warp. | `sparrow.command.edit_warp` |

```text
/set-warp market
/warp market
/edit-warp market relocate
```

Creation and relocation require a player. `/set-warp` does not overwrite an existing name. Names allow up to 32 characters; the default pattern accepts letters, digits, underscores and hyphens.

`rename` and `relocate` additionally require `sparrow.command.edit_warp.rename` and `sparrow.command.edit_warp.relocate`. Use `/del-warp` to delete a warp.

With `permission-restrict` enabled, viewing and using a warp requires `sparrow.warp.use.<lowercase-name>`. Management still uses command permissions. Configure cooldowns, warmups and arrival effects under `teleport-options`; see [Teleport options](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx).
