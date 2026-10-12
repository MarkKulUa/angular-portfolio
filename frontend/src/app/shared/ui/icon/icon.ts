import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconName =
  | 'linkedin'
  | 'award'
  | 'download'
  | 'arrow-right'
  | 'map-pin'
  | 'external'
  | 'check'
  | 'menu'
  | 'close';

/** 24×24 stroke icons (Lucide-style paths). */
const ICON_PATHS: Record<IconName, string[]> = {
  linkedin: [
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z',
    'M2 9h4v12H2z',
    'M4 2a2 2 0 1 0 0 4a2 2 0 1 0 0-4z',
  ],
  award: ['M12 2a6 6 0 1 0 0 12a6 6 0 1 0 0-12z', 'M8.21 13.89 7 23l5-3 5 3-1.21-9.12'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  'arrow-right': ['M5 12h14', 'M12 5l7 7-7 7'],
  'map-pin': [
    'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
    'M12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6z',
  ],
  external: [
    'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    'M15 3h6v6',
    'M10 14 21 3',
  ],
  check: ['M20 6 9 17l-5-5'],
  menu: ['M3 6h18', 'M3 12h18', 'M3 18h18'],
  close: ['M18 6 6 18', 'M6 6l12 12'],
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      [attr.width]="size()"
      [attr.height]="size()"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track d) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }
  `,
})
export class Icon {
  name = input.required<IconName>();
  size = input<number>(20);
  protected paths = computed(() => ICON_PATHS[this.name()]);
}
