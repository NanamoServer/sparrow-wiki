# Quick shulker

Source: <https://nanamoserver.github.io/sparrow-wiki/features/quick-shulker>

Module `quick-shulker` · Configuration `features/quick-shulker.yml`

Hold a shulker box, sneak and right-click the air. The off hand is supported by default; the main hand takes priority.

## Configuration example

```yaml
require-sneaking: true  # Require sneaking to open the box
allow-offhand: true
title: '<arg:hover_name>'
disabled-worlds: []
```

`<arg:hover_name>` uses the box's item name. List restricted worlds in `disabled-worlds`.
