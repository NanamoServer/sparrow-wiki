# 返回床边

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/bed>

使用 `/bed` 回到本服的重生点，可以是床、已充能的重生锚，或用 `/spawnpoint` 设置的位置。

## 命令与权限

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/bed` | 回到自己的重生点。 | `sparrow.command.bed` |
| `/bed <player>` | 让本服在线玩家回到他的重生点。 | `sparrow.command.bed` + `sparrow.command.bed.other` |

也可以使用 `/sparrow bed [player]`。控制台必须指定玩家。填写自己的名字也需要 `.other`；没有该权限时，玩家参数不会出现在补全中，手动输入也无法执行。

没有设置重生点，或重生点已无法使用时，例如床被拆除或被挡住，Sparrow 会提示没有可以返回的床，玩家留在原地。

## 倒计时与冷却

自己返回时默认等待 3 秒。倒计时期间移动超过半格、切换世界或受伤会取消传送。让其他玩家返回床边时立即执行，不检查也不产生冷却。填写自己的名字时仍然使用自己的倒计时与冷却。

冷却、倒计时、世界限制和音效在 `teleport.yml` 的分组里配置，见[传送分组](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)。

## 配置

把下面的分组合并到 `features.yml`，保留其他功能的设置。

```yaml title="features.yml · bed"
bed:
  enabled: true
  teleport-group: default
```

| 配置项 | 含义 |
| - | - |
| `enabled` | 是否启用返回床边功能，停用时隐藏对应命令。 |
| `teleport-group` | 使用 `teleport.yml` 中的哪个[传送分组](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)，留空或填 `default` 时使用默认分组。 |

修改功能设置后执行 `/sparrow reload` 生效。命令开关、入口和基础权限放在 `commands.yml` 的 `bed` 分组中，修改后需要重启服务器。
