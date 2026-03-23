import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { loginSchema } from "@/schemas/login.schema";

/**
 * Property 3: Login schema validation
 *
 * For any input object, the login Zod schema must accept it if and only if
 * email is a valid email address and password has at least 3 characters.
 * Invalid inputs must produce corresponding error messages.
 *
 * **Validates: Requirement 5.1**
 */

// Smart generator: produce emails that both fc and Zod agree are valid.
// fc.emailAddress() can produce RFC-valid emails that Zod's simpler validator rejects,
// so we build emails from safe alphanumeric parts.
const arbValidEmail = fc
  .tuple(
    fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/).filter((s) => s.length >= 1),
    fc.stringMatching(/^[a-z][a-z0-9]{0,5}$/).filter((s) => s.length >= 1),
    fc.constantFrom("com", "org", "net", "io", "dev"),
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

describe("Property 3: Login schema validation", () => {
  it("accepts any valid email + password with minLength 3", () => {
    fc.assert(
      fc.property(
        arbValidEmail,
        fc.string({ minLength: 3, maxLength: 200 }),
        (email, password) => {
          const result = loginSchema.safeParse({ email, password });
          expect(result.success).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("rejects invalid emails with error on email path", () => {
    // Generate strings that are NOT valid emails
    const arbInvalidEmail = fc
      .string({ minLength: 1, maxLength: 100 })
      .filter((s) => !s.includes("@") || !s.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));

    fc.assert(
      fc.property(
        arbInvalidEmail,
        fc.string({ minLength: 3, maxLength: 200 }),
        (invalidEmail, password) => {
          const result = loginSchema.safeParse({ email: invalidEmail, password });
          expect(result.success).toBe(false);
          if (!result.success) {
            const emailErrors = result.error.issues.filter(
              (issue) => issue.path[0] === "email",
            );
            expect(emailErrors.length).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("rejects passwords shorter than 3 characters with error on password path", () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 0, maxLength: 2 }),
        (email, shortPassword) => {
          const result = loginSchema.safeParse({ email, password: shortPassword });
          expect(result.success).toBe(false);
          if (!result.success) {
            const passwordErrors = result.error.issues.filter(
              (issue) => issue.path[0] === "password",
            );
            expect(passwordErrors.length).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
