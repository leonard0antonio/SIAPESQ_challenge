interface IBGELocation {
  city: string;
  state: string;
}

interface Props {
  city: string;
  state: string;
  disabled: boolean;
  showSuggestions: boolean;
  filteredLocations: IBGELocation[];
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange: (val: string) => void;
  onSelectLocation: (loc: IBGELocation) => void;
  onBlurCity: () => void;
}

export function LocationAutocomplete({
  city, state, disabled, showSuggestions, filteredLocations,
  onCityChange, onStateChange, onSelectLocation, onBlurCity
}: Props) {
  return (
    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Localização (IBGE ou Manual)</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Input da Cidade com Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
          <input
            placeholder="Busque ou digite a cidade..."
            className="w-full p-3 border border-gray-300 rounded-lg bg-white outline-none ffocus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            value={city}
            onChange={onCityChange}
            onBlur={onBlurCity}
            disabled={disabled}
            autoComplete="none"
          />

          {showSuggestions && filteredLocations.length > 0 && (
            <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-48 overflow-y-auto">
              {filteredLocations.map((loc, idx) => (
                <li
                  key={idx}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex justify-between border-b last:border-b-0"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Evita que o onBlur feche a lista antes do clique
                    onSelectLocation(loc);
                  }}
                >
                  <span className="font-bold">{loc.city}</span>
                  <span className="text-blue-600 font-bold text-xs bg-blue-100 px-2 py-1 rounded">{loc.state}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input do Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <input
            placeholder="Ex: SP"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-emerald-500/50 focus:border-emerald-500 outline-none"
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            disabled={disabled}
            autoComplete="none"
          />
        </div>
      </div>
      <p className="text-[11px] text-gray-500 mt-2">
        Selecione uma cidade da lista do Brasil ou digite manualmente.
      </p>
    </div>
  );
}