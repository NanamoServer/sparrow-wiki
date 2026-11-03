# 快捷潜影盒

原文：<https://nanamoserver.github.io/sparrow-wiki/zh-Hans/features/quick-shulker>

模块 `quick-shulker` · 配置 `features/quick-shulker.yml`

手持潜影盒，潜行并右键空气即可打开。默认支持副手，两只手都持有潜影盒时优先打开主手。

## 配置示例

```yaml
require-sneaking: true  # true 表示潜行时才能打开
allow-offhand: true
title: '<arg:hover_name>'
disabled-worlds: []
```

`title` 中的 `<arg:hover_name>` 使用潜影盒名称；`disabled-worlds` 填禁止使用的世界。
