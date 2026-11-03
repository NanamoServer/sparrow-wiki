# Bans

Source: <https://nanamoserver.github.io/sparrow-wiki/features/ban>

Module `ban` · Configuration `features/ban.yml`

Ban accounts, IPs or IP ranges across servers, with a persistent history.

## Command and permission reference

| Command | Purpose | Default permission |
| - | - | - |
| `/ban <player\|player-ip\|ip> <target> [reason] [--time <duration>] [--force] [--silent]` | Ban an account or IP. | `sparrow.command.ban` |
| `/unban <player\|player-ip\|ip> <target> [--silent]` | Lift an account or IP ban. | `sparrow.command.unban` |
| `/unban-id <id> [--silent]` | Revoke a ban by record ID. | `sparrow.command.unban_id` |
| `/ban-info <id>` | Open a ban record (players only). | `sparrow.command.ban_info` |
| `/ban-history <all\|player <player>\|ip <ip>> [options]` | Browse ban history (players only). | `sparrow.command.ban_history` |

### Additional permissions

| Permission | Purpose |
| - | - |
| `sparrow.notify.ban` | Receive ban and unban notices. |

## Usage

```text
/ban player Steve griefing --time 7d
/ban player-ip Steve
/ban ip 192.0.2.* unwanted traffic
/ban-history player Steve --active
/unban-id 12
```

`player` bans an account. `player-ip` bans the player's last recorded IP without adding an account ban. `ip` accepts an address or range. Omit `--time` for a permanent ban; `--force` replaces an active ban for the same target. `--silent` hides notices and success feedback.

Turn pages in the dialog. History filters are `--active`, `--within <duration>` and `--operator <name>`. `sparrow.notify.ban` receives ban and unban notices.

With permission for `/ban-info`, select a history entry to open its details. With permission for `/unban-id`, revoke an active ban from its details and choose whether to silence notices before confirming.

Add common reasons to `reason-presets`; an exact preset name expands to its text. Notification sounds use `notify-ban-sound` and `notify-unban-sound`.

![Disconnect screen for a permanent account ban, showing ban ID 21](https://nanamoserver.github.io/sparrow-wiki/img/features/ban-disconnect.png)

Players can give the ban ID on the disconnect screen to an administrator. For the record shown here, use `/ban-info 21`.

## Configuration example

```yaml
# Example: expand grief to Griefing when entered as the reason
reason-presets:
  grief: "Griefing"
```
