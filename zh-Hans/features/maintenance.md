# 维护模式

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/maintenance>

模块 `maintenance` · 配置 `features/maintenance.yml`

维护期间阻止普通玩家进入，并向在线玩家显示 BossBar。

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/maintenance [true\|false] [--all] [--tag <tag>]` | 切换维护状态。 | `sparrow.command.maintenance` |

```text
/maintenance true
/maintenance false --all
/maintenance true --tag survival
```

不带参数时切换本服状态；指定 `true` 或 `false` 可明确开启或关闭。`--all` 应用到在线群组服，`--tag` 按服务器标签筛选。`sparrow.bypass.maintenance` 允许维护期间进入。

`active` 保存维护状态，`boss-bar.enabled` 控制提示条，颜色与样式也在 `boss-bar` 中设置。
