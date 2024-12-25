import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from '../../types/database.types';

interface RestaurantListProps {
  restaurants: Restaurant[];
  favorites: Set<string>;
  onFavoriteToggle: (id: string) => void;
}

export function RestaurantList({ restaurants, favorites, onFavoriteToggle }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron restaurantes con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isFavorite={favorites.has(restaurant.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}