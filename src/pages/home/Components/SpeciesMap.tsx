//componente de mapa de espécies, responsável por exibir um mapa interativo com os locais onde as espécies foram registadas. Ele utiliza a biblioteca React Leaflet para renderizar o mapa e os marcadores, e inclui uma lista lateral que permite aos usuários navegar rapidamente para os locais específicos no mapa. O SpeciesMap também agrupa as espécies por localização, exibindo um popup com detalhes de todas as espécies encontradas naquele local quando um marcador é clicado. Este componente é fundamental para a visualização geográfica dos dados de espécies registados no sistema.

import { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Species } from "../../../types/species";

// Correção do ícone padrão do Leaflet (devido a um problema comum de configuração)
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
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

// O MapController é responsável por "voar" até a localização desejada e abrir o popup correto
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
  const [mapTarget, setMapTarget] = useState<{
    pos: [number, number];
    key: string;
  } | null>(null);

  // Ref para guardar referências de todos os pinos do mapa e controlá-los
  const markerRefs = useRef<Record<string, L.Marker>>({});

  // 1. Filtra apenas as espécies com coordenadas válidas
  const mappedSpecies = useMemo(() => {
    return species.filter((s) => s.latitude && s.longitude);
  }, [species]);

  // 2. Agrupa os locais para a LISTA LATERAL (Menu)
  const uniqueLocations = useMemo(() => {
    const locs: Record<
      string,
      {
        lat: number;
        lng: number;
        count: number;
        state: string;
        city: string;
        key: string;
      }
    > = {};

    mappedSpecies.forEach((s) => {
      // Cria uma chave única baseada em Cidade+Estado (ex: "manaus-am")
      const key = `${s.city}-${s.state}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
      if (!locs[key]) {
        locs[key] = {
          lat: s.latitude!,
          lng: s.longitude!,
          count: 1,
          state: s.state || "",
          city: s.city || "",
          key,
        };
      } else {
        locs[key].count += 1;
      }
    });

    return Object.values(locs).sort((a, b) => a.state.localeCompare(b.state));
  }, [mappedSpecies]);

  // 3. Agrupa os animais pela MESMA COORDENADA exata para o MAPA
  const groupedMarkers = useMemo(() => {
    const groups: Record<
      string,
      {
        lat: number;
        lng: number;
        city: string;
        state: string;
        key: string;
        animals: Species[];
      }
    > = {};

    mappedSpecies.forEach((s) => {
      // Mesma chave única do agrupamento da lista lateral
      const key = `${s.city}-${s.state}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
      if (!groups[key]) {
        groups[key] = {
          lat: s.latitude!,
          lng: s.longitude!,
          city: s.city || "", 
          state: s.state || "",
          key,
          animals: [],
        };
      }
      groups[key].animals.push(s);
    });

    return Object.values(groups);
  }, [mappedSpecies]);

  if (mappedSpecies.length === 0) return null;

  return (
    <div className="mt-12 mb-20 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      {/* Cabeçalho do Mapa Premium */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Mapa de Ocorrências
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LISTA LATERAL (Menu) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
            Locais Registados ({uniqueLocations.length})
          </p>

          {uniqueLocations.map((loc) => (
            <button
              key={loc.key}
              onClick={() =>
                setMapTarget({ pos: [loc.lat, loc.lng], key: loc.key })
              }
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group active:scale-[0.98] ${
                mapTarget?.key === loc.key
                  ? "bg-emerald-50 border-emerald-200 ring-2 ring-emerald-100 shadow-sm"
                  : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
            >
              <div>
                <p
                  className={`font-bold transition-colors ${mapTarget?.key === loc.key ? "text-emerald-800" : "text-gray-700 group-hover:text-gray-900"}`}
                >
                  {loc.city}
                </p>
                <p className="text-xs text-gray-500 font-medium">{loc.state}</p>
              </div>
              <div
                className={`border text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  mapTarget?.key === loc.key
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                {loc.count}
              </div>
            </button>
          ))}
        </div>

        {/* CONTAINER DO MAPA */}
        <div className="w-full lg:w-2/3 h-[450px] rounded-3xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
          <MapContainer
            center={[-14.235, -51.925]}
            zoom={4}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <MapController target={mapTarget} markerRefs={markerRefs} />

            {groupedMarkers.map((group) => (
              <Marker
                key={group.key}
                position={[group.lat, group.lng]}
                ref={(ref) => {
                  if (ref) markerRefs.current[group.key] = ref;
                }}
              >
                <Popup className="rounded-xl custom-popup">
                  <div className="p-2 min-w-[220px]">
                    {/* Cabeçalho do Popup sutil */}
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3 flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {group.city}, {group.state}
                    </h3>

                    {/* Lista de Animais no Popup */}
                    <div className="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
                      {group.animals.map((animal) => (
                        <div
                          key={animal.id}
                          className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <p className="font-bold text-gray-800 text-sm capitalize">
                              {animal.name}
                            </p>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Qtd: {animal.quantity || 1}
                            </span>
                          </div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
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
