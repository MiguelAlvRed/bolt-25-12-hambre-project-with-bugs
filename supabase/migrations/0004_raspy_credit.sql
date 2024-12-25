/*
  # Create liked_restaurants table for user favorites

  1. New Tables
    - `liked_restaurants`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `restaurant_id` (uuid, foreign key to restaurants)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `liked_restaurants` table
    - Add policies for authenticated users to manage their liked restaurants
*/

CREATE TABLE IF NOT EXISTS liked_restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, restaurant_id)
);

-- Enable RLS
ALTER TABLE liked_restaurants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their liked restaurants"
  ON liked_restaurants
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX liked_restaurants_user_id_idx ON liked_restaurants(user_id);
CREATE INDEX liked_restaurants_restaurant_id_idx ON liked_restaurants(restaurant_id);