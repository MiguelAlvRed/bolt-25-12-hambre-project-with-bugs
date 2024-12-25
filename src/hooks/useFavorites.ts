import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('favorites', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  return { favorites, toggleFavorite };
}