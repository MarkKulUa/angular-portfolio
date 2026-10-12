import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CompetencyGroup } from '@shared/models/profile.model';
import { TagList } from '@shared/ui';

@Component({
  selector: 'app-resume-competencies',
  imports: [TagList],
  templateUrl: './resume-competencies.html',
  styleUrl: './resume-competencies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeCompetencies {
  competencies = input.required<CompetencyGroup[]>();
}
