import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education } from '@shared/models/profile.model';
import { PeriodPipe } from '@shared/ui';

@Component({
  selector: 'app-resume-education',
  imports: [PeriodPipe],
  templateUrl: './resume-education.html',
  styleUrl: './resume-education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeEducation {
  education = input.required<Education[]>();
}
