import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CompetencyGroup } from '@shared/models/profile.model';

@Component({
  selector: 'app-resume-competencies',
  templateUrl: './resume-competencies.html',
  styleUrl: './resume-competencies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeCompetencies {
  competencies = input.required<CompetencyGroup[]>();
}
