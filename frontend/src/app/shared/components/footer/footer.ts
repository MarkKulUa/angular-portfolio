import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ResumeData } from '@core/services/resume-data';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage],
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

  protected techStack = [
    { name: 'Angular', url: 'https://angular.dev', icon: 'angular.svg' },
    { name: 'Angular Material', url: 'https://material.angular.io', icon: 'material.svg' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org', icon: 'typescript.svg' },
    { name: 'RxJS', url: 'https://rxjs.dev', icon: 'rxjs.svg' },
    { name: 'Node.js', url: 'https://nodejs.org', icon: 'nodejs.svg' },
    { name: 'NestJS', url: 'https://nestjs.com', icon: 'nestjs.svg' },
    { name: 'SCSS', url: 'https://sass-lang.com', icon: 'sass.svg' },
    { name: 'Vitest', url: 'https://vitest.dev', icon: 'vitest.svg' },
    { name: 'ESLint', url: 'https://eslint.org', icon: 'eslint.svg' },
    { name: 'Git', url: 'https://git-scm.com', icon: 'git.svg' },
  ];

  ngOnInit(): void {
    this.resumeDataService.getResumeData().subscribe((data) => {
      this.name.set(data.personalInfo.name);
      this.email.set(data.personalInfo.email);
      this.linkedin.set(data.personalInfo.linkedin);
    });
  }
}
