# 封禁

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/ban>

模块 `ban` · 配置 `features/ban.yml`

跨服封禁账号、IP 或 IP 范围，并保留历史记录。

## 命令与权限速查

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/ban <player\|player-ip\|ip> <target> [reason] [--time <duration>] [--force] [--silent]` | 封禁账号或 IP。 | `sparrow.command.ban` |
| `/unban <player\|player-ip\|ip> <target> [--silent]` | 按账号或 IP 解封。 | `sparrow.command.unban` |
| `/unban-id <id> [--silent]` | 按记录 ID 解封。 | `sparrow.command.unban_id` |
| `/ban-info <id>` | 玩家打开封禁详情。 | `sparrow.command.ban_info` |
| `/ban-history <all\|player <player>\|ip <ip>> [options]` | 玩家浏览封禁历史。 | `sparrow.command.ban_history` |

### 附加权限

| 权限 | 用途 |
| - | - |
| `sparrow.notify.ban` | 接收封禁与解封通知。 |

## 使用说明

```text
/ban player Steve griefing --time 7d
/ban player-ip Steve
/ban ip 192.0.2.* unwanted traffic
/ban-history player Steve --active
/unban-id 12
```

`player` 封禁账号；`player-ip` 封禁该玩家最后记录的 IP，不额外封禁账号；`ip` 直接指定地址或范围。省略 `--time` 为永久封禁，`--force` 替换同目标的有效封禁，`--silent` 隐藏通知与成功反馈。

在窗口中翻页。历史查询支持 `--active`、`--within <时长>`、`--operator <名称>`。`sparrow.notify.ban` 接收封禁与解封通知。

拥有 `/ban-info` 权限时，可从历史列表打开记录详情。拥有 `/unban-id` 权限时，可在详情中解封有效记录，确认时可选择静默解封。

在 `reason-presets` 中配置常用原因，输入与预设名称完全相同时展开。通知音效使用 `notify-ban-sound`、`notify-unban-sound`。

![玩家被永久封禁后看到的断开连接提示，处罚编号为 21](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/img/features/ban-disconnect.png)

玩家可以把断开连接提示中的处罚编号交给管理员。图中的记录可用 `/ban-info 21` 查询。

## 配置示例

```yaml
# 示例：输入 grief 时，将原因展开为 Griefing
reason-presets:
  grief: "Griefing"
```
