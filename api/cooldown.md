# Cooldown API

Source: <https://nanamoserver.github.io/sparrow-wiki/api/cooldown>

Use `Cooldown` when a player should wait before repeating an action, even after switching servers. Sparrow stores each cooldown in Redis by cooldown ID and player UUID. Servers that use the same Redis database share the timer, which expires automatically. You can also use the UUID of an offline player.

## Define a cooldown

Add the Sparrow build used on your server as a `compileOnly` dependency and declare Sparrow as a server dependency so it loads first. Use your plugin's own namespace and give each action a separate ID. `Cooldown.of(...)` only records the ID, so you can call it in a static field initializer.

```java
private static final Cooldown KIT_MENU = Cooldown.of(new SparrowKey("myplugin", "kit_menu"));
private static final Cooldown LOBBY_TELEPORT = Cooldown.of(new SparrowKey("myplugin", "lobby_teleport"));
```

## Check and start in one call

For a command that opens a kit menu at most once every 30 seconds, call `tryStart` before opening the menu. The check and write are atomic across servers. With a positive duration, `whenReady` runs after this call has started the cooldown. If the player already has a cooldown, `whenCooling` receives the time left and the original end time stays in effect.

```java
UUID playerId = player.getUniqueId();

KIT_MENU.tryStart(playerId, Duration.ofSeconds(30))
        .whenCooling(remaining ->
                player.sendMessage(Component.text("Try again in " + remaining.toSeconds() + " s.")))
        .whenReady(() -> player.getScheduler().run(plugin, task -> this.openKitMenu(player), null))
        .onError(error -> plugin.getLogger().log(Level.WARNING, "Could not check the kit menu cooldown", error));
```

Here `player` is a Bukkit `Player`, `plugin` is your plugin instance, and `openKitMenu` is your menu code. The scheduler runs the menu change on the player's owning thread.

## Start after the action succeeds

For a teleport that should only count on success, call `check` before submitting it and `start` when the [Teleport API](https://nanamoserver.github.io/sparrow-wiki/api/teleport.mdx) reports `TeleportResult.Success`. Use `check(...).future()` to compose the check, teleport, and cooldown write into a single future. Replace `lobby` and `world` with your server ID and destination world.

```java
UUID playerId = player.getUniqueId();

CompletableFuture<Duration> remainingTime = LOBBY_TELEPORT.check(playerId).future();
CompletableFuture<Void> teleportRequest = remainingTime
        .thenCompose(remaining -> {
            if (!remaining.isZero()) {
                long seconds = (remaining.toMillis() + 999) / 1000;
                player.sendMessage(Component.text("Try again in " + seconds + " s."));
                return CompletableFuture.completedFuture(null);
            }
            return Teleport.builder()
                    .server("lobby")
                    .position("world", 0.5, 64, 0.5)
                    .commit(player)
                    .result()
                    .thenCompose(result -> {
                        if (result instanceof TeleportResult.Success) {
                            return LOBBY_TELEPORT.start(playerId, Duration.ofMinutes(5));
                        }
                        return CompletableFuture.completedFuture(null);
                    });
        });
```

Handle exceptions from `teleportRequest` at your command or feature boundary. Concurrent requests can both pass `check` before either starts the cooldown. Use `tryStart` when only one request should proceed during a cooldown window.

## CooldownCheck callbacks and future

Both `check` and `tryStart` return a `CooldownCheck`. The outcome determines which callback runs.

| Method | When to use it |
| - | - |
| `whenReady(action)` | Continue when the player can proceed. For `check`, this means the player had no active cooldown at the time of the check. For `tryStart` with a positive duration, the cooldown has already started. |
| `whenCooling(action)` | Show the remaining time. The `Duration` is rounded up to whole seconds, so even a fraction of a second displays as at least one second. |
| `onError(action)` | Handle a failed check. The ready and cooling callbacks run only on a successful check. |
| `future()` | Compose the check with other asynchronous work or get the remaining time in milliseconds. `Duration.ZERO` corresponds to `whenReady`. The future is for observing the result. Leave completion and cancellation to Sparrow. |

For code that previously called `remaining(playerId)`, use `check(playerId).future()`.

Callbacks can run on the Redis thread. If the result is already ready, the callback runs immediately on the thread that registers it. Schedule player or world changes on the appropriate server thread. Sparrow logs exceptions thrown by callbacks, while `onError` handles failures of the check itself.

## Method reference

| Method | Behavior |
| - | - |
| `check(playerId)` | Returns a `CooldownCheck` for the current state without changing the cooldown. |
| `tryStart(playerId, duration)` | Checks and starts the cooldown in one operation and returns a `CooldownCheck`. With `Duration.ZERO`, the result is immediately ready without a Redis request, even if a cooldown already exists. |
| `start(playerId, duration)` | Sets a new cooldown from the time of the write, replacing any existing one. `Duration.ZERO` leaves the current state alone. Returns a `CompletableFuture<Void>` for the write. |
| `clear(playerId)` | Ends the current cooldown early and returns a `CompletableFuture<Void>` for the removal. It can be used to undo a `tryStart` when the action fails. If a new cooldown may have started in the meantime, coordinate the rollback in your plugin so you do not clear the newer entry. |

Use `Duration.ZERO` to bypass starting a cooldown, or a positive duration of at least one millisecond. If you use `check` followed by `start` and a zero duration should bypass the cooldown entirely, skip `check` as well.
