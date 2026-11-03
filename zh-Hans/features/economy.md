# 多货币经济

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/economy>

在 `modules.yml` 设置 `economy: true` 后重启。默认金币使用 `/money` 或 `/coins`，点券使用 `/points`。每种货币独立记账，新玩家余额为零。

## 设置币种

在 `plugins/Sparrow/features/economy/currencies/` 中编辑币种文件。文件名是币种 ID；想把金币改叫「云币」，只改 `coin.yml` 的 `display.name`。`commands.aliases` 决定命令名，`display.format` 和 `display.short-format` 可以使用 `<amount>`、`<name>`、`<symbol>`。`balance.precision` 支持 0～2；设为 2 时，实际余额 123.4993 显示为 123.49。

`transfer.enabled` 控制玩家转账；默认金币可转，点券不可转。`transfer.permission` 可以额外限制付款人。`transfer.allow-offline-recipient` 默认关闭，玩家仍可向其他服的在线玩家转账。管理员可以给离线钱包增扣款；给在线目标增扣时，对方会收到通知，命令末尾加 `--silent` 或 `-s` 可静默操作。

## 富豪榜与查账

`/money top` 默认取全服前 50 个正余额钱包，包含离线玩家。可指定 1～1000 人，每页 10 人。翻页时名次固定，重新打开可看最新排名。

管理员可用 `/money history player Alex --min 10 --within 7d` 查看 Alex 最近 7 天金额至少为 10 的金币流水。点开转账能看到付款人和收款人，返回后保留原筛选和页码。主配置 `features/economy/economy.yml` 中，`history.page-size` 默认 15，`history.retention-days` 默认 90。

安装 PlaceholderAPI 后，可对本服在线玩家使用 `%sparroweco_balance_coin%`, `%sparroweco_integer_balance_coin%`, `%sparroweco_formatted_balance_coin%`, `%sparroweco_short_balance_coin%`. 将末尾的 `coin` 换成其他币种 ID 即可。

[命令与权限](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/commands.mdx) · [货币经济 API](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/api/economy.mdx)
