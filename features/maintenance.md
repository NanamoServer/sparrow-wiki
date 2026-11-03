# Maintenance

Source: <https://nanamoserver.github.io/sparrow-wiki/features/maintenance>

Module `maintenance` · Configuration `features/maintenance.yml`

Block ordinary players from joining during maintenance and show a BossBar to online players.

## Command and permission reference

| Command | Purpose | Default permission |
| - | - | - |
| `/maintenance [true\|false] [--all] [--tag <tag>]` | Change maintenance mode. | `sparrow.command.maintenance` |

### Additional permissions

| Permission | Purpose |
| - | - |
| `sparrow.bypass.maintenance` | Allow entry during maintenance. |

## Usage

```text
/maintenance true
/maintenance false --all
/maintenance true --tag survival
```

With no arguments, toggle maintenance on this server; use `true` or `false` to set it explicitly. `--all` targets online network servers; `--tag` selects servers by tag. `sparrow.bypass.maintenance` allows entry during maintenance.

`active` stores the maintenance state. `boss-bar.enabled` controls the bar; its color and style are configured under `boss-bar`.

## Configuration example

```yaml
# Show the maintenance bar to online players
boss-bar:
  enabled: true
```
