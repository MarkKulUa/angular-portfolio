import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { Observable, catchError, of } from 'rxjs';

import { routes } from './app.routes';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { AuthService, AuthResponse } from '@core/services/auth.service';

/**
 * Initialize authentication state on app startup
 * Verifies if user has valid session cookie
 */
function initializeAuth(authService: AuthService): () => Observable<AuthResponse | null> {
  return () =>
    authService.verifyAuth().pipe(
      catchError(() => {
        return of(null);
      })
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimationsAsync(),
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true })),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
};
