import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { PokemonResponse, PokemonDetails } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  searchPokemon(searchTerm = '', page = 1, limit = 20): Observable<PokemonResponse> {
    const offset = (page - 1) * limit;

    if (searchTerm.trim()) {
      return this.http.get<PokemonResponse>(`${this.baseUrl}/pokemon?limit=1000`).pipe(
        map((response) => {
          const filteredResults = response.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return {
            ...response,
            count: filteredResults.length,
            results: filteredResults.slice(offset, offset + limit),
          };
        }),
        catchError(this.handleError)
      );
    }

    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.http
      .get<PokemonResponse>(`${this.baseUrl}/pokemon`, { params })
      .pipe(catchError(this.handleError));
  }

  getPokemonDetails(nameOrId: string | number): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.baseUrl}/pokemon/${nameOrId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Pokemon API Error:', error);
    return throwError(() => new Error(error.message || 'An error occurred while fetching data'));
  }
}
