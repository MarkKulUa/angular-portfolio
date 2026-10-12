import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Page section with an accessible heading and projected content. */
@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="section"
      [class.section--muted]="muted()"
      [attr.aria-labelledby]="id() + '-title'"
    >
      <div class="container">
        <header class="section__header">
          @if (eyebrow()) {
            <p class="section__eyebrow">{{ eyebrow() }}</p>
          }
          <h2 class="section__title" [id]="id() + '-title'">{{ title() }}</h2>
          @if (lead()) {
            <p class="section__lead">{{ lead() }}</p>
          }
        </header>
        <ng-content />
      </div>
    </section>
  `,
  styleUrl: './section.scss',
})
export class Section {
  id = input.required<string>();
  title = input.required<string>();
  eyebrow = input<string>();
  lead = input<string>();
  muted = input<boolean>(false);
}
