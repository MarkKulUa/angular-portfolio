import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-pagination.component.html',
  styleUrls: ['./pokemon-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPaginationComponent {
  @Input({ required: true }) set currentPage(value: number) {
    this._currentPage.set(value);
  }
  @Input({ required: true }) set totalPages(value: number) {
    this._totalPages.set(value);
  }
  @Input({ required: true }) set totalItems(value: number) {
    this._totalItems.set(value);
  }

  @Output() pageChange = new EventEmitter<number>();

  protected readonly _currentPage = signal<number>(1);
  protected readonly _totalPages = signal<number>(1);
  protected readonly _totalItems = signal<number>(0);

  readonly canGoPrevious = computed(() => this._currentPage() > 1);
  readonly canGoNext = computed(() => this._currentPage() < this._totalPages());

  readonly visiblePages = computed(() => {
    const current = this._currentPage();
    const total = this._totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      pages.push(total);
    }

    return pages;
  });

  goToPage(page: number): void {
    if (page >= 1 && page <= this._totalPages() && page !== this._currentPage()) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.canGoPrevious()) {
      this.goToPage(this._currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.canGoNext()) {
      this.goToPage(this._currentPage() + 1);
    }
  }
}
