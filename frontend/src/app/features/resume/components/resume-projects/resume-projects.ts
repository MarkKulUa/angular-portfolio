import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IndependentProject } from '@shared/models/profile.model';

@Component({
  selector: 'app-resume-projects',
  templateUrl: './resume-projects.html',
  styleUrl: './resume-projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeProjects {
  projects = input.required<IndependentProject[]>();
}
