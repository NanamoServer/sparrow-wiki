# Random teleport

Source: <https://nanamoserver.github.io/sparrow-wiki/features/rtp>

Module `rtp` · Configuration `features/rtp.yml`

Find a safe location within a region, including on another backend. The traveler must be on this server.

| Command | Purpose | Default permission |
| - | - | - |
| `/rtp <player> <region> [--silent]` | Teleport randomly within a configured region. | `sparrow.command.rtp[.other]` |
| `/rtp_range <player> <server> <world> <min-radius> <max-radius> [options]` | Teleport randomly within a specified square range. | `sparrow.command.rtp_range[.other]` |

```yaml
regions:
  wild:
    server: survival
    permission: sparrow.rtp.wild
    area:
      world:
        - x: [-5000, 5000]
          z: [-5000, 5000]
```

```text
/rtp Steve wild
/rtp_range Steve survival world 500 5000 --center-x 0 --center-z 0
```

Omit `server` to use this server; omit `permission` for unrestricted region access. A region can contain multiple worlds and rectangles. Add `y: [60, 120]` to a rectangle to limit feet height.

`rtp_range` uses a square ring, or a full square when the minimum radius is `0`. The center defaults to `(0, 0)`; provide `--min-y` and `--max-y` together. Both commands share the RTP cooldown and accept `--silent` / `-s`.

See [Teleport options](https://nanamoserver.github.io/sparrow-wiki/teleport/overview.mdx) for cooldowns and warmups, and [Landing rules](https://nanamoserver.github.io/sparrow-wiki/teleport/processors.mdx) for destination selection.
