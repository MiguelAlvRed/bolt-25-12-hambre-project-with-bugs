import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { PriceFilter } from './filters/PriceFilter';
import { AtmosphereFilter } from './filters/AtmosphereFilter';
import { RatingFilter } from './filters/RatingFilter';
import { Button } from '../ui/button';
import { CUISINE_TYPES, DIETARY_OPTIONS } from '../../lib/constants';
import type { FilterState } from '../../lib/types';

interface RestaurantFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onLocationRequest: () => void;
  isLocating: boolean;
}

export function RestaurantFilters({
  filters,
  onFilterChange,
  onLocationRequest,
  isLocating
}: RestaurantFiltersProps) {
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Input
        icon={<Search className="h-5 w-5" />}
        type="text"
        placeholder="Buscar restaurantes..."
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />

      <PriceFilter
        selected={filters.priceRange}
        onChange={(value) => handleFilterChange('priceRange', value)}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo de Cocina</label>
        <div className="flex flex-wrap gap-2">
          {CUISINE_TYPES.map((cuisine) => (
            <Button
              key={cuisine}
              variant={filters.cuisineTypes.includes(cuisine) ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => {
                const newTypes = filters.cuisineTypes.includes(cuisine)
                  ? filters.cuisineTypes.filter((t) => t !== cuisine)
                  : [...filters.cuisineTypes, cuisine];
                handleFilterChange('cuisineTypes', newTypes);
              }}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Opciones Dietéticas</label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={filters.dietaryOptions.includes(option) ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => {
                const newOptions = filters.dietaryOptions.includes(option)
                  ? filters.dietaryOptions.filter((o) => o !== option)
                  : [...filters.dietaryOptions, option];
                handleFilterChange('dietaryOptions', newOptions);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <AtmosphereFilter
        selected={filters.atmosphere}
        onChange={(value) => handleFilterChange('atmosphere', value)}
      />

      <RatingFilter
        value={filters.rating}
        onChange={(value) => handleFilterChange('rating', value)}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Radio de búsqueda</label>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLocationRequest}
            disabled={isLocating}
          >
            {isLocating ? 'Localizando...' : 'Usar mi ubicación'}
          </Button>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={filters.radius}
          onChange={(e) => handleFilterChange('radius', Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>1 km</span>
          <span>{filters.radius} km</span>
          <span>20 km</span>
        </div>
      </div>
    </div>
  );
}