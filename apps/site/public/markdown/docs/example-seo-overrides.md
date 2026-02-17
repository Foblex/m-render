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
