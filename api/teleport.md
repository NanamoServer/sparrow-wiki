# Teleport API

Source: <https://nanamoserver.github.io/sparrow-wiki/api/teleport>

## Getting Started

Add the current Sparrow build as a compile dependency and declare your plugin's dependency on Sparrow. Here, `player` is a local online `SparrowPlayer`, and `logger` is your plugin's logger.

```java
import java.util.logging.Level;
import net.momirealms.sparrow.teleport.Teleport;
import net.momirealms.sparrow.teleport.TeleportSubmission;
import net.momirealms.sparrow.teleport.processor.post.PlaySound;

TeleportSubmission submission = Teleport.builder()
        .server("lobby")
        .position("world", 0.5, 64, 0.5)
        .postProcessor(new PlaySound())
        .commit(player)
        .onResult(result -> result.ifFail(fail -> player.sendTranslatedMessage(fail.reason())))
        .onError(error -> logger.log(Level.SEVERE, "Teleport failed", error));
```

`server` takes a Sparrow server ID; the local ID uses a local teleport. Cross-server requests require configured Sparrow backends and proxy services. `commit` also accepts a Bukkit `Player`. Submit each builder once.

## Destinations and landing positions

| Expression | Purpose |
| - | - |
| `position(world, x, y, z[, yaw, pitch])` | Fixed coordinates. |
| `position(TeleportPosition.ofPos(worldLocation))` | A saved `WorldLocation`. |
| `position(TeleportPosition.ofPlayer(uuid))` | A player on the destination server; also accepts a player name. |
| `position(TeleportPosition.rtpBuilder()...build())` | A random search within areas. |

`server(...)` also accepts `Supplier<String>` and `CompletionStage<String>`. Player destinations capture coordinates during preparation; they do not keep tracking movement.

Fixed coordinates are used directly. Add `FindSafeLoc` for a safety check:

```java
FindSafeLoc safe = FindSafeLoc.builder()
        .search(SearchPattern.exact(),
                SearchPattern.nearby().horizontalRadius(4).up(8).down(8).build())
        .rules(PhysicalSafety.builder().build())
        .chunks(ChunkPolicy.EXISTING_ONLY)
        .maxChecks(10_000)
        .timeout(Duration.ofSeconds(3))
        .build();

Teleport.builder()
        .server("survival")
        .position("world", 100.5, 64, 100.5)
        .targetProcessor(safe)
        .postProcessor(new Invulnerability(5))
        .commit(player);
```

`SearchPattern` provides `exact()`, `nearby()` and `column()`, tried in order. `PhysicalSafety` checks collisions, support, boundaries and hazards; it rejects water, leaf support and Nether-roof locations by default. `EXISTING_ONLY` uses generated chunks; `ALLOW_GENERATION` permits generation.

For random teleportation, build a destination:

```java
TeleportPosition random = TeleportPosition.rtpBuilder()
        .areas(RtpArea.builder("world").rectangle(-5000, -5000, 5000, 5000).build())
        .nearbyColumns(2, 4, 4)
        .rules(PhysicalSafety.builder().build())
        .chunks(ChunkPolicy.ALLOW_GENERATION)
        .maxAttempts(32)
        .maxChecks(10_000)
        .timeout(Duration.ofSeconds(9))
        .build();

Teleport.builder().server("survival").position(random).commit(player);
```

`rectangle` takes `minX, minZ, maxX, maxZ`, optionally followed by `minY, maxY`. Multiple areas may use different worlds on the same destination server. Available scan modes are `AUTO`, `SURFACE`, `CAVITY_TOP_DOWN` and `CAVITY_BOTTOM_UP`. The example sets the search ranges and budgets explicitly.

`targetProcessor` checks or adjusts coordinates after destination resolution. A custom `PositionProcessor` returns `Accept`, `Reject` or `Relocate`. `postProcessor` runs actions in order after arrival; built-ins include `PlaySound` and `Invulnerability`.

## Waiting, results and cancellation

Attach a condition to prepare the destination while waiting for confirmation or a countdown:

```java
CompletableFuture<Void> confirmation = new CompletableFuture<>();
TeleportSubmission pending = Teleport.builder()
        .server("lobby")
        .position("world", 0.5, 64, 0.5)
        .condition(confirmation)
        .commit(player);
```

Call `confirmation.complete(null)` to confirm, or `pending.cancel()` to cancel. Execution waits for every condition to complete normally; a failed or cancelled condition produces `Aborted`. Only completion status matters: a `CompletableFuture<Boolean>` completed with `false` still passes.

| Entry point | Meaning |
| - | - |
| `onPrepared(...)` | Preparation succeeded; exposes the destination without pausing execution. |
| `onResult(...)` | `Success`, `Fail(reason)` or `Aborted(cause)`; use `ifSuccess`, `ifFail` and `ifAborted` to handle branches. |
| `onError(...)` | A program error. |
| `preparationResult()` / `result()` | Observation Futures for composition; do not complete or cancel them yourself. |
| `cancel()` | Cancels only before execution starts; returns `true` on cancellation and produces `Fail(TELEPORT_CANCELLED)`. |
| `commitForget(player)` | Ignore business results and log program errors. |

`Success` reports the completed move without waiting for all post-processors. Callbacks have no player-thread guarantee; schedule entity or world mutations as required by the platform.

## Extensions

`context(new TeleportContext())` carries NBT parameters and belongs to the request after submission. Setting `TeleportContext.UNSAFE` to `true` lets `FindSafeLoc` fall back to its input coordinates when the search fails. RTP does not use this fallback.

| Extension interface | Type registry |
| - | - |
| `TeleportPosition` | `TeleportPosition.TYPES` |
| `PositionProcessor` | `PositionProcessor.TYPES` |
| `PostProcessor` | `PostProcessor.TYPES` |
| `SafetyRule` | `SafetyRule.TYPES` |

Implement `type()` and `toNbt()`, then register a decoder with the corresponding registry's `register(type, decoder)`. Register on the sending server and every possible receiving server. Transfer configuration in NBT; obtain service objects locally.

Put restrictions in `SafetyRule` when a search should continue trying candidates. RTP's `testBeforeResolve` can check X/Z early and return `PASS`, `REJECT` or `DEFER`; `DEFER` calls `test` after resolving Y. A later target processor's rejection does not restart RTP, and relocated coordinates are not rechecked against earlier area restrictions.

`TeleportRequestEvent` and `TeleportReadyEvent` run on the destination server before resolution and after target processing; both are cancellable. `TeleportArriveEvent` exposes departure and arrival locations after a cross-server arrival.
