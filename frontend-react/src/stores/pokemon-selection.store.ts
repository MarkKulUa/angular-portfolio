import { create } from "zustand";
import type { SelectedPokemon } from "@/types/pokemon";

interface PokemonSelectionState {
  selected: SelectedPokemon[];
  selectedCount: number;
  hasSelected: boolean;
}

interface PokemonSelectionActions {
  toggleSelection: (item: SelectedPokemon) => void;
  isSelected: (pokemonName: string) => boolean;
  clearSelection: () => void;
}

export const usePokemonSelectionStore = create<
  PokemonSelectionState & PokemonSelectionActions
>((set, get) => ({
  selected: [],
  selectedCount: 0,
  hasSelected: false,

  toggleSelection: (item) =>
    set((state) => {
      const index = state.selected.findIndex(
        (p) => p.pokemon.name === item.pokemon.name
      );
      const next =
        index > -1
          ? state.selected.filter((_, i) => i !== index)
          : [...state.selected, item];
      return {
        selected: next,
        selectedCount: next.length,
        hasSelected: next.length > 0,
      };
    }),

  isSelected: (pokemonName) =>
    get().selected.some((p) => p.pokemon.name === pokemonName),

  clearSelection: () =>
    set({ selected: [], selectedCount: 0, hasSelected: false }),
}));
