# Teleport requests

Source: <https://nanamoserver.github.io/sparrow-wiki/features/tpa>

A player asks another online player for a teleport, and nothing happens until the other player agrees. The two players can be on different backends: requests, answers, and the teleport itself all cross servers.

## Commands and permissions

| Command | Purpose | Default permission |
| - | - | - |
| `/tpa <player>` | Ask to teleport to the other player. | `sparrow.command.tpa` |
| `/tpa-here <player>` | Ask the other player to teleport to you. | `sparrow.command.tpa-here` |
| `/tpa-accept [player]` | Accept a request you received; without a player, the most recent one. | `sparrow.command.tpa-accept` |
| `/tpa-deny [player]` | Deny a request you received; without a player, the most recent one. | `sparrow.command.tpa-deny` |
| `/tpa-cancel [player]` | Cancel your request to a player; without a player, every request you sent. | `sparrow.command.tpa-cancel` |

These commands are for players only and also accept `/sparrow <command>`. Aliases: `/tpahere`, `/tpaccept`, `/tpdeny`, and `/tpacancel`.

## How a request is handled

The target must be online somewhere on the network. The player who receives a request sees a message with **\[Accept]** and **\[Deny]** buttons. Clicking a button runs the matching command.

A player can have requests out to several people at once, but cannot send a second request to the same person until the first one is answered, cancelled, or expired. Requests are valid for 60 seconds by default, and both players are told when one expires.

After a request is accepted, the player being moved goes through the cooldown and countdown of the teleport group, then lands where the other player is standing at that moment:

- `/tpa` moves the player who sent the request.
- `/tpa-here` moves the player who accepted it.

The destination server is decided when the request is accepted. If the other player changes servers or logs out during the countdown, the teleport is cancelled and the player being moved is told.

Player name completion for `/tpa-accept`, `/tpa-deny`, and `/tpa-cancel` works on Paper and its forks. On Spigot, type the name by hand.

## Cooldowns

There are two cooldowns, and both only limit sending requests:

| Cooldown | Default | Details |
| - | - | - |
| Request cooldown | 10 seconds | The gap between two requests. `/tpa` and `/tpa-here` share it, and it applies across backends. A request that was not sent does not count. |
| Deny cooldown | 120 seconds | After a player denies you, you cannot send that player another request for this long. A request that expires or that you cancel does not start it. |

Players with `sparrow.bypass.tpa-cooldown` skip both cooldowns.

## Configuration

```yaml title="features.yml · tpa"
tpa:
  enabled: true
  expire-seconds: 60
  request-cooldown-seconds: 10
  deny-cooldown-seconds: 120
  teleport-group: default
```

| Option | Details |
| - | - |
| `expire-seconds` | Seconds before an unanswered request expires. Must be at least 1. |
| `request-cooldown-seconds` | Length of the request cooldown. Set `0` to turn it off. |
| `deny-cooldown-seconds` | Length of the deny cooldown. Set `0` to turn it off. |
| `teleport-group` | Teleport group used after a request is accepted. Both directions share it. |

With the default group, the player being moved waits 3 seconds. Moving more than half a block, changing worlds, or taking damage cancels the countdown. Cooldowns, countdowns, world restrictions, and sounds are configured in groups in `teleport.yml`. See [Teleport groups](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx).

Apply configuration changes with `/sparrow reload`. Keep the `tpa` settings the same on every backend. Disabling the feature hides its commands.

> **Note**
>
> The server a request was sent from is responsible for expiring it. If that server stops or restarts before the request expires, the request still becomes invalid, but neither player gets an expiry message.
