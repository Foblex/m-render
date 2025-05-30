# Getting Started

This guide helps you set up **MRender** in your Angular application.

## Install the Library

```bash
npm install @foblex/m-render
```

## Configure Routing

In your app.routes.ts:

```typescript
import { provideDocumentation, provideHomePage } from '@foblex/m-render';
import { DOCUMENTATION_CONFIGURATION } from './documentation.config';
import { HOME_CONFIGURATION } from './home.config';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@foblex/m-render').then(m =>
        m.HOME_ROUTES.map(route => ({
          ...route,
          providers: [provideHomePage(HOME_CONFIGURATION)],
        }))
      ),
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('@foblex/m-render').then(m =>
        m.DOCUMENTATION_ROUTES.map(route => ({
          ...route,
          providers: [provideDocumentation(DOCUMENTATION_CONFIGURATION)],
        }))
      ),
  },
];
```

## Configure Documentation

In documentation.config.ts, define your setup:

```typescript
provideDirectory('./markdown/docs/'),
provide404Markdown('./markdown/404.md'),
provideNavigation(...),
provideComponents([
  defineLazyComponent('example', () => import('./example.component')),
])
```

## Add Markdown Files

Put your .md files inside the configured directory (/public/markdown/docs/ by default).

Use extended syntax like:

```markdown
::: ng-component <example></example> [height]="600"
[component.html] <<< LINK_TO_CODE_FILE.html
[component.ts] <<< LINK_TO_CODE_FILE.ts
[component.scss] <<< LINK_TO_CODE_FILE.scss
:::
```


## Run the App

Make sure Angular SSR or browser build is configured.  
Now open `/docs/your-page` and see your content rendered dynamically!






