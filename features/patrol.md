# Patrol

Source: <https://nanamoserver.github.io/sparrow-wiki/features/patrol>

Module `patrol` · Configuration `features/patrol.yml`

Cycle through players across the network by teleporting to them. Omit the target to rotate through eligible players.

| Command | Purpose | Default permission |
| - | - | - |
| `/patrol [targets]` | Cycle through players for patrol, including across servers. | `sparrow.command.patrol` |

`sparrow.bypass.patrol` excludes a player. Spectators are skipped by default; set `skip-spectators: false` to include them.
