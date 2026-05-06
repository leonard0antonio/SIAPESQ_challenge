import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // O CSS obrigatório do Leaflet
import type { Species } from '../types/species';

// Correção padrão para o ícone do Leaflet funcionar no Vite
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  species: Species[];
}

export function SpeciesMap({ species }: Props) {
  // Filtra apenas as espécies que têm coordenadas válidas
  const mapData = species.filter(item => item.latitude && item.longitude);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 w-full text-left">Distribuição Geográfica</h2>
      
      <div className="h-96 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0">
        {/* Centro padrão no Brasil: [-14.235, -51.925] e Zoom 4 */}
        <MapContainer center={[-14.235, -51.925]} zoom={4} className="h-full w-full">
          {/* TileLayer é o mapa visual em si (usando OpenStreetMap) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Mapeia os animais e cria os marcadores */}
          {mapData.map((item) => (
            <Marker key={item.id} position={[item.latitude!, item.longitude!]}>
              <Popup>
                <strong className="text-green-700">{item.name}</strong><br/>
                Categoria: {item.category}<br/>
                Quantidade: {item.quantity || 1}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}