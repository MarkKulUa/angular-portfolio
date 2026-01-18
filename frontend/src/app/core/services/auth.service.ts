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
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
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
  private readonly TOKEN_KEY = 'auth_token';

  /**
   * Initialize auth state from localStorage on app start
   */
  constructor() {
    this.initializeAuthState();
  }

  /**
   * Register new user
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/register`, data)
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, data)
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.store.reset();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Get JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
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
   * Initialize auth state from localStorage
   */
  private initializeAuthState(): void {
    const token = this.getToken();
    if (token) {
      // TODO: implement validate token with backend. 1. If token exists, 2. Decode JWT to get user info
    }
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.access_token);
    this.store.setUser({
      id: response.user.id,
      email: response.user.email,
      name: response.user.name,
      createdAt: new Date(),
    });
  }
}
