import { Routes } from '@angular/router';
import { F_HOME_PAGE_ENVIRONMENT } from '@foblex/m-render';
import { HOME_ENVIRONMENT } from '../../public/markdown/home';

export const routes: Routes = [
  {
    path: '',
    providers: [
      { provide: F_HOME_PAGE_ENVIRONMENT, useValue: HOME_ENVIRONMENT }
    ],
    loadChildren: () => import('@foblex/m-render').then(m => m.F_HOME_PAGE_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent),
  }
];
