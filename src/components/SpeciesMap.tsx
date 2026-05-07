import { useState, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Species } from '../types/species';

// --- CONFIGURAÇÃO PREMIUM DOS ÍCONES LEAFLET ---
// Resolve o bug dos ícones padrão que não aparecem no React/Vite
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

// --- COMPONENTE CONTROLADOR (O Piloto do Mapa) ---
// Este componente não tem visual, ele serve apenas para controlar a câmara e popups
interface ControllerProps {
  target: { pos: [number, number]; key: string } | null;
  markerRefs: React.MutableRefObject<Record<string, L.Marker>>;
}

function MapController({ target, markerRefs }: ControllerProps) {
  const map = useMap();

  useEffect(() => {
    // Se houver um novo alvo para navegar
    if (target && target.pos && target.key && markerRefs.current[target.key]) {
      
      // 1. Faz o "vôo" suave até ao local
      map.flyTo(target.pos, 10, { duration: 1.5 });
      
      // 2. Sincronização Inteligente: Espera o vôo terminar e força a abertura do popup correto
      // O timeout de 1500ms é o mesmo da duração do flyTo
      const openPopupTimeout = setTimeout(() => {
        const marker = markerRefs.current[target.key];
        if (marker) {
          marker.openPopup(); // Comando mágico que abre o balão
        }
      }, 1500);

      // Limpa o timeout se o componente for desmontado antes de terminar
      return () => clearTimeout(openPopupTimeout);
    }
  }, [target, map, markerRefs]);

  return null; // Não renderiza nada na tela
}

// --- COMPONENTE PRINCIPAL DO MAPA ---
interface Props {
  species: Species[];
}

export function SpeciesMap({ species }: Props) {
  // Estado para guardar qual o local deve ser focado [lat, lng, key_única]
  const [mapTarget, setMapTarget] = useState<{ pos: [number, number]; key: string } | null>(null);
  
  // Ref para guardar referências de todos os pinos do mapa e controlá-los
  const markerRefs = useRef<Record<string, L.Marker>>({});

  // 1. Filtra apenas as espécies com coordenadas válidas
  const mappedSpecies = useMemo(() => {
    return species.filter(s => s.latitude && s.longitude);
  }, [species]);

  // 2. Agrupa os locais para a LISTA LATERAL (Menu)
  const uniqueLocations = useMemo(() => {
    const locs: Record<string, { lat: number; lng: number; count: number; state: string; city: string; key: string }> = {};
    
    mappedSpecies.forEach(s => {
      // Cria uma chave única baseada em Cidade+Estado (ex: "manaus-am")
      const key = `${s.city}-${s.state}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
      if (!locs[key]) {
        locs[key] = { lat: s.latitude!, lng: s.longitude!, count: 1, state: s.state, city: s.city, key };
      } else {
        locs[key].count += 1;
      }
    });

    return Object.values(locs).sort((a, b) => a.state.localeCompare(b.state));
  }, [mappedSpecies]);

  // 3. Agrupa os animais pela MESMA COORDENADA exata para o MAPA
  const groupedMarkers = useMemo(() => {
    const groups: Record<string, { lat: number; lng: number; city: string; state: string; key: string; animals: Species[] }> = {};
    
    mappedSpecies.forEach(s => {
      // Mesma chave única do agrupamento da lista lateral
      const key = `${s.city}-${s.state}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");
      if (!groups[key]) {
        groups[key] = { 
          lat: s.latitude!, 
          lng: s.longitude!, 
          city: s.city, 
          state: s.state, 
          key,
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
        
        {/* LISTA LATERAL DE NAVEGAÇÃO (O Controlo Remoto do Mapa) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Locais Registados ({uniqueLocations.length})
          </p>
          
          {uniqueLocations.map((loc) => (
            <button
              key={loc.key}
              // Ao clicar, define o alvo e a chave para o MapController agir
              onClick={() => setMapTarget({ pos: [loc.lat, loc.lng], key: loc.key })}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left group active:scale-[0.98] ${
                mapTarget?.key === loc.key 
                  ? 'bg-green-50 border-green-300 ring-1 ring-green-200' 
                  : 'bg-gray-50 border-gray-100 hover:bg-green-50 hover:border-green-100'
              }`}
            >
              <div>
                <p className={`font-bold transition-colors ${mapTarget?.key === loc.key ? 'text-green-700' : 'text-gray-700 group-hover:text-green-700'}`}>
                  {loc.city}
                </p>
                <p className="text-xs text-gray-500 font-medium">{loc.state}</p>
              </div>
              <div className={`bg-white border border-gray-200 text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-sm ${mapTarget?.key === loc.key ? 'text-green-700' : 'text-gray-600'}`}>
                {loc.count}
              </div>
            </button>
          ))}
        </div>

        {/* CONTAINER DO MAPA */}
        <div className="w-full lg:w-2/3 h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
          <MapContainer 
            center={[-14.235, -51.925]} // Centro do Brasil
            zoom={4} 
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* O "Piloto" invisível do mapa, passando o alvo e as referências */}
            <MapController target={mapTarget} markerRefs={markerRefs} />

            {/* Renderiza os Pinos Agrupados */}
            {groupedMarkers.map((group) => (
              <Marker 
                key={group.key} 
                position={[group.lat, group.lng]}
                // A MÁGICA: Guarda a referência deste pino no objeto markerRefs usando a chave única
                ref={(ref) => {
                  if (ref) {
                    markerRefs.current[group.key] = ref;
                  }
                }}
              >
                <Popup className="rounded-xl custom-popup">
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2 flex items-center gap-1">
                      <span>📍</span> {group.city}, {group.state}
                    </h3>
                    
                    <div className="max-h-40 overflow-y-auto flex flex-col gap-2 pr-1">
                      {group.animals.map(animal => (
                        <div key={animal.id} className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-green-700 text-sm capitalize">{animal.name}</p>
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