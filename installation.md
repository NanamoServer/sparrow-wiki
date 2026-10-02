# Installation

Source: <https://nanamoserver.github.io/sparrow-wiki/installation>

Install Sparrow, assign a server ID, and connect Redis and persistent storage.

## Requirements

The current build provides Paper, Folia, and Spigot entry points and declares **1.21.11** as its minimum API version. For Spigot, use **26.2 or a newer adapted version**. Match the server version to the Sparrow build you install.

The plugin is compiled for Java 21; your runtime must also meet your Minecraft server's Java requirements. PlaceholderAPI is optional and is needed only for its placeholders. LuckPerms is also optional; with it installed, [Maintenance](https://nanamoserver.github.io/sparrow-wiki/features/maintenance.mdx) and [Player limit](https://nanamoserver.github.io/sparrow-wiki/features/player-limit.mdx) use LuckPerms permissions to decide who can bypass them before joining. Without it, only operators can bypass.

**Redis and one persistent database are required at startup.** Choose MongoDB, MySQL, MariaDB, or PostgreSQL.

> **Storage service versions**
>
> Redis must be newer than **7.2.4**. When using MySQL, its version must be newer than **8.0.0**.

## Install

Place the Sparrow `.jar` in `plugins/` and start the server. Configuration files are generated under `plugins/Sparrow/`:

**Sparrow**

- `libs` — Automatically managed runtime dependencies
- `translations` — Localized messages and interface text
- `config.yml` — Redis, database, language, and text parsing
- `server.yml` — Unique server ID
- `commands.yml` — Command switches, entry points, and permissions; restart required
- `features.yml` — Feature switches and settings

> **The first startup shuts down the server**
>
> `server-id` in `server.yml` is empty by default. Sparrow reports the missing ID and shuts down the server. Configure the ID and connections before starting again.

## Server ID

Change the existing `server-id` in `plugins/Sparrow/server.yml`:

```yaml title="server.yml · Server ID"
server-id: 'lobby'
```

Every server sharing Redis and storage needs a different ID, such as `lobby`, `survival-1`, or `survival-2`. With a proxy, match its configured backend name. Change this value when copying configuration to another server.

## Redis and database

The following snippets show only connection settings. **Do not replace the whole file with them.** Keep the generated `__version__` value.

### Redis

```yaml title="config.yml · Redis"
redis:
  url: 'redis://localhost:6379/0'
  username: ''
  password: ''
```

Set the actual host, port, and credentials. Servers in the same group should use the same Redis database; `/0` selects database 0.

### Persistent storage

The default is `MONGODB`. To use MySQL, create a database and an account with table creation and read/write access, then configure:

```yaml title="config.yml · MySQL example"
database:
  type: MYSQL
  mysql:
    url: 'jdbc:mysql://localhost:3306/minecraft?connectTimeout=5000&socketTimeout=10000&characterEncoding=UTF-8'
    username: 'sparrow'
    password: 'your_database_password'
    table-prefix: 'sparrow_'
```

Alternatively, select `MARIADB`, `POSTGRESQL`, or `MONGODB` and edit its corresponding section. Servers sharing data need the same database and table prefix. MongoDB uses a shared database name and `collection-prefix`.

Restart, check the console for connection results, and run `/sparrow feature-list` to inspect feature state.

## Proxy plugin {#proxy-plugin}

If your servers run behind Velocity or BungeeCord (including Waterfall), also install the Sparrow proxy plugin on the proxy:

| Proxy | File |
| - | - |
| Velocity | `Sparrow-velocity-<version>.jar` |
| BungeeCord / Waterfall | `Sparrow-bungeecord-<version>.jar` |

Place it in the proxy's `plugins/` folder and start the proxy once. It creates `config.yml` in `plugins/sparrow/` on Velocity or `plugins/Sparrow/` on BungeeCord. Point it at the same Redis as your backend servers, including the same database number:

```yaml title="Proxy config.yml · Redis"
redis:
  url: 'redis://localhost:6379/0'
  username: ''
  password: ''
```

Restart the proxy after editing. The console shows `Connected to Redis` when the connection works.

With the proxy plugin, `/kick` and [bans](https://nanamoserver.github.io/sparrow-wiki/features/ban.mdx) disconnect players from the whole network and show them the reason. Without it, players are removed only from the server they are on, about a second later, and the proxy may send them to another server. Cross-server travel with [Warps](https://nanamoserver.github.io/sparrow-wiki/features/warp.mdx) and [Back](https://nanamoserver.github.io/sparrow-wiki/features/back.mdx) also requires the proxy plugin; local teleports work without it.

## Features and commands

`features.yml` controls features; `commands.yml` controls which commands exist, their entry points, and their permissions. For example:

```yaml title="features.yml · Patrol"
patrol:
  enabled: true
  skip-spectators: true
  excluded-worlds: []
```

```yaml title="commands.yml · Patrol command"
patrol:
  enable: true
  usages:
    - /sparrow patrol
    - /patrol
  permission: sparrow.command.patrol
```

Features use `enabled`; commands use `enable`. Disabling an entry point and disabling its feature are separate actions. A command turned off in `commands.yml` does not exist on the server at all, while the commands of a disabled feature are hidden from players and answer with a notice until the feature is enabled again.

| Setting | How to apply |
| - | - |
| Feature settings in `features.yml` | `/sparrow reload` |
| Countdown display and sounds in `config.yml` | `/sparrow reload` |
| Feature switches | `/sparrow feature-enable <feature>` or `feature-disable`; saved to the file |
| Command switches, entry points, and permissions | Restart |
| Redis, database connections, or `server-id` | Restart |

Set `forced-locale: en_US` in `config.yml` to select the console language. See [Permissions & Commands](https://nanamoserver.github.io/sparrow-wiki/commands.mdx) and the individual feature pages for details.
