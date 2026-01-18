import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Auth interceptor is no longer needed for cookie-based authentication
 * Cookies are automatically sent with every request when withCredentials: true is set
 * This interceptor is kept for potential future use (e.g., adding custom headers)
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
