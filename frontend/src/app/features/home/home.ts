import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileContent } from '@core/content/profile-content';
import { CvPdfService } from '@core/cv/cv-pdf.service';
import { CaseCard, MetricTile, Section } from '@shared/ui';
import { HomeHero } from './components/home-hero/home-hero';
import { LeadershipPrinciples } from './components/leadership-principles/leadership-principles';
import { ContactCta } from './components/contact-cta/contact-cta';

@Component({
  selector: 'app-home',
  imports: [HomeHero, Section, MetricTile, CaseCard, LeadershipPrinciples, ContactCta],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = inject(ProfileContent).profile;
  protected readonly cvPdf = inject(CvPdfService);
}
