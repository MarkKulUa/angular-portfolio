import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppStore } from '../store/app.store';
import { User } from '@core/models/user.model';
import { environment } from '@environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(AppStore);

  private readonly API_URL = environment.apiUrl;

  /**
   * Register new user
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/register`, data, { withCredentials: true })
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, data, { withCredentials: true })
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  /**
   * Logout user
   */
  logout(): void {
    this.http.post(`${this.API_URL}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.store.reset();
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        // Even if logout fails on backend, clear local state
        this.store.reset();
        this.router.navigate(['/auth/login']);
      },
    });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.store.isAuthenticated();
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.store.user();
  }

  /**
   * Verify authentication status with backend
   * Call this on app initialization to restore session
   */
  verifyAuth(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${this.API_URL}/auth/me`, { withCredentials: true })
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    this.store.setUser({
      id: response.user.id,
      email: response.user.email,
      name: response.user.name,
      createdAt: new Date(response.user.createdAt),
    });
  }
}
