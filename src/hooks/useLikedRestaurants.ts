import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Restaurant } from '../types/database.types';

export function useLikedRestaurants(userId: string | undefined) {
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchLikedRestaurants();
    }
  }, [userId]);

  const fetchLikedRestaurants = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('liked_restaurants')
        .select('restaurants(*)')
        .eq('user_id', userId);

      if (fetchError) throw fetchError;
      setLikedRestaurants(data?.map(item => item.restaurants) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los restaurantes favoritos');
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (restaurantId: string) => {
    try {
      setError(null);
      const isLiked = likedRestaurants.some(r => r.id === restaurantId);

      if (isLiked) {
        await supabase
          .from('liked_restaurants')
          .delete()
          .eq('user_id', userId)
          .eq('restaurant_id', restaurantId);
      } else {
        await supabase
          .from('liked_restaurants')
          .insert([{ user_id: userId, restaurant_id: restaurantId }]);
      }

      await fetchLikedRestaurants();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar favoritos');
    }
  };

  return {
    likedRestaurants,
    loading,
    error,
    toggleLike,
    isLiked: (id: string) => likedRestaurants.some(r => r.id === id),
  };
}