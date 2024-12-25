import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { Restaurant } from '../../types/database.types';

const restaurantIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapMarkerProps {
  restaurant: Restaurant;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function MapMarker({ restaurant, children, onClick }: MapMarkerProps) {
  return (
    <Marker
      position={[restaurant.latitude, restaurant.longitude]}
      icon={restaurantIcon}
      eventHandlers={{ click: onClick }}
    >
      {children}
    </Marker>
  );
}