import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonalInfo } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-resume-header',
  imports: [],
  templateUrl: './resume-header.html',
  styleUrl: './resume-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeHeader {
  personalInfo = input.required<PersonalInfo>();
}
