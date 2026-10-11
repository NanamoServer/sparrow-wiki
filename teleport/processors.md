# Built-in processors

Source: <https://nanamoserver.github.io/sparrow-wiki/teleport/processors>

This page lists every processor that ships with Sparrow and its options, as a reference while editing `teleport.yml`. See [Teleport groups](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx) for what groups and stages mean.

## At a glance

| `processor-type` | Stages it can be written in | What it does |
| - | - | - |
| [`cooldown`](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#cooldown) | `pre-processor` | Rejects the teleport while the cooldown is running, and starts the cooldown after a successful teleport. |
| [`warmup`](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#warmup) | `pre-processor` | Makes the player wait in place before leaving. |
| [`world-blacklist`](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#world-blacklist) | `target-processor` | Rejects teleports into the listed worlds. |
| [`sound`](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#sound) | `pre-processor`, `post-processor` | Plays a sound to the player. |

A processor written in a stage it does not support is ignored, with a warning in the console.

Every entry starts with `processor-type`, followed by that processor's own options. An option left out uses the default shown in the tables below.

## cooldown

Rejects the teleport while the cooldown is running and tells the player how many seconds remain. The cooldown starts after a successful teleport and carries across servers.

```yaml
- processor-type: cooldown
  id: teleport
  seconds: 30
  bypass-permission: sparrow.bypass.teleport-cooldown
```

| Option | Default | Meaning |
| - | - | - |
| `id` | None, required | Cooldown ID. Teleports with the same ID share one cooldown. The entry is ignored when it is missing. |
| `seconds` | `0` | Cooldown in seconds. `0` means no limit. |
| `bypass-permission` | `sparrow.bypass.teleport-cooldown` | Players with this permission are not held by the cooldown. Leave it empty (`''`) to let nobody bypass. |

## warmup

Makes the player wait in place and shows a countdown before leaving. The teleport continues when the countdown ends.

```yaml
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
```

| Option | Default | Meaning |
| - | - | - |
| `seconds` | `3` | Seconds to wait. `0` teleports at once. If the player has `sparrow.teleport-warmup.<seconds>`, the lowest of those values and this one is used. |
| `bypass-permission` | `sparrow.bypass.teleport-warmup` | Players with this permission leave at once. Leave it empty (`''`) to let nobody skip. |
| `cancel-on-move` | `true` | Whether moving more than half a block from where the countdown started, or changing worlds, cancels the teleport. |
| `cancel-on-damage` | `true` | Whether taking damage cancels the teleport. |
| `display` | `ACTION_BAR` | Where the countdown is shown: `ACTION_BAR` above the hotbar, `TITLE` in the center of the screen, `BOSS_BAR` as a bar at the top, `CHAT` in chat, `NONE` hides it. |
| `boss-bar-color` | `YELLOW` | Color of the top bar: `PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, or `WHITE`. Only used when `display` is `BOSS_BAR`. |
| `boss-bar-overlay` | `PROGRESS` | Style of the top bar: `PROGRESS` for a continuous bar, or `NOTCHED_6`, `NOTCHED_10`, `NOTCHED_12`, `NOTCHED_20` for that many segments. |
| `warmup-sound` | `block.note_block.banjo` | [Sound](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#sound-format) played every second of the countdown. |
| `cancel-sound` | `entity.item.break` | [Sound](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#sound-format) played when movement or damage cancels the countdown. |

Starting another countdown for the same player replaces the previous one, and leaving the server cancels it. `NONE` hides the countdown text only. Sounds still play.

## world-blacklist

Rejects the teleport when the landing spot is in a listed world. The player stays where they are and sees a message.

```yaml
- processor-type: world-blacklist
  worlds:
    - world_nether
    - dungeon
  bypass-permission: sparrow.bypass.teleport-world-blacklist
```

| Option | Default | Meaning |
| - | - | - |
| `worlds` | `[]` | Names of the worlds that players cannot teleport into. |
| `bypass-permission` | `sparrow.bypass.teleport-world-blacklist` | Players with this permission may enter anyway. Leave it empty (`''`) to let nobody in. |

The server the landing spot is on runs this processor, so the list belongs in that server's `teleport.yml`.

During a cross-server teleport the player has not joined the destination server yet. Checking `bypass-permission` at that point requires LuckPerms on the destination server, and the permissions set in LuckPerms apply. Without LuckPerms, a cross-server teleport into a blacklisted world ends with a timeout message after a few seconds. Same-server teleports, or an empty `bypass-permission`, are not affected.

## sound

Plays a sound to the player being teleported.

```yaml
- processor-type: sound
  sound: entity.enderman.teleport
```

| Option | Default | Meaning |
| - | - | - |
| `sound` | `entity.enderman.teleport` | The [sound](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.md#sound-format) to play. |

In `post-processor` it plays after the player arrives, including after a cross-server teleport. In `pre-processor` it plays when its turn comes: placed after `warmup`, that is the moment of leaving, and placed first, that is the moment the command is entered.

## Writing a sound {#sound-format}

Every option that takes a sound accepts two forms. With only a name, volume and pitch are both `1.0`:

```yaml
sound: entity.enderman.teleport
```

To change the volume, pitch, or sound category, write a section:

```yaml
sound:
  key: entity.enderman.teleport
  volume: 0.8
  pitch: 1.2
  source: MASTER
```

| Key | Default | Meaning |
| - | - | - |
| `key` | Required | Sound name, such as `entity.enderman.teleport`. A namespace may be included. |
| `volume` | `1.0` | Volume. |
| `pitch` | `1.0` | Pitch. |
| `source` | `MASTER` | Sound category, matching the sliders in the client's sound settings: `MASTER`, `MUSIC`, `RECORD`, `WEATHER`, `BLOCK`, `HOSTILE`, `NEUTRAL`, `PLAYER`, `AMBIENT`, `VOICE`, `UI`. |

To turn a sound off, leave it empty (`''`). When Sparrow first creates `teleport.yml`, it writes the default sounds in the section form. Both forms behave the same.
