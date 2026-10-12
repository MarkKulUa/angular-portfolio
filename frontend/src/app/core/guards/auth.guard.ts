import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AppStore } from '../store/app.store';
import { AuthService } from '../services/auth.service';

/**
 * Allows access with an active session. If the store has no user yet, the session is
 * restored from the HttpOnly cookie via `/auth/me` (only on protected routes, so public
 * pages never wait for the backend).
 */
export const authGuard: CanActivateFn = () => {
  const store = inject(AppStore);
  const router = inject(Router);
  const loginUrl = router.createUrlTree(['/lab/auth/login']);

  if (store.isAuthenticated()) {
    return true;
  }

  return inject(AuthService)
    .verifyAuth()
    .pipe(
      map(() => true),
      catchError(() => of(loginUrl))
    );
};
