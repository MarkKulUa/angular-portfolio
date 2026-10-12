import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Principle } from '@shared/models/profile.model';

@Component({
  selector: 'app-leadership-principles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="principles">
      @for (principle of principles(); track principle.title; let i = $index) {
        <li class="principle">
          <span class="principle__number" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="principle__title">{{ principle.title }}</h3>
          <p class="principle__text">{{ principle.description }}</p>
        </li>
      }
    </ol>
  `,
  styles: `
    .principles {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-5);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .principle {
      padding: var(--space-5);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
    }

    .principle__number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      margin-bottom: var(--space-3);
      background: var(--gradient-brand);
      color: var(--color-on-brand);
      border-radius: 50%;
      font-weight: 700;
    }

    .principle__title {
      color: var(--color-heading);
      font-size: var(--fs-lg);
      margin-bottom: var(--space-2);
    }

    .principle__text {
      color: var(--color-text-muted);
    }

    @media (max-width: 1024px) {
      .principles {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .principles {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class LeadershipPrinciples {
  principles = input.required<Principle[]>();
}
