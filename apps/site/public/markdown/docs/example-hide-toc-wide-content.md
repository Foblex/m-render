---
toc: false
wideContent: true
---

# Example: TOC Disabled + Wide Content

This page disables table of contents and expands content width into the free area.

## Frontmatter

```markdown
---
toc: false
wideContent: true
---
```

## Expected behavior

* The on-page navigation block is hidden.
* Main markdown column becomes wider on desktop breakpoints.
* Content keeps regular responsive behavior on smaller screens.

## Sample content block

```ts
export const pageFlags = {
  toc: false,
  wideContent: true,
};
```

### Notes

Use `wideContent` only when `toc` is disabled for the same page.
