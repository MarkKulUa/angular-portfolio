import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonStateService } from '../../../core/services/pokemon-state.service';
import { CsvExportUtil } from '../utils/csv-export.util';
import { SelectedPokemon } from '../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-selected-flyout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-selected-flyout.component.html',
  styleUrls: ['./pokemon-selected-flyout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSelectedFlyoutComponent {
  private readonly pokemonState = inject(PokemonStateService);

  readonly selectedCount = this.pokemonState.selectedCount;
  readonly hasSelected = this.pokemonState.hasSelected;
  readonly isExpanded = signal<boolean>(false);

  toggleExpanded(): void {
    this.isExpanded.update((v) => !v);
  }

  downloadCSV(): void {
    const selected = this.pokemonState.getSelected();
    CsvExportUtil.exportPokemonToCSV(selected);
  }

  clearAll(): void {
    if (confirm('Clear all selected Pokemon?')) {
      this.pokemonState.clearSelection();
      this.isExpanded.set(false);
    }
  }

  getSelectedItems(): SelectedPokemon[] {
    return this.pokemonState.selected();
  }

  removeItem(pokemonName: string): void {
    const item = this.pokemonState.selected().find((p) => p.pokemon.name === pokemonName);
    if (item) {
      this.pokemonState.toggleSelection(item);
    }
  }
}
