# 区域高亮

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/highlight>

选择一个区域，向玩家显示方块的发光轮廓，便于说明建筑范围或检查选区。显示只发送给指定玩家，不会改变实际方块。

## 命令与权限

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/highlight [targets] [选项]` | 选取并显示区域。 | `sparrow.command.highlight` |

完整入口为 `/sparrow highlight`。**省略 `targets` 时，默认向该世界的所有在线玩家显示**；仅自己查看可以使用 `/highlight @s`。

### 交互选点

1. 输入 `/highlight @s` 开始选点。
2. 左键记录自己所在的位置，或右键方块记录被点击方块的位置。
3. 重复一次记录第二个点，随后显示高亮。

两次点击按先后分别记录两个端点，不是固定左键第一个点、右键第二个点。选择期间再次运行不带坐标的 `/highlight` 会取消当前选点。默认需要在 30 秒内完成。

### 直接指定坐标

```text title="仅向自己显示绿色轮廓，持续 20 秒"
/highlight @s --from 0 64 0 --to 5 68 5 --highlight-color green --highlight-duration 20
```

`--from` 和 `--to` 必须成对提供。控制台需要同时指定坐标和 `--world <world>`。

| 选项 | 说明 |
| - | - |
| `--from <x> <y> <z>` | 第一个端点。 |
| `--to <x> <y> <z>` | 第二个端点。 |
| `--world <world>` | 坐标所在世界，玩家默认使用当前世界。 |
| `--highlight-duration <seconds>` / `-d` | 持续 0–300 秒；0 会立即清除。 |
| `--highlight-color <color>` / `-c` | 命名颜色，例如 `green`、`red`、`yellow`。 |
| `--solid-only` | 只显示不可穿过且邻接可穿过方块、或位于选区边界的方块。 |
| `--silent` / `-s` | 隐藏命令反馈。 |

> **世界和选区限制**
>
> 和平难度的世界不支持此功能。接收者必须在线且处于选区所在世界。区域大小按包含两个端点的完整体积计算，默认最多 32,768 个方块。

## 配置

```yaml title="features.yml · highlight"
highlight:
  enabled: true
  default-color: green
  default-duration: 30
  max-blocks: 32768
  solid-only: false
  selection-timeout: 30
```

颜色、持续时间和 `solid-only` 是未指定选项时的默认值。配置已开启 `solid-only` 时，命令也会使用此筛选规则。`max-blocks` 限制整个选区体积，不是筛选后最终显示的数量。
