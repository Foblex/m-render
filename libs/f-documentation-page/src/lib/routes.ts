import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./index').then(m => m.FRootComponent),
    children: [
      {
        path: '**',
        loadComponent: () => import('./components/f-page').then(m => m.FPageComponent),
      },
    ],
  },
];
