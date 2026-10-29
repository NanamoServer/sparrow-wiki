# 命令与权限

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands>

`<参数>` 必填，`[参数]` 可省略。下表是默认入口与权限，短命令也可写为 `/sparrow <命令>` 或 `/spr <命令>`。修改 `commands.yml` 后需要重启。

`[.other]` 表示指定其他玩家的分支另需 `.other` 权限。实体选择器只选择本服目标；支持跨服的命令可直接填写其他子服的玩家名。

## 插件管理

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/sparrow reload [--silent]` | 重载配置。 | `sparrow.command.admin.reload` |
| `/sparrow feature_list [page]` | 查看模块状态。 | `sparrow.command.admin.feature` |
| `/sparrow feature_enable <feature>` | 立即启用模块，不保存开关。 | `sparrow.command.admin.feature` |
| `/sparrow feature_disable <feature>` | 立即停用模块，不保存开关。 | `sparrow.command.admin.feature` |

管理[死亡消息](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/death-messages.mdx)时，模块名填写 `death_messages`。需要在重载或重启后保留模块开关时，请修改 `modules.yml`。

## 管理与玩家记录

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/maintenance [true\|false] [--all] [--tag <tag>]` | 切换维护状态。 | `sparrow.command.maintenance` |
| `/max_players [amount]` | 查询或修改人数上限；-1 恢复原上限。 | `sparrow.command.max_players` |
| `/kick <targets> [reason] [--silent]` | 踢出玩家，支持跨服。 | `sparrow.command.kick` |
| `/ban <player\|player_ip\|ip> <target> [reason] [--time <duration>] [--force] [--silent]` | 封禁账号或 IP。 | `sparrow.command.ban` |
| `/unban <player\|player_ip\|ip> <target> [--silent]` | 按账号或 IP 解封。 | `sparrow.command.unban` |
| `/unban_id <id> [--silent]` | 按记录 ID 解封。 | `sparrow.command.unban_id` |
| `/ban_info <id>` | 查看封禁记录。 | `sparrow.command.ban_info` |
| `/ban_history <all\|player <player>\|ip <ip>> [options]` | 查询封禁历史。 | `sparrow.command.ban_history` |
| `/player_info <player>` | 查看玩家资料及封禁状态。 | `sparrow.command.player_info` |
| `/player_uuid <name>` | 查询玩家 UUID。 | `sparrow.command.player_uuid` |
| `/player_name <uuid>` | 查询最近使用的名称。 | `sparrow.command.player_name` |
| `/name_history <name> [page]` | 查询曾用名。 | `sparrow.command.name_history` |
| `/ip_history <player <name>\|uuid <uuid>\|ip <ip>> [page]` | 查询玩家 IP 历史或某个 IP 的使用记录。 | `sparrow.command.ip_history` |

## 玩家与实体

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/heal [player [--value <amount>]]` | 恢复生命值，不补饥饿值或清除效果。 | `sparrow.command.heal[.other]` |
| `/feed [player [--value <amount>]]` | 恢复饥饿值。 | `sparrow.command.feed[.other]` |
| `/air <player> [--value <amount>]` | 设置剩余氧气；省略数值时补满。 | `sparrow.command.air` |
| `/fly [player [enabled]]` | 切换飞行，或为指定玩家设置开关。 | `sparrow.command.fly[.other]` |
| `/fly_speed <speed> [player]` | 设置飞行速度，范围 -1 到 1。 | `sparrow.command.fly_speed[.other]` |
| `/walk_speed <speed> [player]` | 设置行走速度，范围 -1 到 1。 | `sparrow.command.walk_speed[.other]` |
| `/burn <time> [targets]` | 点燃实体；时长可写 5s。 | `sparrow.command.burn[.other]` |
| `/extinguish [targets]` | 熄灭实体身上的火。 | `sparrow.command.extinguish[.other]` |
| `/smite <targets> [--effect]` | 雷击实体；--effect 仅显示效果。 | `sparrow.command.smite` |
| `/look <face <face>\|location <x> <y> <z>\|entity <entity>> [targets]` | 调整朝向。 | `sparrow.command.look[.other]` |
| `/knockback <x> <y> <z> [player]` | 设置击退方向和速度。 | `sparrow.command.knockback[.other]` |
| `/hat [player]` | 将一件主手物品戴在头上。 | `sparrow.command.hat[.other]` |
| `/respawn [player]` | 让已死亡的玩家重生。 | `sparrow.command.respawn[.other]` |
| `/suicide` | 自杀。 | `sparrow.command.suicide` |
| `/patrol [targets]` | 轮流巡查玩家，支持跨服。 | `sparrow.command.patrol` |
| `/force_say <player> <text>` | 让本服玩家发言。 | `sparrow.command.force_say` |
| `/sudo <player> <command>` | 让本服玩家执行命令。 | `sparrow.command.sudo` |

## 传送

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/world <world> [targets] [--location <x> <y> <z>] [--unsafe]` | 前往本服指定世界。 | `sparrow.command.world[.other]` |
| `/top_block [targets]` | 前往当前方块列的顶部。 | `sparrow.command.top_block[.other]` |
| `/tp_offline <player> [target] [--silent]` | 将自己或本服 target 送到玩家记录的退出位置。 | `sparrow.command.tp_offline` |
| `/server <server> [targets]` | 切换子服。 | `sparrow.command.server[.other]` |
| `/spawn` | 前往配置中的出生点。 | `sparrow.command.spawn` |
| `/back [player] [--unsafe] [--silent]` | 返回上一次传送前的位置。 | `sparrow.command.back[.other]` |
| `/death-back [player] [--unsafe] [--silent]` | 返回上一次死亡位置。 | `sparrow.command.death-back[.other]` |
| `/rtp <player> <region> [--silent]` | 在配置的区域内随机传送。 | `sparrow.command.rtp[.other]` |
| `/rtp_range <player> <server> <world> <min-radius> <max-radius> [options]` | 在指定方形范围内随机传送。 | `sparrow.command.rtp_range[.other]` |
| `/warp <name> [player]` | 前往传送点，支持跨服玩家。 | `sparrow.command.warp[.other]` |
| `/set_warp <name>` | 在当前位置新建传送点。 | `sparrow.command.set_warp` |
| `/del_warp <name>` | 删除传送点。 | `sparrow.command.del_warp` |
| `/warp_list [page]` | 查看传送点列表。 | `sparrow.command.warp_list` |
| `/edit_warp <name> [rename <new_name>\|relocate]` | 查看、改名或移动传送点。 | `sparrow.command.edit_warp` |
| `/home [name]` | 前往自己的家；player.name 可访问他人的家。 | `sparrow.command.home[.other]` |
| `/set_home [name]` | 在当前位置新建家，默认名称为 home。 | `sparrow.command.set_home` |
| `/del_home <name>` | 删除家；支持 player.name。 | `sparrow.command.del_home[.other]` |
| `/home_list [owner\|page] [page]` | 查看自己或他人的家。 | `sparrow.command.home_list[.other]` |
| `/edit_home <name> [rename <new_name>\|relocate]` | 查看、改名或移动家；支持 player.name。 | `sparrow.command.edit_home[.other]` |
| `/sparrow del_all_homes [--player <player>] [--server <server>] [--world <world>]` | 控制台批量删除，至少一个筛选条件，无确认。 | `sparrow.command.del_all_homes` |
| `/tpa <player>` | 请求传送到对方。 | `sparrow.command.tpa` |
| `/tpa_here <player>` | 请求对方传送到自己。 | `sparrow.command.tpa_here` |
| `/tpa_accept [player]` | 接受请求，省略玩家时选择最新请求。 | `sparrow.command.tpa_accept` |
| `/tpa_deny [player]` | 拒绝请求，省略玩家时选择最新请求。 | `sparrow.command.tpa_deny` |
| `/tpa_cancel [player]` | 撤销发出的请求，省略玩家时撤销全部。 | `sparrow.command.tpa_cancel` |

## 容器与物品

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/workbench [player] [--title <text>]` | 打开工作台。 | `sparrow.command.workbench[.other]` |
| `/anvil [player] [--title <text>]` | 打开铁砧。 | `sparrow.command.anvil[.other]` |
| `/grindstone [player] [--title <text>]` | 打开砂轮。 | `sparrow.command.grindstone[.other]` |
| `/smithing_table [player] [--title <text>]` | 打开锻造台。 | `sparrow.command.smithing_table[.other]` |
| `/stonecutter [player] [--title <text>]` | 打开切石机。 | `sparrow.command.stonecutter[.other]` |
| `/cartography_table [player] [--title <text>]` | 打开制图台。 | `sparrow.command.cartography_table[.other]` |
| `/enchantment_table [player] [--title <text>]` | 打开附魔台。 | `sparrow.command.enchantment_table[.other]` |
| `/loom [player] [--title <text>]` | 打开织布机。 | `sparrow.command.loom[.other]` |
| `/ender_chest [player] [--title <text>]` | 让玩家打开自己的末影箱。 | `sparrow.command.ender_chest[.other]` |
| `/clear_inv <player>` | 清空背包、装备、光标与合成栏。 | `sparrow.command.clear_inv` |
| `/clear_ender <player>` | 清空末影箱。 | `sparrow.command.clear_ender` |
| `/repair <player> [--slot <slot>] [--value <amount>]` | 修理装备栏物品，默认主手、完全修复。 | `sparrow.command.repair` |
| `/repair_all <player>` | 修复背包和装备。 | `sparrow.command.repair_all` |
| `/item_damage <player> <value>` | 设置主手物品损耗值。 | `sparrow.command.item_damage` |
| `/enchant <player> <enchantment> [level] [--slot <slot>] [--check]` | 修改附魔；负等级移除，--check 检查原版限制。 | `sparrow.command.enchant` |
| `/item_data [--full] [--chat]` | 查看主手物品数据。 | `sparrow.command.item_data` |
| `/item_name [name] [--json]` | 查看或修改自己的主手 item\_name。 | `sparrow.command.item_name` |
| `/custom_name [name] [--json]` | 查看或修改自己的主手 custom\_name。 | `sparrow.command.custom_name` |
| `/item_lore [--lore <text>] [--operation <operation>] [--line <line>] [--json] [--page <page>]` | 查看或编辑自己的主手物品描述。 | `sparrow.command.item_lore` |
| `/custom_model_data [value]` | 查看或修改第一个自定义模型浮点值。 | `sparrow.command.custom_model_data` |
| `/color <color> [player]` | 修改主手物品染色。 | `sparrow.command.color[.other]` |
| `/more [amount] [player] [--silent]` | 补充或复制主手物品。 | `sparrow.command.more` |
| `/head [source] [amount] [player] [--force] [--silent]` | 获取玩家头颅。 | `sparrow.command.head[.other]` |

## 消息与显示

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/broadcast <message> [--silent]` | 向群组服广播消息。 | `sparrow.command.broadcast` |
| `/actionbar <targets> <message> [--silent]` | 发送快捷栏消息。 | `sparrow.command.actionbar` |
| `/title <targets> <fadeIn> <stay> <fadeOut> <message> [--silent]` | 发送标题，时间单位为 tick。 | `sparrow.command.title` |
| `/toast <targets> <type> <item> <message> [--silent]` | 显示成就提示。 | `sparrow.command.toast` |
| `/totem_animation <targets> <item> [--silent]` | 使用指定物品播放图腾动画。 | `sparrow.command.totem_animation` |
| `/clear_chat [player]` | 清屏，省略玩家时对本服全体生效。 | `sparrow.command.clear_chat` |
| `/demo [player]` | 显示试玩提示。 | `sparrow.command.demo` |
| `/credits [player]` | 显示终末之诗。 | `sparrow.command.credits` |
| `/distance [--max-distance <distance>] [--disable-marker]` | 测量视线距离。 | `sparrow.command.distance` |
| `/highlight [targets] [options]` | 显示区域方块轮廓。 | `sparrow.command.highlight` |

## 补充用法

- `ban_history` 的筛选项为 `--page`、`--active`、`--within <时长>`、`--operator <名称>`，详见[封禁](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/ban.mdx)。
- `rtp_range` 支持 `--center-x`、`--center-z`、`--min-y`、`--max-y`、`--silent`，详见[随机传送](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/rtp.mdx)。
- `edit_home` 和 `edit_warp` 的 `rename`、`relocate` 分别需要在基础权限后追加 `.rename`、`.relocate`。编辑他人的家还需要 `.other`。
- `item_lore` 的操作为 `insert`、`remove`、`edit`、`up`、`down`；不带选项可打开编辑面板。
- `highlight` 的范围、颜色和时长选项见[区域高亮](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/highlight.mdx)。

消息与物品文本使用 MiniMessage。PlaceholderAPI 用 `<papi:占位符>` 或 `<papi:占位符:默认值>`；`item_name`、`custom_name`、`item_lore` 可用 `--json` 输入 JSON。

## 其他权限

| 权限 | 用途 |
| - | - |
| `sparrow.bypass.maintenance` | 维护期间允许进入。 |
| `sparrow.bypass.player_limit` | 满员时允许进入。 |
| `sparrow.bypass.patrol` | 不被巡查选中。 |
| `sparrow.notify.ban` | 接收封禁与解封通知。 |
| `sparrow.bypass.tpa_cooldown` | 跳过请求间隔和拒绝后的等待。 |
| `sparrow.home.limit.<数量> / sparrow.home.limit.unlimited` | 覆盖家的数量限制。 |
| `sparrow.warp.use.<小写名称>` | 启用 permission-restrict 后允许使用对应传送点。 |
| `sparrow.back.staff / sparrow.back.vip` | Back 默认冷却与倒计时覆盖。 |
| `sparrow.deathback.staff / sparrow.deathback.vip` | DeathBack 默认冷却与倒计时覆盖。 |
| `sparrow.rtp.staff / sparrow.rtp.vip` | RTP 默认冷却与倒计时覆盖。 |
| `sparrow.tpa.staff / sparrow.tpa.vip` | TPA 默认传送冷却与倒计时覆盖。 |
| `sparrow.home.teleport.staff / sparrow.home.teleport.vip` | Home 默认冷却与倒计时覆盖。 |
| `sparrow.warp.teleport.staff / sparrow.warp.teleport.vip` | Warp 默认冷却与倒计时覆盖。 |
| `sparrow.spawn.staff` | Spawn 默认冷却与倒计时覆盖。 |

传送覆盖权限可在各功能的 `teleport-options.overrides` 中修改；RTP 区域权限由 `regions.<名称>.permission` 指定。
