import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "@/api/pokemon";

export function usePokemonList(searchTerm: string, page: number, limit = 20) {
  return useQuery({
    queryKey: ["pokemon", "list", searchTerm, page, limit],
    queryFn: () => pokemonApi.searchPokemon(searchTerm, page, limit),
    placeholderData: (prev) => prev,
  });
}

export function usePokemonDetails(nameOrId: string) {
  return useQuery({
    queryKey: ["pokemon", "details", nameOrId],
    queryFn: () => pokemonApi.getPokemonDetails(nameOrId),
    enabled: !!nameOrId,
  });
}
