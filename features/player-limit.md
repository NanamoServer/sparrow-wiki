# Player limit

Source: <https://nanamoserver.github.io/sparrow-wiki/features/player-limit>

Module `player_limit` · Configuration `features/player_limit.yml`

Change this server's player limit at runtime. Command changes are saved.

| Command | Purpose | Default permission |
| - | - | - |
| `/max_players [amount]` | View or change the player limit; -1 restores the original limit. | `sparrow.command.max_players` |

`sparrow.bypass.player_limit` allows joining when full. `max-players: -1` restores the limit from before the module was enabled; `0` sets a zero-player limit. Disabling the module also restores the original limit.
