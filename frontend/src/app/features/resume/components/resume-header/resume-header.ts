import { ChangeDetectionStrategy, Component, input, signal, effect } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PersonalInfo } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-resume-header',
  imports: [NgOptimizedImage],
  templateUrl: './resume-header.html',
  styleUrl: './resume-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeHeader {
  personalInfo = input.required<PersonalInfo>();
  protected hasPhoto = signal<boolean>(false);

  constructor() {
    effect(() => {
      const photo = this.personalInfo().photo;
      if (photo) {
        const img = new Image();
        img.onload = () => this.hasPhoto.set(true);
        img.onerror = () => this.hasPhoto.set(false);
        img.src = photo;
      } else {
        this.hasPhoto.set(false);
      }
    });
  }
}
