import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Employer } from '@shared/models/profile.model';
import { PeriodPipe } from '@shared/ui';

@Component({
  selector: 'app-resume-experience',
  imports: [PeriodPipe],
  templateUrl: './resume-experience.html',
  styleUrl: './resume-experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeExperience {
  experience = input.required<Employer[]>();
}
