# 玩家头颅

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/head>

模块 `head` · 配置 `features/head.yml`

根据玩家名称或 UUID 获取头颅。省略来源时获取自己的头颅。

## 命令与权限速查

| 命令 | 用途 | 默认权限 |
| - | - | - |
| `/head [source] [amount] [player] [--force] [--silent]` | 获取玩家头颅。 | `sparrow.command.head[.other]` |

## 使用说明

```text
/head Notch
/head Notch 16 Steve --force
```

数量范围为 1–6400。`--force` 强制刷新资料；默认先使用在线玩家纹理，再查询 API。获取顺序、缓存和接口地址在配置文件中调整。

## 配置示例

```yaml
# 先取在线玩家的皮肤，再向接口查询
source-order: [online, api]
```
