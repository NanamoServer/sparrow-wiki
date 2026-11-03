# 人数上限

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/player-limit>

模块 `player_limit` · 配置 `features/player_limit.yml`

运行时修改本服人数上限，命令修改会保存到配置。

## 命令与权限速查

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/max-players [amount]` | 查询或修改人数上限；-1 恢复原上限。 | `sparrow.command.max_players` |

### 附加权限

| 权限 | 用途 |
| - | - |
| `sparrow.bypass.player_limit` | 满员时允许进入。 |

## 配置示例

```yaml
# 恢复启用模块前的人数上限；0 表示上限为零
max-players: -1
```

禁用模块时也会恢复原人数上限。
