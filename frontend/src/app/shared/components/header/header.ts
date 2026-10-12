import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '@shared/ui';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  generatingCv = input<boolean>(false);
  downloadCv = output();

  protected readonly menuOpen = signal(false);
  protected readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/resume', label: 'Resume', exact: false },
    { path: '/lab', label: 'Lab', exact: false },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
