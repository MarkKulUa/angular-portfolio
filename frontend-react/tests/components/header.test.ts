import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { isActive } from "@/components/Header";

/**
 * Property 9: Header isActive link detection
 *
 * *For any* pathname string, the isActive function must return true
 * for a link with `exact=true` only when pathname exactly equals the link's `to` path,
 * and for a link with `exact=false` when pathname starts with the link's `to` path.
 *
 * **Validates: Requirement 12.2**
 */

const arbPathSegment = fc.stringOf(
  fc.constantFrom(
    ..."abcdefghijklmnopqrstuvwxyz0123456789-_".split(""),
  ),
  { minLength: 1, maxLength: 20 },
);

const arbPathname = fc
  .array(arbPathSegment, { minLength: 0, maxLength: 5 })
  .map((segments) => "/" + segments.join("/"));

describe("Property 9: Header isActive link detection", () => {
  it("exact mode: isActive(pathname, to, true) === (pathname === to)", () => {
    fc.assert(
      fc.property(arbPathname, arbPathname, (pathname, to) => {
        expect(isActive(pathname, to, true)).toBe(pathname === to);
      }),
      { numRuns: 200 },
    );
  });

  it("prefix mode: isActive(pathname, to, false) === pathname.startsWith(to)", () => {
    fc.assert(
      fc.property(arbPathname, arbPathname, (pathname, to) => {
        expect(isActive(pathname, to, false)).toBe(pathname.startsWith(to));
      }),
      { numRuns: 200 },
    );
  });
});
