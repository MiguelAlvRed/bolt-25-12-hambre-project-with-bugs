import { useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, useMap, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapControls } from './MapControls';
import { MapMarker } from './MapMarker';
import { useMapState } from './useMapState';
import type { Restaurant } from '../../types/database.types';
import { MADRID_CENTER } from '../../lib/constants';
import 'leaflet/dist/leaflet.css';

interface MapUpdaterProps {
  bounds: L.LatLngBoundsExpression | null;
  center: { latitude: number; longitude: number };
  zoom: number;
}

function MapUpdater({ bounds, center, zoom }: MapUpdaterProps) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView([center.latitude, center.longitude], zoom);
    }
  }, [bounds, center, zoom, map]);

  return null;
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
  onRestaurantClick?: (restaurant: Restaurant) => void;
  className?: string;
}

export function RestaurantMap({ 
  restaurants,
  onRestaurantClick,
  className = "h-[calc(100vh-4rem)] w-full"
}: RestaurantMapProps) {
  const { bounds, center, zoom, setCenter, setZoom } = useMapState(restaurants);

  const handleResetView = useCallback(() => {
    setCenter(MADRID_CENTER);
    setZoom(13);
  }, [setCenter, setZoom]);

  return (
    <div className="relative h-full">
      <MapContainer
        center={[MADRID_CENTER.latitude, MADRID_CENTER.longitude]}
        zoom={13}
        className={className}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapUpdater bounds={bounds} center={center} zoom={zoom} />
        
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
        >
          {restaurants.map((restaurant) => (
            <MapMarker
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onRestaurantClick?.(restaurant)}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                  <div className="mt-2">
                    <span className="text-sm">
                      {'€'.repeat(restaurant.price_range)} · {restaurant.rating}/5 ({restaurant.review_count} reseñas)
                    </span>
                  </div>
                  {restaurant.cuisine_types.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {restaurant.cuisine_types.map((type) => (
                        <span key={type} className="px-2 py-1 text-xs bg-secondary/20 rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Popup>
            </MapMarker>
          ))}
        </MarkerClusterGroup>

        <MapControls 
          onCenterChange={setCenter}
          onZoomChange={setZoom}
          onReset={handleResetView}
        />
      </MapContainer>
    </div>
  );
}