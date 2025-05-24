import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./index').then(m => m.FRootComponent),
  },
];
