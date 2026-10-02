# Back

Source: <https://nanamoserver.github.io/sparrow-wiki/features/back>

Use `/back` to return to where you were before your last teleport or death, even if that was on another server.

## Commands and permissions

| Command | Purpose | Default command permission |
| - | - | - |
| `/back` | Return to your own previous location. | `sparrow.command.back` |
| `/back <player>` | Return the named player to their previous location. | `sparrow.command.back` + `sparrow.command.back.other` |

You can also use `/sparrow back [player]`. Omit `player` to return to your own previous location; the console must name a player.

Specifying a player requires the base permission and `.other`, even when you name yourself. Without `.other`, Sparrow hides the player argument from completion and refuses it when entered manually. The `.other` permission uses the base permission from `commands.yml` followed by `.other`.

```text title="Examples"
/back
/back Steve
```

## What counts as a previous location

- Where the player stood before a teleport made by a command or another plugin. Which kinds of teleports count is configurable.
- Where the player died, when `record-death` is on.
- After switching servers, where the player left the previous server, until something new is recorded on the current server.

Each player has only one previous location, and a new one replaces the old. `/back` is itself a teleport, so running it again takes the player back to where they just were.

These are not recorded:

- Moves shorter than one block within the same world, such as turning around with `/look`.
- Teleports in the first few seconds after connecting to a server (`join-grace-seconds`). Spawn plugins often move players at that moment. If your server sends a resource pack, the time spent loading it counts toward this period.
- Teleports cancelled by other plugins.

## Returning to another server

When nothing has been recorded on the current server yet, `/back` looks at where the player last left a server. If that was a different server and the player switched from it within `server-switch-window-seconds`, `/back` sends them back to that spot through the proxy. Logging out and joining again later is not a switch, so `/back` then reports that there is nowhere to go back to.

If the other server is offline, or the world of that location no longer exists, the player is told so and stays where they are.

## Countdown and cooldown

Returning yourself starts a 3-second countdown by default. Moving more than half a block, changing worlds, or taking damage during the countdown cancels the teleport. Sending another player back happens immediately. Naming yourself still uses your own countdown and cooldown.

Configure these settings under `back` in `features.yml`. See [Teleport settings](https://nanamoserver.github.io/sparrow-wiki/features/teleport.mdx) for countdown display, sounds, and permissions that shorten or skip the wait.

## When previous locations are lost

Previous locations are kept only while the player stays on the server. They are cleared when the player leaves that server, when the feature is disabled, and when the server restarts or crashes. If the previous server crashed before the player left it, `/back` cannot return there.

## Configuration

```yaml title="features.yml · back"
back:
  enabled: true
  record-death: true
  teleport-causes:
    - COMMAND
    - PLUGIN
  join-grace-seconds: 3
  server-switch-window-seconds: 30
  warmup-seconds: 3
  cooldown-seconds: 0
  cancel-on-move: true
  cancel-on-damage: true
```

| Setting | Meaning |
| - | - |
| `record-death` | Record the death location. |
| `teleport-causes` | Kinds of teleports that record the previous location. Common values: `COMMAND` (commands), `PLUGIN` (plugins), `NETHER_PORTAL`, `END_PORTAL`, `END_GATEWAY`, `ENDER_PEARL`, `SPECTATE`. Portals are not included by default. An unknown value keeps the feature from starting and is reported in the console. |
| `join-grace-seconds` | Teleports within this many seconds after connecting are not recorded. |
| `server-switch-window-seconds` | How recently the player must have left the previous server for `/back` to return there. |
| `warmup-seconds` | Seconds to wait before returning yourself; `0` teleports immediately. |
| `cooldown-seconds` | Seconds before you can use `/back` again, shared across servers; `0` disables the cooldown. |
| `cancel-on-move` | Cancel the countdown when you move more than half a block or change worlds. |
| `cancel-on-damage` | Cancel the countdown when you take damage. |

Apply changes with `/sparrow reload`.
