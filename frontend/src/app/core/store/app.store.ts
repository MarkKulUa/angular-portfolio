import { computed, signal, Injectable } from '@angular/core';
import { User } from '../models/user.model';

export interface AppState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  // State signals
  private readonly _state = signal<AppState>({
    user: null,
    loading: false,
    error: null,
  });

  // Selectors (computed signals)
  readonly user = computed(() => this._state().user);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);
  readonly isAuthenticated = computed(() => !!this._state().user);

  // Actions
  setUser(user: User | null): void {
    this._state.update((state) => ({ ...state, user }));
  }

  setLoading(loading: boolean): void {
    this._state.update((state) => ({ ...state, loading }));
  }

  setError(error: string | null): void {
    this._state.update((state) => ({ ...state, error }));
  }

  reset(): void {
    this._state.set({
      user: null,
      loading: false,
      error: null,
    });
  }
}
