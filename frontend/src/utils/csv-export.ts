import type { SelectedPokemon } from "@/types/pokemon";

export function exportPokemonToCSV(items: SelectedPokemon[]): void {
  if (items.length === 0) return;

  const headers = ["Name", "ID", "Height (m)", "Weight (kg)", "Types", "Abilities", "Details URL"];

  const rows = items.map((item) => {
    const { pokemon, details } = item;
    return [
      escapeCSV(pokemon.name),
      escapeCSV(details?.id.toString() ?? "N/A"),
      escapeCSV(details ? (details.height / 10).toString() : "N/A"),
      escapeCSV(details ? (details.weight / 10).toString() : "N/A"),
      escapeCSV(details?.types.map((t) => t.type.name).join("; ") ?? "N/A"),
      escapeCSV(details?.abilities.map((a) => a.ability.name).join("; ") ?? "N/A"),
      escapeCSV(pokemon.url),
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${items.length}_pokemon_export.csv`;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
