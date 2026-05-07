interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
}

export function FilterBar({ searchTerm, onSearchChange, filterCategory, onFilterChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        {/* Ícone de Lupa */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar por nome (ex: onça)..."
          className="w-full pl-11 p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-sm transition-all text-gray-700"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <select
        aria-label="Filtrar por categoria"
        className="p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-sm transition-all text-gray-700 min-w-[200px]"
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