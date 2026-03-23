import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'protected',
    loadComponent: () => import('./protected/protected').then((m) => m.Protected),
    canActivate: [authGuard], // Protected route - requires authentication
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
