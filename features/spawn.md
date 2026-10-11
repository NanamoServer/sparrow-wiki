# Network spawn

Source: <https://nanamoserver.github.io/sparrow-wiki/features/spawn>

Set one shared destination for `/spawn` across your Sparrow servers. Players can return to it from another backend. This destination is used by the command; it does not change where players join or respawn after death.

## Commands and permissions

| Command | Purpose | Default permission |
| - | - | - |
| `/spawn` | Travel to the shared spawn; players only. | `sparrow.command.spawn` |
| `/set-spawn` | Set or replace the destination at your current position; players only. | `sparrow.command.set-spawn` |
| `/del-spawn` | Delete the shared destination immediately; players and console. | `sparrow.command.del-spawn` |

Each command also accepts `/sparrow <command>`. Stand where you want players to arrive and run `/set-spawn`. The destination is shared across servers and kept after a restart.

Until a destination is set, `/spawn` is hidden from the player's command list. Deleting the destination hides it again. If the destination server is offline or its world cannot be found, Sparrow reports the problem.

## Configuration

```yaml title="features.yml · spawn"
spawn:
  enabled: true
  teleport-group: default
```

By default, players wait 3 seconds, with no cooldown. Moving more than half a block, changing worlds, or taking damage cancels the countdown.

Cooldowns, countdowns, world restrictions, and sounds are configured in groups in `teleport.yml`. See [Teleport groups](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx). Apply configuration changes with `/sparrow reload`. Disabling the feature hides its commands but keeps the saved destination for when you enable it again.
