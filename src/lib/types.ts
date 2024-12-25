export interface FilterState {
  search: string;
  priceRange: number[];
  cuisineTypes: string[];
  dietaryOptions: string[];
  atmosphere: string[];
  radius: number;
  rating: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface MapState {
  center: Location;
  zoom: number;
}

export interface Note {
  id: string;
  userId: string;
  restaurantId: string;
  content: string;
  rating: number;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  likedRestaurants: string[];
  notes: Note[];
}