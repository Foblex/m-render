---
origin: "https://medium.com/@your-name/how-we-build-docs"
originLabel: "Originally published on Medium"
---

# Example: Origin Link

This page demonstrates the `origin` block rendered from markdown frontmatter.

## What it does

When `origin` is present, MRender renders a source card near the end of the article with:

* Source label (`originLabel`, or auto-generated fallback)
* External source URL
* Safe external link attributes

## Copy-paste template

```markdown
---
origin: "https://example.com/my-article"
originLabel: "Originally published on Example"
---

# My article title

Page content...
```

## Minimal version

```markdown
---
origin: "https://example.com/my-article"
---
```

If `originLabel` is not provided, the label is inferred from the host.
For example, `medium.com` becomes `Originally published on Medium`.

## Validation steps

1. Open this page in docs.
2. Scroll to the bottom of article content.
3. Confirm the source card is visible and link opens in new tab.
4. Remove `originLabel` and verify fallback label.

## Common mistakes

* Passing an invalid URL (block will not be rendered).
* Using non-http protocols.
* Expecting the source block without `origin` frontmatter.
