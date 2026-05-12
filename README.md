# kkFileView 官网源码

kkFileView 官网静态站点源码。当前维护分支已升级到 Node.js 最新版本运行，构建链路由旧的 `docsite-ext + webpack 3 + node-sass` 迁移为 `Vite + Sass`。

## 环境要求

- Node.js `26.1.0+`
- npm `11+`

建议使用 `.nvmrc` 中声明的版本：

```bash
nvm use
```

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm start
```

默认监听端口为 `8082`：

```text
http://127.0.0.1:8082/zh-cn/index.html
```

`npm start` 会先执行 `npm run generate`，生成首页、文档页、博客页需要的 HTML 和 Markdown JSON，再启动 Vite。

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。构建流程会自动：

1. 生成站点 HTML 和 Markdown JSON
2. 执行 Vite 生产构建
3. 复制 `img/`、文档 JSON 等静态资源到 `dist/`

本地预览生产构建：

```bash
npm run preview
```

## 常用命令

```bash
npm run generate  # 生成静态 HTML/JSON
npm start         # 生成并启动开发服务，端口 8082
npm run build     # 生成并构建生产产物
npm run preview   # 预览 dist 产物，端口 8082
npm run lint      # 代码检查
npm audit         # 依赖安全检查
```

## 维护说明

- 不再依赖 `docsite-ext`、`webpack 3`、`gulp`、`node-sass`
- Markdown 渲染逻辑在 `scripts/generate-site.cjs`
- 构建后的静态资源补充复制逻辑在 `scripts/copy-static.cjs`
- Vite 多页面入口配置在 `vite.config.mjs`
- SCSS 已迁移到 Sass 模块语法 `@use`，不再使用废弃的 `@import`
