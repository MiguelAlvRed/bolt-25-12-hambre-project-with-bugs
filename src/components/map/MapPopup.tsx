import { Popup } from 'react-leaflet';
import type { Restaurant } from '../../types/database.types';

interface MapPopupProps {
  restaurant: Restaurant;
}

export function MapPopup({ restaurant }: MapPopupProps) {
  return (
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
  );
}