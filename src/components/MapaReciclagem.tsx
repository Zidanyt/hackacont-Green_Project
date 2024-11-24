import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lon: number;
  name: string;
}

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

function MapaReciclagem() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([-3.36329, -39.83018]);

  const fetchNearbyLocations = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/locations/nearby`, {
        params: { lat, lon },
      });
      setLocations(response.data);
    } catch (error) {
      console.error('Erro ao buscar locais próximos:', error);
    }
  };

  const getUserLocationFromBrowser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude, name: 'Sua Localização' });
          setMapCenter([latitude, longitude]);
          fetchNearbyLocations(latitude, longitude);
        },
        (error) => {
          console.error('Erro ao obter localização do navegador:', error);
        }
      );
    } else {
      console.error('Geolocalização não disponível no seu navegador');
    }
  };

  const searchLocation = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json`
      );
      if (response.data.length > 0) {
        const location = response.data[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        setMapCenter([lat, lon]);
        setUserLocation({ lat, lon, name: location.display_name });
        fetchNearbyLocations(lat, lon);
      } else {
        console.error('Localização não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar a localização:', error);
    }
  };

  useEffect(() => {
    getUserLocationFromBrowser();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Digite um local para buscar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: '5px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={searchLocation} style={{ padding: '5px 10px' }}>
          Buscar
        </button>
      </div>

      <MapContainer center={mapCenter} zoom={14} style={{ width: '100%', height: '800px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapView center={mapCenter} />

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

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lon]}
            icon={new L.Icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [30, 46],
              iconAnchor: [15, 46],
              popupAnchor: [1, -40],
            })}
          >
            <Popup>
              <h4>Você está em {userLocation.name}</h4>
              <p>Coordenadas: {userLocation.lat.toFixed(5)}, {userLocation.lon.toFixed(5)}</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapaReciclagem;
