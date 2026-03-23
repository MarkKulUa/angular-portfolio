import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fc from "fast-check";
import { apiClient, ApiError } from "@/api/client";

/**
 * Property 10: API_Client error handling
 *
 * *For any* HTTP response with a non-2xx status code, the API_Client must throw
 * an ApiError containing the status code and an error message extracted from the
 * response body.
 *
 * **Validates: Requirement 13.4**
 */

vi.mock("@/env", () => ({
  env: {
    apiUrl: "http://test-api.com",
  },
}));

const NON_2XX_STATUS_CODES = [400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503, 504];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Property 10: API_Client error handling", () => {
  it("should throw ApiError with correct status and message for any non-2xx status code and any error message", () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...NON_2XX_STATUS_CODES),
        fc.string({ minLength: 1, maxLength: 200 }),
        async (statusCode, errorMessage) => {
          const mockResponse = new Response(
            JSON.stringify({ message: errorMessage }),
            {
              status: statusCode,
              statusText: "Error",
              headers: { "Content-Type": "application/json" },
            }
          );

          vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

          try {
            await apiClient("/test-endpoint");
            // Should never reach here
            expect.unreachable("apiClient should have thrown an ApiError");
          } catch (error) {
            expect(error).toBeInstanceOf(ApiError);
            const apiError = error as ApiError;
            expect(apiError.status).toBe(statusCode);
            expect(apiError.message).toBe(errorMessage);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should fallback to statusText when response body is not valid JSON", () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...NON_2XX_STATUS_CODES),
        fc.string({ minLength: 1, maxLength: 50 }),
        async (statusCode, statusText) => {
          const mockResponse = new Response("not valid json", {
            status: statusCode,
            statusText,
          });

          vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

          try {
            await apiClient("/test-endpoint");
            expect.unreachable("apiClient should have thrown an ApiError");
          } catch (error) {
            expect(error).toBeInstanceOf(ApiError);
            const apiError = error as ApiError;
            expect(apiError.status).toBe(statusCode);
            expect(apiError.message).toBe(statusText);
          }
        }
      ),
      { numRuns: 50 }
    );
  });
});
