import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Sticky table of contents for wide screens (hidden on small screens and in print). */
@Component({
  selector: 'app-resume-toc',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="toc" aria-label="Resume sections">
      <p class="toc__title">On this page</p>
      <ul>
        @for (item of items; track item.id) {
          <li>
            <a routerLink="/resume" [fragment]="item.id">{{ item.label }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    :host {
      display: block;
    }

    .toc {
      position: sticky;
      top: calc(var(--header-height) + var(--space-5));
      padding: var(--space-4);
      border-left: 2px solid var(--color-border);
    }

    .toc__title {
      color: var(--color-text-muted);
      font-size: var(--fs-sm);
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: var(--space-3);
    }

    ul {
      display: grid;
      gap: var(--space-1);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      display: block;
      padding: var(--space-1) var(--space-2);
      color: var(--color-text);
      font-size: var(--fs-sm);
      border-radius: var(--radius-sm);

      &:hover {
        color: var(--color-accent);
        background: var(--color-accent-soft);
      }
    }
  `,
})
export class ResumeToc {
  protected readonly items = [
    { id: 'summary', label: 'Summary' },
    { id: 'competencies', label: 'Core Competencies' },
    { id: 'experience', label: 'Work History' },
    { id: 'projects', label: 'Independent Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
  ];
}
