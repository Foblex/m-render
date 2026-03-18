# MRender: Markdown Renderer for Angular

**MRender** is an Angular library for rendering Markdown-based documentation with SSR support, built-in Angular components, customizable UI, and extended syntax.

## 🚀 Features

* Render `.md` files in Angular apps
* Extended syntax: `ng-component`, `code-group`, `preview-group`, alert blocks (`tip`, `info`, `danger`, etc.)
* Fully SSR-compatible
* Embed Angular components inside markdown
* Provider-based configuration for homepage and documentation
* Lazy loading of examples
* Built-in Table of Contents, SEO and meta support

## 📦 Installation

```bash
npm install @foblex/m-render
```

## 🧩 Usage

### Homepage Configuration

```ts
import {
  provideBackground, provideComponents,
  provideHero, provideHomeButtons, provideHomeFeatures,
  provideHomeFooter, provideImage, provideLogo, provideTitle
} from '@foblex/m-render';

export const HOME_CONFIGURATION = {
  providers: [
    provideLogo('./logo.svg'),
    provideTitle('Foblex Flow'),
    provideHero({
      headline: 'Foblex Flow',
      tagline1: 'Built with Angular',
      tagline2: 'Flow-Chart Library',
      subDescription: 'Supports Angular 12+, SSR, and Composition API.',
    }),
    provideBackground(HomePageBackgroundComponent),
    provideImage(HomePageImageComponent),
    provideHomeButtons([...]),
    provideHomeFeatures([...]),
    provideHomeFooter({ text: 'MIT License | Copyright © 2022 - Present' }),
  ],
};
```

### Documentation Configuration

```ts
import {
  provideDirectory, provideNavigation, provideComponents,
  provideTableOfContent, provideHeader, provideFooterNavigation,
  provideMeta, provideHeaderSearchAlgolia
} from '@foblex/m-render';

export const DOCUMENTATION_CONFIGURATION = {
  providers: [
    provideDirectory('./markdown/guides/'),
    provideNavigation(...),
    provideComponents([...]),
    provideTableOfContent({ title: 'In this article', range: { start: 2, end: 6 } }),
    provideHeader(...),
    provideFooterNavigation(...),
    provideMeta({ ... }),
  ],
};
```

### Algolia Search + Ask AI

Configure the header search button with your Algolia index.
If Ask AI is enabled for this index in Algolia, it appears automatically in the search modal.

```ts
provideHeader(
  provideHeaderSearchAlgolia({
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_ONLY_API_KEY',
    indexName: 'YOUR_INDEX_NAME',
    placeholder: 'Ask AI / Search',
  }),
);
```

### Route Setup

```ts
import { provideDocumentation, provideHomePage } from '@foblex/m-render';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@foblex/m-render').then((m) =>
      m.HOME_ROUTES.map((route) => ({
        ...route,
        providers: [provideHomePage(HOME_CONFIGURATION)],
      }))
    ),
  },
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

## ✨ Markdown Extensions

### `ng-component`

Render Angular components or external URLs (via `iframe`) with optional height and linked source code:

```markdown
::: ng-component <component-selector></component-selector> [height]="YOUR EXAMPLE HEIGHT"
[component.ts] <<< /assets/component.ts
[component.html] <<< /assets/component.html
:::
```

```markdown
::: ng-component [url]="https://example.com/demo" [height]="60vh"
[component.ts] <<< /assets/component.ts
:::
```

`ng-component` supports full-screen mode for both Angular previews and iframe previews.

### `code-group`

Group multiple code snippets into tabs:

````markdown
::: code-group
```ts [Component]
console.log('Component code');
```

```html [Template]
<div>Hello</div>
```
:::
````

### `preview-group`

Display preview groups with filters:

```markdown
::: preview-group
[Nodes]
[Connectors]
[Connections]
:::
```

Filters appear automatically when referenced navigation items provide `badge.text`.
Sorting by newness becomes available when those items also provide `date`.

See [Preview Group Filters](example-preview-group-filters) for a live example.

### Alerts

Use `tip`, `danger`, `info`, etc.:

```markdown
::: tip Title
This is a tip block
:::
```

## 🧑‍💻 Contributing

Open for contributions, feedback and PRs. [GitHub](https://github.com/Foblex/m-render)
