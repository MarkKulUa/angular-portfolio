import type { PokemonResponse, PokemonDetails } from "@/types/pokemon";

const POKE_BASE = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  searchPokemon: async (
    searchTerm = "",
    page = 1,
    limit = 20
  ): Promise<PokemonResponse> => {
    const offset = (page - 1) * limit;

    if (searchTerm.trim()) {
      const res = await fetch(`${POKE_BASE}/pokemon?limit=1000`);
      if (!res.ok) throw new Error("Ошибка загрузки покемонов");
      const data: PokemonResponse = await res.json();

      const filtered = data.results.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        ...data,
        count: filtered.length,
        results: filtered.slice(offset, offset + limit),
      };
    }

    const res = await fetch(
      `${POKE_BASE}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!res.ok) throw new Error("Ошибка загрузки покемонов");
    return res.json();
  },

  getPokemonDetails: async (
    nameOrId: string | number
  ): Promise<PokemonDetails> => {
    const res = await fetch(`${POKE_BASE}/pokemon/${nameOrId}`);
    if (!res.ok) throw new Error(`Покемон "${nameOrId}" не найден`);
    return res.json();
  },
};
