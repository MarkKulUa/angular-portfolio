import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AppStore } from '../store/app.store';

describe('authGuard', () => {
  let mockRouter: { createUrlTree: ReturnType<typeof vi.fn> };
  let mockStore: { isAuthenticated: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockRouter = {
      createUrlTree: vi.fn(),
    };

    mockStore = {
      isAuthenticated: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AppStore, useValue: mockStore },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should allow access when authenticated', () => {
    mockStore.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

    expect(result).toBe(true);
    expect(mockStore.isAuthenticated).toHaveBeenCalled();
  });

  it('should redirect to login when not authenticated', () => {
    const mockUrlTree = { toString: (): string => '/auth/login' };
    mockStore.isAuthenticated.mockReturnValue(false);
    mockRouter.createUrlTree.mockReturnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

    expect(result).toBe(mockUrlTree);
    expect(mockStore.isAuthenticated).toHaveBeenCalled();
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/auth/login']);
  });
});
