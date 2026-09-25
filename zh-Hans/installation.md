# 安装插件

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/installation>

本章将完成 Sparrow 的安装，并配置服务器 ID、Redis 和数据库。

## 运行环境

当前版本提供 Paper、Folia 和 Spigot 加载入口，插件声明的最低 API 版本为 **1.21.11**。Spigot 请使用 **26.2 或更新的适配版本**。具体服务端版本应与所用 Sparrow 构建匹配。

插件以 Java 21 编译；运行时还需要满足所用 Minecraft 服务端的 Java 要求。PlaceholderAPI 是可选插件，需要解析其占位符时再安装。

**Redis 和一种持久化数据库是当前版本启动所需的服务。** 数据库可选 MongoDB、MySQL、MariaDB 或 PostgreSQL。

> **存储服务版本**
>
> Redis 版本必须大于 **7.2.4**；使用 MySQL 时，MySQL 版本必须大于 **8.0.0**。

## 安装

将 Sparrow 的 `.jar` 文件放入服务器的 `plugins/` 文件夹，然后启动服务器。配置文件生成在 `plugins/Sparrow/` 中：

**Sparrow**

- `libs` — 自动下载和加载的运行时依赖
- `translations` — 命令反馈和界面的多语言文本
- `config.yml` — Redis、数据库、语言和文本解析选项
- `server.yml` — 本服在集群中的唯一 ID
- `commands.yml` — 命令开关、入口和权限，修改后重启
- `features.yml` — 各功能模块的开关和设置

> **首次启动会自动关服**
>
> `server.yml` 中的 `server-id` 默认为空。未填写时，Sparrow 会提示缺少服务器 ID 并主动关闭服务器。重新启动前，请完成服务器 ID 和连接配置。

## 设置服务器 ID

修改 `plugins/Sparrow/server.yml` 中已有的 `server-id`：

```yaml title="server.yml · 服务器 ID"
server-id: 'lobby'
```

共用 Redis 和数据库的服务器必须使用不同的 ID，例如 `lobby`、`survival-1`、`survival-2`。使用代理时，ID 应与代理配置中的后端服务器名称一致。复制配置到另一台服务器后，需要单独修改此项。

## 配置 Redis 和数据库

以下片段只展示需要修改的连接项，**不要用它们覆盖整个配置文件**。保留自动生成的 `__version__`。

### Redis

```yaml title="config.yml · Redis"
redis:
  url: 'redis://localhost:6379/0'
  username: ''
  password: ''
```

将地址、端口和认证信息改为实际配置。同一组服务器使用同一个 Redis 数据库；`/0` 表示第 0 号数据库。

### 持久化数据库

默认存储类型为 `MONGODB`。若使用 MySQL，先创建数据库和具有建表、读写权限的账号，然后修改：

```yaml title="config.yml · MySQL 示例"
database:
  type: MYSQL
  mysql:
    url: 'jdbc:mysql://localhost:3306/minecraft?connectTimeout=5000&socketTimeout=10000&characterEncoding=UTF-8'
    username: 'sparrow'
    password: 'your_database_password'
    table-prefix: 'sparrow_'
```

也可以选择 `MARIADB`、`POSTGRESQL` 或 `MONGODB`，并填写对应分组。共用数据的服务器需要连接同一个数据库，使用相同的表前缀；MongoDB 使用相同的数据库名称和 `collection-prefix`。

保存后重新启动服务器，检查控制台的 Redis、数据库连接结果，再执行 `/sparrow feature-list` 检查功能状态。

## 调整功能和命令

`features.yml` 管理功能模块；`commands.yml` 管理命令注册。以巡查为例：

```yaml title="features.yml · 巡查"
patrol:
  enabled: true
  skip-spectators: true
  excluded-worlds: []
```

```yaml title="commands.yml · 巡查命令"
patrol:
  enable: true
  usages:
    - /sparrow patrol
    - /patrol
  permission: sparrow.command.patrol
```

注意功能配置使用 `enabled`，命令配置使用 `enable`。关闭命令入口与停用功能模块是两个独立操作。

| 修改内容 | 生效方式 |
| - | - |
| `features.yml` 的功能设置 | `/sparrow reload` |
| 功能模块开关 | `/sparrow feature-enable <feature>` 或 `feature-disable`，会保存到文件 |
| `commands.yml` 的命令开关、入口、权限 | 重启服务器 |
| Redis、数据库连接或 `server-id` | 重启服务器 |

控制台语言可以通过 `config.yml` 的 `forced-locale: zh_CN` 设置。更多命令见[权限命令速查表](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands.mdx)，每个功能的配置见左侧功能分组。
