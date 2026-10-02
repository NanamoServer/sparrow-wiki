# 权限命令速查表

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands>

`<参数>` 为必填，`[参数]` 为可选。`player` 通常为本服在线玩家名，`targets` 为玩家或实体选择器。

以下为默认入口与权限。短命令也可写成 `/sparrow <命令>`；修改 `commands.yml` 后需要重启服务器。

属于某个功能的命令（例如 `/maintenance`、`/ban`）在该功能停用期间会对玩家隐藏，执行时提示功能未启用；重新启用后立即恢复。

## ⚙️ 插件管理

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/sparrow reload [--silent]` | 重载支持运行时更新的配置。 | `sparrow.command.admin.reload` |
| `/sparrow feature-list [page]` | 分页查看功能状态。 | `sparrow.command.admin.feature` |
| `/sparrow feature-enable <feature>` | 启用指定功能并保存开关。 | `sparrow.command.admin.feature` |
| `/sparrow feature-disable <feature>` | 停用指定功能并保存开关。 | `sparrow.command.admin.feature` |

## 🚧 进服管理

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/maintenance [true\|false]` | 开启或关闭维护模式，或查看当前状态。 | `sparrow.command.maintenance` |
| `/max-players [amount]` | 运行时修改人数上限，或查看在线人数和当前上限。 | `sparrow.command.max-players` |

## 🔨 处罚管理

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/kick <player> [reason] [-s]` | 把玩家从其所在的服务器踢出，踢出界面会显示原因和执行人。 | `sparrow.command.kick` |
| `/ban <player> [reason] [-t <时长>] [-I] [-s]` | 全服封禁账号；加上 `-I` 会同时封禁其最近一次登录的 IP。 | `sparrow.command.ban` |
| `/ban-ip <ip> [reason] [-t <时长>] [-s]` | 封禁一个 IP 或 `1.2.3.*` 这样的 IP 段。 | `sparrow.command.ban-ip` |
| `/unban <对象> [-s]` | 按玩家名、UUID、IP 或处罚 ID 解除封禁。 | `sparrow.command.unban` |
| `/ban-history [对象] [选项]` | 查看封禁记录，可按执行人、时间范围和是否生效筛选。 | `sparrow.command.ban-history` |

`/kick` 可以踢出集群内任意服务器上的在线玩家。`--silent` / `-s` 会隐藏给执行人的成功提示；用在封禁相关命令上时，也不会通知管理员。

使用 Velocity 或 BungeeCord 时，请在代理上安装[代理插件](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/installation.mdx#proxy-plugin)，被踢出或封禁的玩家才会与整个群组服断开连接。不安装时，玩家会在大约一秒后被移出当前服务器，代理可能会把他送到其他服务器。

## 🔎 玩家记录查询

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/ip <player>` | 查看玩家最近一次登录的 IP 与时间，并提供查询同 IP 玩家的按钮。 | `sparrow.command.ip` |
| `/ip-history <对象> [page]` | 列出最近一次登录 IP 与指定 IP、`1.2.3.*` 这样的 IP 段，或某名玩家最近登录 IP 相同的玩家。 | `sparrow.command.ip-history` |
| `/player-uuid <player>` | 按玩家名查询 UUID。 | `sparrow.command.player-uuid` |
| `/player-name <uuid>` | 按 UUID 查询最近使用的玩家名。 | `sparrow.command.player-name` |

这些命令只能查到进入过你的服务器的玩家，不会向 Mojang 查询。这里的 `player` 可以是其中任何一名玩家，不要求在线；`/ip` 与 `/ip-history` 也接受 UUID。玩家每次进服都会更新最近登录 IP，只记录 IPv4 地址。`/ip-history` 每页显示 8 名玩家，包含在线状态或最后所在服务器、最近登录时间和 IP。

## 🧍 玩家与实体状态

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/heal [player]` | 恢复玩家生命值。 | `sparrow.command.heal[.other]` |
| `/feed [player]` | 恢复玩家饥饿状态。 | `sparrow.command.feed[.other]` |
| `/fly` | 切换自己的飞行状态。 | `sparrow.command.fly[.other]` |
| `/fly <player> [enabled]` | 切换指定玩家的飞行状态，或用 true / false 明确设置。 | `sparrow.command.fly[.other]` |
| `/fly-speed <speed> [player]` | 设置飞行速度，范围 -1 到 1。 | `sparrow.command.fly-speed[.other]` |
| `/walk-speed <speed> [player]` | 设置行走速度，范围 -1 到 1。 | `sparrow.command.walk-speed[.other]` |
| `/suicide` | 结束自己的生命，仅玩家可执行。 | `sparrow.command.suicide` |
| `/burn <time> [targets]` | 使自己或选中的实体燃烧；时长可填写刻数或 `5s` 这样的单位形式。 | `sparrow.command.burn[.other]` |
| `/extinguish [targets]` | 熄灭目标实体身上的火。 | `sparrow.command.extinguish[.other]` |
| `/look face <face> [targets]` | 让自己或选中的实体朝向 north、up 等方向。 | `sparrow.command.look[.other]` |
| `/look location <x> <y> <z> [targets]` | 让自己或选中的实体看向指定坐标。 | `sparrow.command.look[.other]` |
| `/look entity <entity> [targets]` | 让自己或选中的实体看向另一实体。 | `sparrow.command.look[.other]` |
| `/hat [player]` | 把主手的一个物品戴到头上。 | `sparrow.command.hat[.other]` |
| `/knockback <x> <y> <z> [player]` | 把玩家朝指定方向击飞。 | `sparrow.command.knockback[.other]` |

`/hat` 只戴一个物品，其余留在主手。原来头上的物品会放回空出来的主手，否则放进背包，背包满了就掉在玩家脚下。头上的物品带有绑定诅咒时无法替换，创造模式除外。

`/knockback` 的单位是每刻移动的格数：`/knockback 0 1 0` 把玩家向上击飞，`/knockback 2 0.5 0` 把玩家推向东方。和被攻击时一样，击飞会取代玩家当前的移动。

## 🔍 巡查与代执行

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/patrol [targets]` | 轮流巡查本服在线玩家，仅玩家可执行。 | `sparrow.command.patrol` |
| `/sudo <targets> <command>` | 让指定玩家执行命令。 | `sparrow.command.sudo` |

## 🧭 传送

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/world [world] [targets]` | 切换到指定世界；省略世界时选择下一个世界。 | `sparrow.command.world[.other]` |
| `/top-block [targets]` | 将目标传送到当前坐标列的最高可站立位置。 | `sparrow.command.top-block[.other]` |
| `/tp-offline <player> [targets] [--silent]` | 将目标传送到指定玩家最后记录的位置。 | `sparrow.command.tp-offline` |
| `/server <server> [targets]` | 通过代理请求切换后端服务器。 | `sparrow.command.server[.other]` |
| `/bed [player]` | 将玩家传送到重生点，例如他的床。 | `sparrow.command.bed[.other]` |
| `/back [player]` | 让玩家回到上一个位置，可以跨服返回。 | `sparrow.command.back[.other]` |
| `/warp <name> [player]` | 让自己或指定玩家传送到命名传送点，支持跨服。 | `sparrow.command.warp[.other]` |
| `/set-warp <name>` | 在当前位置创建或移动已有传送点，仅玩家可执行。 | `sparrow.command.set-warp` |
| `/del-warp <name>` | 立即删除传送点。 | `sparrow.command.del-warp` |
| `/warp-list [page]` | 查看可点击的聊天传送点列表。 | `sparrow.command.warp-list` |
| `/edit-warp <name>` | 查看传送点的信息与管理面板。 | `sparrow.command.edit-warp` |
| `/edit-warp <name> rename <new_name>` | 修改传送点名称。 | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.rename` |
| `/edit-warp <name> description <text>` | 设置描述，最长 256 个字符。 | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.description` |
| `/edit-warp <name> relocate` | 移到自己的当前位置，仅玩家可执行。 | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.relocate` |
| `/edit-warp <name> delete [confirm <id>]` | 显示删除确认，或输入面板提供的确认命令。 | `sparrow.command.edit-warp` + `sparrow.command.edit-warp.delete` |

`/bed` 使用玩家死亡后会重生的位置：床、已充能的重生锚，或用 `/spawnpoint` 设置的位置。床被拆除或被挡住时，会提示没有可以返回的床。

`/warp`、`/back` 和 `/bed` 的倒计时与冷却分别放在 `features.yml` 中。共用的显示、音效和绕过权限，见[传送设置](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/teleport.mdx)。`/tp-offline` 立即传送。

## 🛠️ 便携工作站与容器

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/workbench [player]` | 为玩家打开工作台。 | `sparrow.command.workbench[.other]` |
| `/anvil [player]` | 为玩家打开铁砧。 | `sparrow.command.anvil[.other]` |
| `/grindstone [player]` | 为玩家打开砂轮。 | `sparrow.command.grindstone[.other]` |
| `/smithing-table [player]` | 为玩家打开锻造台。 | `sparrow.command.smithing-table[.other]` |
| `/stonecutter [player]` | 为玩家打开切石机。 | `sparrow.command.stonecutter[.other]` |
| `/cartography-table [player]` | 为玩家打开制图台。 | `sparrow.command.cartography-table[.other]` |
| `/enchantment-table [player]` | 为玩家打开附魔台。 | `sparrow.command.enchantment-table[.other]` |
| `/ender_chest` | 打开自己的末影箱。 | `sparrow.command.ender-chest[.other]` |
| `/ender_chest <player> [--silent]` | 让指定玩家打开他自己的末影箱。 | `sparrow.command.ender-chest[.other]` |

## 📦 物品编辑与获取

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/enchant <targets> <enchantment> [level] [--slot <slot>] [--check]` | 修改目标实体指定装备槽的附魔，等级为负数时移除；`--check` 按原版 `/enchant` 规则校验。 | `sparrow.command.enchant` |
| `/item_data [--full] [--chat]` | 查看主手物品数据，仅玩家可执行。 | `sparrow.command.item-data` |
| `/item_name <player> [name] [选项]` | 查询或修改主手物品的 item\_name 组件。 | `sparrow.command.item-name` |
| `/custom_name <player> [name] [选项]` | 查询或修改主手物品的 custom\_name 组件。 | `sparrow.command.custom-name` |
| `/item_lore [选项]` | 查看或编辑主手物品 Lore，仅玩家可执行。 | `sparrow.command.item-lore` |
| `/color <color>` | 设置自己主手物品的染色。 | `sparrow.command.color[.other]` |
| `/color <color> <player> [--silent]` | 设置指定玩家主手物品的染色。 | `sparrow.command.color[.other]` |
| `/custom_model_data [value]` | 查询或修改主手物品第一个模型数据 float，仅玩家可执行。 | `sparrow.command.custom-model-data` |
| `/more [amount] [--player <player>] [--silent]` | 补充或复制主手物品，数量范围 1–6400。 | `sparrow.command.more` |
| `/head [source] [amount]` | 按玩家名或 UUID 为自己获取头颅；数量范围 1–6400，默认 1。 | `sparrow.command.head[.other]` |
| `/head <source> <amount> <player> [force] [--silent]` | 为选中的玩家获取头颅；`force` 为 `true` 时重新获取。 | `sparrow.command.head[.other]` |

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
| `sparrow.bypass.maintenance` | 维护期间仍可留在服务器或进入服务器。 |
| `sparrow.bypass.player-limit` | 服务器满员时仍可进入。 |
| `sparrow.notify.ban` | 接收所有服务器的封禁与解封通知。默认只有 OP 拥有。 |
| `sparrow.warp.<小写名称>` | 开启 `permission-restrict` 时，允许使用对应传送点。 |
| `sparrow.teleport-warmup.<秒>` | 缩短 `/warp`、`/back` 或 `/bed` 的等待时间，取权限中的最小值与功能默认值中较小的一个。 |
| `sparrow.bypass.teleport-warmup` | 自己传送时跳过倒计时。 |
| `sparrow.bypass.teleport-cooldown` | 跳过传送冷却检查，也不产生新的冷却。 |

`/enchant` 加上 `--check` 后与原版命令一致：等级不能超过附魔的最高等级，物品必须支持该附魔，且不能与已有附魔冲突，物品上已有同一附魔也算冲突。原版中附魔书不属于任何附魔的适用物品，因此同样会被拒绝。移除附魔时不做校验。

巡查、高亮、头颅、维护模式、人数上限、全服封禁和返回上一位置的完整用法分别见[玩家巡查](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/patrol.mdx)、[区域高亮](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/highlight.mdx)、[头颅获取](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/head.mdx)、[维护模式](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/maintenance.mdx)、[人数上限](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/player-limit.mdx)、[全服封禁](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/ban.mdx)和[返回上一位置](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/back.mdx)。
