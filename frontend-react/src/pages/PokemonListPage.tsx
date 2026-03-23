import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePokemonList } from "@/hooks/use-pokemon";
import { PokemonCard } from "./pokemon/PokemonCard";
import { PokemonPagination } from "./pokemon/PokemonPagination";
import { PokemonSelectedFlyout } from "./pokemon/PokemonSelectedFlyout";

export default function PokemonListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(search);

  const { data, isLoading, error } = usePokemonList(search, page);
  const totalPages = data ? Math.ceil(data.count / 20) : 0;

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (searchInput.trim()) params.search = searchInput.trim();
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (newPage > 1) params.page = String(newPage);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">Pokemon Explorer</h1>
        <p className="mb-4 text-gray-600">
          Browse and search Pokemon using the{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            PokeAPI
          </a>
          . Select multiple Pokemon and export to CSV.
        </p>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Pokemon by name..."
            disabled={isLoading}
            className="flex-1 rounded-md border px-4 py-2 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            aria-label="Search"
            className="rounded-md bg-indigo-600 px-6 py-2 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            🔍
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          <p className="mt-4 text-gray-500">Loading Pokemon...</p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-center">
          <h3 className="font-semibold text-red-800">Error occurred</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      )}

      {!isLoading && !error && data && data.results.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          No Pokemon found. Try a different search term.
        </p>
      )}

      {!isLoading && !error && data && data.results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.results.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <PokemonPagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={data?.count ?? 0}
          onPageChange={handlePageChange}
        />
      )}

      <PokemonSelectedFlyout />
    </div>
  );
}
