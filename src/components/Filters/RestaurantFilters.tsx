import { useState } from 'react';
import { Search, Euro, MapPin, Star } from 'lucide-react';
import { CUISINE_TYPES, DIETARY_OPTIONS, DEFAULT_RADIUS, MIN_RADIUS, MAX_RADIUS } from '../../lib/constants';
import { FilterChip } from './FilterChip';
import type { FilterState } from '../../lib/types';

interface RestaurantFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onLocationRequest: () => void;
  isLocating: boolean;
}

export function RestaurantFilters({ onFilterChange, onLocationRequest, isLocating }: RestaurantFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [],
    cuisineTypes: [],
    dietaryOptions: [],
    radius: DEFAULT_RADIUS,
    rating: 0
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar restaurantes..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Precio</label>
        <div className="flex gap-2">
          {[1, 2, 3].map((price) => (
            <button
              key={price}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                filters.priceRange.includes(price)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => {
                const newPriceRange = filters.priceRange.includes(price)
                  ? filters.priceRange.filter((p) => p !== price)
                  : [...filters.priceRange, price];
                handleFilterChange('priceRange', newPriceRange);
              }}
            >
              {'€'.repeat(price)}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Types */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo de Cocina</label>
        <div className="flex flex-wrap gap-2">
          {CUISINE_TYPES.map((cuisine) => (
            <button
              key={cuisine}
              className={`px-3 py-1 rounded-lg border text-sm transition-colors ${
                filters.cuisineTypes.includes(cuisine)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => {
                const newCuisineTypes = filters.cuisineTypes.includes(cuisine)
                  ? filters.cuisineTypes.filter((c) => c !== cuisine)
                  : [...filters.cuisineTypes, cuisine];
                handleFilterChange('cuisineTypes', newCuisineTypes);
              }}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Options */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Opciones Dietéticas</label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 rounded-lg border text-sm transition-colors ${
                filters.dietaryOptions.includes(option)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => {
                const newDietaryOptions = filters.dietaryOptions.includes(option)
                  ? filters.dietaryOptions.filter((o) => o !== option)
                  : [...filters.dietaryOptions, option];
                handleFilterChange('dietaryOptions', newDietaryOptions);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Valoración Mínima</label>
        <div className="flex items-center gap-4">
          <Star size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm">{filters.rating} ★</span>
        </div>
      </div>

      {/* Location and Radius */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Radio de búsqueda</label>
          <button
            onClick={onLocationRequest}
            disabled={isLocating}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {isLocating ? 'Localizando...' : 'Usar mi ubicación'}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <MapPin size={20} className="text-gray-400" />
          <input
            type="range"
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            value={filters.radius}
            onChange={(e) => handleFilterChange('radius', Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm">{filters.radius} km</span>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.cuisineTypes.length > 0 || filters.dietaryOptions.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.cuisineTypes.map((cuisine) => (
            <FilterChip
              key={cuisine}
              label={cuisine}
              onRemove={() => {
                handleFilterChange(
                  'cuisineTypes',
                  filters.cuisineTypes.filter((c) => c !== cuisine)
                );
              }}
            />
          ))}
          {filters.dietaryOptions.map((option) => (
            <FilterChip
              key={option}
              label={option}
              onRemove={() => {
                handleFilterChange(
                  'dietaryOptions',
                  filters.dietaryOptions.filter((o) => o !== option)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}