# 高亮 API

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/api/highlight>

通过 `net.momirealms.sparrow.service.highlight.Highlight` 向本服玩家显示方块轮廓。服务随 Sparrow 启动，关闭[高亮命令](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/highlight.mdx)后仍可使用。

## 显示选区

```java
HighlightSubmission preview = Highlight.builder()
        .region(first, second, RegionMode.NON_AIR)
        .color(NamedTextColor.AQUA)
        .onLeave(player -> menu.closeFor(player))
        .onEnd(menu::release)
        .commit(viewers);
```

示例中的 `menu` 是调用方为这次预览创建的共享界面。只需要轮廓时可以省略回调。每个 builder 提交一次，观看者可以是单个 `Player` 或玩家集合。默认颜色为绿色，省略时长会持续显示到会话结束。用 `.duration(Duration.ofSeconds(10))` 指定显示十秒后到期；用 `preview.remove()` 可以随时撤销，包括构包期间。重复撤销是安全的。

| 目标 | 显示的位置 |
| - | - |
| `block(block)` | 一个方块位置。 |
| `blocks(blocks)` | 同一世界内去重后的离散位置，可以互不相邻。 |
| `region(first, second)` 或 `OUTLINE` | 包含两端的长方体的六个外表面。 |
| `region(first, second, RegionMode.NON_AIR)` | 全部非空气方块，包括流体和被包围的方块。 |
| `region(first, second, RegionMode.EXPOSED_SOLID)` | 位于边界或六面中至少一面邻接可穿过方块的不可穿过方块。 |

再次设置目标会覆盖前一次选择。离散集合按去重后的位置数计算，长方体按筛选前的总体积计算，两者上限都是 32768。服务在提交时读取一次选区。和平难度世界不支持高亮。

## 首次结果和会话结束

`preview.result()` 在首次处理完成时返回结果。`Displayed` 包含已提交显示包和不可用观看者的两组 UUID。`Rejected` 表示世界无效、和平难度、高度越界、选区过大或目标为空。`Cancelled` 表示显示前已撤销。构包或发送失败时，结果阶段异常完成。

- 已看到轮廓的玩家切世界、重生或退出时，`onLeave(Player)` 对该玩家触发一次。其他玩家继续观看，离开的玩家返回原世界后需要重新提交。
- 整场高亮释放后，`onEnd(Runnable)` 触发一次，包括请求被拒绝、无人可看、主动撤销、自然到期或 Sparrow 停用。最后一名观看者离开时，先触发他的离开回调。到期和主动撤销只触发结束回调。
- 两种回调都在会话锁外按顺序执行，线程由触发事件决定。请求立即被拒绝时，`onEnd` 可能在 `commit` 返回前执行。
