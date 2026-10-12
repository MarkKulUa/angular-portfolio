import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Role } from '@shared/models/profile.model';
import { PeriodPipe } from '@shared/ui';

/** Career progression, oldest first, ending with the target role as a dashed "Next" step. */
@Component({
  selector: 'app-career-timeline',
  imports: [PeriodPipe],
  templateUrl: './career-timeline.html',
  styleUrl: './career-timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerTimeline {
  /** Roles in reverse chronological order (as stored in the content). */
  roles = input.required<Role[]>();
  next = input.required<string>();

  protected readonly steps = computed(() => [...this.roles()].reverse());
}
