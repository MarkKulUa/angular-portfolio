import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ResumeData } from '@core/services/resume-data';
import { Resume as ResumeModel } from '../../shared/models/resume.model';
import { ResumeHeader } from './components/resume-header/resume-header';
import { ResumeSummary } from './components/resume-summary/resume-summary';
import { ResumeSkills } from './components/resume-skills/resume-skills';
import { ResumeExperience } from './components/resume-experience/resume-experience';
import { ResumeEducation } from './components/resume-education/resume-education';
import { ResumeCertifications } from './components/resume-certifications/resume-certifications';

@Component({
  selector: 'app-resume',
  imports: [
    ResumeHeader,
    ResumeSummary,
    ResumeSkills,
    ResumeExperience,
    ResumeEducation,
    ResumeCertifications,
  ],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume implements OnInit {
  private resumeDataService = inject(ResumeData);
  protected resumeData = signal<ResumeModel | null>(null);

  ngOnInit(): void {
    this.resumeDataService.getResumeData().subscribe((data) => {
      this.resumeData.set(data);
    });
  }
}
