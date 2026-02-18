# Example: Code Features Playground

This page demonstrates all code-related features currently supported by MRender.

## What is covered

* Single code blocks with syntax highlighting.
* `code-group` tabs with custom labels.
* Focus and blur inside code blocks.
* `ng-component` preview with source tabs.
* URL iframe preview mode with configurable height.
* Source links syntax (`[name] <<< url`).

## Single code block

Use a regular fenced code block. MRender renders it through the code view component with copy action and language label.

````markdown
```ts
const total = [10, 20, 30].reduce((acc, value) => acc + value, 0);
console.log('Total:', total);
```
````

```ts
const total = [10, 20, 30].reduce((acc, value) => acc + value, 0);
console.log('Total:', total);
```

## `code-group` with custom tab names

Use `code-group` when you want to switch between multiple files/snippets.
Tab names are defined with `[Tab Name]` after the language.

````markdown
::: code-group
```ts [Store]
export class ProductStore {
  load() {}
}
```

```html [Template]
<section class="products">Products list</section>
```

```scss [Styles]
.products {
  padding: 16px;
}
```
:::
````

::: code-group
```ts [Store]
export class ProductStore {
  load() {}
}
```

```html [Template]
<section class="products">Products list</section>
```

```scss [Styles]
.products {
  padding: 16px;
}
```
:::

## Focus + blur inside code

Use opening marker `|:|` and closing marker `|:|` inside a code block.
Content inside markers stays emphasized, while other lines become dimmed.

Raw syntax:

````markdown
```ts
const user = await userService.load();

&#124;:&#124;if (!user.isAdmin) {
  throw new Error('Forbidden');
}&#124;:&#124;

await auditService.write(user.id);
```
````

Rendered result:

```ts
const user = await userService.load();

|:|if (!user.isAdmin) {
  throw new Error('Forbidden');
}|:|

await auditService.write(user.id);
```

Markers are service tokens, so they disappear in rendered output.

You can also focus a short inline fragment:

Raw syntax: `const mode = isDebug ? |:|'debug'|:| : 'release';`

Rendered result:

```ts
const mode = isDebug ? |:|'debug'|:| : 'release';
```

## `ng-component` preview with code tabs

Angular component mode:

````markdown
::: ng-component <example></example> [height]="300"
[component.html] <<< https://...
[component.ts] <<< https://...
[component.scss] <<< https://...
:::
````

::: ng-component <example></example> [height]="300"
[component.html] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html)
[component.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
[component.scss] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss)
:::

## URL iframe mode + height

URL mode supports fullscreen and custom height values (`number`, `px`, `%`, `vh`, etc.).

````markdown
::: ng-component [url]="https://example.com" [height]="420"
[sample.ts] <<< https://...
:::
````

::: ng-component [url]="https://example.com" [height]="420"
[sample.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
:::

## Validation checklist

1. Single code block renders with syntax highlighting and copy button.
2. `code-group` tabs switch correctly.
3. Focus marker syntax dims surrounding code and highlights focused part.
4. `ng-component` works in both component and URL modes.
5. Fullscreen toggle works in preview mode.

## Common mistakes

* Using focus markers in plain markdown text instead of inside code blocks.
* Forgetting to register component alias for `<example></example>`.
* Using iframe URLs that block embedding.
