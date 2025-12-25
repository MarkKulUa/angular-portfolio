import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechnicalExpertise, CertifiedSkill } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-resume-skills',
  imports: [],
  templateUrl: './resume-skills.html',
  styleUrl: './resume-skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeSkills {
  technicalExpertise = input.required<TechnicalExpertise>();
  certifiedSkills = input.required<CertifiedSkill[]>();
}
