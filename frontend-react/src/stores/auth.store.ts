import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user, error: null }),

  setLoading: (loading) =>
    set({ loading }),

  setError: (error) =>
    set({ error }),

  reset: () =>
    set(initialState),
}));
