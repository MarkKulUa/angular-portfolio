interface PokemonPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function PokemonPagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: PokemonPaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="text-sm text-gray-500">
        Showing page {currentPage} of {totalPages} ({totalItems} total)
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={!canGoPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="rounded-md border px-4 py-2 text-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>

        <span className="px-3 text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="rounded-md border px-4 py-2 text-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
