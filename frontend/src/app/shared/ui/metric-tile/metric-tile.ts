import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImpactMetric } from '@shared/models/profile.model';

@Component({
  selector: 'app-metric-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="metric">
      <p class="metric__value">{{ metric().value }}</p>
      <p class="metric__label">{{ metric().label }}</p>
      @if (metric().context) {
        <p class="metric__context">{{ metric().context }}</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .metric {
      height: 100%;
      padding: var(--space-5);
      background: var(--color-surface-raised);
      border: 1px solid var(--color-border);
      border-top: 4px solid var(--color-brand-start);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .metric__value {
      color: var(--color-accent);
      font-size: var(--fs-2xl);
      font-weight: 700;
      line-height: 1.2;
    }

    .metric__label {
      color: var(--color-heading);
      font-weight: 600;
      margin-top: var(--space-2);
    }

    .metric__context {
      color: var(--color-text-muted);
      font-size: var(--fs-sm);
      margin-top: var(--space-2);
    }
  `,
})
export class MetricTile {
  metric = input.required<ImpactMetric>();
}
