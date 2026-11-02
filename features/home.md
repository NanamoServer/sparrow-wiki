# Homes

Source: <https://nanamoserver.github.io/sparrow-wiki/features/home>

Module `home` · Configuration `features/home.yml`

Save personal destinations and return to them across servers.

| Command | Purpose | Default permission |
| - | - | - |
| `/home [name]` | Travel to your home; player.name selects another owner's home. | `sparrow.command.home[.other]` |
| `/set-home [name]` | Create a home at your position; the default name is home. | `sparrow.command.set_home` |
| `/del-home <name>` | Delete a home; accepts player.name. | `sparrow.command.del_home[.other]` |
| `/home-list [owner]` | Open your or another owner’s home list (players only). | `sparrow.command.home_list[.other]` |
| `/edit-home <name> [rename <new_name>\|relocate]` | View, rename or relocate a home; accepts player.name. | `sparrow.command.edit_home[.other]` |
| `/sparrow del-all-homes [--player <player>] [--server <server>] [--world <world>]` | Bulk delete from console; at least one filter, no confirmation. | `sparrow.command.del_all_homes` |

```text
/set-home mine
/home mine
/home Steve.mine
/home-list Steve
```

Without a name, `/home` prefers `default-name`, then your only home. If several homes exist and none matches the default, it opens the list. `/set-home` does not overwrite an existing name. Use `player.name` to visit, delete or edit another owner's home, with the corresponding `.other` permission. `home-list` takes the owner's name directly.

The rename and relocate branches of `edit-home` also need `.rename` and `.relocate`. `del-all-homes` is console-only and deletes immediately using the intersection of all supplied filters.

Players can open home details from the list or with `/edit-home <name>`. The dialog offers travel, rename, relocate and delete according to permissions. Relocation and deletion from the dialog require confirmation.

The default limit is 3 homes. `sparrow.home.limit.<amount>` overrides `max-homes`; `sparrow.home.limit.unlimited` removes the limit. See [Teleport options](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx) for teleport behavior.

With PlaceholderAPI installed, use `sparrowhome_count`, `sparrowhome_limit`, `sparrowhome_remaining` and `sparrowhome_list`. In Sparrow text, write `<papi:sparrowhome_count>`. Unlimited limits and remaining counts return `-1`.
