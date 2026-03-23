import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AppStore } from '@core/store/app.store';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected.html',
  styleUrl: './protected.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Protected {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected store = inject(AppStore);

  /**
   * Handle logout
   */
  onLogout(): void {
    this.authService.logout();
  }

  /**
   * Navigate to home
   */
  goHome(): void {
    this.router.navigate(['/']);
  }
}
