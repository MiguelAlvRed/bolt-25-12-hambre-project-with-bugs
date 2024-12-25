import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import type { Restaurant } from '../../types/database.types';
import type { Location } from '../../lib/types';
import { MADRID_CENTER } from '../../lib/constants';

// Fix Leaflet default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapUpdaterProps {
  center: Location;
  zoom: number;
}

function MapUpdater({ center, zoom }: MapUpdaterProps) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.latitude, center.longitude], zoom);
  }, [center, zoom, map]);

  return null;
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
  userLocation: Location | null;
  searchRadius: number;
  center: Location;
  zoom: number;
}

export function RestaurantMap({ 
  restaurants,
  userLocation,
  searchRadius,
  center,
  zoom
}: RestaurantMapProps) {
  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      className="h-[calc(100vh-4rem)] w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapUpdater center={center} zoom={zoom} />

      {userLocation && (
        <>
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={L.divIcon({
              className: 'bg-blue-500 w-4 h-4 rounded-full border-2 border-white',
              iconSize: [16, 16]
            })}
          >
            <Popup>Tu ubicación</Popup>
          </Marker>
          <Circle
            center={[userLocation.latitude, userLocation.longitude]}
            radius={searchRadius * 1000}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
          />
        </>
      )}

      <MarkerClusterGroup>
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
          >
            <Popup>
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-lg">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.address}</p>
                <div className="mt-2">
                  <span className="text-sm">
                    {'€'.repeat(restaurant.price_range)} · {restaurant.rating}/5 ({restaurant.review_count} reseñas)
                  </span>
                </div>
                {restaurant.cuisine_types.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {restaurant.cuisine_types.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                )}
                {restaurant.dietary_options.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {restaurant.dietary_options.map((option) => (
                      <span
                        key={option}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                )}
                {restaurant.website && (
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Visitar sitio web
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}