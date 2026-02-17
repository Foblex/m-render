# Example: ng-component Demo

This page demonstrates both modes of `ng-component`:

* Angular component rendering
* URL iframe rendering

## Angular component mode

::: ng-component <example></example> [height]="300"
[component.html] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.html)
[component.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
[component.scss] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.scss)
:::

## URL iframe mode

```markdown
::: ng-component [url]="https://example.com" [height]="60vh"
[component.ts] <<< /assets/component.ts
:::
```

::: ng-component [url]="https://example.com" [height]="420"
[sample.ts] <<< [https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts](https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/extensions/add-node-from-palette/add-node-from-palette.component.ts)
:::

## Notes

* Full-screen mode is available in preview controls.
* Some external URLs may block iframe embedding via CSP or `X-Frame-Options`.
