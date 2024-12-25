import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import type { Restaurant } from '../../types/database.types';
import type { FilterState, Location } from '../types';

export function useRestaurants(filters: FilterState, userLocation: Location | null) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('restaurants')
          .select('*');

        // Apply filters
        if (filters.search) {
          query = query.textSearch('name', filters.search);
        }

        if (filters.priceRange.length > 0) {
          query = query.in('price_range', filters.priceRange);
        }

        if (filters.cuisineTypes.length > 0) {
          query = query.contains('cuisine_types', filters.cuisineTypes);
        }

        if (filters.dietaryOptions.length > 0) {
          query = query.contains('dietary_options', filters.dietaryOptions);
        }

        if (filters.rating > 0) {
          query = query.gte('rating', filters.rating);
        }

        // Apply location-based filtering if user location is available
        if (userLocation && filters.radius) {
          query = query.rpc('restaurants_within_radius', {
            lat: userLocation.latitude,
            lng: userLocation.longitude,
            radius_km: filters.radius
          });
        }

        const { data, error: queryError } = await query.limit(50);

        if (queryError) throw queryError;
        setRestaurants(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [filters, userLocation]);

  return { restaurants, loading, error };
}