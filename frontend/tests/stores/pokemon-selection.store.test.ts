import { describe, it, expect, beforeEach } from "vitest";
import { usePokemonSelectionStore } from "@/stores/pokemon-selection.store";
import type { SelectedPokemon } from "@/types/pokemon";

function makeItem(name: string): SelectedPokemon {
  return {
    pokemon: { name, url: `https://pokeapi.co/api/v2/pokemon/${name}` },
    details: null,
  };
}

beforeEach(() => {
  usePokemonSelectionStore.setState({
    selected: [],
    selectedCount: 0,
    hasSelected: false,
  });
});

describe("PokemonSelectionStore", () => {
  it("starts with empty selection", () => {
    const state = usePokemonSelectionStore.getState();
    expect(state.selected).toEqual([]);
    expect(state.selectedCount).toBe(0);
    expect(state.hasSelected).toBe(false);
  });

  it("toggleSelection adds a pokemon when not selected", () => {
    const item = makeItem("pikachu");
    usePokemonSelectionStore.getState().toggleSelection(item);

    const state = usePokemonSelectionStore.getState();
    expect(state.selected).toHaveLength(1);
    expect(state.selected[0].pokemon.name).toBe("pikachu");
    expect(state.selectedCount).toBe(1);
    expect(state.hasSelected).toBe(true);
  });

  it("toggleSelection removes a pokemon when already selected", () => {
    const item = makeItem("pikachu");
    const store = usePokemonSelectionStore.getState();
    store.toggleSelection(item);
    store.toggleSelection(item);

    const state = usePokemonSelectionStore.getState();
    expect(state.selected).toHaveLength(0);
    expect(state.selectedCount).toBe(0);
    expect(state.hasSelected).toBe(false);
  });

  it("guarantees no duplicates by pokemon.name", () => {
    const item = makeItem("bulbasaur");
    const store = usePokemonSelectionStore.getState();
    store.toggleSelection(item);
    store.toggleSelection(item);
    store.toggleSelection(item);

    const state = usePokemonSelectionStore.getState();
    expect(state.selected).toHaveLength(1);
    expect(state.selectedCount).toBe(1);
  });

  it("isSelected returns correct boolean", () => {
    const item = makeItem("charmander");
    usePokemonSelectionStore.getState().toggleSelection(item);

    expect(usePokemonSelectionStore.getState().isSelected("charmander")).toBe(true);
    expect(usePokemonSelectionStore.getState().isSelected("squirtle")).toBe(false);
  });

  it("clearSelection resets everything", () => {
    const store = usePokemonSelectionStore.getState();
    store.toggleSelection(makeItem("pikachu"));
    store.toggleSelection(makeItem("bulbasaur"));
    store.clearSelection();

    const state = usePokemonSelectionStore.getState();
    expect(state.selected).toEqual([]);
    expect(state.selectedCount).toBe(0);
    expect(state.hasSelected).toBe(false);
  });

  it("selectedCount and hasSelected stay synchronized", () => {
    const store = usePokemonSelectionStore.getState();
    store.toggleSelection(makeItem("a"));
    store.toggleSelection(makeItem("b"));
    store.toggleSelection(makeItem("c"));

    let state = usePokemonSelectionStore.getState();
    expect(state.selectedCount).toBe(3);
    expect(state.hasSelected).toBe(true);

    store.toggleSelection(makeItem("b"));
    state = usePokemonSelectionStore.getState();
    expect(state.selectedCount).toBe(2);
    expect(state.hasSelected).toBe(true);

    store.toggleSelection(makeItem("a"));
    store.toggleSelection(makeItem("c"));
    state = usePokemonSelectionStore.getState();
    expect(state.selectedCount).toBe(0);
    expect(state.hasSelected).toBe(false);
  });
});

import * as fc from "fast-check";

/**
 * **Validates: Requirements 11.1, 11.2, 11.3**
 *
 * Property 5: PokemonSelectionStore invariants
 *
 * For any sequence of toggleSelection calls with arbitrary SelectedPokemon items,
 * the store must maintain:
 * (a) no duplicates by pokemon.name in the selected array
 * (b) toggling a non-selected pokemon increases selected.length by 1
 * (c) toggling an already-selected pokemon decreases selected.length by 1
 * (d) selectedCount always equals selected.length
 * (e) hasSelected always equals selected.length > 0
 */
describe("Property 5: PokemonSelectionStore invariants", () => {
  const pokemonNameArb = fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0);

  const pokemonNamesSeqArb = fc.array(pokemonNameArb, { minLength: 1, maxLength: 50 });

  function makeSelectedPokemon(name: string): SelectedPokemon {
    return {
      pokemon: { name, url: `https://pokeapi.co/api/v2/pokemon/${name}` },
      details: null,
    };
  }

  it("maintains all invariants for any sequence of toggleSelection calls", () => {
    fc.assert(
      fc.property(pokemonNamesSeqArb, (names) => {
        // Reset store before each property run
        usePokemonSelectionStore.setState({
          selected: [],
          selectedCount: 0,
          hasSelected: false,
        });

        for (const name of names) {
          const stateBefore = usePokemonSelectionStore.getState();
          const wasSelected = stateBefore.selected.some((p) => p.pokemon.name === name);
          const lengthBefore = stateBefore.selected.length;

          const item = makeSelectedPokemon(name);
          usePokemonSelectionStore.getState().toggleSelection(item);

          const stateAfter = usePokemonSelectionStore.getState();

          // (a) No duplicates by pokemon.name
          const nameSet = new Set(stateAfter.selected.map((p) => p.pokemon.name));
          expect(nameSet.size).toBe(stateAfter.selected.length);

          // (b) Toggling a non-selected pokemon increases selected.length by 1
          if (!wasSelected) {
            expect(stateAfter.selected.length).toBe(lengthBefore + 1);
          }

          // (c) Toggling an already-selected pokemon decreases selected.length by 1
          if (wasSelected) {
            expect(stateAfter.selected.length).toBe(lengthBefore - 1);
          }

          // (d) selectedCount always equals selected.length
          expect(stateAfter.selectedCount).toBe(stateAfter.selected.length);

          // (e) hasSelected always equals selected.length > 0
          expect(stateAfter.hasSelected).toBe(stateAfter.selected.length > 0);
        }
      }),
      { numRuns: 100 }
    );
  });
});
