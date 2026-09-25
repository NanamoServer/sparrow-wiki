# Patrol

Source: <https://nanamoserver.github.io/sparrow-wiki/features/patrol>

Use `/patrol` to visit online players on the current server in rotation. Players not inspected recently are selected first; newly joined players enter at the front of the queue.

## Commands and permissions

| Command or permission | Purpose | Default command permission |
| - | - | - |
| `/patrol [targets]` | Select the next player from the candidate set. | `sparrow.command.patrol` |
| `sparrow.bypass.patrol` | Exclude the permission holder from patrol selection. | — |

The full entry point is `/sparrow patrol [targets]`. Only players can run it. Without `targets`, all eligible local online players are considered. A name or player selector narrows the candidates.

```text title="Examples"
/patrol
/patrol @a
```

Selection skips the sender, players with the bypass permission, and players excluded by configuration. Patrol does not change the sender's game mode; switch to spectator mode first if desired.

## Configuration

```yaml title="features.yml · patrol"
patrol:
  enabled: true
  skip-spectators: true
  excluded-worlds: []
```

`skip-spectators` excludes spectators by default. Add world names to `excluded-worlds`, for example `[minigame, lobby]`. An empty list allows all worlds.
