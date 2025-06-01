# What is MRender?

MRender is an Angular library for rendering Markdown files in dynamic, interactive, and component-driven documentation or content websites.
It extends standard Markdown syntax with support for Angular components, embedded code previews, and multiple UI features.

## 🚀 Why Choose MRender?

Unlike traditional Markdown renderers that produce static HTML, MRender allows you to:

* 🧩 Embed live Angular components directly inside markdown content
* 🗂️ Use advanced markdown extensions like `code-group`, `ng-component`, `preview-group`, and alert containers (`tip`, `info`, etc.)
* 🔄 Mix declarative markdown with dynamic, reactive Angular UI
* 🧱 Define structured layout and navigation with providers like `provideHomePage`, `provideDocumentation`, `provideComponents`
* 📦 Seamlessly support both client-side (SPA) and server-side rendering (SSR)
* 🧠 Autogenerate ToC, metadata, structured SEO tags, and custom 404 pages
* 🎯 Stay fully Angular-native (no Vue, no React)

MRender enables a seamless blend of content and interactivity in a single Angular application.

## ✨ Key Features

### ✅ Extended Markdown Syntax

MRender extends the Markdown parser using `markdown-it` and custom containers. You can use:

* `::: code-group` for tabbed code examples
* `::: ng-component` to render Angular components with code tabs
* `::: preview-group` to render multiple visual examples in sections
* `::: tip`, `::: warning`, `::: danger`, etc., for alert blocks

### 📦 Fully Configurable Architecture

You configure MRender using Angular-style `providers`:

```ts
provideDocumentation({
  providers: [
    provideDirectory('./markdown/docs/'),
    provideTitle('My Docs'),
    provideComponents([...]),
    provideNavigation(...),
    provideHeader(...),
    provideFooterNavigation(...),
  ],
});
```

This makes it ideal for building scalable documentation platforms with custom themes and navigation.

### 🌗 Theme Support

* Built-in light and dark themes
* Controlled entirely by CSS variables
* Follows user preferences and dynamic switching

### 🧱 Component-Centric Documentation

With `defineLazyComponent`, you can load Angular components as examples and render them inside markdown. Combined with `f-code-group`, these examples come with source tabs:

```ts
defineLazyComponent('component-selector', () => import('./path/to/component'));
```

```markdown
::: ng-component <component-selector></component-selector> [height]="300"
[component.ts] <<< /path/to/component.ts
[component.html] <<< /path/to/component.html
:::
```

### 🧩 Modular UI Structure

Includes built-in UI blocks like:

* `f-code-group`
* `f-preview`
* `f-alert`
* `f-preview-group`
* `f-header`, `f-footer`

All of them are SSR-compatible and standalone Angular components.

## 📚 Use Cases

MRender is ideal for:

* 📘 Documentation for Angular libraries, SDKs, or design systems
* 🧪 Interactive guides with embedded demos and code
* 🏢 Internal portals and engineering knowledge bases
* 🧾 Developer-oriented CMS-style platforms
* 🎓 Onboarding flows and learning materials

## 🔍 How It Works

MRender processes a `.md` file using `markdown-it` and custom containers. During SSR or in the browser, it dynamically injects Angular components into the output DOM using a component registry.

Angular components, headers, ToC, navigation and theming are all configured through providers.

## 🌍 SSR and SEO Ready

MRender is compatible with Angular SSR (`@angular/platform-server`) and supports:

* Structured data generation (via `FJsonLdService`)
* Dynamic meta tag injection
* 404 fallback support
* SEO-friendly URLs and markdown routing

## 📦 Installation

```bash
npm install @foblex/m-render
```

## 🛠️ Example Integration

```ts
import { provideDocumentation } from '@foblex/m-render';
import { DOCUMENTATION_CONFIGURATION } from './documentation.config';

export const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('@foblex/m-render').then((m) =>
      m.DOCUMENTATION_ROUTES.map((route) => ({
        ...route,
        providers: [provideDocumentation(DOCUMENTATION_CONFIGURATION)],
      }))
    ),
  },
];
```

## 👀 Live Examples

To see MRender in action, explore open-source projects like:

* [Foblex Flow Documentation](https://flow.foblex.com)

These projects use MRender to power their documentation site using only markdown files and Angular components.

## 🧑‍💻 For Contributors

MRender is actively maintained and designed to be modular. PRs are welcome! If you want to add new markdown containers, UI components, or examples — open an issue or send a pull request.

GitHub: [https://github.com/Foblex/m-render](https://github.com/Foblex/m-render)

## 🧠 Inspiration

MRender is heavily inspired by [VitePress](https://vitepress.dev) in terms of structure and visual design. However, unlike [VitePress](https://vitepress.dev) (which is Vue-powered), MRender is fully built with Angular and supports dynamic rendering of Angular components inside Markdown files.

This makes it ideal for Angular-based documentation systems where component interactivity, SSR, and framework consistency are required.




















