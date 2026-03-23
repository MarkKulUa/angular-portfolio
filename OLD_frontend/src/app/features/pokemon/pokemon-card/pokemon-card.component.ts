import {
  Component,
  Input,
  inject,
  signal,
  computed,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonDetails } from '@core/models/pokemon.model';
import { PokemonApiService } from '@core/services/pokemon-api.service';
import { PokemonStateService } from '@core/services/pokemon-state.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements OnInit {
  @Input({ required: true }) pokemon!: Pokemon;

  private readonly pokemonApi = inject(PokemonApiService);
  private readonly pokemonState = inject(PokemonStateService);

  readonly details = signal<PokemonDetails | null>(null);
  readonly isLoadingDetails = signal<boolean>(false);
  readonly isSelected = computed(() => this.pokemonState.isSelected(this.pokemon.name));

  ngOnInit(): void {
    this.loadDetails();
  }

  onSelectToggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.pokemonState.toggleSelection({
      pokemon: this.pokemon,
      details: this.details(),
    });
  }

  private loadDetails(): void {
    this.isLoadingDetails.set(true);
    this.pokemonApi.getPokemonDetails(this.pokemon.name).subscribe({
      next: (details) => {
        this.details.set(details);
        this.isLoadingDetails.set(false);
      },
      error: () => {
        this.isLoadingDetails.set(false);
      },
    });
  }

  getImageUrl(): string {
    const details = this.details();
    return (
      details?.sprites.other?.['official-artwork']?.front_default ||
      details?.sprites.front_default ||
      'https://via.placeholder.com/150?text=No+Image'
    );
  }

  getPokemonId(): string {
    return this.details()?.id.toString().padStart(3, '0') || '???';
  }

  getTypes(): string[] {
    return this.details()?.types.map((t) => t.type.name) || [];
  }
}
