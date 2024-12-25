/*
  # Initial Schema for HAMBRE

  1. New Tables
    - `restaurants`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `latitude` (double precision)
      - `longitude` (double precision)
      - `phone` (text)
      - `website` (text)
      - `price_range` (smallint)
      - `rating` (numeric)
      - `review_count` (integer)
      - `cuisine_types` (text[])
      - `dietary_options` (text[])
      - `opening_hours` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `last_scraped_at` (timestamptz)

  2. Security
    - Enable RLS on `restaurants` table
    - Add policy for public read access
*/

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  phone text,
  website text,
  price_range smallint CHECK (price_range BETWEEN 1 AND 3),
  rating numeric CHECK (rating BETWEEN 0 AND 5),
  review_count integer DEFAULT 0,
  cuisine_types text[] DEFAULT '{}',
  dietary_options text[] DEFAULT '{}',
  opening_hours jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_scraped_at timestamptz DEFAULT now(),
  location geography(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED
);

-- Enable RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON restaurants
  FOR SELECT
  TO public
  USING (true);

-- Create spatial index using geography type
CREATE INDEX IF NOT EXISTS restaurants_location_idx 
  ON restaurants USING GIST (location);

-- Create index for full text search
CREATE INDEX IF NOT EXISTS restaurants_name_idx 
  ON restaurants USING GIN (to_tsvector('spanish', name));