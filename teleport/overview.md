# Teleport groups

Source: <https://nanamoserver.github.io/sparrow-wiki/teleport/overview>

Cooldowns, countdowns, world restrictions, and sounds for [`/warp`](https://nanamoserver.github.io/sparrow-wiki/features/warp.mdx), [`/home`](https://nanamoserver.github.io/sparrow-wiki/features/home.mdx), [`/back` and `/death-back`](https://nanamoserver.github.io/sparrow-wiki/features/back.mdx), [`/bed`](https://nanamoserver.github.io/sparrow-wiki/features/bed.mdx), [`/spawn`](https://nanamoserver.github.io/sparrow-wiki/features/spawn.mdx), and [teleport requests](https://nanamoserver.github.io/sparrow-wiki/features/tpa.mdx) are configured in `teleport.yml`. The file is made of groups, and each feature picks its group with `teleport-group` in `features.yml`.

See [Built-in processors](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.mdx) for every option of each processor.

## The stages of a teleport

A group splits a teleport into three stages. Each stage is a list of processors that run from top to bottom.

| Stage | When it runs | Which server runs it | What it can do |
| - | - | - | - |
| `pre-processor` | Before departure | The server the player is on | Allow or reject the teleport, such as cooldowns and countdowns. |
| `target-processor` | When the landing spot is settled | The server the landing spot is on | Allow or reject the teleport, such as the world blacklist. |
| `post-processor` | After the player arrives | The server the landing spot is on | Effects on arrival, such as a sound. |

If any processor in the first two stages rejects the teleport, it stops there. The player stays where they are and sees the reason.

For a cross-server teleport, the departure stage uses the `teleport.yml` of the server the player leaves, and the other two stages use the `teleport.yml` of the destination server. Keep this in mind when the files differ between servers.

## The default group

`teleport.yml` is created on first start, and its `default` group is equivalent to the following. Every feature that does not name another group uses it.

```yaml title="teleport.yml"
default:
  pre-processor:
    - processor-type: cooldown
      id: teleport
      seconds: 0
      bypass-permission: sparrow.bypass.teleport-cooldown
    - processor-type: warmup
      seconds: 3
      bypass-permission: sparrow.bypass.teleport-warmup
      cancel-on-move: true
      cancel-on-damage: true
      display: ACTION_BAR
      boss-bar-color: YELLOW
      boss-bar-overlay: PROGRESS
      warmup-sound: block.note_block.banjo
      cancel-sound: entity.item.break
  target-processor:
    - processor-type: world-blacklist
      worlds: []
      bypass-permission: sparrow.bypass.teleport-world-blacklist
  post-processor:
    - processor-type: sound
      sound: entity.enderman.teleport

groups: {}
```

By default there is no cooldown, the player waits 3 seconds in place before leaving, movement or damage cancels the wait, no world is blocked, and the enderman teleport sound plays on arrival.

A group only runs the processors written in its lists:

- Remove an entry to turn that processor off.
- Reorder entries to change what runs first. For example, a `sound` placed after `warmup` plays at the moment of leaving.
- An option left out of an entry uses that processor's default.

Apply changes with `/sparrow reload`.

## Picking a group for a feature

Set `teleport-group` under the feature in `features.yml`. Leave it empty or use `default` for the default group.

```yaml title="features.yml"
home:
  teleport-group: default
warp:
  teleport-group: warp
```

`/back` and `/death-back` share `back.teleport-group`. If the name does not match any group, the plugin reports an error on startup or reload and names the missing group in the console.

## Custom groups

Add groups under `groups`, written the same way as `default`. A stage left out of a group runs nothing. It does not fall back to what `default` contains.

This example gives `/warp` its own 60-second cooldown and a 5-second countdown, and adds a group that teleports at once and keeps only the arrival sound:

```yaml title="teleport.yml"
groups:
  warp:
    pre-processor:
      - processor-type: cooldown
        id: warp
        seconds: 60
      - processor-type: warmup
        seconds: 5
    post-processor:
      - processor-type: sound
  instant:
    post-processor:
      - processor-type: sound
```

## Shared and separate cooldowns

Cooldowns are tracked by the `id` of the `cooldown` processor. Teleports with the same `id` share one cooldown, and it carries across servers.

The default group uses the `id` `teleport`, so every command on the default group shares one cooldown. With a 30-second cooldown on the default group, a player who just used `/home` cannot use `/warp` for 30 seconds either. To count a command separately, give it a group with a different `id`, as in the example above.

A cooldown starts only after a successful teleport. A rejected teleport or a cancelled countdown does not start one.

## Teleporting other players

Sending another player with commands such as `/warp <name> <player>` or `/back <player>` happens at once. It skips the cooldown, the countdown, and the world blacklist, and does not start a cooldown. The arrival sound still plays.

Naming yourself as the target still counts as teleporting yourself. `/home <player>.<name>` takes you to someone else's home, so it also counts as teleporting yourself. `/tp-offline` does not use any group and teleports at once.

## Permissions

| Permission | Effect |
| - | - |
| `sparrow.teleport-warmup.<seconds>` | Shorten the countdown. Sparrow uses the lowest value among these permissions and the group setting. |
| `sparrow.bypass.teleport-warmup` | Skip the countdown. |
| `sparrow.bypass.teleport-cooldown` | Not held by the cooldown. |
| `sparrow.bypass.teleport-world-blacklist` | May teleport into blacklisted worlds. |

The last three are the default values of each processor's `bypass-permission`. You can change them per group, so different groups can use different bypass permissions. Leave it empty to let nobody bypass.

For example, if the group's countdown is 3 seconds and a player has `sparrow.teleport-warmup.1`, they wait 1 second. A value above the group setting does not extend the wait.

## When an entry is wrong

If an entry is written wrong, such as an unknown type, a processor placed in the wrong stage, or an invalid option value, that entry is ignored. The other entries still apply, and the console prints a warning with the reason.

When a player runs `/sparrow reload` and some entries were ignored, they also see "The configuration has N error(s). Check the console log".

## Processors from other plugins

Other plugins can register their own processors with Sparrow. They are used the same way as the built-in ones. Set `processor-type` to the type that plugin gives, in the form `plugin:type`, and follow that plugin's documentation for its options. If the plugin is not installed, the entry is ignored as an unknown type.

## Upgrading from the old configuration

Earlier versions kept these settings under each feature's `teleport` section in `features.yml`. After upgrading, move the values into a group in `teleport.yml` and set `teleport-group` under the feature. The old `teleport` sections in `features.yml` no longer apply and can be removed.

All servers that teleport across servers with Sparrow must be upgraded to the same version together. Cross-server teleports fail while old and new versions are mixed.
