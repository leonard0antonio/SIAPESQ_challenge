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
    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
      <p className="text-xs font-bold text-blue-600 uppercase mb-3">Localização (IBGE ou Manual)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Input da Cidade com Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
          <input
            placeholder="Busque ou digite a cidade..."
            className="w-full p-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-400 transition-all"
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
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
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