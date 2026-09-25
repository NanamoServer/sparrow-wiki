# Quick Shulker

Source: <https://nanamoserver.github.io/sparrow-wiki/features/quick-shulker>

Access a shulker box without placing it. By default, hold the box, **sneak, and right-click the air**.

## Usage

Both hands are supported. If both hold shulker boxes, the main hand takes priority. Right-clicking a block does not trigger quick access.

There is no dedicated open command or separate usage permission. The feature switch, sneaking requirement, and world restrictions determine availability.

## Configuration

```yaml title="features.yml · quick-shulker"
quick-shulker:
  enabled: true
  require-sneaking: true
  allow-offhand: true
  title: '<arg:hover_name>'
  disabled-worlds: []
```

| Setting | Meaning |
| - | - |
| `enabled` | Enable the feature. |
| `require-sneaking` | Require sneaking; `false` allows a normal right-click in the air. |
| `allow-offhand` | Allow the off-hand box. |
| `title` | Menu title; `<arg:hover_name>` inserts the held box's item name. |
| `disabled-worlds` | World names where access is disabled; empty allows all worlds. |

For example, `disabled-worlds: [minigame]` disables quick access in `minigame`.
