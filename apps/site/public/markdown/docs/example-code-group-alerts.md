# Example: Code Group and Alerts

This page demonstrates tabbed code blocks and alert containers.

## When to use

* Use `code-group` when you need to show one feature across multiple files.
* Use alerts to emphasize warnings, tips, and important constraints.
* Combine both patterns to create tutorial-style pages.

## Code Group syntax

````markdown
::: code-group
```ts [Service]
export class DemoService {}
```

```html [Template]
<section>Demo</section>
```
:::
````

## Code Group demo

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

## Alert syntax

```markdown
::: tip Useful Tip
This is a helpful tip for the reader.
:::

::: warning Important
This is a warning message.
:::
```

## Alerts demo

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

## Preview Group demo

::: preview-group
[Introduction]
[Writing]
[Examples]
:::

## Validation steps

1. Confirm code tabs are visible and switchable.
2. Confirm each alert type has distinct styling.
3. Confirm preview cards are rendered in `preview-group`.

## Common mistakes

* Missing tab labels in `code-group` blocks.
* Putting very large code samples in one tab set.
* Overusing alerts so important messages lose contrast.
