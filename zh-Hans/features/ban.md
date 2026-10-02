# 全服封禁

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/ban>

按账号、IP 或 IP 段封禁玩家，在群组内的所有服务器上生效。被封禁的玩家无法进入服务器；已经在线的玩家无论在哪台服务器上，都会被立即移出。

## 命令与权限

| 命令或权限 | 用途 | 默认命令权限 |
| - | - | - |
| `/ban <player> [reason] [-t <时长>] [-I] [-s]` | 按玩家名或 UUID 封禁账号。加上 `-I` 会同时封禁该玩家最近一次登录的 IP。 | `sparrow.command.ban` |
| `/ban-ip <ip> [reason] [-t <时长>] [-s]` | 封禁一个 IP 或 IP 段。 | `sparrow.command.ban-ip` |
| `/unban <对象> [-s]` | 按玩家名、UUID、IP 或处罚 ID 解除生效中的封禁。 | `sparrow.command.unban` |
| `/ban-history [对象] [选项]` | 分页查看封禁记录。 | `sparrow.command.ban-history` |
| `sparrow.notify.ban` | 接收所有服务器的封禁与解封通知。 | — |

每条命令也可以写成 `/sparrow <命令>`。

```text title="示例"
/ban Steve 在出生点破坏建筑 -t 7d
/ban Steve 利用小号违规 -I
/ban-ip 203.0.113.* 代理刷号 -t 1mo
/unban Steve
/unban #K7Q2M9XD
/ban-history Steve
/ban-history --operator Alex --within 30d --active
```

## 可以封禁的对象

- **账号**：玩家名或 UUID，UUID 带不带连字符都可以。玩家名必须是曾经进入过你的服务器的玩家；UUID 即使对应的玩家从未进入过也可以封禁。
- **账号加 IP**：`/ban -I` 会把玩家最近一次登录的 IP 一起记录在同一条封禁里。该账号登录，或任何账号从这个 IP 登录，都会被拒绝。
- **单个 IP**：例如 `/ban-ip 203.0.113.7`。
- **IP 段**：把末尾若干段写成 `*`，例如 `203.0.113.*` 或 `203.0.*.*`。

只支持 IPv4，不支持 `203.0.113.0/24` 这样的 CIDR 写法。通过 IPv6 连接的玩家只能按账号封禁。

封禁原因可以省略，最长 256 个字符。

## 时长

不加 `-t` 时为永久封禁。`-t` 可用的单位有 `y`（365 天）、`mo`（30 天）、`w`、`d`、`h`、`m`、`s`，可以组合，也可以带小数，例如 `1.5h`、`3d12h`、`1mo2w`。

## 处罚 ID

每条封禁都有一个随机 ID，例如 `#K7Q2M9XD`。它会出现在命令结果、踢出界面、管理员通知和封禁记录中。把它传给 `/unban` 或 `/ban-history`，就能精确指定这一条记录；字母不区分大小写。

## 覆盖与解除

- 封禁一名已有生效封禁的玩家时，新封禁会替换旧封禁，旧记录以"已撤销"状态保留在封禁记录中。
- 纯 IP 封禁会替换地址或 IP 段完全相同的纯 IP 封禁。
- `/unban <玩家>` 解除该账号所有生效中的封禁，包括账号加 IP 的封禁。
- `/unban <IP>` 只解除地址或 IP 段完全相同的纯 IP 封禁。账号加 IP 的封禁要用玩家或处罚 ID 解除。
- `/unban #ID` 只解除这一条记录。

## 生效方式

- 在线玩家无论在哪台服务器上，都会被立即移出。IP 封禁会把从该 IP 或 IP 段连接的所有在线账号一并移出。
- 被封禁的玩家无法进入任何服务器。[维护模式](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/maintenance.mdx)期间，他们看到的仍是封禁原因，而不是维护提示。
- 玩家自己的账号被封禁时会看到"你已被封禁"；所用的 IP 被封禁时会看到"你的 IP 已被封禁"。
- 玩家进入服务器时如果 Sparrow 连不上数据库，会放行该玩家，并在控制台输出错误。
- 使用 Velocity 或 BungeeCord 时，请在代理上安装[代理插件](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/installation.mdx#proxy-plugin)。安装后，被封禁的玩家会直接与整个群组服断开连接并看到封禁原因；不安装时，代理可能会先尝试把他送到其他服务器。

## 管理员通知与 `-s`

不加 `-s` 时，所有服务器上拥有 `sparrow.notify.ban` 的在线玩家都会收到一条通知，包含封禁对象、执行人、原因、到期时间和处罚 ID。默认只有 OP 拥有这个权限，请用权限插件授予管理员。

加上 `-s` 后：

- 执行人不会收到成功提示，出错时仍会提示。
- 不发送任何通知。
- 封禁照常生效，在线玩家照常被移出。

## 封禁记录

`/ban-history [对象]` 按时间从新到旧列出封禁记录，每页 8 条。省略对象时列出全部封禁。对象可以是玩家名、UUID、IP 或处罚 ID；填 IP 时会列出所有覆盖这个 IP 的封禁。

| 选项 | 用途 |
| - | - |
| `--operator <名字>`、`-o` | 只看该执行人的封禁，不区分大小写。 |
| `--within <时长>`、`-w` | 只看这段时间内的封禁，例如 `7d`，单位与 `-t` 相同。 |
| `--active`、`-a` | 只看仍在生效的封禁。 |
| `--page <页码>`、`-p` | 页码。 |

每行显示状态（生效中、已到期或已撤销）、处罚 ID、时间、封禁对象和执行人，末尾的 **\[解封]** 按钮会把 `/unban #ID` 填入聊天框，确认后发送即可。把鼠标悬停在处罚 ID 上可以查看完整信息。翻页按钮会保留当前的对象和筛选条件。

## 配置

```yaml title="features.yml · ban"
ban:
  enabled: true
```

封禁记录保存在 `config.yml` 所配置的数据库中。停用此功能期间封禁不会生效，封禁相关命令也会隐藏。

踢出界面和管理员通知在语言文件中修改，对应 `ban.kick.player`、`ban.kick.ip`、`ban.notify.ban` 与 `ban.notify.unban`。
