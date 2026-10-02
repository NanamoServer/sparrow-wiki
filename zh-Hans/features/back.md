# 返回上一位置

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/back>

使用 `/back` 回到上一次传送或死亡前所在的位置，即使那个位置在另一台服务器上。

## 命令与权限

| 命令 | 用途 | 默认命令权限 |
| - | - | - |
| `/back` | 回到自己的上一个位置。 | `sparrow.command.back` |
| `/back <player>` | 让指定玩家回到上一个位置。 | `sparrow.command.back` + `sparrow.command.back.other` |

也可以使用 `/sparrow back [player]`。省略 `player` 时回到自己的上一个位置；控制台必须指定玩家。

填写玩家时需要基础权限和 `.other`，填写自己的名字也一样。没有 `.other` 时，补全不会显示玩家参数，手动输入也无法执行。`.other` 权限由 `commands.yml` 中的基础权限加上 `.other` 组成。

```text title="示例"
/back
/back Steve
```

## 哪些位置会被记下

- 命令或其他插件传送玩家之前所在的位置。哪些类型的传送会被记录可以配置。
- 玩家死亡的位置，需要开启 `record-death`。
- 切换服务器后，玩家离开上一台服务器时的位置，直到在当前服务器上记下新的位置为止。

每名玩家只保留一个上一位置，新的会替换旧的。`/back` 本身也是一次传送，所以再执行一次就会回到刚才的位置。

以下情况不会记录：

- 同一世界内不到一格的移动，例如用 `/look` 转身。
- 连上服务器后几秒内的传送（`join-grace-seconds`）。出生点插件通常会在这时移动玩家。如果服务器会发送资源包，加载资源包的时间也算在内。
- 被其他插件取消的传送。

## 返回其他服务器

当前服务器还没有记录时，`/back` 会查看玩家上一次离开服务器时的位置。如果那是另一台服务器，并且玩家是在 `server-switch-window-seconds` 秒内从那里切换过来的，`/back` 会通过代理把玩家送回那个位置。下线后过一段时间再登录不算切换服务器，此时 `/back` 会提示没有可以返回的位置。

如果那台服务器不在线，或者那个位置所在的世界已经不存在，玩家会收到提示并留在原地。

## 倒计时与冷却

自己返回时默认等待 3 秒。倒计时期间移动超过半格、切换世界或受伤会取消传送。让其他玩家返回时立即执行；填写自己的名字时仍然使用自己的倒计时与冷却。

这些设置放在 `features.yml` 的 `back` 分组中。倒计时显示、音效，以及缩短或跳过等待的权限，见[传送设置](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/teleport.mdx)。

## 上一位置什么时候会丢失

上一位置只在玩家留在这台服务器期间保存。玩家离开这台服务器、功能被停用、服务器重启或崩溃时都会清空。如果上一台服务器在玩家离开之前崩溃，`/back` 无法回到那里。

## 配置

```yaml title="features.yml · back"
back:
  enabled: true
  record-death: true
  teleport-causes:
    - COMMAND
    - PLUGIN
  join-grace-seconds: 3
  server-switch-window-seconds: 30
  warmup-seconds: 3
  cooldown-seconds: 0
  cancel-on-move: true
  cancel-on-damage: true
```

| 配置项 | 含义 |
| - | - |
| `record-death` | 是否记录死亡位置。 |
| `teleport-causes` | 哪些类型的传送会记录传送前的位置。常用值：`COMMAND`（命令）、`PLUGIN`（插件）、`NETHER_PORTAL`（下界传送门）、`END_PORTAL`（末地传送门）、`END_GATEWAY`（末地折跃门）、`ENDER_PEARL`（末影珍珠）、`SPECTATE`（旁观传送）。默认不包含传送门。填写了不存在的值时功能无法启动，并在控制台输出错误。 |
| `join-grace-seconds` | 连上服务器后多少秒内的传送不记录。 |
| `server-switch-window-seconds` | 玩家离开上一台服务器多久以内，`/back` 才会回到那里，单位为秒。 |
| `warmup-seconds` | 自己返回前等待的秒数，`0` 表示立即传送。 |
| `cooldown-seconds` | 两次 `/back` 之间的冷却秒数，各服务器共享，`0` 表示不限制。 |
| `cancel-on-move` | 移动超过半格或切换世界时，是否取消倒计时。 |
| `cancel-on-damage` | 受伤时是否取消倒计时。 |

修改后执行 `/sparrow reload` 生效。
