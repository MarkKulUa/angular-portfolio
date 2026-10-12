import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Headline, Person } from '@shared/models/profile.model';
import { ContactLinks, Icon } from '@shared/ui';

@Component({
  selector: 'app-resume-header',
  imports: [NgOptimizedImage, ContactLinks, Icon],
  templateUrl: './resume-header.html',
  styleUrl: './resume-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeHeader {
  person = input.required<Person>();
  headline = input.required<Headline>();
  generatingCv = input<boolean>(false);
  cvError = input<string | null>(null);
  downloadCv = output();

  protected photoFailed = signal(false);
}
