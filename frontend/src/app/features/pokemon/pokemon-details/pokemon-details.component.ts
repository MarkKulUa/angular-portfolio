import {
  Component,
  OnInit,
  inject,
  signal,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonApiService } from '../../../core/services/pokemon-api.service';
import { PokemonDetails } from '../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  private readonly pokemonApi = inject(PokemonApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly details = signal<PokemonDetails | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const name = params['name'];
      if (name) {
        this.loadDetails(name);
      }
    });
  }

  private loadDetails(name: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.pokemonApi
      .getPokemonDetails(name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (details) => {
          this.details.set(details);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/lab/pokemon']);
  }

  getImageUrl(): string {
    const details = this.details();
    return (
      details?.sprites.other?.['official-artwork']?.front_default ||
      details?.sprites.front_default ||
      'https://via.placeholder.com/300?text=No+Image'
    );
  }

  getStatPercentage(baseStat: number): number {
    return Math.min((baseStat / 255) * 100, 100);
  }

  getStatColor(baseStat: number): string {
    if (baseStat >= 100) return '#27ae60';
    if (baseStat >= 70) return '#3498db';
    if (baseStat >= 50) return '#f39c12';
    return '#e74c3c';
  }
}
