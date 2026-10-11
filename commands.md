# Permissions & Commands Quick Reference

Source: <https://nanamoserver.github.io/sparrow-wiki/commands>

`<argument>` is required; `[argument]` is optional. `player` generally means a local online player, and `targets` accepts player or entity selectors.

These are the default entry points and permissions. Short commands also accept `/sparrow <command>`. Restart after editing `commands.yml`.

Commands that belong to a feature, such as `/maintenance` or `/ban`, are hidden from players and refused with a notice while that feature is disabled. They reappear as soon as the feature is enabled again.

## Player names and selectors {#player-targets}

Commands that support cross-server players offer online names across the proxy network in Tab completion. Players remain listed while switching backends. You can still type a known offline name where the command supports it. Commands for local actions, such as healing or opening an inventory, continue to target local players.

Selectors such as `@s` (yourself), `@p` (nearest player), `@r` (random player), and `@a` (all players) **only select players on the server where you run the command**.

| Argument | Selectors |
| - | - |
| `/kick <player>` | Accepts multiple local players, such as `/kick @a Server restarting`. Type a name to kick someone on another server. |
| `/ip`, `/ip-history`, `/player-uuid`, `/player-info`, and the destination player in `/tp-offline` | One player only: use `@s`, `@p`, `@r`, or `@a[limit=1]`. |
| Owner in `/del-home <name> [player]`, `/home-list other <player>`, or `/del-all-home --player <player>` | One local player. The combined `<player>.<home>` form still requires a name. |
| `/ban-history --operator <player>` | One local player. The history target itself uses a name, UUID, IP, or punishment ID. |
| `/ban`, `/mute`, `/unmute`, `/unban` | No selectors. Enter a player name or another target type accepted by that command. |

`@s` requires a player executor; it cannot select a player from the console. A single-player argument rejects `@a` without a limit, even if only one player is online.

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
| `/ban <player> [reason] [-t <time>] [-I] [--force] [-s]` | Ban an account network-wide; `-I` also bans its last login IP. | `sparrow.command.ban` |
| `/ban-ip <ip> [reason] [-t <time>] [--force] [-s]` | Ban an IP address or range such as `1.2.3.*`. | `sparrow.command.ban-ip` |
| `/mute <player> <time> [reason]` | Temporarily mute a player across the network. See [Mutes](https://nanamoserver.github.io/sparrow-wiki/features/mute.mdx). | `sparrow.command.mute` |
| `/unmute <player>` | Lift a player’s active mute. | `sparrow.command.unmute` |
| `/unban <target> [-s]` | Lift bans by player name, UUID, IP, or punishment ID. | `sparrow.command.unban` |
| `/ban-history [target] [options]` | Browse ban records with operator, time, and active filters. | `sparrow.command.ban-history` |

`/kick` works for any player online in the network. `--silent` / `-s` hides the success message from the executor; on ban commands it also skips staff notices.

`/kick` disconnects the player from the proxy, including while they are switching backends. The kick screen uses the translation files on the server where the command was run, in the target player's language. Success is reported after the proxy performs the kick; if the player has already left, the command reports them offline. See [proxy setup](https://nanamoserver.github.io/sparrow-wiki/installation.mdx#proxy-plugin).

## 🔎 Player records

| Command | Purpose | Default permission |
| - | - | - |
| `/player-info <player>` | Show player records and punishment status; also available as `/whois`. | `sparrow.command.player-info` |
| `/ip <player>` | Show a player's last login IP and time, with a button to list players on the same IP. | `sparrow.command.ip` |
| `/ip-history <target> [page]` | List players whose last login IP matches an IP, a range such as `1.2.3.*`, or a player's last login IP. | `sparrow.command.ip-history` |
| `/player-uuid <player>` | Look up a player's UUID by name. | `sparrow.command.player-uuid` |
| `/player-name <uuid>` | Look up the last name used by a UUID. | `sparrow.command.player-name` |

These commands only know players who have joined your servers; nothing is looked up from Mojang. `player` here can be any such player, whether online or not, and `/ip` and `/ip-history` also accept a UUID. The last login IP is updated every time a player joins; only IPv4 addresses are recorded. `/ip-history` shows 8 players per page with their online status or last server, last login time, and IP.

## 🧍 Player and entity state

| Command | Purpose | Default permission |
| - | - | - |
| `/heal [player]` | Restore player health. | `sparrow.command.heal[.other]` |
| `/feed [player]` | Restore player hunger. | `sparrow.command.feed[.other]` |
| `/fly` | Toggle your own flight state. | `sparrow.command.fly[.other]` |
| `/fly <player> [enabled]` | Toggle the named player's flight state, or set it with true / false. | `sparrow.command.fly[.other]` |
| `/fly-speed <speed> [player]` | Set flight speed from -1 to 1. | `sparrow.command.fly-speed[.other]` |
| `/walk-speed <speed> [player]` | Set walking speed from -1 to 1. | `sparrow.command.walk-speed[.other]` |
| `/smite <targets> [--effect]` | Strike selected local entities with lightning; `--effect` shows only the visual effect. | `sparrow.command.smite` |
| `/suicide` | Kill yourself; players only. | `sparrow.command.suicide` |
| `/burn <time> [targets]` | Set yourself or selected entities on fire; time accepts ticks or units such as `5s`. | `sparrow.command.burn[.other]` |
| `/extinguish [targets]` | Extinguish target entities. | `sparrow.command.extinguish[.other]` |
| `/look face <face> [targets]` | Turn yourself or selected entities toward a direction such as north or up. | `sparrow.command.look[.other]` |
| `/look location <x> <y> <z> [targets]` | Turn yourself or selected entities toward a location. | `sparrow.command.look[.other]` |
| `/look entity <entity> [targets]` | Turn yourself or selected entities toward another entity. | `sparrow.command.look[.other]` |
| `/hat [player]` | Wear one of the main-hand items on the head. | `sparrow.command.hat[.other]` |
| `/knockback <x> <y> <z> [player]` | Push a player in the given direction. | `sparrow.command.knockback[.other]` |

`/hat` wears one item and leaves the rest of the stack in the hand. The previous helmet goes back to the hand if it is now empty, otherwise into the inventory, and is dropped at the player's feet when the inventory is full. A helmet with Curse of Binding cannot be replaced, except in Creative mode.

`/knockback` uses blocks per tick: `/knockback 0 1 0` launches the player straight up, and `/knockback 2 0.5 0` pushes them east. Like being hit, the push replaces the player's current movement.

## 🔍 Patrol and command execution

| Command | Purpose | Default permission |
| - | - | - |
| `/patrol [targets]` | Patrol local online players in rotation; players only. | `sparrow.command.patrol` |
| `/force-say <targets> <text>` | Make selected local players send a chat message. | `sparrow.command.force-say` |
| `/sudo <targets> <command>` | Make selected players execute a command. | `sparrow.command.sudo` |

## 🧭 Teleportation

| Command | Purpose | Default permission |
| - | - | - |
| `/world [world] [targets]` | Switch to a world, or the next world when omitted. | `sparrow.command.world[.other]` |
| `/top-block [targets]` | Move targets to the highest usable position in their current block column. | `sparrow.command.top-block[.other]` |
| `/tp-offline <player> [targets] [--silent]` | Teleport targets to the named player’s last recorded location. | `sparrow.command.tp-offline` |
| `/server <server> [targets]` | Request a backend transfer through the proxy. | `sparrow.command.server[.other]` |
| `/spawn` | Travel to the shared spawn; players only. See [Network spawn](https://nanamoserver.github.io/sparrow-wiki/features/spawn.mdx). | `sparrow.command.spawn` |
| `/set-spawn` | Set or replace the shared spawn at your position; players only. | `sparrow.command.set-spawn` |
| `/del-spawn` | Delete the shared spawn immediately; players and console. | `sparrow.command.del-spawn` |
| `/bed [player]` | Teleport a player to their respawn point, such as their bed. | `sparrow.command.bed[.other]` |
| `/death-back [player]` | Return to the last death location, including across servers. | `sparrow.command.death-back[.other]` |
| `/back [player]` | Return a player to their previous location, including across servers. | `sparrow.command.back[.other]` |
| `/warp <name> [player]` | Teleport yourself or the named player to a warp, including across servers. | `sparrow.command.warp[.other]` |
| `/set-warp <name>` | Create a warp at your position, or move an existing one there; players only. | `sparrow.command.set-warp` |
| `/del-warp <name>` | Delete a warp immediately. | `sparrow.command.del-warp` |
| `/warp-list [page]` | Show the clickable chat list of warps. | `sparrow.command.warp-list` |
| `/edit-warp <name>` | Show a warp's information and management panel. | `sparrow.command.edit-warp` |
| `/edit-warp <name> rename <new_name>` | Rename a warp. | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.rename` |
| `/edit-warp <name> description <text>` | Set the description, up to 256 characters. | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.description` |
| `/edit-warp <name> relocate` | Move a warp to your current position; players only. | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.relocate` |
| `/edit-warp <name> delete [confirm <id>]` | Request deletion confirmation, or enter the confirmation command shown in the panel. | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.delete` |

`/bed` uses the point where the player would respawn: their bed, a charged respawn anchor, or a point set with `/spawnpoint`. If the bed was broken or is blocked, the player is told they have no bed to return to.

Bare `/warp` reports a missing name; use `/warp-list` to browse destinations. See [Warps](https://nanamoserver.github.io/sparrow-wiki/features/warp.mdx) for per-destination permissions and management.

Cooldowns, countdowns, world restrictions, and sounds are configured in groups in `teleport.yml`, and each feature picks its group with `teleport-group` in `features.yml`. See [Teleport groups](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx). `/tp-offline` teleports immediately.

### Server name completion

`/server` suggests online Sparrow servers, excluding the current server. It also respects `server.allowed-servers` in `features.yml`. Suggestions update automatically as servers start or stop, usually within a few seconds, and work from the console even when this server has no players.

You can type a server name that is not suggested. It must be allowed by the configuration and exist on the proxy; the proxy decides whether the connection succeeds.

```yaml title="features.yml · server"
server:
  enabled: true
  allowed-servers: []
```

An empty list allows any destination. To restrict transfers, use a list such as `allowed-servers: [lobby, survival]`. Apply changes with `/sparrow reload`. See [proxy setup](https://nanamoserver.github.io/sparrow-wiki/installation.mdx#proxy-plugin).

## 🏠 Homes

| Command | Purpose | Default permission |
| - | - | - |
| `/set-home [name]` | Create your home at your current position, defaulting to `home`; players only, no overwrite. | `sparrow.command.set-home` |
| `/home [name]` | Travel to your named, default, or only home; players only. | `sparrow.command.home` |
| `/home <player>.<name>` | Travel yourself to another player's home. | `sparrow.command.home` + `sparrow.command.home.other` |
| `/del-home <name> [player]` | Delete your home, or the specified owner's home with `.other`, immediately. | `sparrow.command.del-home[.other]` |
| `/home-list [page]` | List your homes, 10 per page. | `sparrow.command.home-list` |
| `/home-list other <player> [page]` | List another player's homes. | `sparrow.command.home-list` + `sparrow.command.home-list.other` |
| `/edit-home <home>` | Show a home's information and management panel. | `sparrow.command.edit-home[.other]` |
| `/edit-home <home> rename <new_name>` | Rename a home. | `sparrow.command.edit-home` + `sparrow.command.edit-home.rename` |
| `/edit-home <home> relocate` | Move a home to your current position and server; players only. | `sparrow.command.edit-home` + `sparrow.command.edit-home.relocate` |
| `/edit-home <home> delete` | Delete a home immediately, without confirmation. | `sparrow.command.edit-home` + `sparrow.command.edit-home.delete` |
| `/del-all-home [--player <player>] [--server <server>] [--world <world>]` | Delete homes matching all filters; console only, at least one filter, no confirmation. | `sparrow.command.del-all-home` |

For Home commands, `player` means the owner, including a known offline player. `<home>` accepts your home's name or `<player>.<name>`; editing another player's home requires `.other` in addition to each operation's permission. The console must specify an owner. `/home` has no argument for sending another player.

Aliases: `/sethome`, `/delhome`, `/homelist`, and `/edithome`. Bare `/home` prefers the configured default home, then your only home; otherwise it asks for a name or shows how to create one. It never opens the list automatically.

All Home list and panel buttons fill in a command for you to execute with Enter. See [Homes](https://nanamoserver.github.io/sparrow-wiki/features/home.mdx) for limits, configuration, bulk filters, and PlaceholderAPI placeholders.

## 🤝 Teleport requests

| Command | Purpose | Default permission |
| - | - | - |
| `/tpa <player>` | Ask to teleport to the other player. | `sparrow.command.tpa` |
| `/tpa-here <player>` | Ask the other player to teleport to you. | `sparrow.command.tpa-here` |
| `/tpa-accept [player]` | Accept a request you received; without a player, the most recent one. | `sparrow.command.tpa-accept` |
| `/tpa-deny [player]` | Deny a request you received; without a player, the most recent one. | `sparrow.command.tpa-deny` |
| `/tpa-cancel [player]` | Cancel your request to a player; without a player, every request you sent. | `sparrow.command.tpa-cancel` |

These commands are for players only, and the target can be on another backend. Aliases: `/tpahere`, `/tpaccept`, `/tpdeny`, and `/tpacancel`. See [Teleport requests](https://nanamoserver.github.io/sparrow-wiki/features/tpa.mdx) for expiry, cooldowns, and configuration.

## 🛠️ Portable workstations and containers

| Command | Purpose | Default permission |
| - | - | - |
| `/workbench [player]` | Open a crafting table for a player. | `sparrow.command.workbench[.other]` |
| `/anvil [player]` | Open an anvil for a player. | `sparrow.command.anvil[.other]` |
| `/grindstone [player]` | Open a grindstone for a player. | `sparrow.command.grindstone[.other]` |
| `/smithing-table [player]` | Open a smithing table for a player. | `sparrow.command.smithing-table[.other]` |
| `/stonecutter [player]` | Open a stonecutter for a player. | `sparrow.command.stonecutter[.other]` |
| `/cartography-table [player]` | Open a cartography table for a player. | `sparrow.command.cartography-table[.other]` |
| `/enchantment-table [player]` | Open an enchanting table for a player. | `sparrow.command.enchantment-table[.other]` |
| `/clear-inv <player>` | Clear a local player’s inventory, equipment, cursor, and crafting items. | `sparrow.command.clear-inv` |
| `/clear-ender <player>` | Clear a local player’s ender chest. | `sparrow.command.clear-ender` |
| `/ender_chest` | Open your own ender chest. | `sparrow.command.ender-chest[.other]` |
| `/ender_chest <player> [--silent]` | Have the named player open their own ender chest. | `sparrow.command.ender-chest[.other]` |

## 📦 Item editing and acquisition

| Command | Purpose | Default permission |
| - | - | - |
| `/repair <player> [--slot <slot>] [--value <amount>]` | Repair the main-hand item, or the selected equipment slot. Omit `--value` for a full repair. | `sparrow.command.repair` |
| `/repair-all <player>` | Fully repair items in a local player’s inventory and equipment. | `sparrow.command.repair-all` |
| `/item-damage <player> <value>` | Set main-hand damage, not remaining durability; reaching the maximum breaks the item. | `sparrow.command.item-damage` |
| `/enchant <targets> <enchantment> [level] [--slot <slot>] [--check]` | Edit an enchantment in a target entity’s equipment slot; a negative level removes it. `--check` applies the vanilla `/enchant` rules. | `sparrow.command.enchant` |
| `/item_data [--full] [--chat]` | Inspect the main-hand item’s data; players only. | `sparrow.command.item-data` |
| `/item_name <player> [name] [options]` | Read or edit the main-hand item\_name component. | `sparrow.command.item-name` |
| `/custom_name <player> [name] [options]` | Read or edit the main-hand custom\_name component. | `sparrow.command.custom-name` |
| `/item_lore [options]` | View or edit main-hand lore; players only. | `sparrow.command.item-lore` |
| `/color <color>` | Set the dye color of your main-hand item. | `sparrow.command.color[.other]` |
| `/color <color> <player> [--silent]` | Set the dye color of the named player's main-hand item. | `sparrow.command.color[.other]` |
| `/custom_model_data [value]` | Read or edit the first custom model data float; players only. | `sparrow.command.custom-model-data` |
| `/more [amount] [--player <player>] [--silent]` | Replenish or copy the main-hand item; amount 1–6400. | `sparrow.command.more` |
| `/head [source] [amount]` | Fetch heads for yourself by player name or UUID; amount is 1–6400, default 1. | `sparrow.command.head[.other]` |
| `/head <source> <amount> <player> [force] [--silent]` | Give heads to selected players; set `force` to `true` for a fresh lookup. | `sparrow.command.head[.other]` |

## 📐 Regions and measurement

| Command | Purpose | Default permission |
| - | - | - |
| `/highlight [targets] [options]` | Select or specify a region to highlight. | `sparrow.command.highlight` |
| `/distance [--max-distance <distance>] [--disable-marker]` | Measure distance to the targeted block; players only. | `sparrow.command.distance` |

## 💬 Messages and effects

| Command | Purpose | Default permission |
| - | - | - |
| `/clear-chat [player]` | Scroll chat out of view for a local player, or everyone on this server when omitted. | `sparrow.command.clear-chat` |
| `/broadcast <message> [options]` | Broadcast a chat message to online players on every server, including the current server. | `sparrow.command.broadcast` |
| `/actionbar <targets> <message> [options]` | Send an action bar to selected players. | `sparrow.command.actionbar` |
| `/title <targets> <fadeIn> <stay> <fadeOut> <message> [options]` | Send a title with an optional subtitle. | `sparrow.command.title` |
| `/toast <targets> <type> <item> <message> [options]` | Send an advancement toast with an item icon. | `sparrow.command.toast` |
| `/totem-animation <targets> <item> [--silent]` | Play a totem animation with the specified item icon. | `sparrow.command.totem-animation` |
| `/demo [player]` | Display the demo prompt. | `sparrow.command.demo` |
| `/credits [player]` | Display the credits screen. | `sparrow.command.credits` |

Players and the console can use `/broadcast`. The message is required, may contain spaces, and goes to all online players on Sparrow servers sharing the same Redis connection and database number, including the current server. Broadcasting works even when the server where you run the command has no players online.

Messages support MiniMessage formatting, for example `/broadcast <gold>The market is now open!</gold>`. Add options after the message:

| Broadcast option | Effect |
| - | - |
| `--silent` / `-s` | Hide the executor's single confirmation; players still receive the broadcast. |
| `--legacy-color` / `-l` | Enable legacy color codes such as `&a`. |

Use `<papi:placeholder>` in Sparrow messages, for example `/broadcast <gold>Hello, <papi:player_name>!</gold>`. Each recipient sees their own name. To provide default text, use `<papi:player_name:Player>`. Receiving servers need PlaceholderAPI and the relevant expansions; no parsing switch is required.

Legacy colors are off by default. Set `text-options.parse-legacy-color: true` in the sending server's `config.yml`, or add `-l` to an individual command.

## 🔑 Additional permissions

| Permission | Purpose |
| - | - |
| `sparrow.bypass.patrol` | Exclude the holder from patrol selection. |
| `sparrow.bypass.maintenance` | Stay on or join the server during maintenance. |
| `sparrow.bypass.player-limit` | Join even when the server is full. |
| `sparrow.notify.ban` | Receive ban and unban notices from every server. Only operators have it by default. |
| `sparrow.notify.mute` | Receive mute and unmute notices from every server. |
| `sparrow.warp.<lowercase-name>` | Access the named warp when `permission-restrict` is enabled. |
| `sparrow.max-homes.<number>` | Set the Home limit; the highest granted number replaces the configured default. |
| `sparrow.max-homes.unlimited` | Remove the Home limit. |
| `sparrow.teleport-warmup.<seconds>` | Shorten the countdown before `/warp`, `/home`, `/back`, `/death-back`, `/bed`, `/spawn`, or an accepted teleport request; the lowest permission value or group setting wins. |
| `sparrow.bypass.teleport-warmup` | Skip the countdown before teleporting yourself. |
| `sparrow.bypass.teleport-cooldown` | Not held by teleport cooldowns. |
| `sparrow.bypass.teleport-world-blacklist` | May teleport into worlds on the world blacklist. |
| `sparrow.bypass.tpa-cooldown` | Send teleport requests without the request cooldown or the deny cooldown. |

With `--check`, `/enchant` follows the vanilla command: the level cannot exceed the enchantment's maximum level, the item must support the enchantment, and the enchantment must not conflict with existing ones, including the same enchantment already on the item. Enchanted books are not supported items in vanilla, so they are refused as well. Removing an enchantment is never checked.

See [Patrol](https://nanamoserver.github.io/sparrow-wiki/features/patrol.mdx), [Highlight](https://nanamoserver.github.io/sparrow-wiki/features/highlight.mdx), [Heads](https://nanamoserver.github.io/sparrow-wiki/features/head.mdx), [Maintenance](https://nanamoserver.github.io/sparrow-wiki/features/maintenance.mdx), [Player limit](https://nanamoserver.github.io/sparrow-wiki/features/player-limit.mdx), [Bans](https://nanamoserver.github.io/sparrow-wiki/features/ban.mdx), and [Back](https://nanamoserver.github.io/sparrow-wiki/features/back.mdx) for their complete usage.
