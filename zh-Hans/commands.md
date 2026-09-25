# 权限命令速查表

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands>

`<参数>` 为必填，`[参数]` 为可选。`player` 通常为本服在线玩家名，`targets` 为玩家或实体选择器。

以下为默认入口与权限。短命令也可写成 `/sparrow <命令>`；修改 `commands.yml` 后需要重启服务器。

## ⚙️ 插件管理

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/sparrow reload [--silent]` | 重载支持运行时更新的配置。 | `sparrow.command.admin.reload` |
| `/sparrow feature-list [page]` | 分页查看功能状态。 | `sparrow.command.admin.feature` |
| `/sparrow feature-enable <feature>` | 启用指定功能并保存开关。 | `sparrow.command.admin.feature` |
| `/sparrow feature-disable <feature>` | 停用指定功能并保存开关。 | `sparrow.command.admin.feature` |

## 🧍 玩家与实体状态

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/heal [player]` | 恢复玩家生命值。 | `sparrow.command.heal` |
| `/feed [player]` | 恢复玩家饥饿状态。 | `sparrow.command.feed` |
| `/fly [player] [enabled]` | 切换飞行许可，或用 true / false 明确设置。 | `sparrow.command.fly` |
| `/fly-speed <speed> [player]` | 设置飞行速度，范围 -1 到 1。 | `sparrow.command.fly-speed` |
| `/walk-speed <speed> [player]` | 设置行走速度，范围 -1 到 1。 | `sparrow.command.walk-speed` |
| `/suicide` | 结束自己的生命，仅玩家可执行。 | `sparrow.command.suicide` |
| `/burn <targets> <time>` | 使目标实体燃烧。 | `sparrow.command.burn` |
| `/extinguish [targets]` | 熄灭目标实体身上的火。 | `sparrow.command.extinguish` |
| `/look [targets] <朝向选项>` | 调整目标实体朝向。 | `sparrow.command.look` |

## 🔍 巡查与代执行

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/patrol [targets]` | 轮流巡查本服在线玩家，仅玩家可执行。 | `sparrow.command.patrol` |
| `/sudo <targets> <command>` | 让指定玩家执行命令。 | `sparrow.command.sudo` |

## 🧭 传送

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/world [world] [targets]` | 切换到指定世界；省略世界时选择下一个世界。 | `sparrow.command.world` |
| `/top-block [targets]` | 将目标传送到当前坐标列的最高可站立位置。 | `sparrow.command.top-block` |
| `/tp-offline <player> [targets] [--silent]` | 将目标传送到指定玩家最后记录的位置。 | `sparrow.command.tp-offline` |
| `/server <server> [targets]` | 通过代理请求切换后端服务器。 | `sparrow.command.server` |

## 🛠️ 便携工作站与容器

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/workbench [player]` | 为玩家打开工作台。 | `sparrow.command.workbench` |
| `/anvil [player]` | 为玩家打开铁砧。 | `sparrow.command.anvil` |
| `/grindstone [player]` | 为玩家打开砂轮。 | `sparrow.command.grindstone` |
| `/smithing-table [player]` | 为玩家打开锻造台。 | `sparrow.command.smithing-table` |
| `/stonecutter [player]` | 为玩家打开切石机。 | `sparrow.command.stonecutter` |
| `/cartography-table [player]` | 为玩家打开制图台。 | `sparrow.command.cartography-table` |
| `/enchantment-table [player]` | 为玩家打开附魔台。 | `sparrow.command.enchantment-table` |
| `/ender_chest [player] [--silent]` | 让指定玩家打开他自己的末影箱。 | `sparrow.command.ender-chest` |

## 📦 物品编辑与获取

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/enchant <targets> <enchantment> [level] [--slot <slot>]` | 修改目标实体指定装备槽的附魔。 | `sparrow.command.enchant` |
| `/item_data [--full] [--chat]` | 查看主手物品数据，仅玩家可执行。 | `sparrow.command.item-data` |
| `/item_name <player> [name] [选项]` | 查询或修改主手物品的 item\_name 组件。 | `sparrow.command.item-name` |
| `/custom_name <player> [name] [选项]` | 查询或修改主手物品的 custom\_name 组件。 | `sparrow.command.custom-name` |
| `/item_lore [选项]` | 查看或编辑主手物品 Lore，仅玩家可执行。 | `sparrow.command.item-lore` |
| `/color [color] [--player <player>] [--slot <slot>] [--silent]` | 查询或修改物品染色。 | `sparrow.command.color` |
| `/custom_model_data [value]` | 查询或修改主手物品第一个模型数据 float，仅玩家可执行。 | `sparrow.command.custom-model-data` |
| `/more [amount] [--player <player>] [--silent]` | 补充或复制主手物品，数量范围 1–6400。 | `sparrow.command.more` |
| `/head [source] [选项]` | 按玩家名或 UUID 获取头颅。 | `sparrow.command.head` |

## 📐 区域与测量

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/highlight [targets] [选项]` | 选点或按坐标显示区域高亮。 | `sparrow.command.highlight` |
| `/distance [--max-distance <distance>] [--disable-marker]` | 测量到视线方块的距离，仅玩家可执行。 | `sparrow.command.distance` |

## 💬 消息与画面

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/broadcast <targets> <message> [选项]` | 向指定玩家发送聊天消息。 | `sparrow.command.broadcast` |
| `/actionbar <targets> <message> [选项]` | 向指定玩家发送 ActionBar。 | `sparrow.command.actionbar` |
| `/title <targets> <fadeIn> <stay> <fadeOut> <message> [选项]` | 发送标题与可选副标题。 | `sparrow.command.title` |
| `/toast <targets> <type> <item> <message> [选项]` | 发送带物品图标的进度提示。 | `sparrow.command.toast` |
| `/totem-animation <targets> <item> [--silent]` | 播放使用指定物品图标的图腾动画。 | `sparrow.command.totem-animation` |
| `/demo [player]` | 显示试玩提示。 | `sparrow.command.demo` |
| `/credits [player]` | 显示终末之诗画面。 | `sparrow.command.credits` |

## 🔑 额外权限

| 权限 | 用途 |
| - | - |
| `sparrow.bypass.patrol` | 让持有者不被巡查命令选中。 |

巡查、高亮和头颅的完整用法分别见[玩家巡查](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/patrol.mdx)、[区域高亮](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/highlight.mdx)和[头颅获取](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/head.mdx)。
