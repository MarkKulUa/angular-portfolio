import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, Section, TagList } from '@shared/ui';
import { LAB_BUILD_FACTS, LAB_DEMOS, SPEC_STEPS } from './lab.content';

@Component({
  selector: 'app-lab',
  imports: [RouterLink, Icon, Section, TagList],
  templateUrl: './lab.html',
  styleUrl: './lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lab {
  protected readonly demos = LAB_DEMOS;
  protected readonly buildFacts = LAB_BUILD_FACTS;
  protected readonly specSteps = SPEC_STEPS;
}
