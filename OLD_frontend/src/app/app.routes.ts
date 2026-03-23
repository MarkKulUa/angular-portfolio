import { Routes } from '@angular/router';
import { Home } from '@features/home/home';
import { Resume } from '@features/resume/resume';
import { NotFound } from '@features/not-found/not-found';
import { pokemonDetailsGuard } from '@core/guards/pokemon.guard';

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
    path: 'pokemon',
    loadComponent: () =>
      import('./features/pokemon/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () =>
      import('./features/pokemon/pokemon-details/pokemon-details.component').then(
        (m) => m.PokemonDetailsComponent
      ),
    canActivate: [pokemonDetailsGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    component: NotFound,
  },
];
