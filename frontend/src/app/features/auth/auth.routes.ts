import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    title: 'Sign in · Auth demo · Mark Kulishov',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
    title: 'Register · Auth demo · Mark Kulishov',
  },
  {
    path: 'protected',
    loadComponent: () => import('./protected/protected').then((m) => m.Protected),
    canActivate: [authGuard], // Protected route - requires authentication
    title: 'Protected page · Auth demo · Mark Kulishov',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
