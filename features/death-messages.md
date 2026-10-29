# Death messages

Source: <https://nanamoserver.github.io/sparrow-wiki/features/death-messages>

Module `death_messages` · Configuration `features/death_messages.yml`

Customize player death announcements with complete sentences for each vanilla death situation. Messages support MiniMessage, player hover text and the weapon details supplied by Minecraft. Announcements can stay on the current server or be broadcast across the network.

Minecraft's death attribution is preserved, including deaths while escaping an attacker and assisted falls. The death screen keeps its existing message. When death announcements are already hidden by the server or another plugin, Sparrow leaves them hidden.

## Enable and reload

The module is enabled by default. Its persistent switch is in `modules.yml`:

```yaml
death_messages: true
```

| Command | Purpose | Default permission |
| - | - | - |
| `/spr feature_enable death_messages` | Enable rewriting on this server immediately. | `sparrow.command.admin.feature` |
| `/spr feature_disable death_messages` | Stop rewriting on this server immediately. | `sparrow.command.admin.feature` |
| `/spr reload` | Apply configuration changes. | `sparrow.command.admin.reload` |

The enable and disable commands change the current state without saving the switch. Edit `modules.yml` to keep the choice after a reload or restart. If the DeathMessages configuration is invalid, reloading fails for this module and its last valid settings remain active.

There are no feature-specific commands or permissions. Disabling this module stops rewriting deaths that happen on this server; players may still receive cross-server announcements from other servers. See [Commands and permissions](https://nanamoserver.github.io/sparrow-wiki/commands.mdx) for module management.

## Configuration example

The generated file contains 101 default rules. The example below shows only a few rules and customized display text; edit the generated file to keep the other death situations covered.

```yaml
broadcast: false
disabled_worlds: []

anti-spam:
  enabled: true
  interval: 30s
  max-messages: 3
  show-to-victim: true

format: '<dark_gray>☠ <gray><arg:message>'

display:
  player:
    name: '<white><arg:display_name>'
    hover:
      - '<gray>Player: <white><arg:name>'
      - '<gray>Server: <white><arg:server>'
  mob:
    name: '<yellow><arg:entity_name>'

fallback:
  - '<arg:original>'

rules:
  - id: player_with_weapon
    message_key: death.attack.player.item
    broadcast: true
    messages:
      - '<arg:attacker> killed <arg:victim> using <arg:weapon>'
      - '<arg:victim> was defeated by <arg:attacker> using <arg:weapon>'

  - id: lava_escape
    message_key: death.attack.lava.player
    messages:
      - '<arg:victim> jumped into lava while escaping <arg:attacker>'

  - id: ladder_fall
    message_key: death.fell.accident.ladder
    messages:
      - '<arg:victim> fell off a ladder'
```

## Rules and fallback

| Field | Meaning |
| - | - |
| `id` | A nonempty, unique name for the rule. |
| `message_key` | The exact vanilla death-message key, including capitalization and any suffix. |
| `broadcast` | Optional override for the public broadcast setting. |
| `disabled_worlds` | Optional replacement for the public disabled-world list. |
| `messages` | Required list of complete sentences. One entry is selected randomly for each death. |

If several rules have the same `message_key`, the first one wins. Keys are matched exactly: a rule for `death.attack.player` does not also match `death.attack.player.item`.

All recipients share the same randomly selected sentence. Each sentence can place the victim, attacker and weapon wherever you want.

- `messages: []` hides that death situation, including the outer `format`.
- A selected empty string also hides the announcement.
- A rule that hides an announcement does not continue to another rule or use `fallback`.
- Unmatched keys use a random entry from `fallback`, together with the public `broadcast` and `disabled_worlds` settings.
- The default fallback, `<arg:original>`, keeps the vanilla death message inside your outer format. Set `fallback: []` to hide unmatched situations.

Some useful vanilla keys are:

| `message_key` | Situation |
| - | - |
| `death.attack.player` | Killed by a player. |
| `death.attack.player.item` | Killed by a player, with weapon details supplied by Minecraft. |
| `death.attack.mob` | Killed by a mob. |
| `death.attack.arrow.item` | Shot, with weapon details supplied by Minecraft. |
| `death.attack.lava` | Died in lava. |
| `death.attack.lava.player` | Died in lava while escaping an attacker. |
| `death.fell.accident.ladder` | Fell off a ladder. |
| `death.fell.assist.item` | An attacker caused a fatal fall, with weapon details. |
| `death.fell.finish` | Fell and was finished off by an attacker. |
| `death.attack.badRespawnPoint.message` | A bed or respawn-anchor explosion, with the vanilla death-reason link. |

The `.player` suffix is part of Minecraft's key naming; the attributed attacker can also be a mob. Use the generated rules as the reference for the remaining keys.

## Broadcast and world overrides

| Public setting | Default | Meaning |
| - | - | - |
| `broadcast` | `false` | `false` announces locally; `true` announces across the Sparrow network. |
| `disabled_worlds` | `[]` | Hide deaths occurring in these worlds. Names are matched exactly on the server where the death occurs. |

A rule inherits either setting when it omits that field. An explicit value replaces the public value:

- `broadcast: false` overrides a public `broadcast: true`; `false` still announces locally.
- `disabled_worlds: []` clears the disabled-world restriction for that rule.
- A nonempty rule list replaces the public world list completely; the lists are not merged.

For example, this configuration normally broadcasts across the network and hides deaths in `lobby`. The weapon rule announces locally and also permits announcements for deaths in `lobby`:

```yaml
broadcast: true
disabled_worlds: [lobby]

rules:
  - id: local_weapon_kill
    message_key: death.attack.player.item
    broadcast: false
    disabled_worlds: []
    messages:
      - '<arg:victim> was killed by <arg:attacker> using <arg:weapon>'
```

These choices come from the server where the death occurs. A disabled world hides that announcement for everyone, including players on other servers; it does not filter recipients by their current world. Receiving servers use the selected announcement and do not choose another rule or sentence.

For cross-server announcements, use Sparrow versions that support this feature on the receiving backends and configure the network as described in the [Introduction](https://nanamoserver.github.io/sparrow-wiki/intro.mdx). Player and weapon hover details are retained across servers.

## Names, hover text and placeholders

| Setting | Purpose |
| - | - |
| `format` | Outer chat format. `<arg:message>` inserts the selected sentence. |
| `display.player.name` | Display format shared by the victim and player attackers. |
| `display.player.hover` | Lines shown when hovering over a displayed player. `[]` adds no custom hover text. |
| `display.mob.name` | Mob name display. `<arg:entity_name>` preserves custom names and vanilla translated names. |

Use these arguments in rule messages, fallback text and the outer format:

| Argument | Value |
| - | - |
| `<arg:victim>` | The victim, with the configured player display. |
| `<arg:attacker>` | The attacker attributed by Minecraft, with the configured player or mob display. Available only in applicable situations. |
| `<arg:weapon>` | The weapon name and item hover supplied by the vanilla message. Available only in applicable `.item` situations. |
| `<arg:death_reason>` | The special reason link for a bed or respawn-anchor explosion. |
| `<arg:original>` | The complete vanilla death message, with its original names and hover details. |
| `<arg:server>` | The ID of the server where the death occurred. |
| `<arg:world>` | The name of the world where the death occurred. |
| `<arg:x>`, `<arg:y>`, `<arg:z>` | Death location as block coordinates. |
| `<arg:message_key>` | The vanilla key selected for this death. |

`attacker`, `weapon` and `death_reason` are not available for every death. Use them in matching rules, or supply a default such as `<arg:weapon:'unknown weapon'>` in a shared template. Weapon availability follows Minecraft's death message; holding a weapon does not guarantee that the message supplies it. All default `.item` rules include `<arg:weapon>`.

Inside `display.player`, `<arg:name>` is that player's account name and `<arg:display_name>` is their display name. `<arg:server>` remains the server where the death occurred.

PlaceholderAPI is optional. With it installed, use `<papi:placeholder>` or `<papi:placeholder:default>`, rather than `%placeholder%`:

- In `display.player.name` and `display.player.hover`, PAPI refers to the displayed player: the victim for their name, or the player attacker for theirs.
- In `messages`, `fallback` and `format`, PAPI refers to each recipient. For example, `<papi:player_name>` shows the viewer's name, including on another server.
- Mob display text has no player-specific PAPI context.

## Anti-spam

| Setting | Default | Meaning |
| - | - | - |
| `anti-spam.enabled` | `true` | Limit repeated announcements from the same player. |
| `anti-spam.interval` | `30s` | Positive duration with units, such as `30s` or `1m`. |
| `anti-spam.max-messages` | `3` | Positive maximum number of normal announcements in that interval. |
| `anti-spam.show-to-victim` | `true` | Send excess announcements only to the victim. `false` hides them from everyone. |

With the defaults, the first three announcements from a player within the preceding 30 seconds are sent normally. Further deaths in that window are shown only to that player and are not broadcast across servers. Excess deaths still count, so continued deaths can keep the limit active until older deaths leave the window.

Deaths hidden by the server, another plugin, a disabled-world rule or an empty message do not count. `show-to-victim` does not override those hiding rules. Limits apply separately on each server and reset when the player leaves that server or the module is disabled.
