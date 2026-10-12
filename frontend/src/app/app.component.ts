import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileContent } from '@core/content/profile-content';
import { CvPdfService } from '@core/cv/cv-pdf.service';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="app-container">
      <app-header [generatingCv]="cvPdf.generating()" (downloadCv)="cvPdf.download()" />
      <main id="main" tabindex="-1">
        <router-outlet />
      </main>
      <app-footer [person]="profile().person" />
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      main {
        flex: 1;
        outline: none;
      }

      .skip-link {
        position: absolute;
        left: var(--space-4);
        top: -100px;
        z-index: 2000;
        padding: var(--space-2) var(--space-4);
        background: var(--color-surface-raised);
        color: var(--color-accent);
        font-weight: 600;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);

        &:focus {
          top: var(--space-2);
        }
      }
    `,
  ],
})
export class AppComponent {
  protected readonly profile = inject(ProfileContent).profile;
  protected readonly cvPdf = inject(CvPdfService);
}
