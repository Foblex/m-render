import { Routes } from '@angular/router';

export const DOCUMENTATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./index').then(m => m.DocumentationRootComponent),
    children: [
      {
        path: '**',
        loadComponent: () => import('./components/markdown-container').then(m => m.MarkdownContainerComponent),
      },
    ],
  },
];
