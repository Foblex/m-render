# Markdown Extensions

MRender extends standard Markdown syntax with custom containers and helpers to improve interactivity, clarity, and integration with Angular components.

## ⚙️ Page Frontmatter (TOC + SEO)

You can control layout and SEO directly from a markdown file using frontmatter at the top of the file:

```markdown
---
toc: false
wideContent: true
title: "Markdown Extensions | MRender"
description: "Custom markdown containers, TOC controls, and SEO frontmatter support."
keywords: "angular, markdown, docs"
robots: "index, follow"
origin: "https://medium.com/@your-name/my-post"
originLabel: "Originally published on Medium"
ogImage: "https://m-render.foblex.com/site-preview.png"
twitterCard: "summary_large_image"
---
```

Available frontmatter keys:

| Key | Purpose |
| --- | --- |
| `toc` | Enables/disables Table of Contents for current page (`false` hides TOC) |
| `wideContent` | Expands content width into TOC area (works when `toc: false`) |
| `origin`, `originLabel` | Shows external article origin link above content (for reposted articles) |
| `title`, `description`, `canonical`, `keywords`, `robots` | Page-level SEO overrides |
| `ogType`, `ogTitle`, `ogDescription`, `ogImage` | Open Graph overrides |
| `twitterCard`, `twitterTitle`, `twitterDescription`, `twitterImage` | Twitter card overrides |

## 📑 Code Group

Use `code-group` to display multiple code blocks as tabs. Each block will appear in a separate tab with the name defined inside `[...]`.

````markdown
::: code-group
&#96;&#96;&#96;ts [Component]
console.log('Hello World');
&#96;&#96;&#96;

&#96;&#96;&#96;html [Template]
<div>Hello</div>
&#96;&#96;&#96;
:::

````

**Rendered output:**

::: code-group
```ts [Component]
console.log('Hello World');
````

```html [Template]
<div>Hello</div>
```

:::

### Focus / blur in code

Use opening marker `|:|` and closing marker `|:|` around the fragment you want to keep in focus.

Raw syntax:

````markdown
```ts
const state = getState();
&#124;:&#124;if (!state.ready) return;&#124;:&#124;
render(state);
```
````

Rendered result:

```ts
const state = getState();
|:|if (!state.ready) return;|:|
render(state);
```

Markers are service tokens and are hidden in rendered output.

For a complete page with all code features, see [Code Features Playground](example-code-features).

## 🧩 Angular Component Preview (`ng-component`)

Embed an Angular component or a URL in an `iframe` and attach source code tabs using the `ng-component` container. This allows for live demos alongside their source files.

### Register the component

```ts
provideComponents([
  defineLazyComponent('example', () => import('./example.component')),
]);
```

### Markdown usage

```markdown
::: ng-component <example></example> [height]="300"
[component.html] <<< LINK_TO_HTML
[component.ts] <<< LINK_TO_TS
[component.scss] <<< LINK_TO_SCSS
:::
```

```markdown
::: ng-component [url]="https://example.com" [height]="60vh"
[component.ts] <<< LINK_TO_TS
:::
```

### Example rendered output

::: ng-component <example></example> [height]="300"
[component.html] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html)
[component.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
[component.scss] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss)
:::

`ng-component` supports full-screen mode for both Angular preview and URL iframe preview.

## 🧩 Markdown Pages Preview 

Group multiple markdown pages into a carded preview using `preview-group`.

### Markdown usage

```markdown
::: preview-group
[Introduction] <<< Name of Navigation group in router module
[Writing] <<< Name of Navigation group in router module
:::
```
### Rendered output

::: preview-group
[Introduction] 
[Writing]
:::


## ⚠️ Alert Containers

Use alerts to visually highlight sections of your documentation. Available types:

* `tip`
* `info`
* `warning`
* `danger`
* `success`

```markdown
::: tip Useful Tip
This is a helpful tip for the reader.
:::

::: danger Warning
This is a critical warning.
:::
```

**Rendered output:**

::: tip Useful Tip
This is a helpful tip for the reader.
:::

::: danger Warning
This is a critical warning.
:::

## 📚 Syntax Summary

| Syntax                                        | Purpose                                    |
| --------------------------------------------- | ------------------------------------------ |
| `code-group`                                  | Group multiple code examples into tabs     |
| `|:| ... |:|`                                 | Focus a code fragment and dim surrounding code |
| `ng-component`                                | Render Angular component or URL iframe with source files |
| `preview-group`                               | Visual group of preview components         |
| `tip`, `danger`, `info`, `warning`, `success` | Highlight content with alert styles        |

## 🧠 Tip: Use in Documentation

Use these markdown extensions to build interactive guides, live demos, tutorials, or developer docs for your Angular-based libraries or components.

These features are fully compatible with Angular SSR and dynamic routing setups.
