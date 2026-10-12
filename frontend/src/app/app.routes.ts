import { Routes } from '@angular/router';
import { Home } from '@features/home/home';
import { Resume } from '@features/resume/resume';
import { NotFound } from '@features/not-found/not-found';
import { pokemonDetailsGuard } from '@core/guards/pokemon.guard';

const SITE = 'Mark Kulishov';

/**
 * Demo routes are declared here (root may import any feature), nested under `/lab`.
 * Legacy URLs redirect to their `/lab/...` equivalents.
 */
export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
    title: `${SITE} · Engineering Manager`,
  },
  {
    path: 'resume',
    component: Resume,
    title: `Resume · ${SITE}`,
  },
  {
    path: 'lab',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/lab/lab').then((m) => m.Lab),
        title: `Engineering Lab · ${SITE}`,
      },
      {
        path: 'pokemon',
        loadComponent: () =>
          import('./features/pokemon/pokemon-list/pokemon-list.component').then(
            (m) => m.PokemonListComponent
          ),
        title: `Pokemon demo · Lab · ${SITE}`,
      },
      {
        path: 'pokemon/:name',
        loadComponent: () =>
          import('./features/pokemon/pokemon-details/pokemon-details.component').then(
            (m) => m.PokemonDetailsComponent
          ),
        canActivate: [pokemonDetailsGuard],
        title: `Pokemon details · Lab · ${SITE}`,
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  // Legacy URLs
  { path: 'pokemon', redirectTo: 'lab/pokemon', pathMatch: 'full' },
  { path: 'pokemon/:name', redirectTo: 'lab/pokemon/:name' },
  { path: 'auth', redirectTo: 'lab/auth', pathMatch: 'full' },
  { path: 'auth/:page', redirectTo: 'lab/auth/:page' },
  {
    path: '**',
    component: NotFound,
    title: `Page not found · ${SITE}`,
  },
];
