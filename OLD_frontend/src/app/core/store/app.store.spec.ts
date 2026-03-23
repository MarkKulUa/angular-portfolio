import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AppStore } from './app.store';

describe('AppStore', () => {
  let store: AppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStore],
    });
    store = TestBed.inject(AppStore);
  });

  it('should have initial state', () => {
    expect(store.user()).toBeNull();
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('should update user state', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };

    store.setUser(user);

    expect(store.user()).toEqual(user);
    expect(store.isAuthenticated()).toBe(true);
  });

  it('should set user to null', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };
    store.setUser(user);

    store.setUser(null);

    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('should update loading state to true', () => {
    store.setLoading(true);

    expect(store.loading()).toBe(true);
  });

  it('should update loading state to false', () => {
    store.setLoading(true);
    store.setLoading(false);

    expect(store.loading()).toBe(false);
  });

  it('should update error state', () => {
    const errorMessage = 'Something went wrong';

    store.setError(errorMessage);

    expect(store.error()).toBe(errorMessage);
  });

  it('should clear error state', () => {
    store.setError('Error message');
    store.setError(null);

    expect(store.error()).toBeNull();
  });

  it('should reset state to initial values', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };

    store.setUser(user);
    store.setLoading(true);
    store.setError('Error message');
    store.reset();

    expect(store.user()).toBeNull();
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });
});
