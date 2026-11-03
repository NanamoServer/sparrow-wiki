# Teleport requests

Source: <https://nanamoserver.github.io/sparrow-wiki/features/tpa>

Module `tpa` · Configuration `features/tpa.yml`

Send, accept or decline player-to-player teleport requests across servers.

## Command and permission reference

| Command | Purpose | Default permission |
| - | - | - |
| `/tpa <player>` | Ask to teleport to another player. | `sparrow.command.tpa` |
| `/tpa-here <player>` | Ask another player to teleport to you. | `sparrow.command.tpa_here` |
| `/tpa-accept [player]` | Accept a request; defaults to the most recent one. | `sparrow.command.tpa_accept` |
| `/tpa-deny [player]` | Deny a request; defaults to the most recent one. | `sparrow.command.tpa_deny` |
| `/tpa-cancel [player]` | Cancel an outgoing request; omit the player to cancel all. | `sparrow.command.tpa_cancel` |

### Additional permissions

| Permission | Purpose |
| - | - |
| `sparrow.bypass.tpa_cooldown` | Skip request and denial cooldowns. |
| `sparrow.tpa.staff / sparrow.tpa.vip` | Default TPA teleport cooldown and warmup overrides. |

## Usage

```yaml
expire-seconds: 60
request-cooldown-seconds: 10
deny-cooldown-seconds: 120  # Seconds to wait before asking the same player after a denial
```

Requests expire after 60 seconds by default, with 10 seconds between requests and 120 seconds before requesting the same player after a denial. `sparrow.bypass.tpa_cooldown` skips both request cooldowns.

After acceptance, `teleport-options` applies to the actual traveler. Its teleport cooldown is separate from request intervals; see [Teleport options](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx).
