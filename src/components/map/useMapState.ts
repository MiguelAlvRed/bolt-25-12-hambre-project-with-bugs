import { useState, useEffect } from 'react';
import { type LatLngBounds } from 'leaflet';
import type { Restaurant } from '../../types/database.types';
import { MADRID_CENTER } from '../../lib/constants';

export function useMapState(restaurants: Restaurant[]) {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [center, setCenter] = useState({ 
    latitude: MADRID_CENTER.latitude, 
    longitude: MADRID_CENTER.longitude 
  });
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (restaurants.length > 0) {
      // Calculate bounds to fit all markers
      const lats = restaurants.map(r => r.latitude);
      const lngs = restaurants.map(r => r.longitude);
      
      const southWest = {
        lat: Math.min(...lats),
        lng: Math.min(...lngs)
      };
      const northEast = {
        lat: Math.max(...lats),
        lng: Math.max(...lngs)
      };

      setBounds([
        [southWest.lat, southWest.lng],
        [northEast.lat, northEast.lng]
      ]);
    }
  }, [restaurants]);

  return {
    bounds,
    center,
    zoom,
    setCenter,
    setZoom
  };
}