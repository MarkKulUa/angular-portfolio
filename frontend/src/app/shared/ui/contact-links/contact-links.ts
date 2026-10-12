import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProfileLinks } from '@shared/models/profile.model';
import { Icon } from '../icon/icon';

/** Public contact channels: LinkedIn (primary) and Credly. No email or phone by design. */
@Component({
  selector: 'app-contact-links',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="links" [class.links--on-brand]="variant() === 'on-brand'">
      <li>
        <a
          class="link link--primary"
          [href]="links().linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <app-icon name="linkedin" [size]="18" />
          <span>{{ linkedinLabel() }}</span>
          <span class="visually-hidden">(opens in a new tab)</span>
        </a>
      </li>
      @if (showCredly()) {
        <li>
          <a class="link" [href]="links().credly" target="_blank" rel="noopener noreferrer">
            <app-icon name="award" [size]="18" />
            <span>Credly badges</span>
            <span class="visually-hidden">(opens in a new tab)</span>
          </a>
        </li>
      }
    </ul>
  `,
  styleUrl: './contact-links.scss',
})
export class ContactLinks {
  links = input.required<ProfileLinks>();
  linkedinLabel = input<string>('LinkedIn');
  showCredly = input<boolean>(true);
  variant = input<'default' | 'on-brand'>('default');
}
