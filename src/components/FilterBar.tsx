interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
}

export function FilterBar({ searchTerm, onSearchChange, filterCategory, onFilterChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar por nome (ex: onça)..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        aria-label="Filtrar por categoria"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
        value={filterCategory}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        <option value="Aves">Aves</option>
        <option value="Mamíferos">Mamíferos</option>
        <option value="Répteis">Répteis</option>
        <option value="Anfíbios">Anfíbios</option>
      </select>
    </div>
  );
}