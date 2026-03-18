# Releases Overview

This section explains what changed between versions and how to apply those changes in a real project.

## How to use this section

1. Open the latest release note first.
2. Check `Highlights` to understand the feature scope.
3. Read `Upgrade notes` and apply changes in a separate branch.
4. Follow `Validation` steps before merging.

If you are upgrading from `v3.x`, start with [`v4.0.0`](v4-0-0). That release changes the visual contract of the library and should be treated as a breaking change even if your TypeScript API usage stays the same.

## Recommended upgrade workflow

1. Create a migration branch.
2. Update dependencies and project config.
3. Apply markdown/frontmatter changes.
4. Run build and prerender.
5. Verify affected pages in browser and in page source.

## Available notes

* [v4.0.0](v4-0-0)
* [v3.0.0](v3-0-0)
* [v2.9.0](v2-9-0)

## What each release page includes

* Practical summary of changes.
* Copy-paste snippets for configuration updates.
* Migration checklist.
* Validation checklist.
* Common pitfalls.
