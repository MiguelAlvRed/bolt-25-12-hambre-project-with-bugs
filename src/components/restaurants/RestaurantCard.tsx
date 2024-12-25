import { useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import type { Restaurant } from '../../types/database.types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
}

export function RestaurantCard({ 
  restaurant, 
  onFavoriteToggle, 
  isFavorite = false 
}: RestaurantCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-card hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-1">{restaurant.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {restaurant.address}
            </p>
          </div>
          {onFavoriteToggle && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-opacity",
                isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
              )}
              onClick={() => onFavoriteToggle(restaurant.id)}
            >
              <Heart 
                className={cn(
                  "h-5 w-5",
                  isFavorite && "fill-current text-red-500"
                )} 
              />
            </Button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-medium">{'€'.repeat(restaurant.price_range)}</span>
          <span className="text-muted-foreground">·</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({restaurant.review_count})</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {restaurant.cuisine_types.map((type) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
          {restaurant.dietary_options.map((option) => (
            <Badge key={option} variant="outline" className="text-xs">
              {option}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}