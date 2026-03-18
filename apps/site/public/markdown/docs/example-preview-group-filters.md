---
toc: false
wideContent: true
title: "Example: Preview Group Filters"
description: "Live example of preview-group with auto-generated top filters and sorting."
---

# Example: Preview Group Filters

This page demonstrates the top filters panel rendered for `preview-group`.

## How it works

The filters row is not configured directly in markdown.

It is generated automatically when the referenced navigation items contain:

* `badge.text` for filter categories
* `date` for `Sort by Newness`

In this docs section, example pages are tagged with categories such as `layout`, `seo`, `components`, and `code`, so the panel can build filters from them automatically.

## Markdown syntax

Use `preview-group` and reference one or more navigation groups by name:

````markdown
::: preview-group
[Examples]
:::
````

If the referenced items have badges, a filters row appears above the cards.

## Live demo

::: preview-group
[Examples]
:::

## What to verify

1. Filter chips are rendered above the preview cards.
2. Categories are derived from the badges assigned to example pages.
3. Selecting a filter hides cards from other categories.
4. `Sort by Newness` reorders cards by navigation item date.
5. Switching back to `All` restores the full set.

## Configuration pattern

You enable this behavior through your navigation config, not through extra markdown options:

```ts
defineNavigationGroup('Examples', [{
  link: 'example-code-features',
  text: 'Code Features Playground',
  description: 'Comprehensive code rendering examples.',
  badge: { text: 'code', type: 'warning' },
  image: './images/extensions-preview.png',
  image_width: 3188,
  image_height: 1740,
  date: new Date('2026-03-10'),
}]);
```

## Notes

* Filters are collected from navigation items in the current section.
* The visible labels come from `badge.text`.
* Sorting uses `date`; items without a date are treated as the oldest.
* Preview cards look best when items also provide `image`, `image_width`, and `image_height`.
