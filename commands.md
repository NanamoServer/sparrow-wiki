# Permissions & Commands Quick Reference

Source: <https://nanamoserver.github.io/sparrow-wiki/commands>

`<argument>` is required; `[argument]` is optional. `player` generally means a local online player, and `targets` accepts player or entity selectors.

These are the default entry points and permissions. Short commands also accept `/sparrow <command>`. Restart after editing `commands.yml`.

Commands that belong to a feature, such as `/maintenance` or `/ban`, are hidden from players and refused with a notice while that feature is disabled. They reappear as soon as the feature is enabled again.

## ⚙️ Plugin management

| Command | Purpose | Default permission |
| - | - | - |
| `/sparrow reload [--silent]` | Reload settings that support runtime changes. | `sparrow.command.admin.reload` |
| `/sparrow feature-list [page]` | List feature states by page. | `sparrow.command.admin.feature` |
| `/sparrow feature-enable <feature>` | Enable a feature and save its switch. | `sparrow.command.admin.feature` |
| `/sparrow feature-disable <feature>` | Disable a feature and save its switch. | `sparrow.command.admin.feature` |

## 🚧 Server access

| Command | Purpose | Default permission |
| - | - | - |
| `/maintenance [true\|false]` | Turn maintenance mode on or off, or show its state. | `sparrow.command.maintenance` |
| `/max-players [amount]` | Change the player limit at runtime, or show online players and the limit. | `sparrow.command.max-players` |

## 🔨 Moderation

| Command | Purpose | Default permission |
| - | - | - |
| `/kick <player> [reason] [-s]` | Kick a player from whichever server they are on; the kick screen shows the reason and who kicked them. | `sparrow.command.kick` |
| `/ban <player> [reason] [-t <time>] [-I] [-s]` | Ban an account network-wide; `-I` also bans its last login IP. | `sparrow.command.ban` |
| `/ban-ip <ip> [reason] [-t <time>] [-s]` | Ban an IP address or range such as `1.2.3.*`. | `sparrow.command.ban-ip` |
| `/unban <target> [-s]` | Lift bans by player name, UUID, IP, or punishment ID. | `sparrow.command.unban` |
| `/ban-history [target] [options]` | Browse ban records with operator, time, and active filters. | `sparrow.command.ban-history` |

`/kick` works for any player online in the network. `--silent` / `-s` hides the success message from the executor; on ban commands it also skips staff notices.

## 🔎 Player records

| Command | Purpose | Default permission |
| - | - | - |
| `/ip <player>` | Show a player's last login IP and time, with a button to list players on the same IP. | `sparrow.command.ip` |
| `/ip-history <target> [page]` | List players whose last login IP matches an IP, a range such as `1.2.3.*`, or a player's last login IP. | `sparrow.command.ip-history` |
| `/player-uuid <player>` | Look up a player's UUID by name. | `sparrow.command.player-uuid` |
| `/player-name <uuid>` | Look up the last name used by a UUID. | `sparrow.command.player-name` |

These commands only know players who have joined your servers; nothing is looked up from Mojang. `player` here can be any such player, whether online or not, and `/ip` and `/ip-history` also accept a UUID. The last login IP is updated every time a player joins; only IPv4 addresses are recorded. `/ip-history` shows 8 players per page with their online status or last server, last login time, and IP.

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
| `/enchant <targets> <enchantment> [level] [--slot <slot>] [--check]` | Edit an enchantment in a target entity’s equipment slot; a negative level removes it. `--check` applies the vanilla `/enchant` rules. | `sparrow.command.enchant` |
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
| `sparrow.bypass.maintenance` | Stay on or join the server during maintenance. |
| `sparrow.bypass.player-limit` | Join even when the server is full. |
| `sparrow.notify.ban` | Receive ban and unban notices from every server. Only operators have it by default. |

With `--check`, `/enchant` follows the vanilla command: the level cannot exceed the enchantment's maximum level, the item must support the enchantment, and the enchantment must not conflict with existing ones, including the same enchantment already on the item. Enchanted books are not supported items in vanilla, so they are refused as well. Removing an enchantment is never checked.

See [Patrol](https://nanamoserver.github.io/sparrow-wiki/features/patrol.mdx), [Highlight](https://nanamoserver.github.io/sparrow-wiki/features/highlight.mdx), [Heads](https://nanamoserver.github.io/sparrow-wiki/features/head.mdx), [Maintenance](https://nanamoserver.github.io/sparrow-wiki/features/maintenance.mdx), [Player limit](https://nanamoserver.github.io/sparrow-wiki/features/player-limit.mdx), and [Bans](https://nanamoserver.github.io/sparrow-wiki/features/ban.mdx) for their complete usage.
