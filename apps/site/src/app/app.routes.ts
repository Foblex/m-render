import { Routes } from '@angular/router';
import { HOME_ENVIRONMENT } from '../../public/markdown/home';
import { DOCUMENTATION_ENVIRONMENT } from '../../public/markdown/docs/environment';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@foblex/m-render').then((m) => m.HOME_PAGE.ROUTES.map((route) => ({
        ...route,
        providers: [
          {
            provide: m.HOME_PAGE.ENVIRONMENT,
            useFactory: () => HOME_ENVIRONMENT,
          },
        ],
      }))),
  },
  {
    path: 'docs',
    loadChildren: () => import('@foblex/m-render').then((m) => m.DOCUMENTATION.ROUTES.map((route) => ({
      ...route,
      providers: [
        {
          provide: m.DOCUMENTATION.ENVIRONMENT,
          useFactory: () => DOCUMENTATION_ENVIRONMENT,
        },
      ],
    }))),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
