import { Injectable, signal, computed } from '@angular/core';
import { SelectedPokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonStateService {
  private readonly selectedPokemon = signal<SelectedPokemon[]>([]);

  readonly selected = this.selectedPokemon.asReadonly();
  readonly selectedCount = computed(() => this.selectedPokemon().length);
  readonly hasSelected = computed(() => this.selectedPokemon().length > 0);

  toggleSelection(item: SelectedPokemon): void {
    const current = this.selectedPokemon();
    const index = current.findIndex((p) => p.pokemon.name === item.pokemon.name);

    if (index > -1) {
      this.selectedPokemon.update((items) => items.filter((_, i) => i !== index));
    } else {
      this.selectedPokemon.update((items) => [...items, item]);
    }
  }

  isSelected(pokemonName: string): boolean {
    return this.selectedPokemon().some((p) => p.pokemon.name === pokemonName);
  }

  clearSelection(): void {
    this.selectedPokemon.set([]);
  }

  getSelected(): SelectedPokemon[] {
    return this.selectedPokemon();
  }
}
