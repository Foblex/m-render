import { Routes } from '@angular/router';

export const F_DOCUMENTATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../f-documentation').then(m => m.FDocumentationComponent),
    children: [
      {
        path: '**',
        loadComponent: () => import('../f-page').then(m => m.FPageComponent)
      }
    ]
  }
];
