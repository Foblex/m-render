---
toc: false
wideContent: true
---

# Example: TOC Disabled + Wide Content

This page disables table of contents and expands content width into the free area.

## When to use

* Long-form tutorials with large code blocks.
* Pages with wide tables or diagrams.
* Guides where full-width reading space improves readability.

## Copy-paste template

```markdown
---
toc: false
wideContent: true
---

# My page title

Page content...
```

## Expected behavior

* The on-page navigation block is hidden.
* Main markdown column becomes wider on desktop breakpoints.
* Mobile and tablet behavior stays responsive.

## Verification steps

1. Open this page on desktop width.
2. Compare content width with `example-hide-toc`.
3. Resize browser to mobile width and confirm layout remains stable.

## Common mistakes

* Setting `wideContent: true` while TOC is still enabled.
* Expecting width expansion on very small screens.

## Sample content block

```ts
export const pageFlags = {
  toc: false,
  wideContent: true,
};
```

### Notes

Use `wideContent` only when `toc` is disabled for the same page.
