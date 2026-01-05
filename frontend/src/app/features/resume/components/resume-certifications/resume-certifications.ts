import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Certification } from '@shared/models/resume.model';

@Component({
  selector: 'app-resume-certifications',
  imports: [],
  templateUrl: './resume-certifications.html',
  styleUrl: './resume-certifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeCertifications {
  certifications = input.required<Certification[]>();
}
