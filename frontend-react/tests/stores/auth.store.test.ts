import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";
import { useAuthStore } from "@/stores/auth.store";
import type { User } from "@/types/user";

/**
 * Property 1: AuthStore setUser synchronizes isAuthenticated
 *
 * *For any* User object (or null), after calling setUser(user),
 * the AuthStore's isAuthenticated field must equal `!!user`,
 * and error must be reset to null.
 *
 * **Validates: Requirement 6.2**
 */

const arbUser: fc.Arbitrary<User> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 50 }),
  email: fc.emailAddress(),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  createdAt: fc.date(),
});

const arbUserOrNull: fc.Arbitrary<User | null> = fc.oneof(arbUser, fc.constant(null));

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  });
});

describe("Property 1: AuthStore setUser synchronizes isAuthenticated", () => {
  it("isAuthenticated equals !!user and error is null after setUser for any User or null", () => {
    fc.assert(
      fc.property(arbUserOrNull, (user) => {
        // Set some error first to verify it gets cleared
        useAuthStore.setState({ error: "some previous error" });

        useAuthStore.getState().setUser(user);

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(!!user);
        expect(state.error).toBeNull();
        expect(state.user).toBe(user);
      }),
      { numRuns: 100 },
    );
  });
});


/**
 * Property 2: AuthStore reset returns to initial state
 *
 * *For any* prior state of the AuthStore (with arbitrary user, loading, error values),
 * after calling reset(), the store must return to the initial state:
 * user=null, loading=false, error=null, isAuthenticated=false.
 *
 * **Validates: Requirement 6.3**
 */

const arbAuthState = fc.record({
  user: arbUserOrNull,
  loading: fc.boolean(),
  error: fc.oneof(fc.string({ minLength: 1, maxLength: 200 }), fc.constant(null)),
});

describe("Property 2: AuthStore reset returns to initial state", () => {
  it("reset() returns all fields to initial state for any prior state", () => {
    fc.assert(
      fc.property(arbAuthState, ({ user, loading, error }) => {
        // Set the store to an arbitrary state
        useAuthStore.setState({
          user,
          loading,
          error,
          isAuthenticated: !!user,
        });

        // Call reset
        useAuthStore.getState().reset();

        // Assert all fields match initial state
        const state = useAuthStore.getState();
        expect(state.user).toBeNull();
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
        expect(state.isAuthenticated).toBe(false);
      }),
      { numRuns: 100 },
    );
  });
});
