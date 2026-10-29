# 死亡消息

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/death-messages>

模块 `death_messages` · 配置 `features/death_messages.yml`

按原版死亡情境自定义玩家死亡公告，每种情境都可以编写完整句子。消息支持 MiniMessage、玩家悬浮文本和原版提供的武器详情，可选择只在本服公告或跨服广播。

死亡归因沿用 Minecraft 的判断，包括逃离攻击者时死亡、被攻击后坠落等情境。死亡界面保留原有消息；服务器或其他插件已经隐藏的死亡公告，Sparrow 不会重新显示。

## 启用与重载

模块默认启用，持久开关位于 `modules.yml`：

```yaml
death_messages: true
```

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/spr feature_enable death_messages` | 立即启用本服死亡公告改写。 | `sparrow.command.admin.feature` |
| `/spr feature_disable death_messages` | 立即停止本服死亡公告改写。 | `sparrow.command.admin.feature` |
| `/spr reload` | 应用配置修改。 | `sparrow.command.admin.reload` |

启用和停用命令只改变当前状态，不保存开关。需要在重载或重启后保留选择时，请修改 `modules.yml`。DeathMessages 配置无效时，该模块重载失败，并继续使用上次成功加载的设置。

本功能没有专用命令或权限。停用模块后，本服发生的死亡不再由它改写；玩家仍可能收到其他子服发来的跨服死亡公告。模块管理入口见[命令与权限](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands.mdx)。

## 配置示例

自动生成的配置包含 101 条默认规则。下面仅展示少量规则和自定义展示文本，建议在已生成的文件中编辑，以保留其他死亡情境的规则。

```yaml
broadcast: false
disabled_worlds: []

anti-spam:
  enabled: true
  interval: 30s
  max-messages: 3
  show-to-victim: true

format: '<dark_gray>☠ <gray><arg:message>'

display:
  player:
    name: '<white><arg:display_name>'
    hover:
      - '<gray>玩家：<white><arg:name>'
      - '<gray>服务器：<white><arg:server>'
  mob:
    name: '<yellow><arg:entity_name>'

fallback:
  - '<arg:original>'

rules:
  - id: player_with_weapon
    message_key: death.attack.player.item
    broadcast: true
    messages:
      - '<arg:attacker> 使用 <arg:weapon> 击杀了 <arg:victim>'
      - '<arg:victim> 被 <arg:attacker> 使用 <arg:weapon> 击败了'

  - id: lava_escape
    message_key: death.attack.lava.player
    messages:
      - '<arg:victim> 为了躲避 <arg:attacker>，跳进了岩浆'

  - id: ladder_fall
    message_key: death.fell.accident.ladder
    messages:
      - '<arg:victim> 从梯子上摔了下来'
```

## 规则与回退文案

| 字段 | 含义 |
| - | - |
| `id` | 规则名称，不能为空，且必须唯一。 |
| `message_key` | 原版死亡消息的完整标识，区分大小写，也区分后缀。 |
| `broadcast` | 可选，覆盖公共广播设置。 |
| `disabled_worlds` | 可选，替换公共禁用世界列表。 |
| `messages` | 必填的完整句子列表，每次死亡随机选一条。 |

同一个 `message_key` 出现在多条规则中时，采用第一条。匹配要求完整标识一致，例如 `death.attack.player` 不会同时匹配 `death.attack.player.item`。

同一次死亡的所有接收者使用同一条随机文案。每条文案都可以自由安排死者、攻击者和武器的位置。

- `messages: []` 隐藏该死亡情境的公告，也不发送外层 `format`。
- 随机选中的文案为空字符串时，同样隐藏公告。
- 规则决定隐藏公告后，不继续匹配其他规则，也不使用 `fallback`。
- 未匹配任何规则的死因，从 `fallback` 中随机选一条，并采用公共 `broadcast` 和 `disabled_worlds`。
- 默认的 `<arg:original>` 在外层格式中保留原版死亡消息。`fallback: []` 隐藏所有未覆盖的情境。

常用的原版标识：

| `message_key` | 情境 |
| - | - |
| `death.attack.player` | 被玩家击杀。 |
| `death.attack.player.item` | 被玩家击杀，且原版提供武器详情。 |
| `death.attack.mob` | 被生物击杀。 |
| `death.attack.arrow.item` | 被射杀，且原版提供武器详情。 |
| `death.attack.lava` | 死于岩浆。 |
| `death.attack.lava.player` | 躲避攻击者时死于岩浆。 |
| `death.fell.accident.ladder` | 从梯子上摔落。 |
| `death.fell.assist.item` | 因攻击者而坠落死亡，且原版提供武器详情。 |
| `death.fell.finish` | 坠落后被攻击者补刀。 |
| `death.attack.badRespawnPoint.message` | 床或重生锚爆炸，带原版死亡原因链接。 |

`.player` 是原版标识的一部分，归因对象也可能是生物。其他标识可参考生成的默认规则。

## 广播范围与世界覆盖

| 公共配置 | 默认值 | 含义 |
| - | - | - |
| `broadcast` | `false` | `false` 为本服公告，`true` 为 Sparrow 群组服广播。 |
| `disabled_worlds` | `[]` | 隐藏发生在这些世界的死亡公告，按死亡发生服务器的世界名称精确匹配。 |

规则省略某个字段时，继承对应的公共值；显式填写时，使用规则自己的值：

- 规则中的 `broadcast: false` 可以覆盖公共 `broadcast: true`；`false` 仍会在本服公告。
- 规则中的 `disabled_worlds: []` 清空该规则的禁用世界限制。
- 规则中的非空世界列表完整替换公共列表，两者不合并。

例如，下面默认跨服广播，并隐藏 `lobby` 的死亡公告；武器击杀规则改为本服公告，而且允许公告发生在 `lobby` 的死亡：

```yaml
broadcast: true
disabled_worlds: [lobby]

rules:
  - id: local_weapon_kill
    message_key: death.attack.player.item
    broadcast: false
    disabled_worlds: []
    messages:
      - '<arg:victim> 被 <arg:attacker> 使用 <arg:weapon> 击杀'
```

这些设置以死亡发生的服务器为准。禁用世界会向所有人隐藏该次公告，包括其他子服的玩家；它不按接收者当前所在的世界筛选。接收服务器使用已经选定的公告，不会重新选择规则或文案。

跨服公告需要各接收子服安装支持此功能的 Sparrow，并按[简介](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/intro.mdx)配置群组服。玩家和武器的悬浮详情会在跨服后保留。

## 名称、悬浮文本与占位符

| 配置 | 用途 |
| - | - |
| `format` | 聊天外层格式，`<arg:message>` 插入选中的完整句子。 |
| `display.player.name` | 死者与玩家攻击者共用的显示格式。 |
| `display.player.hover` | 鼠标悬浮于玩家名称时显示的多行文本；`[]` 表示不附加自定义悬浮文本。 |
| `display.mob.name` | 生物名称格式，`<arg:entity_name>` 保留自定义名字和原版可翻译名称。 |

规则文案、回退文案和外层格式可使用以下参数：

| 参数 | 含义 |
| - | - |
| `<arg:victim>` | 死者，使用配置中的玩家展示格式。 |
| `<arg:attacker>` | 原版归因的攻击者，使用对应的玩家或生物展示格式，仅在适用情境存在。 |
| `<arg:weapon>` | 原版消息提供的武器名称和物品悬浮详情，仅在适用的 `.item` 情境存在。 |
| `<arg:death_reason>` | 床或重生锚爆炸的特殊死亡原因链接。 |
| `<arg:original>` | 完整原版死亡消息，保留其原有名称和悬浮详情。 |
| `<arg:server>` | 死亡发生的服务器 ID。 |
| `<arg:world>` | 死亡发生的世界名称。 |
| `<arg:x>`、`<arg:y>`、`<arg:z>` | 死亡位置的方块坐标。 |
| `<arg:message_key>` | 此次死亡对应的原版消息标识。 |

`attacker`、`weapon` 和 `death_reason` 并非每次死亡都有。请在对应规则中使用，或在共用模板里提供默认值，例如 `<arg:weapon:'未知武器'>`。武器是否可用沿用原版死亡消息的判断，手持武器不代表公告一定提供武器详情；默认的所有 `.item` 规则都包含 `<arg:weapon>`。

在 `display.player` 内，`<arg:name>` 表示正在展示的玩家账号名，`<arg:display_name>` 表示其显示名；`<arg:server>` 仍表示死亡发生的服务器。

PlaceholderAPI 是可选依赖。安装后使用 `<papi:占位符>` 或 `<papi:占位符:默认值>`，不用 `%占位符%`：

- 在 `display.player.name` 和 `display.player.hover` 中，PAPI 按正在展示的玩家解析：展示死者时使用死者，展示玩家攻击者时使用该攻击者。
- 在 `messages`、`fallback` 和 `format` 中，PAPI 按每位接收者解析。例如 `<papi:player_name>` 显示查看消息的人，即使此人位于其他子服。
- 生物展示文本没有玩家专属的 PAPI 解析对象。

## 防刷屏

| 配置 | 默认值 | 含义 |
| - | - | - |
| `anti-spam.enabled` | `true` | 限制同一玩家反复死亡产生的公告。 |
| `anti-spam.interval` | `30s` | 带单位的正时长，例如 `30s` 或 `1m`。 |
| `anti-spam.max-messages` | `3` | 时间范围内正常公告的最大次数，必须为正数。 |
| `anti-spam.show-to-victim` | `true` | 超额公告只发给死者；`false` 则向所有人隐藏。 |

默认情况下，同一玩家在此前 30 秒内的前三次死亡正常公告，超出的死亡只向本人显示，也不会跨服广播。超额死亡仍然计数，因此持续死亡可能一直处于限制中，直到较早的死亡超出时间范围。

被服务器、其他插件、禁用世界或空文案隐藏的死亡不计数，`show-to-victim` 也不会绕过这些隐藏规则。次数在各服务器分别计算，玩家离开该服务器或模块停用时会重置。
