import { usePokemonDetails } from "@/hooks/use-pokemon";
import { usePokemonSelectionStore } from "@/stores/pokemon-selection.store";
import type { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const { data: details, isLoading: isLoadingDetails } = usePokemonDetails(pokemon.name);
  const isSelected = usePokemonSelectionStore((s) => s.isSelected(pokemon.name));
  const toggleSelection = usePokemonSelectionStore((s) => s.toggleSelection);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleSelection({ pokemon, details: details ?? null });
  };

  const imageUrl =
    details?.sprites.other?.["official-artwork"]?.front_default ??
    details?.sprites.front_default ??
    "https://via.placeholder.com/150?text=No+Image";

  const pokemonId = details?.id.toString().padStart(3, "0") ?? "???";
  const types = details?.types.map((t) => t.type.name) ?? [];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`relative cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg ${
        isSelected ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onClick={handleCheckboxClick}
        onChange={() => {}}
        className="absolute right-3 top-3 h-4 w-4 cursor-pointer accent-indigo-600"
        aria-label={`Select ${pokemon.name}`}
      />

      <div className="flex h-32 items-center justify-center">
        {isLoadingDetails ? (
          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
        ) : (
          <img src={imageUrl} alt={pokemon.name} className="h-full w-auto object-contain" />
        )}
      </div>

      <div className="mt-2 text-center">
        <div className="text-xs text-gray-400">#{pokemonId}</div>
        <h3 className="text-sm font-semibold capitalize">{pokemon.name}</h3>
        {types.length > 0 && (
          <div className="mt-1 flex flex-wrap justify-center gap-1">
            {types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
