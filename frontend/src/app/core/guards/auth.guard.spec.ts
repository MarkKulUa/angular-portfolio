import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { authGuard } from './auth.guard';
import { AppStore } from '../store/app.store';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  const mockUrlTree = { toString: (): string => '/lab/auth/login' };
  let mockRouter: { createUrlTree: ReturnType<typeof vi.fn> };
  let mockStore: { isAuthenticated: ReturnType<typeof vi.fn> };
  let mockAuth: { verifyAuth: ReturnType<typeof vi.fn> };

  const runGuard = (): unknown =>
    TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

  beforeEach(() => {
    mockRouter = { createUrlTree: vi.fn().mockReturnValue(mockUrlTree) };
    mockStore = { isAuthenticated: vi.fn() };
    mockAuth = { verifyAuth: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AppStore, useValue: mockStore },
        { provide: AuthService, useValue: mockAuth },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('allows access without a backend call when the store has a user', () => {
    mockStore.isAuthenticated.mockReturnValue(true);

    expect(runGuard()).toBe(true);
    expect(mockAuth.verifyAuth).not.toHaveBeenCalled();
  });

  it('restores the session from the cookie when the store is empty', async () => {
    mockStore.isAuthenticated.mockReturnValue(false);
    mockAuth.verifyAuth.mockReturnValue(of({ user: {} }));

    await expect(firstValueFrom(runGuard() as Observable<unknown>)).resolves.toBe(true);
  });

  it('redirects to the login page when there is no valid session', async () => {
    mockStore.isAuthenticated.mockReturnValue(false);
    mockAuth.verifyAuth.mockReturnValue(throwError(() => new Error('401')));

    await expect(firstValueFrom(runGuard() as Observable<unknown>)).resolves.toBe(mockUrlTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/lab/auth/login']);
  });
});
