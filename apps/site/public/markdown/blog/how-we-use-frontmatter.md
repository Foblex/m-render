---
title: "How We Use Frontmatter | MRender Blog"
description: "Practical approach to controlling layout and SEO per markdown page."
keywords: "m-render, frontmatter, toc, seo"
canonical: "https://m-render.foblex.com/blog/how-we-use-frontmatter"
ogType: "article"
twitterCard: "summary_large_image"
---

# How We Use Frontmatter

Frontmatter gives us page-level controls without changing TypeScript config for every article.

## Layout flags

Two useful flags:

* `toc: false` to hide the table of contents
* `wideContent: true` to expand content width when TOC is hidden

## SEO flags

You can override:

* `title`, `description`, `canonical`
* `keywords`, `robots`
* Open Graph and Twitter fields

## Example snippet

```markdown
---
toc: false
wideContent: true
title: "My article"
description: "My article description"
---
```
