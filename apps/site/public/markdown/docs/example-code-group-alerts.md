# Example: Code Group and Alerts

This page demonstrates tabbed code blocks and alert containers.

## Code Group

::: code-group
```ts [Service]
import { Injectable } from '@angular/core';

@Injectable()
export class DemoService {}
```

```html [Template]
<section class="demo">
  <h2>Code Group Example</h2>
</section>
```

```scss [Styles]
.demo {
  padding: 16px;
  border: 1px solid #e5e7eb;
}
```
:::

## Alerts

::: tip Tip
Use `code-group` when you need to show the same logic in multiple files.
:::

::: info Info
Alerts are rendered as dedicated styled containers in markdown output.
:::

::: warning Warning
Keep code snippets short to improve readability in docs.
:::

::: success Success
You can combine alerts, code groups and component previews on one page.
:::

## Preview Group

::: preview-group
[Introduction]
[Writing]
[Examples]
:::
