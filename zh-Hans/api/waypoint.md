# Waypoint API

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/api/waypoint>

Waypoint 让一个本服玩家看到指向目标的标记。**观察者**是看到标记的玩家，**目标**是真实位置，**锚点**是标记的显示位置。目标很远时，标记可以投影到观察者附近；到达判定和距离文字仍使用真实目标。

## 创建和管理追踪

将 Sparrow 加入插件的编译依赖，并声明运行时依赖 Sparrow。入口是 `net.momirealms.sparrow.service.waypoint.Waypoint`，调用顺序为 `Waypoint.builder().target(target).track(viewer)`。其中 `target` 必填，`viewer` 必须是已经进入本服游戏的 Bukkit `Player`。在 `track` 之前可设置名称、样式、距离和回调。

每次 `track(viewer)` 都返回独立的 `WaypointTracking`。同一玩家同时追踪北门和队友时，分别保留两个句柄；对北门句柄调用 `stop()` 只结束北门追踪。重复停止是安全的。观察者离服会结束其所有会话。

## 选择目标

| 工厂或接口 | 解析方式 |
| - | - |
| `WaypointTarget.ofPos(world, x, y, z)` | 按世界名和 XYZ 追踪固定坐标。已有坐标快照时可用 `ofPos(WorldLocation)`。 |
| `WaypointTarget.ofPlayer(uuid)`、`ofPlayer(name)` | 按 UUID 或完整玩家名跟随本服玩家。目标重新上线并与观察者处于同一世界后，可重新定位。 |
| `WaypointTarget.ofEntity(uuid)` | 跟随已加载实体。实体卸载期间无法定位，重新加载后继续追踪。 |
| `WaypointTarget.resolve(viewer)` | 自定义目标每轮为观察者返回一个 `WorldLocation`，暂时无法定位时返回 `null`。解析在异步刷新线程执行，避免阻塞等待外部数据。 |

## 距离与可见性

| 方法 | 默认值 | 含义 |
| - | - | - |
| `followDistance(blocks)` | 60 格 | 观察者眼睛到投影锚点的最大距离，取有限正数。近处的锚点可以落在目标本身。 |
| `hideWithin(blocks)` | 0 | 观察者脚下与真实目标的距离小于或等于该半径时隐藏整组标记。离开后恢复。取有限非负数，0 关闭范围隐藏及到达、离开回调。 |
| `moveTolerance(blocks)` | 0.05 格 | 单个元素相对上次发送位置的累计位移超过该值时更新位置。取有限非负数，0 表示每次位置变化都更新。文字内容可独立更新。 |

## 状态回调与停止

四个回调都接收 `(viewer, tracking)`，在异步刷新线程执行。目标丢失和进入隐藏范围都保留会话；如果业务需要在某个状态结束追踪，可在回调内调用 `tracking.stop()`。

| 回调 | 触发时机 |
| - | - |
| `onTrack` | 首次找到同世界目标，或丢失后重新找到。首次定位就处于隐藏范围时，先触发它，再触发 `onArrival`。 |
| `onArrival` | 进入隐藏范围，标记已经隐藏。持续留在范围内只通知一次。 |
| `onLeave` | 离开隐藏范围且目标仍可追踪。回调返回后恢复显示。 |
| `onLoss` | 先前追踪的目标变得不可用，或观察者离开其世界。初次查找就找不到目标时不会触发。 |

## 内置样式

通过 `Waypoint.builder().style(style)` 设置样式。省略样式时，默认显示 ◆ 和距离。名称通过追踪构建器的 `label(Component)` 单独指定，所以多个追踪点可以共享样式并使用不同名称。

| `WaypointStyle.builder()` 的选项 | 用途 |
| - | - |
| `marker(marker)` | 用 `WaypointMarker.text(Component)`、`block(Material)` 或 `item(org.bukkit.inventory.ItemStack)` 选择主标记。`marker.scale(float)` 返回缩放后的主标记，标签和光柱保持各自大小。 |
| `beam(beam)` | 添加可选双层光柱。`WaypointBeam.builder()` 可通过 `outer(material, width)`、`inner(material, width)` 和 `height(blocks)` 设置材质与尺寸。 |
| `distanceFormatter(formatter)`、`hideDistance()` | 默认不足 1000 格显示整数米，更远时显示一位小数的千米。格式器接收未取整的实际距离，返回自选字体或样式的文本组件。隐藏距离行后仍可显示名称。 |

## 自定义元素与排版

需要自行决定显示哪些元素及它们之间的位置时，用 `WaypointStyle.custom(layout)`。服务在每次可见刷新时调用 `WaypointLayout.render(view, elements)`，即使目标静止也会调用。每帧声明完整布局，同一元素跨帧使用相同的 key，本帧省略的元素会被移除。元素和容器只在本次回调内使用。

`WaypointView` 提供 `viewer()`、真实目标 `target()`、投影锚点 `anchor()` 和可选名称 `label()`。`distance()` 从观察者脚下量到真实目标，`anchorDistance()` 从眼睛量到锚点。`readableScale()` 给出文本建议倍率，锚点在 8 格内为 1，更远时为锚点距离除以 8。

| 布局操作 | 用法 |
| - | - |
| 声明元素 | `elements.text(key, component)` 显示文本；`item(key, stack)` 接收 NMS `ItemStack` 并保存快照；`block(key, state)` 接收 NMS `BlockState`，可保留自定义方块的具体状态。 |
| 坐标和变换 | `position(x, y, z)` 是相对锚点或父挂点的世界轴偏移，单位为格。`translate(x, y, z)` 按展示朝向平移。`pivot(...)` 设置缩放和旋转的中心，配合 `scale(...)`、`rotate(...)` 使用。 |
| 朝向与文字 | `billboard(...)` 控制朝向，文本默认 `CENTER`，物品与方块默认 `FIXED`。文本支持 `alignment(...)`、`lineWidth(pixels)`、`shadow(boolean)` 和 `seeThrough(boolean)`。 |
| 父子挂接 | 父元素用 `socket(name, x, y, z)` 声明模型局部挂点，子元素用 `attachTo(parentKey, name)` 对齐到该点，并保留自己的缩放。挂接不能成环；父元素随视角转动时，子元素须使用相同朝向。`visible(false)` 隐藏整个子树。 |

### 动态文本与节流

`label(Component)` 接收已经构建好的名称。随时间变化的血量或占位符文本可由自定义布局提供。为每条追踪保存采样时间、上次显示值和文本组件，只在采样到期时读取数据，显示值变化后才重建组件。两次采样之间仍逐帧声明该元素，标记会继续跟随目标移动。对于 `<papi:...>`，到期时用所需玩家上下文解析 MiniMessage，随后复用结果；占位符值要在解析后才能确定。

## 完整示例

### 示例一 · 标记北门

将 `world` 和坐标替换为北门的实际位置。默认样式会显示标记、名称和距离。玩家进入北门五格范围时标记隐藏，离开后重新显示。

```java
import net.kyori.adventure.text.Component;
import net.momirealms.sparrow.service.waypoint.Waypoint;
import net.momirealms.sparrow.service.waypoint.WaypointTarget;
import net.momirealms.sparrow.service.waypoint.WaypointTracking;
import org.bukkit.entity.Player;

public final class NorthGate {
    public static WaypointTracking show(Player viewer) {
        return Waypoint.builder()
                .target(WaypointTarget.ofPos("world", 120.5, 70, -31.5))
                .label(Component.text("北门"))
                .hideWithin(5)
                .track(viewer);
    }
}
```

### 示例二 · 跟随队友并节流血量文本

标记在每次可见刷新时跟随队友，血量最多每 500 ms 读取一次。只有展示的整数血量变化时才构建新的文本组件。每次调用 `show` 都创建独立布局，两条追踪不会共用血量读数。

```java
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import net.kyori.adventure.text.Component;
import net.momirealms.sparrow.service.waypoint.Waypoint;
import net.momirealms.sparrow.service.waypoint.WaypointStyle;
import net.momirealms.sparrow.service.waypoint.WaypointTarget;
import net.momirealms.sparrow.service.waypoint.WaypointTracking;
import net.momirealms.sparrow.service.waypoint.layout.WaypointElements;
import net.momirealms.sparrow.service.waypoint.layout.WaypointLayout;
import net.momirealms.sparrow.service.waypoint.layout.WaypointView;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

public final class TeammateWaypoint {
    public static WaypointTracking show(Player viewer, Player teammate) {
        UUID id = teammate.getUniqueId();
        return Waypoint.builder()
                .target(WaypointTarget.ofPlayer(id))
                .style(WaypointStyle.custom(new HealthLayout(id)))
                .track(viewer);
    }

    private static final class HealthLayout implements WaypointLayout {
        private static final long INTERVAL = TimeUnit.MILLISECONDS.toNanos(500);

        private final UUID teammateId;
        private long lastRead;
        private int displayedHealth;
        private Component healthText;

        private HealthLayout(UUID teammateId) {
            this.teammateId = teammateId;
        }

        @Override
        public void render(WaypointView view, WaypointElements elements) {
            long now = System.nanoTime();
            if (this.healthText == null || now - this.lastRead >= INTERVAL) {
                Player teammate = Bukkit.getPlayer(this.teammateId);
                if (teammate == null) return;
                this.lastRead = now;

                int health = (int) Math.ceil(teammate.getHealth());
                if (this.healthText == null || health != this.displayedHealth) {
                    this.displayedHealth = health;
                    this.healthText = Component.text("队友 · " + health + " HP");
                }
            }

            elements.text("health", this.healthText)
                    .seeThrough(true)
                    .scale(view.readableScale());
        }
    }
}
```
