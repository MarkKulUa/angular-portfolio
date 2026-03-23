import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fc from "fast-check";
import { pokemonApi } from "@/api/pokemon";

/**
 * Property 6: Pokemon search filtering
 *
 * *For any* search term and any list of pokemon names, the searchPokemon function
 * with a non-empty search term must return only pokemon whose names contain the
 * search term (case-insensitive), and the count must equal the total number of
 * matching pokemon.
 *
 * **Validates: Requirement 9.2**
 */

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Property 6: Pokemon search filtering", () => {
  it("should return only pokemon whose names contain the search term (case-insensitive) and count equals total matches", () => {
    fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0),
        fc.array(
          fc.string({ minLength: 1, maxLength: 30 }),
          { minLength: 0, maxLength: 50 }
        ),
        async (searchTerm, pokemonNames) => {
          const pokemonList = pokemonNames.map((name) => ({
            name,
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
          }));

          const mockResponse = new Response(
            JSON.stringify({
              count: pokemonList.length,
              next: null,
              previous: null,
              results: pokemonList,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );

          vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

          const result = await pokemonApi.searchPokemon(searchTerm, 1, 1000);

          const expectedMatches = pokemonList.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          // All returned results must contain the search term (case-insensitive)
          for (const pokemon of result.results) {
            expect(pokemon.name.toLowerCase()).toContain(
              searchTerm.toLowerCase()
            );
          }

          // Count must equal the total number of matching pokemon
          expect(result.count).toBe(expectedMatches.length);

          // Results length must equal expected matches (since limit=1000 covers all)
          expect(result.results.length).toBe(expectedMatches.length);
        }
      ),
      { numRuns: 100 }
    );
  });
});
