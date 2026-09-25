# 玩家巡查

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/patrol>

使用 `/patrol` 轮流传送到本服在线玩家，适合管理员巡查。每次选择最久未被巡查的玩家，新加入的玩家会优先进入队列。

## 命令与权限

| 命令或权限 | 用途 | 默认命令权限 |
| - | - | - |
| `/patrol [targets]` | 从候选玩家中选择下一位巡查对象。 | `sparrow.command.patrol` |
| `sparrow.bypass.patrol` | 拥有此权限的玩家不会被选为巡查对象。 | — |

完整入口为 `/sparrow patrol [targets]`。此命令只能由玩家执行；省略 `targets` 时，从本服所有符合条件的在线玩家中选择。填写玩家名或玩家选择器可以缩小候选范围。

```text title="示例"
/patrol
/patrol @a
```

巡查会跳过执行者自己、拥有绕过权限的玩家，以及不符合配置规则的玩家。它不会自动切换执行者的游戏模式；需要旁观视角时，请先自行切换。

## 配置

```yaml title="features.yml · patrol"
patrol:
  enabled: true
  skip-spectators: true
  excluded-worlds: []
```

`skip-spectators` 默认跳过旁观模式的玩家。`excluded-worlds` 填写不参与巡查的世界名称，例如 `[minigame, lobby]`；空列表不限制世界。
