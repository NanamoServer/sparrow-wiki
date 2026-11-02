# Highlight API

Source: <https://nanamoserver.github.io/sparrow-wiki/api/highlight>

Use `net.momirealms.sparrow.service.highlight.Highlight` to show block outlines to local players. The service starts with Sparrow and remains available when the [command](https://nanamoserver.github.io/sparrow-wiki/features/highlight.mdx) is disabled.

## Show a selection

```java
HighlightSubmission preview = Highlight.builder()
        .region(first, second, RegionMode.NON_AIR)
        .color(NamedTextColor.AQUA)
        .onLeave(player -> menu.closeFor(player))
        .onEnd(menu::release)
        .commit(viewers);
```

Here `menu` is the caller's shared preview UI. Omit the callbacks if you only need the outline. Commit each builder once, to one `Player` or a collection. Green is the default color. The outline lasts until removed or until the session ends. Use `.duration(Duration.ofSeconds(10))` to expire ten seconds after display, or `preview.remove()` to cancel at any time, including during preparation. Repeated removal is safe.

| Target | Positions displayed |
| - | - |
| `block(block)` | One block position. |
| `blocks(blocks)` | Distinct positions in one world, including disconnected groups. |
| `region(first, second)` or `OUTLINE` | The six faces of the inclusive cuboid. |
| `region(first, second, RegionMode.NON_AIR)` | Every non-air block, including fluids and enclosed blocks. |
| `region(first, second, RegionMode.EXPOSED_SOLID)` | Non-passable blocks on the boundary or next to a passable block on any of six sides. |

Selecting another target replaces the previous selection. The limit is 32768 distinct positions for a block collection, or 32768 blocks of total cuboid volume before filtering. The service samples the region once at submission. Peaceful worlds are unsupported.

## Results and lifecycle

`preview.result()` completes after initial processing. `Displayed` contains UUID sets for viewers whose display packets were submitted and viewers who were unavailable. `Rejected` reports an invalid world, Peaceful difficulty, out-of-bounds height, excessive size or an empty target. `Cancelled` means the session was removed before display. Packet preparation or sending failures complete the stage exceptionally.

- `onLeave(Player)` runs once for a viewer who had a visible outline and changes world, respawns or disconnects. Other viewers keep their outline. Returning to the world requires a new submission.
- `onEnd(Runnable)` runs once when the entire session releases its resources, including rejection, no viewers, removal, expiry and Sparrow shutdown. If the last viewer leaves, their leave callback runs first. Expiry and explicit removal trigger only the end callback.
- Both callbacks run outside the session lock, in session order. The executing thread depends on the trigger. An immediately rejected submission can call `onEnd` before `commit` returns.
