---
toc: false
---

# Example: TOC Disabled

This page disables table of contents using markdown frontmatter.

## When to use

* Short pages where TOC adds visual noise.
* Landing-style docs pages with only a few headings.
* Blog posts where right-side navigation is not required.

## Copy-paste template

```markdown
---
toc: false
---

# My page title

Page content...
```

## Expected behavior

* The on-page navigation block is hidden.
* Page content width remains in standard mode.
* Heading anchors still work.

## Verification steps

1. Open the page.
2. Confirm right-side TOC is not rendered.
3. Confirm heading links still navigate by hash.

## Common mistakes

* Expecting content to become wider automatically.
* Forgetting that `wideContent: true` is a separate flag.

## Additional section

You can still use all markdown extensions on this page.

### Nested heading

TOC is hidden by page flag, not by heading structure.
