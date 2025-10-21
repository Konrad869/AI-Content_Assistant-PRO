import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'content',
    pathMatch: 'full'
  },
  {
    path: 'content',
    loadChildren: () => import('./features/content/content-module').then(m => m.ContentModule)
  },
  {
    path: '**',
    redirectTo: 'content'
  }
];
