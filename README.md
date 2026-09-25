# Sparrow Wiki

Documentation for Sparrow, including installation instructions, a permissions and commands quick reference, and feature guides.

**[Read the documentation](https://nanamoserver.github.io/sparrow-wiki/)** · **[Simplified Chinese documentation](https://nanamoserver.github.io/sparrow-wiki/zh-Hans/)**

## Local development

Use Node.js 22. Install dependencies before starting:

```bash
npm ci
```

Start the English site:

```bash
npm start -- --port 3000
```

Visit <http://localhost:3000/sparrow-wiki/>.

To preview the Chinese site:

```bash
npm run start-zhcn -- --port 3000
```

Visit <http://localhost:3000/sparrow-wiki/zh-Hans/>. The development server serves one locale at a time and reloads automatically when documentation changes.

## Editing documentation

| Path | Contents |
| --- | --- |
| `docs/` | English documentation |
| `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` | Chinese documentation |
| `sidebars/` | Sidebar navigation for both locales |
| `src/components/` | Reusable MDX components |
| `src/css/`, `src/theme/` | Styles and theme customizations |
| `static/` | Images and other static assets |
| `docusaurus.config.ts` | Site URL, locales, and plugin configuration |

When adding a page, use matching paths in both locales and update both sidebars. Pages use MDX and can reuse the existing components.

## Building and checking

```bash
npm run typecheck
npm run build
```

The build generates both locales in `build/`, including search indexes, Markdown copies, and `llms.txt`. Font subsets are generated automatically before the build.

Preview the production build:

```bash
npm run serve
```

## Automated deployment

- `master` contains the documentation source.
- `gh-pages` contains the generated static site and does not need manual editing.

Pushing to `master` triggers GitHub Actions to install dependencies, check types, build both locales, update `gh-pages`, and deploy to GitHub Pages. You can also run **Build and deploy documentation** manually from the Actions tab.

Before the first deployment, select **GitHub Actions** under **Settings → Pages → Build and deployment → Source** in the repository. The workflow uses the built-in `GITHUB_TOKEN`; no personal access token is required. It creates `gh-pages` automatically if the branch does not exist.

The site is published at <https://nanamoserver.github.io/sparrow-wiki/>, with Chinese documentation under `/zh-Hans/`. See [deploy-pages.yml](.github/workflows/deploy-pages.yml) for the workflow.
