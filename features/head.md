# Heads

Source: <https://nanamoserver.github.io/sparrow-wiki/features/head>

Use `/head` to get a player's head by name or UUID. You can specify the amount and recipients.

## Commands and permissions

| Command | Purpose | Default permission |
| - | - | - |
| `/head [source] [amount]` | Fetch heads for yourself; omitted source uses your own name. | `sparrow.command.head` |
| `/head <source> <amount> <player> [force] [--silent]` | Fetch heads for selected players; set `force` to `true` for a fresh lookup. | `sparrow.command.head` + `sparrow.command.head.other` |

The full entry point is `/sparrow head`. UUIDs may use dashes or 32 hexadecimal digits without dashes. Arguments are positional, in the order `source`, `amount`, `player`, `force`; to supply a later argument, also supply every earlier one.

Tab completion for `source` suggests online player names from every server sharing Sparrow's Redis connection. You can also enter an offline player's name or UUID manually. The `player` argument selects recipients on the current server.

| Argument or option | Meaning |
| - | - |
| `source` | Player name or UUID for the head texture; defaults to your own name. Requires only the base permission. |
| `amount` | 1–6400 heads, default 1. Available with the base permission. |
| `player` | Recipient name or player selector; defaults to you when omitted. Requires `.other`, even for your own name or `@s`. |
| `force` | `true` skips cached results and fetches again. Defaults to `false`; requires `.other`. |
| `--silent` / `-s` | Suppress success feedback; timeouts and failures are still reported. Supply all four positional arguments before this option, including `false` when a fresh lookup is not needed. |

Without `.other`, you can use only `source` and `amount`. The permission for `player` and `force` is the base permission from `commands.yml` followed by `.other`.

The console must specify a source, amount, and recipient. Heads drop at each recipient in stacks of up to 64.

```text title="Examples"
/head
/head Notch
/head Notch 16
/head Notch 1 Alex true
/head Notch 1 @a false --silent
/head 069a79f4-44e9-4726-a5be-fca90e38aaf5
```

## Sources and caches

By default, Sparrow reads a local online player's texture first, then falls back to an API. External profile lookup uses Mojang's name and UUID endpoints by default, with Ashcon as a fallback when the primary API fails or returns no textures.

When `force` is `true`, lookup follows `source-order`. If the online player has a texture, Sparrow uses that live profile. Set `source-order: [api]` to always use the external profile service.

This is a partial `features.yml` example; keep the remaining settings:

```yaml title="features.yml · head"
head:
  enabled: true
  source-order:
    - online
    - api
  request-timeout: 15s
  cache:
    memory:
      enabled: true
      ttl: 5m
      max-size: 4096
    redis:
      enabled: true
      ttl: 24h
```

`source-order` may contain either or both sources without duplicates. The memory cache holds up to 4,096 keys for 5 minutes. Redis caches entries for 24 hours using the shared connection in `config.yml`. Each cache has its own `enabled` switch and configurable `ttl`. A cached head expires a fixed time after it was fetched; using it does not extend that time.

Durations support `d`, `h`, `m`, `s`, and `ms`, including combinations such as `1m30s`, and must be greater than zero. Failed lookups are not cached. If Redis is unavailable, heads can still be fetched.

### Custom profile endpoints

To use a different profile service, replace the URLs under `head.api`. These are the defaults; merge them into your existing `head` section:

```yaml title="features.yml · head.api"
head:
  api:
    name-url: 'https://api.mojang.com/users/profiles/minecraft/{name}'
    profile-url: 'https://sessionserver.mojang.com/session/minecraft/profile/{uuid}'
    fallback-urls:
      - 'https://api.ashcon.app/mojang/v2/user/{player}'
    headers: {}
    connect-timeout: 3s
    request-timeout: 5s
```

`name-url` must contain `{name}`, which is replaced with the URL-encoded player name. `profile-url` must contain `{uuid}` (without dashes) or `{uuid-dashed}` (with dashes). The service must return Mojang-compatible JSON: `id` and `name` for name lookups, and a player profile with a `textures` property for profile lookups. UUID lookups go directly to the profile endpoint.

Use `head.api.headers` for required request headers, such as `Authorization`. These headers are sent only to `name-url` and `profile-url`, not to fallback endpoints. After you change the URLs, the fallback list or its order, or the headers, heads cached under the old settings are not reused.

### Automatic fallback

`head.api.fallback-urls` is an ordered list of backup profile endpoints. Add URLs in the order you want Sparrow to try them. Set `fallback-urls: []` to disable fallback.

Each URL must contain `{player}`. Sparrow replaces it with the URL-encoded name or dashed UUID from the original query. The endpoint must return a complete profile in a single response, using either of these formats:

| Response format | Player identity | Texture fields |
| - | - | - |
| Ashcon | `uuid`, `username` | `textures.raw.value` and optional `textures.raw.signature` |
| Mojang | `id`, `name` | An entry named `textures` in `properties`, with `value` and optional `signature` |

Fallback starts when the primary API reports an error, is rate limited, exceeds its individual HTTP timeout, returns no player, or provides no textures. Sparrow tries each backup in order and stops at the first valid textured profile. Successful results use the existing memory and Redis caches; Setting `force` to `true` also skips cached fallback results.

If no endpoint finds the player or a texture, Sparrow reports that the head was not found. If an endpoint fails and none succeeds, the last error is reported. Trying backup endpoints does not extend `head.request-timeout`.

## Timeouts

| Setting | Default | Scope |
| - | - | - |
| `head.request-timeout` | `15s` | Total lookup time for player names and UUIDs, including caches, online profiles, and all primary and fallback requests. |
| `head.api.connect-timeout` | `3s` | Time allowed to establish an HTTP connection to a primary or fallback endpoint. |
| `head.api.request-timeout` | `5s` | Time allowed for each primary or fallback HTTP request. |

When a lookup times out, the sender is told, even with `--silent`. Disabling or reloading the feature cancels lookups that are still in progress.
