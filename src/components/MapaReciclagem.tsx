import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lon: number;
  name: string;
}

function MapaReciclagem() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    setLocations([
      { lat: -3.36329, lon: -39.83018, name: 'Recicladora' },
      { lat: -3.36851, lon: -39.83162, name: 'Recicladora' },
      { lat: -3.37112, lon: -39.83380, name: 'Recicladora' },
      { lat: -3.36272, lon: -39.82512, name: 'Empresa' },
      { lat: -3.36618, lon: -39.82839, name: 'Empresa' },
    ]);
  }, []);

  return (
    <MapContainer center={[-3.36329, -39.83018]} zoom={14} style={{ width: '100%', height: '800px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lon]}
          icon={new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}
        >
          <Popup>
            <h4>{location.name}</h4>
            <p>Coordenadas: {location.lat.toFixed(5)}, {location.lon.toFixed(5)}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaReciclagem;
