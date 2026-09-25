# Permissions & Commands Quick Reference

Source: <https://nanamoserver.github.io/sparrow-wiki/commands>

`<argument>` is required; `[argument]` is optional. `player` generally means a local online player, and `targets` accepts player or entity selectors.

These are the default entry points and permissions. Short commands also accept `/sparrow <command>`. Restart after editing `commands.yml`.

## ⚙️ Plugin management

| Command | Purpose | Default permission |
| - | - | - |
| `/sparrow reload [--silent]` | Reload settings that support runtime changes. | `sparrow.command.admin.reload` |
| `/sparrow feature-list [page]` | List feature states by page. | `sparrow.command.admin.feature` |
| `/sparrow feature-enable <feature>` | Enable a feature and save its switch. | `sparrow.command.admin.feature` |
| `/sparrow feature-disable <feature>` | Disable a feature and save its switch. | `sparrow.command.admin.feature` |

## 🧍 Player and entity state

| Command | Purpose | Default permission |
| - | - | - |
| `/heal [player]` | Restore player health. | `sparrow.command.heal` |
| `/feed [player]` | Restore player hunger. | `sparrow.command.feed` |
| `/fly [player] [enabled]` | Toggle flight permission, or set true / false explicitly. | `sparrow.command.fly` |
| `/fly-speed <speed> [player]` | Set flight speed from -1 to 1. | `sparrow.command.fly-speed` |
| `/walk-speed <speed> [player]` | Set walking speed from -1 to 1. | `sparrow.command.walk-speed` |
| `/suicide` | Kill yourself; players only. | `sparrow.command.suicide` |
| `/burn <targets> <time>` | Set target entities on fire. | `sparrow.command.burn` |
| `/extinguish [targets]` | Extinguish target entities. | `sparrow.command.extinguish` |
| `/look [targets] <facing-option>` | Change the facing of target entities. | `sparrow.command.look` |

## 🔍 Patrol and command execution

| Command | Purpose | Default permission |
| - | - | - |
| `/patrol [targets]` | Patrol local online players in rotation; players only. | `sparrow.command.patrol` |
| `/sudo <targets> <command>` | Make selected players execute a command. | `sparrow.command.sudo` |

## 🧭 Teleportation

| Command | Purpose | Default permission |
| - | - | - |
| `/world [world] [targets]` | Switch to a world, or the next world when omitted. | `sparrow.command.world` |
| `/top-block [targets]` | Move targets to the highest usable position in their current block column. | `sparrow.command.top-block` |
| `/tp-offline <player> [targets] [--silent]` | Teleport targets to the named player’s last recorded location. | `sparrow.command.tp-offline` |
| `/server <server> [targets]` | Request a backend transfer through the proxy. | `sparrow.command.server` |

## 🛠️ Portable workstations and containers

| Command | Purpose | Default permission |
| - | - | - |
| `/workbench [player]` | Open a crafting table for a player. | `sparrow.command.workbench` |
| `/anvil [player]` | Open an anvil for a player. | `sparrow.command.anvil` |
| `/grindstone [player]` | Open a grindstone for a player. | `sparrow.command.grindstone` |
| `/smithing-table [player]` | Open a smithing table for a player. | `sparrow.command.smithing-table` |
| `/stonecutter [player]` | Open a stonecutter for a player. | `sparrow.command.stonecutter` |
| `/cartography-table [player]` | Open a cartography table for a player. | `sparrow.command.cartography-table` |
| `/enchantment-table [player]` | Open an enchanting table for a player. | `sparrow.command.enchantment-table` |
| `/ender_chest [player] [--silent]` | Open the selected player’s own ender chest for that player. | `sparrow.command.ender-chest` |

## 📦 Item editing and acquisition

| Command | Purpose | Default permission |
| - | - | - |
| `/enchant <targets> <enchantment> [level] [--slot <slot>]` | Edit an enchantment in a target entity’s equipment slot. | `sparrow.command.enchant` |
| `/item_data [--full] [--chat]` | Inspect the main-hand item’s data; players only. | `sparrow.command.item-data` |
| `/item_name <player> [name] [options]` | Read or edit the main-hand item\_name component. | `sparrow.command.item-name` |
| `/custom_name <player> [name] [options]` | Read or edit the main-hand custom\_name component. | `sparrow.command.custom-name` |
| `/item_lore [options]` | View or edit main-hand lore; players only. | `sparrow.command.item-lore` |
| `/color [color] [--player <player>] [--slot <slot>] [--silent]` | Read or edit item dye color. | `sparrow.command.color` |
| `/custom_model_data [value]` | Read or edit the first custom model data float; players only. | `sparrow.command.custom-model-data` |
| `/more [amount] [--player <player>] [--silent]` | Replenish or copy the main-hand item; amount 1–6400. | `sparrow.command.more` |
| `/head [source] [options]` | Fetch a head by player name or UUID. | `sparrow.command.head` |

## 📐 Regions and measurement

| Command | Purpose | Default permission |
| - | - | - |
| `/highlight [targets] [options]` | Select or specify a region to highlight. | `sparrow.command.highlight` |
| `/distance [--max-distance <distance>] [--disable-marker]` | Measure distance to the targeted block; players only. | `sparrow.command.distance` |

## 💬 Messages and effects

| Command | Purpose | Default permission |
| - | - | - |
| `/broadcast <targets> <message> [options]` | Send a chat message to selected players. | `sparrow.command.broadcast` |
| `/actionbar <targets> <message> [options]` | Send an action bar to selected players. | `sparrow.command.actionbar` |
| `/title <targets> <fadeIn> <stay> <fadeOut> <message> [options]` | Send a title with an optional subtitle. | `sparrow.command.title` |
| `/toast <targets> <type> <item> <message> [options]` | Send an advancement toast with an item icon. | `sparrow.command.toast` |
| `/totem-animation <targets> <item> [--silent]` | Play a totem animation with the specified item icon. | `sparrow.command.totem-animation` |
| `/demo [player]` | Display the demo prompt. | `sparrow.command.demo` |
| `/credits [player]` | Display the credits screen. | `sparrow.command.credits` |

## 🔑 Additional permissions

| Permission | Purpose |
| - | - |
| `sparrow.bypass.patrol` | Exclude the holder from patrol selection. |

See [Patrol](https://nanamoserver.github.io/sparrow-wiki/features/patrol.mdx), [Highlight](https://nanamoserver.github.io/sparrow-wiki/features/highlight.mdx), and [Heads](https://nanamoserver.github.io/sparrow-wiki/features/head.mdx) for their complete usage.
