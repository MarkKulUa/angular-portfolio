import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Preloader } from './shared/components/preloader/preloader';
import { Preloader as PreloaderService } from './core/services/preloader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Preloader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (preloaderService.isLoading()) {
      <app-preloader />
    }
    <div class="app-container">
      <app-header />
      <main>
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      main {
        flex: 1;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  protected preloaderService = inject(PreloaderService);

  ngOnInit(): void {
    //Preloader simulation
    setTimeout(() => {
      this.preloaderService.hide();
    }, 1000);
  }
}
