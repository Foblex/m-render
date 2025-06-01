# Markdown Extensions

MRender extends standard Markdown syntax with custom containers and helpers to improve interactivity, clarity, and integration with Angular components.

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

## 🧩 Angular Component Preview (`ng-component`)

Embed an Angular component and attach source code tabs using the `ng-component` container. This allows for live demos alongside their source files.

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

### Example rendered output

::: ng-component <example></example> [height]="300"
[component.html] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html)
[component.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
[component.scss] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss)
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
| `ng-component`                                | Render Angular component with source files |
| `preview-group`                               | Visual group of preview components         |
| `tip`, `danger`, `info`, `warning`, `success` | Highlight content with alert styles        |

## 🧠 Tip: Use in Documentation

Use these markdown extensions to build interactive guides, live demos, tutorials, or developer docs for your Angular-based libraries or components.

These features are fully compatible with Angular SSR and dynamic routing setups.
