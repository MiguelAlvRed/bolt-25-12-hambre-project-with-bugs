import { useState } from 'react';
import { RestaurantFilters } from './RestaurantFilters';
import { RestaurantList } from './RestaurantList';
import { useGeolocation } from '../../lib/hooks/useGeolocation';
import { useFavorites } from '../../hooks/useFavorites';
import { useRestaurants } from '../../lib/hooks/useRestaurants';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import type { FilterState } from '../../lib/types';

interface RestaurantSearchProps {
  onFilterChange: (filters: FilterState) => void;
  showResults: boolean;
}

export function RestaurantSearch({ onFilterChange, showResults }: RestaurantSearchProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [],
    cuisineTypes: [],
    dietaryOptions: [],
    atmosphere: [],
    radius: 5,
    rating: 0
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <RestaurantFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {!showResults && filters.cuisineTypes.length > 0 && (
        <div className="text-center py-8">
          <Button size="lg" onClick={() => onFilterChange(filters)}>
            <Search className="h-5 w-5 mr-2" />
            Ver restaurantes
          </Button>
        </div>
      )}
    </div>
  );
}