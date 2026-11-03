# Waypoint API

Source: <https://nanamoserver.github.io/sparrow-wiki/api/waypoint>

A waypoint shows one local player a marker for a target. The **viewer** sees the marker, the **target** is the real location, and the **anchor** is where the marker is drawn. A distant target can have an anchor close to the viewer. Arrival checks and distance labels still use the real target.

## Starting and managing a session

Add Sparrow as a compile-time dependency and declare a runtime dependency on the plugin. The entry point is `net.momirealms.sparrow.service.waypoint.Waypoint`. Call `Waypoint.builder().target(target).track(viewer)` with a target and a Bukkit `Player` who has entered play on the local server. Set the label, style, distances and callbacks before calling `track`.

Each call to `track(viewer)` returns an independent `WaypointTracking`. Keep both handles when a player tracks a gate and a teammate. Calling `stop()` on the gate handle ends only the gate session. Repeated calls are safe. Disconnecting the viewer ends all their sessions.

## Choosing a target

| Factory or interface | Resolution |
| - | - |
| `WaypointTarget.ofPos(world, x, y, z)` | Tracks fixed coordinates by world name and XYZ. Use `ofPos(WorldLocation)` for an existing snapshot. |
| `WaypointTarget.ofPlayer(uuid)`, `ofPlayer(name)` | Follows a local player by UUID or exact name. Tracking can resume when they reconnect in the viewer's world. |
| `WaypointTarget.ofEntity(uuid)` | Follows a loaded entity. It becomes unavailable while unloaded and can be found again after loading. |
| `WaypointTarget.resolve(viewer)` | A custom target returns a `WorldLocation` for this viewer on each refresh, or `null` while unavailable. Resolution runs on the asynchronous refresh thread. Avoid blocking on external data. |

## Distances and visibility

| Method | Default | Meaning |
| - | - | - |
| `followDistance(blocks)` | 60 blocks | Maximum distance from the viewer's eyes to the projected anchor. Accepts a finite positive value. For nearby targets the anchor can coincide with the target. |
| `hideWithin(blocks)` | 0 | Hides the whole marker when the distance from the viewer's feet to the real target is at or below this radius. Leaving restores it. Accepts a finite non-negative value. Zero disables radius hiding and arrival/leave callbacks. |
| `moveTolerance(blocks)` | 0.05 blocks | Updates an element's position once its displacement from the last sent position exceeds this value. Accepts a finite non-negative value. Zero updates on each position change. Text content can update independently. |

## State callbacks and stopping

All four callbacks receive `(viewer, tracking)` on the asynchronous refresh thread. The session stays active when the target is lost or the viewer enters the hide radius. Call `tracking.stop()` inside a callback when that transition should end the session.

| Callback | When it fires |
| - | - |
| `onTrack` | A target is first found in the same world or reacquired after loss. If first found inside the hide radius, this runs before `onArrival`. |
| `onArrival` | The viewer enters the radius and the marker has been hidden. Staying inside produces only one notification. |
| `onLeave` | The viewer leaves the radius while the target is still available. Display resumes after the callback returns. |
| `onLoss` | A previously tracked target becomes unavailable or the viewer leaves its world. An initial lookup that finds nothing does not trigger it. |

## Built-in styles

Set the style with `Waypoint.builder().style(style)`. The default shows a ◆ marker and distance. Set the name separately with `label(Component)` on the tracking builder. Tracks can share a style while displaying different names.

| Option on `WaypointStyle.builder()` | Usage |
| - | - |
| `marker(marker)` | Choose `WaypointMarker.text(Component)`, `block(Material)` or `item(org.bukkit.inventory.ItemStack)`. Use the marker returned by `marker.scale(float)` to resize it independently of the label and beam. |
| `beam(beam)` | Adds an optional two-layer beam. Configure materials and dimensions on `WaypointBeam.builder()` with `outer(material, width)`, `inner(material, width)` and `height(blocks)`. |
| `distanceFormatter(formatter)`, `hideDistance()` | The default shows whole metres below 1000 blocks and kilometres to one decimal place thereafter. A formatter receives the unrounded distance and returns a component in your chosen font or style. Hiding the distance line keeps the name visible. |

## Custom elements and layout

Use `WaypointStyle.custom(layout)` to choose the elements and their arrangement. The service calls `WaypointLayout.render(view, elements)` on every visible refresh, even when the target is stationary. Declare the whole layout each time. Reuse the same key across frames for each element. Omitting a key removes its element. Use the elements and their container only within the current callback.

`WaypointView` supplies the `viewer()`, real `target()`, projected `anchor()` and optional `label()`. Use `distance()` for the distance from the viewer's feet to the target and `anchorDistance()` for the distance from their eyes to the anchor. The suggested text multiplier `readableScale()` is 1 within 8 blocks and the anchor distance divided by 8 beyond that.

| Layout operation | Usage |
| - | - |
| Declare elements | `elements.text(key, component)` displays text. `item(key, stack)` takes a snapshot of an NMS `ItemStack`. `block(key, state)` accepts an NMS `BlockState`, including a specific custom block state. |
| Position and transform | `position(x, y, z)` offsets an element from its anchor or parent socket in world axes, in blocks. `translate(x, y, z)` offsets it in display space. Set the centre for `scale(...)` and `rotate(...)` with `pivot(...)`. |
| Orientation and text | `billboard(...)` sets orientation. Text defaults to `CENTER`; items and blocks default to `FIXED`. Text supports `alignment(...)`, `lineWidth(pixels)`, `shadow(boolean)` and `seeThrough(boolean)`. |
| Attach elements | Declare a model-local point with `socket(name, x, y, z)` on the parent. Call `attachTo(parentKey, name)` on the child to align it with that point while retaining its own scale. Attachments must be acyclic. If the parent turns with the camera, use the same billboard on the child. `visible(false)` hides the subtree. |

### Dynamic text and throttling

`label(Component)` takes a prebuilt name. Use a custom layout for a live health reading or placeholder. Keep the sample time, last displayed value and text component per track. Read the data when the sampling interval expires and rebuild the component when its displayed value changes. Continue declaring the element every frame so it follows the target between samples. For a `<papi:...>` label, resolve MiniMessage with the intended player when the sample is due and reuse the result until the next sample. The placeholder value becomes known only after resolution.

## Complete examples

### Example 1 · Mark the north gate

Replace `world` and the coordinates with the location of your gate. The default style shows a marker, the gate name and its distance. The marker hides within five blocks and returns when the viewer walks away.

```java
public final class NorthGate {
    public static WaypointTracking show(Player viewer) {
        return Waypoint.builder()
                .target(WaypointTarget.ofPos("world", 120.5, 70, -31.5))
                .label(Component.text("North Gate"))
                .hideWithin(5)
                .track(viewer);
    }
}
```

### Example 2 · Follow a teammate with a throttled health label

The marker follows the teammate on every visible refresh. Health is sampled at most once every 500 ms, and a new text component is built only when the displayed whole number changes. Each call to `show` creates its own layout, so two tracks never share a health reading.

```java
public final class TeammateWaypoint {
    public static WaypointTracking show(Player viewer, Player teammate) {
        UUID id = teammate.getUniqueId();
        return Waypoint.builder()
                .target(WaypointTarget.ofPlayer(id))
                .style(WaypointStyle.custom(new HealthLayout(id)))
                .track(viewer);
    }

    private static final class HealthLayout implements WaypointLayout {
        private static final long INTERVAL = TimeUnit.MILLISECONDS.toNanos(500);

        private final UUID teammateId;
        private long lastRead;
        private int displayedHealth;
        private Component healthText;

        private HealthLayout(UUID teammateId) {
            this.teammateId = teammateId;
        }

        @Override
        public void render(WaypointView view, WaypointElements elements) {
            long now = System.nanoTime();
            if (this.healthText == null || now - this.lastRead >= INTERVAL) {
                Player teammate = Bukkit.getPlayer(this.teammateId);
                if (teammate == null) return;
                this.lastRead = now;

                int health = (int) Math.ceil(teammate.getHealth());
                if (this.healthText == null || health != this.displayedHealth) {
                    this.displayedHealth = health;
                    this.healthText = Component.text("Teammate · " + health + " HP");
                }
            }

            elements.text("health", this.healthText)
                    .seeThrough(true)
                    .scale(view.readableScale());
        }
    }
}
```
