import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fc from "fast-check";
import { exportPokemonToCSV, escapeCSV } from "@/utils/csv-export";
import type { SelectedPokemon, PokemonDetails } from "@/types/pokemon";

/**
 * Property 7: CSV export correctness
 *
 * *For any* non-empty array of SelectedPokemon, the generated CSV must contain
 * exactly items.length + 1 lines (header + data rows), include all 7 columns
 * (Name, ID, Height, Weight, Types, Abilities, Details URL), and the download
 * filename must match the pattern `{count}_pokemon_export.csv`.
 *
 * **Validates: Requirements 11.5, 11.6**
 */

const arbPokemonDetails: fc.Arbitrary<PokemonDetails> = fc.record({
  id: fc.integer({ min: 1, max: 10000 }),
  name: fc.string({ minLength: 1, maxLength: 30 }),
  height: fc.integer({ min: 1, max: 200 }),
  weight: fc.integer({ min: 1, max: 10000 }),
  sprites: fc.constant({ front_default: "https://example.com/sprite.png" }),
  types: fc.array(
    fc.record({ type: fc.record({ name: fc.stringMatching(/^[a-z]{3,10}$/) }) }),
    { minLength: 1, maxLength: 3 },
  ),
  abilities: fc.array(
    fc.record({ ability: fc.record({ name: fc.stringMatching(/^[a-z-]{3,15}$/) }) }),
    { minLength: 1, maxLength: 3 },
  ),
  stats: fc.array(
    fc.record({
      base_stat: fc.integer({ min: 1, max: 255 }),
      stat: fc.record({ name: fc.stringMatching(/^[a-z-]{2,20}$/) }),
    }),
    { minLength: 1, maxLength: 6 },
  ),
});

const arbSelectedPokemon: fc.Arbitrary<SelectedPokemon> = fc.record({
  pokemon: fc.record({
    name: fc.stringMatching(/^[a-z]{3,15}$/),
    url: fc.constant("https://pokeapi.co/api/v2/pokemon/1/"),
  }),
  details: fc.oneof(arbPokemonDetails, fc.constant(null)),
});

let capturedCSV: string | null = null;
let capturedFilename: string | null = null;
const OriginalBlob = globalThis.Blob;

beforeEach(() => {
  capturedCSV = null;
  capturedFilename = null;

  // Replace Blob with a subclass that captures the CSV content
  globalThis.Blob = class MockBlob extends OriginalBlob {
    constructor(parts?: BlobPart[], options?: BlobPropertyBag) {
      super(parts, options);
      if (parts && parts.length > 0) {
        capturedCSV = String(parts[0]);
      }
    }
  } as typeof Blob;

  // Mock DOM APIs used by exportPokemonToCSV
  const mockLink = {
    href: "",
    download: "",
    style: { visibility: "" },
    click: vi.fn(),
  };

  vi.spyOn(document, "createElement").mockReturnValue(mockLink as unknown as HTMLElement);
  vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
  vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);
  vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url");
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

  // Capture filename from the mock link
  Object.defineProperty(mockLink, "download", {
    set(value: string) {
      capturedFilename = value;
    },
    get() {
      return capturedFilename ?? "";
    },
    configurable: true,
  });
});

afterEach(() => {
  globalThis.Blob = OriginalBlob;
  vi.restoreAllMocks();
});

describe("Property 7: CSV export correctness", () => {
  it("CSV has exactly items.length + 1 lines, 7 columns per row, and correct filename for any non-empty SelectedPokemon array", () => {
    fc.assert(
      fc.property(
        fc.array(arbSelectedPokemon, { minLength: 1, maxLength: 20 }),
        (items) => {
          capturedCSV = null;
          capturedFilename = null;

          exportPokemonToCSV(items);

          // Verify CSV was captured
          expect(capturedCSV).not.toBeNull();

          const lines = capturedCSV!.split("\n");

          // Must have header + one row per item
          expect(lines.length).toBe(items.length + 1);

          // Header must have 7 columns
          const headerColumns = lines[0].split(",");
          expect(headerColumns.length).toBe(7);
          expect(headerColumns).toEqual([
            "Name",
            "ID",
            "Height (m)",
            "Weight (kg)",
            "Types",
            "Abilities",
            "Details URL",
          ]);

          // Each data row must have at least 7 comma-separated values
          // (escaped fields may contain commas inside quotes, so we parse carefully)
          for (let i = 1; i < lines.length; i++) {
            const columns = parseCSVRow(lines[i]);
            expect(columns.length).toBe(7);
          }

          // Filename must match pattern
          expect(capturedFilename).toBe(`${items.length}_pokemon_export.csv`);
        },
      ),
      { numRuns: 50 },
    );
  });
});

/**
 * Property 8: CSV escapeCSV handles special characters
 *
 * *For any* string value, the escapeCSV function must produce a valid CSV field:
 * if the input contains commas, double quotes, or newlines, the output must be
 * wrapped in double quotes with internal quotes doubled.
 *
 * **Validates: Requirement 11.8**
 */

describe("Property 8: CSV escapeCSV handles special characters", () => {
  it("escapeCSV wraps in quotes and doubles internal quotes when input has special chars", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 0, maxLength: 200 }), (value) => {
        const escaped = escapeCSV(value);
        const hasSpecial =
          value.includes(",") || value.includes('"') || value.includes("\n");

        if (hasSpecial) {
          // Must be wrapped in double quotes
          expect(escaped.startsWith('"')).toBe(true);
          expect(escaped.endsWith('"')).toBe(true);

          // Inner content (strip outer quotes) must have all original quotes doubled
          const inner = escaped.slice(1, -1);
          const unescaped = inner.replace(/""/g, '"');
          expect(unescaped).toBe(value);
        } else {
          // No special chars → output equals input
          expect(escaped).toBe(value);
        }
      }),
      { numRuns: 200 },
    );
  });
});

/**
 * Simple CSV row parser that handles quoted fields with escaped quotes.
 */
function parseCSVRow(row: string): string[] {
  const fields: string[] = [];
  let i = 0;

  while (i <= row.length) {
    if (i === row.length) {
      fields.push("");
      break;
    }

    if (row[i] === '"') {
      // Quoted field
      let field = "";
      i++; // skip opening quote
      while (i < row.length) {
        if (row[i] === '"') {
          if (i + 1 < row.length && row[i + 1] === '"') {
            field += '"';
            i += 2;
          } else {
            i++; // skip closing quote
            break;
          }
        } else {
          field += row[i];
          i++;
        }
      }
      fields.push(field);
      if (i < row.length && row[i] === ",") {
        i++; // skip comma
      }
    } else {
      // Unquoted field
      const commaIdx = row.indexOf(",", i);
      if (commaIdx === -1) {
        fields.push(row.slice(i));
        break;
      } else {
        fields.push(row.slice(i, commaIdx));
        i = commaIdx + 1;
      }
    }
  }

  return fields;
}
