import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WorkExperience } from '@shared/models/resume.model';

@Component({
  selector: 'app-resume-experience',
  imports: [],
  templateUrl: './resume-experience.html',
  styleUrl: './resume-experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeExperience {
  workHistory = input.required<WorkExperience[]>();
}
