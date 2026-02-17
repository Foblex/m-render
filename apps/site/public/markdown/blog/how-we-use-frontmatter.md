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

## Origin link for reposted articles

For articles that were published first on another platform (for example Medium), we add:

* `origin` with the external URL
* `originLabel` with custom text (optional)

## Example snippet

```markdown
---
toc: false
wideContent: true
title: "My article"
description: "My article description"
origin: "https://medium.com/@your-name/my-post"
originLabel: "Originally published on Medium"
---
```
