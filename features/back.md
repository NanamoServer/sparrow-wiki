# Back and death back

Source: <https://nanamoserver.github.io/sparrow-wiki/features/back>

Module `back` · Configuration `features/back.yaml`

`/back` returns to the previous departure point; `/death-back` returns to the last death location. Both support cross-server destinations. A named traveler must be on this server.

| Command | Purpose | Default permission |
| - | - | - |
| `/back [player] [--unsafe] [--silent]` | Return to the previous teleport departure point. | `sparrow.command.back[.other]` |
| `/death-back [player] [--unsafe] [--silent]` | Return to the last death location. | `sparrow.command.death-back[.other]` |

`--unsafe` allows the original coordinates when no safe location is found; `--silent` hides command feedback.

`back.teleport-causes` records `COMMAND` and `PLUGIN` by default. `back.join-grace-seconds` ignores ordinary teleports during the first 3 seconds after joining. `deathback.record-death` controls recording of new death locations.

Configure their cooldowns and warmups separately under `back.teleport-options` and `deathback.teleport-options`; see [Teleport options](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx).
