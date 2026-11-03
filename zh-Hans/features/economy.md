# 多货币经济

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/economy>

在 `modules.yml` 设置 `economy: true` 后重启。默认金币使用 `/money` 或 `/coins`，点券使用 `/points`。每种货币独立记账，新玩家余额为零。

## 命令与权限速查

以金币别名 `/money` 为例。`/economy <币种 ID>` 后面可接相同子命令；`/economy history` 可跨币种查账。

| 命令 | 用途 | 权限 |
| - | - | - |
| `/money` | 查看自己的余额 | `sparrow.command.economy.balance` |
| `/money balance <player>` | 查看玩家的精确余额 | `sparrow.command.economy.inspect` |
| `/money give <player> <amount> [reason] [-s]` | 增加余额 | `sparrow.command.economy.give` |
| `/money take <player> <amount> [reason] [-s]` | 扣除余额 | `sparrow.command.economy.take` |
| `/money pay <player> <amount>` | 转账 | `sparrow.command.economy.pay` |
| `/money top [limit]` | 打开富豪榜 | `sparrow.command.economy.top` |
| `/money history all` | 查看币种流水 | `sparrow.command.economy.history` |
| `/money history player <player>` | 按玩家查账 | `sparrow.command.economy.history` |
| `/money history transaction <id>` | 查看整笔交易 | `sparrow.command.economy.history` |

`sparrow.command.economy.pay.offline` 允许向离线玩家付款，默认 OP 拥有。查账列表接受 `--min`、`--max` 和 `--within`。

## 默认配置

**经济模块配置文件**

- `plugins/Sparrow`
  - `modules.yml` — 在这里启用 economy 模块。
  - `features`
    - `economy`
      - `economy.yml` — 设置查账页大小、流水保留天数和 Vault 币种。
      - `currencies`
        - `coin.yml` — 金币的显示格式、命令别名和转账规则。
        - `points.yml` — 点券默认显示整数，并关闭玩家转账。

### economy.yml

```yaml
vault:
  enabled: true  # 安装 Vault 时启用兼容。
  currency: "coin"  # 填写币种文件名，不带 .yml。

history:
  retention-days: 90  # 从成交时间起算，0 表示永久保留。
  page-size: 15  # 每页展示的流水条数，至少为 1。
```

安装 Vault 时，使用 Vault 的商店等插件会通过 `vault.currency` 指定的币种收付款。这里填币种 ID，例如 `coin`。`history.retention-days` 从成交时间起算，设为 `0` 可永久保留流水。`history.page-size` 控制查账窗口每页行数，至少为 `1`。

### coin.yml

```yaml
display:
  name: "金币"  # 玩家看到的币种名称。
  symbol: "￥"  # 模板使用 <symbol> 时显示。
  format: "<gold><amount> <name></gold>"  # 完整金额模板。
  short-format: "<amount> <name>"  # 缩写模板，可显示 K、M、B。
  group-thousands: true  # 格式化金额时使用千分位。

commands:
  aliases: [money, coins]  # 命令别名，不带斜杠。

balance:
  precision: 2  # 可选 0～2；2 表示显示到小数点后两位。

transfer:
  enabled: true  # 允许玩家使用 pay 转账。
  allow-offline-recipient: false  # false 要求普通付款人的收款对象在任一服在线。
  permission: ""  # 留空表示不额外要求付款权限。
```

### points.yml

```yaml
display:
  name: "点券"  # 玩家看到的币种名称。
  symbol: "★"  # 模板使用 <symbol> 时显示。
  format: "<aqua><amount> <name></aqua>"  # 完整金额模板。
  short-format: "<amount> <name>"  # 缩写模板，可显示 K、M、B。
  group-thousands: true  # 格式化金额时使用千分位。

commands:
  aliases: [points]  # 命令别名，不带斜杠。

balance:
  precision: 0  # 只显示整数，实际余额保留四位。

transfer:
  enabled: false  # 关闭玩家转账，管理员仍可增扣。
  allow-offline-recipient: false  # false 要求普通付款人的收款对象在任一服在线。
```

## 设置币种

在 `plugins/Sparrow/features/economy/currencies/` 中编辑币种文件。文件名是币种 ID；想把金币改叫「云币」，只改 `coin.yml` 的 `display.name`。`commands.aliases` 决定命令名，`display.format` 和 `display.short-format` 可以使用 `<amount>`、`<name>`、`<symbol>`。`balance.precision` 支持 0～2；设为 2 时，实际余额 123.4993 显示为 123.49。

`transfer.enabled` 控制玩家转账；默认金币可转，点券不可转。`transfer.permission` 可以额外限制付款人。`transfer.allow-offline-recipient` 默认关闭，玩家仍可向其他服的在线玩家转账。管理员可以给离线钱包增扣款；给在线目标增扣时，对方会收到通知，命令末尾加 `--silent` 或 `-s` 可静默操作。

## 富豪榜与查账

`/money top` 默认取全服前 50 个正余额钱包，包含离线玩家。可指定 1～1000 人，每页 10 人。翻页时名次固定，重新打开可看最新排名。

管理员可用 `/money history player Alex --min 10 --within 7d` 查看 Alex 最近 7 天金额至少为 10 的金币流水。点开转账能看到付款人和收款人，返回后保留原筛选和页码。主配置 `features/economy/economy.yml` 中，`history.page-size` 默认 15，`history.retention-days` 默认 90。

![资金流水列表，绿色为入账，红色为扣款](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/img/features/currency-history.png)

用 `/economy history all` 查看全部玩家和币种的流水。点击一行可查看这笔交易的详情。

## PlaceholderAPI

下面以默认金币配置、实际余额 `12345.6789` 为例。占位符用于本服在线玩家；玩家离线或余额尚未就绪时返回空文本。

| 占位符 | 输出规则 | 示例 |
| - | - | - |
| `%sparroweco_balance_coin%` | 按币种展示精度截断的纯数字，无千分位 | `12345.67` |
| `%sparroweco_integer_balance_coin%` | 向下取整，无小数位 | `12345` |
| `%sparroweco_formatted_balance_coin%` | 套用 `display.format`，输出纯文本 | `12,345.67 金币` |
| `%sparroweco_short_balance_coin%` | 套用 `display.short-format`，以 K、M、B 缩写 | `12.34K 金币` |

查点券时把末尾的 `coin` 换成 `points`，例如 `%sparroweco_balance_points%`。在 Sparrow 自己的 MiniMessage 文本中写 `<papi:sparroweco_formatted_balance_coin>`；其他支持 PlaceholderAPI 的插件使用表中的百分号写法。

[命令与权限](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands.mdx) · [货币经济 API](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/api/economy.mdx)
