import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Headline, Person } from '@shared/models/profile.model';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-home-hero',
  imports: [NgOptimizedImage, RouterLink, Icon],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHero {
  person = input.required<Person>();
  headline = input.required<Headline>();
  generatingCv = input<boolean>(false);
  downloadCv = output();
}
