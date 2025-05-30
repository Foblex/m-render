# Markdown Extensions

MRender extends Markdown syntax with special components and helpers to improve interactivity and structure.

## Code Group

Renders a tab group with multiple code blocks.

```markdown
::: code-group
&#96;&#96;&#96;language [tabName]
code example
&#96;&#96;&#96;

&#96;&#96;&#96;language [tab2Name]
code example
&#96;&#96;&#96;
:::
```
Renders as:

::: code-group

```language [tabName]
code example
```

```language [tab2Name]
code example
```

:::

## Rendering Angular Component

Render a tab with an Angular component and its source code.

```typescript
provideComponents([
  defineLazyComponent('example', () => import('./example.component')),
])
```

```markdown
::: ng-component <example></example> [height]="500"
[component.html] <<< LINK_TO_CODE_FILE.html
[component.ts] <<< LINK_TO_CODE_FILE.ts
[component.scss] <<< LINK_TO_CODE_FILE.scss
:::
```

Renders as:
::: ng-component <example></example> [height]="500"
[component.html] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html
[component.ts] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts
[component.scss] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss
:::
