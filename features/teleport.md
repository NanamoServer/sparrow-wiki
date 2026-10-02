# Teleport settings

Source: <https://nanamoserver.github.io/sparrow-wiki/features/teleport>

[`/warp`](https://nanamoserver.github.io/sparrow-wiki/features/warp.mdx), [`/back`](https://nanamoserver.github.io/sparrow-wiki/features/back.mdx), and [`/bed`](https://nanamoserver.github.io/sparrow-wiki/features/bed.mdx) use a countdown before teleporting yourself. Each feature has its own wait and cooldown settings in `features.yml`. Countdown display and sounds are shared settings in `config.yml`.

## Wait and cooldown

Each feature defaults to a 3-second wait, no cooldown, and cancellation on movement or damage. Set `warmup-seconds` or `cooldown-seconds` to `0` to disable that wait or cooldown.

With `cancel-on-move: true`, moving more than half a block from where the countdown started or changing worlds cancels the teleport. `cancel-on-damage: true` cancels it when you take damage. Starting another countdown replaces the first; leaving the server cancels it.

Cooldowns begin only after a successful local teleport or the start of a server transfer. They carry across servers, with `/warp`, `/back`, and `/bed` counted separately. A cancelled countdown does not start a cooldown.

Sending another player teleports them immediately and neither checks nor starts a cooldown. Specifying yourself still uses your own wait and cooldown, even though the explicit player argument requires `.other`. `/tp-offline` teleports immediately.

## Permissions

| Permission | Effect |
| - | - |
| `sparrow.teleport-warmup.<seconds>` | Shorten the wait. Sparrow uses the lowest value among these permissions and the feature default. |
| `sparrow.bypass.teleport-warmup` | Skip the countdown. |
| `sparrow.bypass.teleport-cooldown` | Skip the cooldown check and do not start a new cooldown. |

For example, if the feature default is 3 seconds and a player has `sparrow.teleport-warmup.1`, they wait 1 second. A value above 3 does not extend the default wait. Grant `sparrow.teleport-warmup.0` or the countdown bypass permission for immediate teleports.

## Display and sounds

Merge this section into `config.yml`, keeping the other settings:

```yaml title="config.yml · teleport"
teleport:
  warmup-display: ACTION_BAR
  warmup-sound: 'block.note_block.banjo'
  complete-sound: 'entity.enderman.teleport'
  cancel-sound: 'entity.item.break'
```

| Setting | Meaning |
| - | - |
| `warmup-display` | `ACTION_BAR` shows the countdown above the hotbar, `TITLE` in the center of the screen, `CHAT` in chat, and `NONE` hides it. |
| `warmup-sound` | Sound played at each countdown update. |
| `complete-sound` | Sound played after arrival on the same server. It is not played after a cross-server transfer. |
| `cancel-sound` | Sound played when movement or damage cancels the countdown. |

Leave a sound value empty (`''`) to disable it. `NONE` hides the countdown text but does not turn off sounds. Apply changes with `/sparrow reload`.
