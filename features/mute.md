# Mutes

Source: <https://nanamoserver.github.io/sparrow-wiki/features/mute>

Temporarily stop a player from sending ordinary chat messages across your Sparrow servers. The player can stay online, and the mute expires automatically.

## Commands and permissions

| Command or permission | Purpose | Default command permission |
| - | - | - |
| `/mute <player> <time> [reason]` | Mute a player for the specified time. | `sparrow.command.mute` |
| `/unmute <player>` | End an active mute early. | `sparrow.command.unmute` |
| `sparrow.notify.mute` | Receive mute and unmute notices from all servers. | — |

Both commands also accept `/sparrow <command>`. Enter a player name or UUID; selectors such as `@s` and `@a` are not supported. Names must belong to players who have joined your servers; they do not need to be online. Tab completion offers online names across the network.

```text title="Examples"
/mute Steve 30m Repeated spam
/mute Alex 1d12h Abusive chat
/unmute Steve
```

Time is required and must be positive. Units are `y` (365 days), `mo` (30 days), `w` (weeks), `d` (days), `h` (hours), `m` (minutes), and `s` (seconds). Combine them as in `1d12h`, or use decimals such as `1.5h`. The optional reason can contain up to 256 characters.

Muting someone who is already muted does not replace or extend the existing mute. To change it, use `/unmute` first, then issue the new mute.

## What players see

An online player receives a notice when muted or unmuted. Trying to chat while muted shows the reason and remaining time. Switching servers or reconnecting does not lift the mute; time continues to pass while the player is offline.

This feature blocks ordinary chat. It does not block commands, including private-message commands supplied by other plugins. Use those plugins' own settings if you also need to restrict private messages.

Staff with `sparrow.notify.mute` receive notices across the network. Use `/player-info <player>` (or `/whois <player>`) to check the current mute.

## Configuration

```yaml title="features.yml · mute"
mute:
  enabled: true
```

Apply changes with `/sparrow reload`. While Mute is disabled, its commands are hidden and chat is not restricted. Re-enabling it restores any mutes that have not expired.
