import { SelectedPokemon } from '@core/models/pokemon.model';

export class CsvExportUtil {
  static exportPokemonToCSV(items: SelectedPokemon[]): void {
    if (items.length === 0) {
      return;
    }

    const headers = [
      'Name',
      'ID',
      'Height (m)',
      'Weight (kg)',
      'Types',
      'Abilities',
      'Details URL',
    ];

    const csvRows = items.map((item) => {
      const pokemon = item.pokemon;
      const details = item.details;

      const name = pokemon.name;
      const id = details?.id.toString() || 'N/A';
      const height = details ? (details.height / 10).toString() : 'N/A';
      const weight = details ? (details.weight / 10).toString() : 'N/A';
      const types = details ? details.types.map((t) => t.type.name).join('; ') : 'N/A';
      const abilities = details ? details.abilities.map((a) => a.ability.name).join('; ') : 'N/A';
      const url = pokemon.url;

      return [
        this.escapeCSV(name),
        this.escapeCSV(id),
        this.escapeCSV(height),
        this.escapeCSV(weight),
        this.escapeCSV(types),
        this.escapeCSV(abilities),
        this.escapeCSV(url),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${items.length}_pokemon_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private static escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
