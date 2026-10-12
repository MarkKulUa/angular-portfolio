import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Certification } from '@shared/models/profile.model';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-resume-certifications',
  imports: [Icon],
  templateUrl: './resume-certifications.html',
  styleUrl: './resume-certifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeCertifications {
  certifications = input.required<Certification[]>();
  credlyUrl = input.required<string>();

  protected featured = computed(() => this.certifications().filter((c) => c.featured));
  protected others = computed(() => this.certifications().filter((c) => !c.featured));
}
