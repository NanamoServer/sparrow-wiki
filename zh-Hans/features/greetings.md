# 欢迎与进退服公告

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/greetings>

在各参与子服的 `modules.yml` 中启用 `greetings: true`。公告和私人欢迎写在各服的 `features/greetings.yml`，修改后在相应子服运行 `/spr reload`。

## 玩家什么时候收到消息？

| 时机 | 默认行为 |
| - | - |
| 首次建档 | 整个群组按玩家 UUID 共用一份档案。建档时还没有消息。如果此时掉线，下次登录按老玩家处理，不补发首次欢迎。 |
| 从代理进入第一台子服 | 玩家实际进入游戏后，新人收到私人欢迎文字和标题，其他玩家收到一条 `first_join` 公告。已有档案的玩家触发 `network_join`，只匹配一条上线公告。 |
| 从大厅切到生存服 | 大厅压掉原版退出提示，生存服压掉原版加入提示。默认没有 `server_switch` 规则，两边都安静。想提示切服时，可以在目标服加一条此事件的规则。 |
| 真正断开代理 | 离开子服时只记下玩家当时的名字、隐身状态和权限。代理连接也已断开后，由最后就绪的子服按记录发送一次 `network_quit` 公告，默认全网可见。没有对应的退出记录就保持安静。 |

## 隐身、静默和本人可见性

默认情况下，开启 Sparrow 隐身的玩家，以及拥有 `sparrow.greetings.silent` 权限的玩家，进退服都不发公开公告。隐身或静默的新人仍会收到私人欢迎。将 `suppress-vanished` 设为 `false` 可关闭隐身过滤；将 `silent-permission` 设为 `''` 可关闭静默权限检查。

每条公告的 `include_subject` 决定当事人是否也看得到这条公告。下例中，新人本人只看私人欢迎，其他人看新人公告；老玩家本人和其他人都看上线公告。退出时玩家已经离线，这个选项对退出公告没有影响。

## 配置示例

```yaml
enabled: true
takeover:
  join-message: true
  quit-message: true
privacy:
  suppress-vanished: true
  silent-permission: sparrow.greetings.silent

announcements:
  - id: newcomer
    event: first_join
    permission: ''
    audience: network
    include_subject: false
    messages:
      - '<gold>欢迎 <arg:player_name> 第一次加入服务器！</gold>'
  - id: vip_login
    event: network_join
    permission: sparrow.greetings.vip
    audience: network
    include_subject: true
    messages:
      - '<gold>[VIP]</gold> <green>[+]</green> <arg:player_name>'
  - id: login
    event: network_join
    permission: ''
    audience: network
    include_subject: true
    messages:
      - '<green>[+]</green> <arg:player_name>'
  - id: logout
    event: network_quit
    permission: ''
    audience: network
    include_subject: false
    messages:
      - '<red>[-]</red> <arg:player_name>'

welcomes:
  - id: first_steps
    event: first_join
    permission: ''
    messages:
      - '<gold>欢迎你，<arg:player_name>！</gold>'
    title:
      text: '欢迎加入'
      subtitle: '输入 /help 查看帮助'
      fade_in: 500ms
      stay: 3s
      fade_out: 1s
```

`announcements` 和 `welcomes` 各自从上到下取第一条同时匹配事件和当事人权限的规则，所以 VIP 规则放在通用上线规则前。`permission: ''` 匹配所有人。`audience: network` 发到启用本模块的各子服，`server` 只发本服。文本支持 MiniMessage，`<arg:player_name>` 指当事人，`<papi:...>` 按每位接收者解析。切服时还可用 `<arg:from_server>` 和 `<arg:to_server>`。
