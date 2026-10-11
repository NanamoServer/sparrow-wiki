# 开发者 API

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/developer-api>

这一页面向插件开发者。Sparrow 目前没有独立的 API 模块，下面用到的都是插件本体里的类，升级 Sparrow 时可能变化。

## 注册传送处理器

其他插件可以注册自己的传送处理器，服主随后就能在 `teleport.yml` 的列表里使用它。分组和阶段的含义见[传送分组](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/teleport/overview.mdx)。

### 写一个处理器

处理器是一个普通的类，实现它要参与的阶段对应的接口，选项直接写成字段。

| 接口 | 对应的列表 | 要实现的方法 |
| - | - | - |
| `TeleportProcessor.Pre` | `pre-processor` | `before(player, teleport)`，可选 `finished(teleport, result)` |
| `TeleportProcessor.Target` | `target-processor` | `destination(player, teleport)` |
| `TeleportProcessor.Post` | `post-processor` | `arrived(player, teleport)` |

一个类可以同时实现多个接口，这样它能写进多个列表。列表里的每一项只在自己所在的阶段被调用。

```java
@Configuration(naming = Configuration.Naming.KEBAB_CASE)
public final class BlackScreenProcessor implements TeleportProcessor.Pre {
    public static final SparrowKey TYPE = new SparrowKey("myplugin", "black-screen");

    private int fadeTicks = 10;

    @Override
    public void validate() {
        if (this.fadeTicks < 0) throw new IllegalArgumentException("fade-ticks must not be negative");
    }

    @NotNull
    @Override
    public CompletableFuture<Component> before(@NotNull BukkitSparrowPlayer player, @NotNull Teleport teleport) {
        player.sendTitle(Component.text("⬛"), Component.empty(), this.fadeTicks, 40, 0);
        return PASS;
    }
}
```

写处理器时要遵守几条约定：

- **选项就是字段。** 字段名按短横线形式对应配置里的键，例如 `fadeTicks` 对应 `fade-ticks`。字段的初始值就是这个选项的默认值。类需要有无参构造器。
- **`before` 和 `destination` 的返回值决定是否放行。** 结果为 `null` 时放行，直接返回 `PASS` 即可。结果是一段文字时拒绝传送，这段文字会提示给被传送的玩家；空组件表示拒绝但不提示。
- **`validate()` 用来检查选项。** 选项不合法时抛出 `IllegalArgumentException`，这一项会被忽略，异常信息会出现在控制台的警告里。
- **实例里只放选项。** 每次读取配置，Sparrow 都会为列表里的每一项新建一个实例。需要跨多次传送保存的状态请放在你自己的插件里。
- **方法可能在任意线程被调用。** 需要在玩家所在线程执行的操作请自行调度。
- **`destination` 里的玩家可能不在本服。** 跨服传送时玩家还在别的服务器上，所以这里拿到的是 `SparrowPlayer`，可以用 `checkPermission` 查询权限。需要改写落点时调用 `teleport.location(...)`。
- **`teleport.self()` 表示是否由玩家自己发起。** 内置的冷却、倒计时和世界黑名单在代他人传送时都会放行，你的处理器是否也这样做由你决定。

### 注册

在你的插件的 `onLoad` 里注册：

```java
@Override
public void onLoad() {
    SparrowPlugin.instance().teleportService().registerProcessor(BlackScreenProcessor.TYPE, BlackScreenProcessor.class);
}
```

- **时机。** Sparrow 在启用时读取 `teleport.yml`，所以要在 `onLoad` 里注册。更晚注册的类型在启动时会被当作不存在，下一次 `/sparrow reload` 之后才生效。
- **类型名。** 用 `SparrowKey` 表示，建议以你的插件名作为命名空间。`sparrow` 是内置处理器使用的命名空间。
- **重复注册。** 类型已经存在时抛出 `IllegalArgumentException`。
- **没有注销。** 目前只能注册，不支持在运行中移除类型。

你的插件需要在 `plugin.yml` 或 `paper-plugin.yml` 中把 Sparrow 声明为依赖，才能访问这些类。

### 服主怎样使用

注册之后，服主在 `teleport.yml` 里写上类型和选项：

```yaml title="teleport.yml"
default:
  pre-processor:
    - processor-type: warmup
    - processor-type: myplugin:black-screen
      fade-ticks: 20
```

写错阶段、选项的值不合法或 `validate()` 不通过时，处理方式与内置处理器相同：这一项被忽略，并在控制台给出警告。
