import { Link, useParams } from "react-router-dom";
import { usePokemonDetails } from "@/hooks/use-pokemon";

function getImageUrl(details: {
  sprites: {
    front_default: string | null;
    other?: { "official-artwork"?: { front_default: string | null } };
  };
}): string {
  return (
    details.sprites.other?.["official-artwork"]?.front_default ??
    details.sprites.front_default ??
    "https://via.placeholder.com/300?text=No+Image"
  );
}

function getStatPercentage(baseStat: number): number {
  return Math.min((baseStat / 255) * 100, 100);
}

function getStatColor(baseStat: number): string {
  if (baseStat >= 100) return "bg-green-500";
  if (baseStat >= 70) return "bg-blue-500";
  if (baseStat >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function PokemonDetailsPage() {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, isLoading, error } = usePokemonDetails(name ?? "");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          <p className="mt-4 text-gray-500">Loading Pokemon details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-md bg-red-50 p-6 text-center">
          <h3 className="font-semibold text-red-800">Error occurred</h3>
          <p className="text-red-600">{error.message}</p>
          <Link
            to="/pokemon"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            ← Back to list
          </Link>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/pokemon"
        className="mb-6 inline-block text-indigo-600 hover:underline"
      >
        ← Back to list
      </Link>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex justify-center md:w-1/3">
          <img
            src={getImageUrl(pokemon)}
            alt={pokemon.name}
            className="h-64 w-64 object-contain"
          />
        </div>

        <div className="md:w-2/3">
          <p className="text-sm text-gray-500">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <h1 className="mb-2 text-3xl font-bold">
            {capitalize(pokemon.name)}
          </h1>

          <div className="mb-4 flex flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="mb-6 flex gap-6">
            <div>
              <span className="text-sm text-gray-500">Height</span>
              <p className="font-semibold">{pokemon.height / 10} m</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Weight</span>
              <p className="font-semibold">{pokemon.weight / 10} kg</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="rounded-md bg-gray-100 px-3 py-1 text-sm"
                >
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold">Base Stats</h2>
            <div className="space-y-2">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center gap-3">
                  <span className="w-32 text-sm capitalize text-gray-600">
                    {s.stat.name}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${getStatColor(s.base_stat)}`}
                      style={{ width: `${getStatPercentage(s.base_stat)}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-medium">
                    {s.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
