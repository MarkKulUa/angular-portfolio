import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { PokemonApiService } from '../services/pokemon-api.service';

export const pokemonDetailsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const pokemonApi = inject(PokemonApiService);
  const pokemonName = route.paramMap.get('name');

  if (!pokemonName) {
    router.navigate(['/lab/pokemon']);
    return false;
  }

  // Проверяем существование покемона перед загрузкой деталей
  return pokemonApi.getPokemonDetails(pokemonName).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/lab/pokemon']);
      return of(false);
    })
  );
};
