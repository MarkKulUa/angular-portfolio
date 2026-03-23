import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { registerSchema } from "@/schemas/register.schema";

/**
 * Property 4: Register schema validation
 *
 * For any input object, the register Zod schema must accept it if and only if
 * name has at least 2 characters, email is a valid email address, password has
 * at least 3 characters, and confirmPassword equals password. Non-matching
 * passwords must produce an error on the confirmPassword field.
 *
 * **Validates: Requirements 5.2, 5.4**
 */

// Smart email generator: alphanumeric local+domain to avoid RFC vs Zod mismatches.
const arbValidEmail = fc
  .tuple(
    fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/).filter((s) => s.length >= 1),
    fc.stringMatching(/^[a-z][a-z0-9]{0,5}$/).filter((s) => s.length >= 1),
    fc.constantFrom("com", "org", "net", "io", "dev"),
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

describe("Property 4: Register schema validation", () => {
  it("accepts valid inputs: name >= 2 chars, valid email, password >= 3 chars, confirmPassword === password", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 50 }),
        arbValidEmail,
        fc.string({ minLength: 3, maxLength: 200 }),
        (name, email, password) => {
          const result = registerSchema.safeParse({
            name,
            email,
            password,
            confirmPassword: password,
          });
          expect(result.success).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("rejects mismatched passwords with error on confirmPassword path", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 50 }),
        arbValidEmail,
        fc.string({ minLength: 3, maxLength: 200 }),
        fc.string({ minLength: 3, maxLength: 200 }),
        (name, email, password, confirmPassword) => {
          fc.pre(password !== confirmPassword);
          const result = registerSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
          });
          expect(result.success).toBe(false);
          if (!result.success) {
            const confirmErrors = result.error.issues.filter(
              (issue) => issue.path[0] === "confirmPassword",
            );
            expect(confirmErrors.length).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("rejects short names (< 2 chars) with error on name path", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 1 }),
        arbValidEmail,
        fc.string({ minLength: 3, maxLength: 200 }),
        (shortName, email, password) => {
          const result = registerSchema.safeParse({
            name: shortName,
            email,
            password,
            confirmPassword: password,
          });
          expect(result.success).toBe(false);
          if (!result.success) {
            const nameErrors = result.error.issues.filter(
              (issue) => issue.path[0] === "name",
            );
            expect(nameErrors.length).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
