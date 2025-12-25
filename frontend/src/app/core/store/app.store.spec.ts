import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AppStore } from './app.store';

describe('AppStore', () => {
  it('should update user state', () => {
    const store = TestBed.inject(AppStore);
    const user = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };

    store.setUser(user);

    expect(store.user()).toEqual(user);
    expect(store.isAuthenticated()).toBe(true);
  });

  it('should update loading state', () => {
    const store = TestBed.inject(AppStore);

    store.setLoading(true);

    expect(store.loading()).toBe(true);
  });

  it('should reset state', () => {
    const store = TestBed.inject(AppStore);
    const user = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };

    store.setUser(user);
    store.setLoading(true);
    store.reset();

    expect(store.user()).toBeNull();
    expect(store.loading()).toBe(false);
    expect(store.isAuthenticated()).toBe(false);
  });
});
