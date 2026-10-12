import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AppStore } from '@core/store/app.store';

@Component({
  selector: 'app-protected',
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
   * Navigate back to the Lab hub
   */
  goToLab(): void {
    this.router.navigate(['/lab']);
  }
}
