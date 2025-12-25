import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-resume-education',
  imports: [],
  templateUrl: './resume-education.html',
  styleUrl: './resume-education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeEducation {
  education = input.required<Education[]>();
}
