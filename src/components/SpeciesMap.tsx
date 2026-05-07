import { useState, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Species } from '../types/species';

// Ícones padrão
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

// Componente para controlar o movimento e abertura do popup
function MapController({ targetPos, activeKey, markerRefs }: { 
  targetPos: [number, number] | null, 
  activeKey: string | null,
  markerRefs: React.MutableRefObject<Record<string, L.Marker>> 
}) {
  const map = useMap();

  useEffect(() => {
    if (targetPos && activeKey && markerRefs.current[activeKey]) {
      // 1. Move o mapa suavemente
      map.flyTo(targetPos, 10, { duration: 1.5 });
      
      // 2. Espera o movimento terminar (ou quase) e abre o popup
      setTimeout(() => {
        markerRefs.current[activeKey].openPopup();
      }, 1500);
    }
  }, [targetPos, activeKey, map, markerRefs]);

  return null;
}

interface Props {
  species: Species[];
}

export function SpeciesMap({ species }: Props) {
  const [target, setTarget] = useState<{ pos: [number, number], key: string } | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const mappedSpecies = useMemo(() => {
    return species.filter(s => s.latitude && s.longitude);
  }, [species]);

  // Agrupa para a Lista Lateral
  const uniqueLocations = useMemo(() => {
    const locs: Record<string, { lat: number, lng: number, count: number, state: string, city: string, key: string }> = {};
    mappedSpecies.forEach(s => {
      const key = `${s.city}-${s.state}`.replace(/\s+/g, '-').toLowerCase();
      if (!locs[key]) {
        locs[key] = { lat: s.latitude!, lng: s.longitude!, count: 1, state: s.state, city: s.city, key };
      } else {
        locs[key].count += 1;
      }
    });
    return Object.values(locs).sort((a, b) => a.state.localeCompare(b.state));
  }, [mappedSpecies]);

  // Agrupa para os Marcadores (Markers)
  const groupedMarkers = useMemo(() => {
    const groups: Record<string, { lat: number, lng: number, city: string, state: string, key: string, animals: Species[] }> = {};
    mappedSpecies.forEach(s => {
      const key = `${s.city}-${s.state}`.replace(/\s+/g, '-').toLowerCase();
      if (!groups[key]) {
        groups[key] = { lat: s.latitude!, lng: s.longitude!, city: s.city, state: s.state, key, animals: [] };
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
        {/* LISTA LATERAL */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Locais Registados</p>
          {uniqueLocations.map((loc) => (
            <button
              key={loc.key}
              onClick={() => setTarget({ pos: [loc.lat, loc.lng], key: loc.key })}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left group active:scale-[0.98] ${
                target?.key === loc.key ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div>
                <p className={`font-bold ${target?.key === loc.key ? 'text-green-700' : 'text-gray-700'}`}>{loc.city}</p>
                <p className="text-xs text-gray-500 font-medium">{loc.state}</p>
              </div>
              <div className="bg-white border border-gray-200 text-gray-600 text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
                {loc.count}
              </div>
            </button>
          ))}
        </div>

        {/* MAPA */}
        <div className="w-full lg:w-2/3 h-[400px] rounded-2xl overflow-hidden border border-gray-200 relative z-0">
          <MapContainer center={[-14.235, -51.925]} zoom={4} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <MapController 
              targetPos={target?.pos || null} 
              activeKey={target?.key || null} 
              markerRefs={markerRefs} 
            />

            {groupedMarkers.map((group) => (
              <Marker 
                key={group.key} 
                position={[group.lat, group.lng]}
                ref={(ref) => { if (ref) markerRefs.current[group.key] = ref; }}
              >
                <Popup className="rounded-xl">
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-2">📍 {group.city}, {group.state}</h3>
                    <div className="max-h-40 overflow-y-auto flex flex-col gap-2 pr-1">
                      {group.animals.map(animal => (
                        <div key={animal.id} className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-green-700 text-sm capitalize">{animal.name}</p>
                            <span className="text-[10px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded">Qtd: {animal.quantity}</span>
                          </div>
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