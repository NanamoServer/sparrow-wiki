# 传送请求

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/tpa>

玩家向另一位在线玩家发出请求，对方同意后才传送。两人可以在不同的子服，请求、回应和传送都会跨服送达。

## 命令与权限

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/tpa <player>` | 请求传送到对方身边。 | `sparrow.command.tpa` |
| `/tpa-here <player>` | 请求对方传送到自己身边。 | `sparrow.command.tpa-here` |
| `/tpa-accept [player]` | 接受收到的请求，不填玩家时接受最近收到的那条。 | `sparrow.command.tpa-accept` |
| `/tpa-deny [player]` | 拒绝收到的请求，不填玩家时拒绝最近收到的那条。 | `sparrow.command.tpa-deny` |
| `/tpa-cancel [player]` | 取消发给某位玩家的请求，不填玩家时取消自己发出的全部请求。 | `sparrow.command.tpa-cancel` |

这些命令仅玩家可用，也可以写成 `/sparrow <命令>`。别名包括 `/tpahere`、`/tpaccept`、`/tpdeny` 和 `/tpacancel`。

## 请求的处理过程

目标必须在群组服里在线。收到请求的玩家会看到一条带 **\[接受]** 和 **\[拒绝]** 按钮的消息，点击按钮等同于执行对应的命令。

一位玩家可以同时向多人发出请求，但发给同一个人的请求在得到回应、被取消或过期之前，不能再发第二条。请求默认 60 秒内有效，过期时双方都会收到提示。

请求被接受后，被传送的一方按传送分组的设置走完冷却和倒计时，再落到对方当时所在的位置：

- `/tpa` 传送的是发起者。
- `/tpa-here` 传送的是接受请求的玩家。

落点所在的服务器在接受时确定。倒计时期间对方换了服务器或下线，传送会取消并提示被传送的玩家。

`/tpa-accept`、`/tpa-deny` 和 `/tpa-cancel` 的玩家名补全只在 Paper 及其分支上可用，Spigot 上需要手动输入。

## 冷却

有两种冷却，都只限制发起请求：

| 冷却 | 默认时长 | 说明 |
| - | - | - |
| 发起冷却 | 10 秒 | 两次发出请求之间的间隔，`/tpa` 和 `/tpa-here` 共用，在各子服之间通用。没有发出去的请求不计入。 |
| 拒绝冷却 | 120 秒 | 被某位玩家拒绝后，这段时间内不能再向这位玩家发起请求。请求自然过期或被自己取消不会触发。 |

拥有 `sparrow.bypass.tpa-cooldown` 的玩家不受这两种冷却限制。

## 配置

```yaml title="features.yml · tpa"
tpa:
  enabled: true
  expire-seconds: 60
  request-cooldown-seconds: 10
  deny-cooldown-seconds: 120
  teleport-group: default
```

| 配置项 | 说明 |
| - | - |
| `expire-seconds` | 请求多少秒没有被处理就过期，至少为 1。 |
| `request-cooldown-seconds` | 发起冷却的秒数，填 `0` 关闭。 |
| `deny-cooldown-seconds` | 拒绝冷却的秒数，填 `0` 关闭。 |
| `teleport-group` | 请求被接受后的传送使用的传送分组，两个方向共用。 |

默认分组下，被传送的玩家等待 3 秒，倒计时期间移动超过半格、切换世界或受伤会取消传送。冷却、倒计时、世界限制和音效在 `teleport.yml` 的分组里配置，见[传送分组](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)。

修改配置后执行 `/sparrow reload`。各子服的 `tpa` 配置应保持一致。停用功能会隐藏相关命令。

> **备注**
>
> 请求由发出它的那台服务器负责到期清理。这台服务器在请求到期前关闭或重启时，请求仍会失效，但双方不会收到过期提示。
