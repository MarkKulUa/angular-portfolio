import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  imports: [],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Preloader {}
