import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileContent } from '@core/content/profile-content';
import { CvPdfService } from '@core/cv/cv-pdf.service';
import { ResumeHeader } from './components/resume-header/resume-header';
import { ResumeSummary } from './components/resume-summary/resume-summary';
import { ResumeCompetencies } from './components/resume-competencies/resume-competencies';
import { ResumeExperience } from './components/resume-experience/resume-experience';
import { ResumeProjects } from './components/resume-projects/resume-projects';
import { ResumeEducation } from './components/resume-education/resume-education';
import { ResumeCertifications } from './components/resume-certifications/resume-certifications';
import { ResumeToc } from './components/resume-toc/resume-toc';

@Component({
  selector: 'app-resume',
  imports: [
    ResumeHeader,
    ResumeSummary,
    ResumeCompetencies,
    ResumeExperience,
    ResumeProjects,
    ResumeEducation,
    ResumeCertifications,
    ResumeToc,
  ],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume {
  protected readonly profile = inject(ProfileContent).profile;
  protected readonly cvPdf = inject(CvPdfService);
}
