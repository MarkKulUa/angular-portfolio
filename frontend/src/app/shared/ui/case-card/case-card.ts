import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CaseStudy } from '@shared/models/profile.model';
import { TagList } from '../tag-list/tag-list';

@Component({
  selector: 'app-case-card',
  imports: [TagList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './case-card.html',
  styleUrl: './case-card.scss',
})
export class CaseCard {
  caseStudy = input.required<CaseStudy>();
}
