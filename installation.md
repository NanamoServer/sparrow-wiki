# Installation

Source: <https://nanamoserver.github.io/sparrow-wiki/installation>

Install Sparrow, assign a server ID, and connect Redis and persistent storage.

## Requirements

The current build provides Paper, Folia, and Spigot entry points and declares **1.21.11** as its minimum API version. For Spigot, use **26.2 or a newer adapted version**. Match the server version to the Sparrow build you install.

The plugin is compiled for Java 21; your runtime must also meet your Minecraft server's Java requirements. PlaceholderAPI is optional and is needed only for its placeholders.

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

## Features and commands

`features.yml` controls modules; `commands.yml` controls command registration. For example:

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

Features use `enabled`; commands use `enable`. Disabling an entry point and disabling its feature are separate actions.

| Setting | How to apply |
| - | - |
| Feature settings in `features.yml` | `/sparrow reload` |
| Feature switches | `/sparrow feature-enable <feature>` or `feature-disable`; saved to the file |
| Command switches, entry points, and permissions | Restart |
| Redis, database connections, or `server-id` | Restart |

Set `forced-locale: en_US` in `config.yml` to select the console language. See [Permissions & Commands](https://nanamoserver.github.io/sparrow-wiki/commands.mdx) and the individual feature pages for details.
