import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Person } from '@shared/models/profile.model';
import { ContactLinks } from '@shared/ui';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, ContactLinks],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  person = input.required<Person>();
  /** The "Built with" icons are hidden on the EM landing page and shown elsewhere. */
  showTechStack = input<boolean>(true);

  protected readonly currentYear = new Date().getFullYear();

  protected readonly techStack = [
    { name: 'Angular', url: 'https://angular.dev', icon: 'angular.svg' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org', icon: 'typescript.svg' },
    { name: 'RxJS', url: 'https://rxjs.dev', icon: 'rxjs.svg' },
    { name: 'Node.js', url: 'https://nodejs.org', icon: 'nodejs.svg' },
    { name: 'NestJS', url: 'https://nestjs.com', icon: 'nestjs.svg' },
    { name: 'SCSS', url: 'https://sass-lang.com', icon: 'sass.svg' },
    { name: 'Vitest', url: 'https://vitest.dev', icon: 'vitest.svg' },
    { name: 'ESLint', url: 'https://eslint.org', icon: 'eslint.svg' },
    { name: 'Git', url: 'https://git-scm.com', icon: 'git.svg' },
  ];
}
