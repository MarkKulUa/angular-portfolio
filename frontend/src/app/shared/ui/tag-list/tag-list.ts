import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="tags" [attr.aria-label]="label()">
      @for (item of items(); track item) {
        <li class="tag" [class.tag--subtle]="variant() === 'subtle'">{{ item }}</li>
      }
    </ul>
  `,
  styles: `
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .tag {
      background: var(--color-accent-soft);
      color: var(--color-accent);
      border-radius: var(--radius-pill);
      font-size: var(--fs-sm);
      font-weight: 500;
      line-height: 1.4;
      padding: var(--space-1) var(--space-3);
    }

    .tag--subtle {
      background: var(--color-surface);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    @media print {
      .tag,
      .tag--subtle {
        background: none;
        color: #000;
        border: 1px solid #bbb;
        padding: 0 6px;
      }
    }
  `,
})
export class TagList {
  items = input.required<string[]>();
  label = input<string>();
  variant = input<'accent' | 'subtle'>('accent');
}
