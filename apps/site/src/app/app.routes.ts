import { Routes } from '@angular/router';
import { DOCUMENTATION_CONFIGURATION } from './documentation.config';
import { provideDocumentation, provideHomePage } from '@foblex/m-render';
import { HOME_CONFIGURATION } from './home.config';
import { SHOWCASE_CONFIGURATION } from './showcase.config';
import { BLOG_CONFIGURATION } from './blog.config';
import { RELEASES_CONFIGURATION } from './releases.config';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@foblex/m-render').then((m) => m.HOME_ROUTES.map((route) => ({
        ...route,
        providers: [
          provideHomePage(
            HOME_CONFIGURATION,
          ),
        ],
      }))),
  },
  {
    path: 'docs',
    loadChildren: () => createDocumentationRoutes(DOCUMENTATION_CONFIGURATION),
  },
  {
    path: 'showcase',
    loadChildren: () => createDocumentationRoutes(SHOWCASE_CONFIGURATION),
  },
  {
    path: 'blog',
    loadChildren: () => createDocumentationRoutes(BLOG_CONFIGURATION),
  },
  {
    path: 'releases',
    loadChildren: () => createDocumentationRoutes(RELEASES_CONFIGURATION),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];

function createDocumentationRoutes(configuration: { providers: object[] }) {
  return import('@foblex/m-render').then((m) => m.DOCUMENTATION_ROUTES.map((route) => ({
    ...route,
    providers: [
      provideDocumentation(
        configuration,
      ),
    ],
  })));
}
