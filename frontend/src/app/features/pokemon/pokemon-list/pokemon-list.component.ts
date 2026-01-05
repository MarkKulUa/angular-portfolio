import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PokemonApiService } from '../../../core/services/pokemon-api.service';
import { PokemonStateService } from '../../../core/services/pokemon-state.service';
import { Pokemon } from '../../../core/models/pokemon.model';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonPaginationComponent } from '../pokemon-pagination/pokemon-pagination.component';
import { PokemonSelectedFlyoutComponent } from '../pokemon-selected-flyout/pokemon-selected-flyout.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PokemonCardComponent,
    PokemonPaginationComponent,
    PokemonSelectedFlyoutComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonApi = inject(PokemonApiService);
  private readonly pokemonState = inject(PokemonStateService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly itemsPerPage = 20;
  readonly pokemon = signal<Pokemon[]>([]);
  readonly totalCount = signal<number>(0);
  readonly currentPage = signal<number>(1);
  readonly searchTerm = signal<string>('');
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly totalPages = computed(() => Math.ceil(this.totalCount() / this.itemsPerPage));

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const page = parseInt(params['page'] || '1', 10);
      const search = params['search'] || '';

      if (this.currentPage() !== page || this.searchTerm() !== search) {
        this.currentPage.set(page);
        this.searchTerm.set(search);
        this.loadPokemon(search, page);
      }
    });

    if (this.pokemon().length === 0) {
      this.loadPokemon('', 1);
    }
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  onSearchSubmit(): void {
    this.currentPage.set(1);
    this.loadPokemon(this.searchTerm(), 1);
    this.updateUrl(1, this.searchTerm());
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadPokemon(this.searchTerm(), page);
    this.updateUrl(page, this.searchTerm());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onCardClick(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  private loadPokemon(searchTerm: string, page: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.pokemonApi
      .searchPokemon(searchTerm, page, this.itemsPerPage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.pokemon.set(response.results);
          this.totalCount.set(response.count);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        },
      });
  }

  private updateUrl(page: number, search: string): void {
    const queryParams: Record<string, number | string> = {};
    if (page > 1) queryParams['page'] = page;
    if (search) queryParams['search'] = search;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
