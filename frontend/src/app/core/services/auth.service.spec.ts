import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AppStore } from '../store/app.store';
import { environment } from '@environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let store: AppStore;
  const router = { navigate: vi.fn() };
  const user = { id: '1', email: 'demo@example.com', name: 'Demo', createdAt: new Date(0) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: router },
      ],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(AppStore);
    router.navigate.mockClear();
  });

  afterEach(() => http.verify());

  it('stores the user after login, sending cookies', () => {
    service.login({ email: user.email, password: 'secret' }).subscribe();

    const req = http.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.withCredentials).toBe(true);
    req.flush({ user });

    expect(store.isAuthenticated()).toBe(true);
    expect(store.user()?.email).toBe(user.email);
  });

  it('clears the session and returns to the Lab sign-in page on logout', () => {
    store.setUser(user);
    service.logout();
    http.expectOne(`${environment.apiUrl}/auth/logout`).flush({});

    expect(store.isAuthenticated()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/lab/auth/login']);
  });

  it('clears local state even when the logout request fails', () => {
    store.setUser(user);
    service.logout();
    http
      .expectOne(`${environment.apiUrl}/auth/logout`)
      .flush(null, { status: 500, statusText: 'Server Error' });

    expect(store.isAuthenticated()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/lab/auth/login']);
  });
});
