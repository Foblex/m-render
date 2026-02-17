---
title: "SEO Overrides Example | MRender"
description: "This page demonstrates page-level SEO overrides from markdown frontmatter."
keywords: "m-render, seo, markdown, angular"
robots: "index, follow"
canonical: "https://m-render.foblex.com/docs/example-seo-overrides"
ogType: "article"
ogTitle: "SEO Overrides Example"
ogDescription: "Open Graph metadata can be overridden per markdown page."
ogImage: "https://m-render.foblex.com/site-preview.png"
twitterCard: "summary_large_image"
twitterTitle: "SEO Overrides Example"
twitterDescription: "Twitter card values are configured from markdown frontmatter."
twitterImage: "https://m-render.foblex.com/site-preview.png"
---

# Example: SEO Overrides

This page uses frontmatter to override title and social tags without changing global configuration.

## When to use

* You need a custom title or description for one page only.
* You need per-page canonical URLs.
* You need different social card text/image for specific articles.

## Copy-paste template

```markdown
---
title: "My Page Title"
description: "My page description"
canonical: "https://my-site.com/docs/my-page"
ogType: "article"
ogTitle: "My OG title"
ogDescription: "My OG description"
ogImage: "https://my-site.com/preview.png"
twitterCard: "summary_large_image"
twitterTitle: "My Twitter title"
twitterDescription: "My Twitter description"
twitterImage: "https://my-site.com/preview.png"
---
```

## Frontmatter keys

You can override:

* `title`, `description`, `canonical`
* `keywords`, `robots`
* `ogType`, `ogTitle`, `ogDescription`, `ogImage`
* `twitterCard`, `twitterTitle`, `twitterDescription`, `twitterImage`

## Validation steps

1. Open this page in the browser.
2. Check `<title>` and `meta[name="description"]`.
3. Check Open Graph tags (`og:*`) in DevTools.
4. Check Twitter tags (`twitter:*`) in DevTools.
5. Compare generated metadata against your frontmatter values.

## Common mistakes

* Leaving old canonical URL after copying a template.
* Mixing page-specific metadata with outdated global defaults.
* Forgetting to validate rendered HTML in SSR/prerender output.
