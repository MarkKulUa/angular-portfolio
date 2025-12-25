import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background-color: #1976d2;
      color: white;
      padding: 1rem 2rem;
    }

    main {
      flex: 1;
      padding: 2rem;
    }
  `],
})
export class AppComponent {
  title = 'Angular 21 + NestJS Monorepo';
}
