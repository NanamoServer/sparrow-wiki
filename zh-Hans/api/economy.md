# 货币经济 API

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/api/economy>

下面用任务奖励和箱子商店举例。把当前版本的 Sparrow 加入插件的编译依赖（`compileOnly`），并声明 Sparrow 为服务端依赖，让它先加载。示例中的 `playerId`、`buyer`、`seller` 都是玩家 UUID。

## 取得服务和币种

```java
EconomyApi api = EconomyApi.get();
if (api == null) return;
EconomyCurrency coin = api.currency("coin");
if (coin == null) return;
```

模块未启用时，`get()` 返回 `null`。查币种用配置文件名对应的 ID，例如 `coin.yml` 用 `coin`。未注册的 ID 返回 `null`。把查到的 `EconomyCurrency` 传给后续操作，`api.currencies()` 可以列出已注册的币种。

## 发奖励、扣款和转账

```java
var reward = api.give(playerId, coin, new BigDecimal("12.50"), "QuestPlugin");
var debit = api.take(playerId, coin, new BigDecimal("2.00"), "QuestPlugin", "Entry fee");
```

每次写入都要填写 `actor`，管理员查账时能看到谁发起了操作。`reason` 可省略。金额用十进制字符串构造 `BigDecimal`，钱包按四位小数四舍五入；显示时才按币种精度向下截断。

```java
api.transfer(buyer, seller, coin, new BigDecimal("18.75"), "ChestShop", "3 golden apples")
    .whenComplete((result, error) -> {
        if (error != null) {
            logger.log(java.util.logging.Level.SEVERE, "Payment failed", error);
            return;
        }
        if (result.status() == EconomyResult.Status.SUCCESS) {
            logger.info("Paid. Buyer: " + result.balance() + ", seller: " + result.recipientBalance());
        } else {
            logger.info("Payment declined: " + result.status());
        }
    });
```

`transfer` 在同一笔事务里扣买家的钱、给卖家入账，支持离线和跨服账户。余额不足会正常返回 `INSUFFICIENT_FUNDS`；还可能返回 `INVALID_AMOUNT`、`SAME_ACCOUNT` 或 `TRANSFER_DISABLED`。商店应在 `SUCCESS` 后发货，修改玩家背包时按服务端要求调度。

同服涉及同一账户的写入按受理顺序执行，跨服由数据库决定顺序。后一笔业务若要求前一笔成功，先检查结果，再用 `thenCompose` 提交。

## 读余额、排名和流水

`api.peekBalance(playerId, coin)` 同步读取快照，尚未就绪时返回 `null`。需要权威余额或查询离线玩家时，用 `api.readBalance(playerId, coin)` 返回的 Future。要显示刚成交后的余额，直接取本笔 `result.balance()`。

```java
var ranks = api.top(coin, 10, 5);
var query = net.momirealms.sparrow.feature.economy.history.EconomyHistoryQuery.search(
    playerId, coin.id(), BigDecimal.ONE, null, java.time.Duration.ofDays(7));
var firstPage = api.history(query, null, 20);
```

排名示例跳过前 10 名，取第 11～15 名的 UUID 和四位余额。`api.top(coin, limit)` 从榜首开始，接受任意正整数人数。每次查询独立取数。流水示例查最近 7 天、变动绝对值至少为 1 的成功记录；在 Future 完成后取 `page.entries()`，若 `page.next()` 非空，用原来的 `query` 和这个游标查询下一页。
