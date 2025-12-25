import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Resume } from './features/resume/resume';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'resume',
    component: Resume,
  },
  {
    path: '**',
    component: NotFound,
  },
];
