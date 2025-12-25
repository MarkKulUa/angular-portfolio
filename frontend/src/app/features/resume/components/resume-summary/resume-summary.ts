import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Summary } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-resume-summary',
  imports: [],
  templateUrl: './resume-summary.html',
  styleUrl: './resume-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeSummary {
  summary = input.required<Summary>();
}
