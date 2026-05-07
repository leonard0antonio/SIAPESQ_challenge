import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Species } from '../types/species';

// Resolve o bug dos ícones padrão do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente invisível que controla a câmara do mapa
function MapController({ targetPos }: { targetPos: [number, number] | null }) {
  const map = useMap();
  if (targetPos) {
    map.flyTo(targetPos, 10, { duration: 1.5 }); 
  }
  return null;
}

interface Props {
  species: Species[];
}

export function SpeciesMap({ species }: Props) {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  // 1. Filtra apenas as espécies com coordenadas
  const mappedSpecies = useMemo(() => {
    return species.filter(s => s.latitude && s.longitude);
  }, [species]);

  // 2. Agrupa os locais para a LISTA LATERAL (Menu)
  const uniqueLocations = useMemo(() => {
    const locs: Record<string, { lat: number, lng: number, count: number, state: string, city: string }> = {};
    
    mappedSpecies.forEach(s => {
      const key = `${s.city}-${s.state}`;
      if (!locs[key]) {
        locs[key] = { lat: s.latitude!, lng: s.longitude!, count: 1, state: s.state, city: s.city };
      } else {
        locs[key].count += 1;
      }
    });

    return Object.values(locs).sort((a, b) => a.state.localeCompare(b.state));
  }, [mappedSpecies]);

  // 3. NOVO: Agrupa os animais pela MESMA COORDENADA para o POPUP do Mapa não sobrepor pinos
  const groupedMarkers = useMemo(() => {
    const groups: Record<string, { lat: number, lng: number, city: string, state: string, animals: Species[] }> = {};
    
    mappedSpecies.forEach(s => {
      // Cria uma chave única baseada na latitude e longitude exatas
      const key = `${s.latitude}-${s.longitude}`;
      if (!groups[key]) {
        groups[key] = { 
          lat: s.latitude!, 
          lng: s.longitude!, 
          city: s.city, 
          state: s.state, 
          animals: [] 
        };
      }
      groups[key].animals.push(s);
    });

    return Object.values(groups);
  }, [mappedSpecies]);

  if (mappedSpecies.length === 0) return null;

  return (
    <div className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-amber-500 w-2 h-8 rounded-full"></span>
        <h2 className="text-2xl font-bold text-gray-800">Mapa de Ocorrências</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LISTA LATERAL DE NAVEGAÇÃO */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Locais Registados ({uniqueLocations.length})
          </p>
          
          {uniqueLocations.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPosition([loc.lat, loc.lng])}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-200 transition-all text-left group active:scale-[0.98]"
            >
              <div>
                <p className="font-bold text-gray-700 group-hover:text-green-700 transition-colors">
                  {loc.city}
                </p>
                <p className="text-xs text-gray-500 font-medium">Estado: {loc.state}</p>
              </div>
              <div className="bg-white border border-gray-200 text-gray-600 text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-sm">
                {loc.count}
              </div>
            </button>
          ))}
        </div>

        {/* CONTAINER DO MAPA */}
        <div className="w-full lg:w-2/3 h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
          <MapContainer 
            center={[-14.235, -51.925]} 
            zoom={4} 
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapController targetPos={selectedPosition} />

            {/* Renderiza os Pinos Agrupados */}
            {groupedMarkers.map((group, idx) => (
              <Marker key={idx} position={[group.lat, group.lng]}>
                <Popup className="rounded-xl custom-popup">
                  <div className="p-1 min-w-[200px]">
                    {/* Cabeçalho do Popup com a Cidade */}
                    <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2 flex items-center gap-1">
                      <span>📍</span> {group.city}, {group.state}
                    </h3>
                    
                    {/* Lista de Animais neste exato local com Scroll */}
                    <div className="max-h-40 overflow-y-auto flex flex-col gap-2 pr-1">
                      {group.animals.map(animal => (
                        <div key={animal.id} className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-green-700 text-sm capitalize">{animal.name}</p>
                            {/* NOVO: Etiqueta de Quantidade */}
                            <span className="text-[10px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded shadow-sm">
                              Qtd: {animal.quantity || 1}
                            </span>
                          </div>
                          <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded font-bold inline-block mt-1">
                            {animal.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
  );
}