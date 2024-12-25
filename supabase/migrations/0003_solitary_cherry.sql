/*
  # Create notes table for user restaurant reviews

  1. New Tables
    - `notes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `restaurant_id` (uuid, foreign key to restaurants)
      - `content` (text)
      - `rating` (numeric)
      - `visit_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `notes` table
    - Add policies for authenticated users to manage their own notes
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  rating numeric CHECK (rating BETWEEN 0 AND 5) NOT NULL,
  visit_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX notes_user_id_idx ON notes(user_id);
CREATE INDEX notes_restaurant_id_idx ON notes(restaurant_id);