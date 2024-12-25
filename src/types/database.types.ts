export interface Restaurant {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  price_range: 1 | 2 | 3;
  rating: number;
  review_count: number;
  cuisine_types: string[];
  dietary_options: string[];
  opening_hours?: Record<string, string>;
  created_at: string;
  updated_at: string;
  last_scraped_at: string;
}