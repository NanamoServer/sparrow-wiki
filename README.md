# Sparrow Wiki

Sparrow 的中英文文档站，基于 Docusaurus，沿用 Sparrow UI Wiki 的组件、主题和本地搜索。

## 本地预览

```bash
npm ci
npm run start-zhcn -- --host 127.0.0.1 --port 3000 --no-open
```

中文地址：<http://localhost:3000/sparrow-wiki/zh-Hans/>

英文预览使用 `npm start`。开发服务器一次提供一种语言；完整双语站点通过构建生成。

## 文档位置

- `docs/`：英文文档。
- `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`：中文文档。
- `sidebars/`：两种语言的导航。
- `src/components/`：保留的可复用组件。

## 验证

```bash
npm run typecheck
npm run build
```

构建产物位于 `build/`，包含中英文站点、搜索索引与供 AI 读取的 Markdown 文档。当前仓库不包含自动部署工作流。
