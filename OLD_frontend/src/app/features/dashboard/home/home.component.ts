import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome to Angular 21 + NestJS Monorepo</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>This is a production-ready monorepo showcasing:</p>
          <ul>
            <li>Angular 21 with standalone components</li>
            <li>Signal-based state management</li>
            <li>Vitest for testing</li>
            <li>OnPush change detection</li>
            <li>NestJS backend with Fastify</li>
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        max-width: 1200px;
        margin: 0 auto;
      }

      mat-card {
        margin-top: 2rem;
      }

      ul {
        padding-left: 1.5rem;
      }
    `,
  ],
})
export class HomeComponent {}
