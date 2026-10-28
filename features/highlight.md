# Highlight

Source: <https://nanamoserver.github.io/sparrow-wiki/features/highlight>

Module `highlight` · Configuration `features/highlight.yml`

Show block outlines to selected viewers without changing real blocks. Omitting targets shows them to online players in that world.

| Command | Purpose | Default permission |
| - | - | - |
| `/highlight [targets] [options]` | Highlight a region's blocks. | `sparrow.command.highlight` |

```text
/highlight @s --from 0 64 0 --to 5 68 5 --highlight-color green --highlight-duration 20
```

Without coordinates, select two points interactively: left-click records your position; right-click records the clicked block. Run the command again without coordinates to cancel selection.

| Option | Purpose |
| - | - |
| `--from`, `--to` | Endpoints; provide both. |
| `--world <world>` | World; required from console. |
| `--highlight-duration <seconds>` / `-d` | Duration from 0 to 300 seconds. |
| `--highlight-color <color>` / `-c` | A named color, such as green or red. |
| `--solid-only` | Show solid blocks exposed to passable neighbors or the selection boundary. |
| `--silent` / `-s` | Hide command feedback. |

Defaults are 30 seconds of display, a 32768-block limit and a 30-second selection timeout. Peaceful worlds are not supported.
