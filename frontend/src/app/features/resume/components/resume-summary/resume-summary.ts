import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Language } from '@shared/models/profile.model';

@Component({
  selector: 'app-resume-summary',
  templateUrl: './resume-summary.html',
  styleUrl: './resume-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeSummary {
  summary = input.required<string>();
  languages = input.required<Language[]>();

  protected paragraphs = computed(() =>
    this.summary()
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
  );
}
