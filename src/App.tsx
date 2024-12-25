import { useState } from 'react';
import { Header } from './components/layout/Header';
import { RestaurantSearch } from './components/restaurants/RestaurantSearch';
import { RestaurantMap } from './components/map/RestaurantMap';
import { useRestaurants } from './lib/hooks/useRestaurants';
import { Button } from './components/ui/button';
import { Map } from 'lucide-react';
import type { FilterState } from './lib/types';

const initialFilters: FilterState = {
  search: '',
  priceRange: [],
  cuisineTypes: [],
  dietaryOptions: [],
  atmosphere: [],
  radius: 5,
  rating: 0
};

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showMap, setShowMap] = useState(false);
  const { restaurants, loading, error } = useRestaurants(filters, null);
  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Encuentra tu restaurante ideal en Madrid
          </h1>
          
          <RestaurantSearch 
            onFilterChange={setFilters}
            showResults={hasActiveFilters}
          />

          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowMap(!showMap)}
                className="md:hidden"
              >
                <Map className="h-4 w-4 mr-2" />
                {showMap ? 'Ver lista' : 'Ver mapa'}
              </Button>
            </div>
          )}

          <div className="mt-6 lg:grid lg:grid-cols-2 lg:gap-6">
            <div className={`${showMap ? 'hidden md:block' : ''}`}>
              {/* Restaurant list */}
              {error ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                  {error}
                </div>
              ) : loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Cargando restaurantes...</p>
                </div>
              ) : (
                restaurants.length > 0 && (
                  <div className="space-y-4">
                    {restaurants.map(restaurant => (
                      <RestaurantCard 
                        key={restaurant.id}
                        restaurant={restaurant}
                      />
                    ))}
                  </div>
                )
              )}
            </div>

            <div className={`${!showMap ? 'hidden md:block' : ''} h-[70vh] md:h-[calc(100vh-12rem)] rounded-lg overflow-hidden`}>
              <RestaurantMap 
                restaurants={restaurants || []}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;