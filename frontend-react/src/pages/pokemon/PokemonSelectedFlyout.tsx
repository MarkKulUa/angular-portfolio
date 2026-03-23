import { usePokemonSelectionStore } from "@/stores/pokemon-selection.store";
import { exportPokemonToCSV } from "@/utils/csv-export";

export function PokemonSelectedFlyout() {
  const hasSelected = usePokemonSelectionStore((s) => s.hasSelected);
  const selectedCount = usePokemonSelectionStore((s) => s.selectedCount);
  const selected = usePokemonSelectionStore((s) => s.selected);
  const clearSelection = usePokemonSelectionStore((s) => s.clearSelection);

  if (!hasSelected) return null;

  const handleExport = () => {
    exportPokemonToCSV(selected);
  };

  const handleClear = () => {
    clearSelection();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium">
          {selectedCount} Pokemon selected
        </span>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-700"
          >
            📥 Export CSV
          </button>
          <button
            onClick={handleClear}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-100"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
