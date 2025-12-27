import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ResumeData } from '@core/services/resume-data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer implements OnInit {
  private resumeDataService = inject(ResumeData);

  currentYear = new Date().getFullYear();
  protected name = signal<string>('');
  protected email = signal<string>('');
  protected linkedin = signal<string>('');

  ngOnInit(): void {
    this.resumeDataService.getResumeData().subscribe((data) => {
      this.name.set(data.personalInfo.name);
      this.email.set(data.personalInfo.email);
      this.linkedin.set(data.personalInfo.linkedin);
    });
  }
}
