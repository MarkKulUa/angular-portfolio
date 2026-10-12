import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Person } from '@shared/models/profile.model';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-contact-cta',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta" aria-labelledby="cta-title">
      <div class="container cta__inner">
        <h2 class="cta__title" id="cta-title">Let's talk about your team</h2>
        <p class="cta__text">
          @if (person().availability) {
            {{ person().availability }} ·
          }
          {{ person().location }} · {{ person().workFormat }}
        </p>
        <div class="cta__actions">
          <a
            class="btn btn--primary"
            [href]="person().links.linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <app-icon name="linkedin" [size]="18" />
            Message me on LinkedIn
            <span class="visually-hidden">(opens in a new tab)</span>
          </a>
          <button
            type="button"
            class="btn btn--outline"
            [disabled]="generatingCv()"
            [attr.aria-busy]="generatingCv()"
            (click)="downloadCv.emit()"
          >
            <app-icon name="download" [size]="18" />
            {{ generatingCv() ? 'Preparing…' : 'Download CV (PDF)' }}
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cta {
      background: var(--gradient-brand);
      color: var(--color-on-brand);
      padding: var(--space-8) 0;
      text-align: center;
    }

    .cta__title {
      font-size: var(--fs-2xl);
    }

    .cta__text {
      margin-top: var(--space-3);
      font-size: var(--fs-lg);
    }

    .cta__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-3);
      margin-top: var(--space-6);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-5);
      border-radius: var(--radius-md);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .btn--primary {
      background: var(--color-on-brand);
      color: var(--color-accent);
      border: 2px solid var(--color-on-brand);
    }

    .btn--outline {
      background: transparent;
      color: var(--color-on-brand);
      border: 2px solid rgba(255, 255, 255, 0.85);

      &:disabled {
        cursor: progress;
      }
    }
  `,
})
export class ContactCta {
  person = input.required<Person>();
  generatingCv = input<boolean>(false);
  downloadCv = output();
}
