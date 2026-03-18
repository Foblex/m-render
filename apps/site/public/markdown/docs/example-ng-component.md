# Example: ng-component Demo

This page demonstrates both modes of `ng-component`:

* Angular component rendering
* URL iframe rendering

## Prerequisites

1. Register component aliases in your configuration.
2. Ensure source links are reachable in browser.
3. Ensure iframe URLs allow embedding.

## Register components

```ts
provideComponents([
  defineLazyComponent('example', () => import('./example.component')),
]);
```

## Angular component mode

```markdown
::: ng-component <example></example> [height]="300"
[component.html] <<< /assets/example.component.html
[component.ts] <<< /assets/example.component.ts
[component.scss] <<< /assets/example.component.scss
:::
```

::: ng-component <example></example> [height]="300"
[component.html] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html)
[component.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
[component.scss] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss)
:::

## Example view controller

Angular components rendered inside `ng-component` can inject `EXAMPLE_VIEW` from `@foblex/m-render`.

It exposes:

* `isFullscreen`: signal that updates when preview enters or exits fullscreen mode
* `showLoading()`: shows loading overlay over current example view
* `hideLoading()`: hides loading overlay

```ts
import { inject } from '@angular/core';
import { EXAMPLE_VIEW } from '@foblex/m-render';

const exampleView = inject(EXAMPLE_VIEW);

console.log(exampleView.isFullscreen());

exampleView.showLoading();
setTimeout(() => exampleView.hideLoading(), 1500);
```

## URL iframe mode

```markdown
::: ng-component [url]="https://example.com" [height]="420"
[sample.ts] <<< /assets/sample.ts
:::
```

::: ng-component [url]="https://example.com" [height]="420"
[sample.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
:::

## Validation steps

1. Confirm preview renders for component mode.
2. Confirm source tabs open and switch correctly.
3. Confirm iframe mode renders external page.
4. Confirm full-screen toggle works in both modes.

## Notes

* Full-screen mode is available in preview controls.
* Some external URLs may block iframe embedding via CSP or `X-Frame-Options`.
* If preview is empty, verify component alias registration and import path.
