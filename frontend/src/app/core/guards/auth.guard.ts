import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AppStore } from '../store/app.store';

export const authGuard: CanActivateFn = () => {
  const store = inject(AppStore);
  const router = inject(Router);

  if (store.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
