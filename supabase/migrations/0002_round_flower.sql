/*
  # Add Sample Restaurant Data

  1. Changes
    - Insert sample restaurants in Madrid with realistic data
    - Fix empty array type casting for dietary options
*/

INSERT INTO restaurants (
  name,
  address,
  latitude,
  longitude,
  phone,
  website,
  price_range,
  rating,
  review_count,
  cuisine_types,
  dietary_options,
  opening_hours
) VALUES
-- High-end Spanish restaurant in Salamanca
(
  'Casa Lucio',
  'Calle de Cava Baja, 35, 28005 Madrid',
  40.4127,
  -3.7090,
  '+34915397425',
  'http://casalucio.es',
  3,
  4.7,
  1250,
  ARRAY['Española', 'Mediterránea'],
  ARRAY['Opciones Sin Gluten'],
  '{"Mon": "13:30-16:00,20:30-23:30", "Tue": "13:30-16:00,20:30-23:30", "Wed": "13:30-16:00,20:30-23:30", "Thu": "13:30-16:00,20:30-23:30", "Fri": "13:30-16:00,20:30-23:30", "Sat": "13:30-16:00,20:30-23:30", "Sun": "13:30-16:00,20:30-23:30"}'::jsonb
),
-- Modern fusion in Malasaña
(
  'StreetXO',
  'Calle de Serrano, 52, 28001 Madrid',
  40.4239,
  -3.6883,
  '+34915319884',
  'http://streetxo.com',
  3,
  4.8,
  980,
  ARRAY['Fusión', 'Asiática', 'Española'],
  ARRAY['Opciones Vegetarianas'],
  '{"Mon": "13:30-16:00,20:30-23:30", "Tue": "13:30-16:00,20:30-23:30", "Wed": "13:30-16:00,20:30-23:30", "Thu": "13:30-16:00,20:30-23:30", "Fri": "13:30-16:00,20:30-23:30", "Sat": "13:30-16:00,20:30-23:30"}'::jsonb
),
-- Casual Italian in La Latina
(
  'La Pizzateca',
  'Calle de Toledo, 86, 28005 Madrid',
  40.4112,
  -3.7074,
  '+34913640838',
  null,
  1,
  4.5,
  756,
  ARRAY['Italiana', 'Pizzería'],
  ARRAY['Opciones Vegetarianas', 'Opciones Veganas'],
  '{"Mon": "13:00-16:00,20:00-23:30", "Tue": "13:00-16:00,20:00-23:30", "Wed": "13:00-16:00,20:00-23:30", "Thu": "13:00-16:00,20:00-23:30", "Fri": "13:00-16:00,20:00-00:00", "Sat": "13:00-16:00,20:00-00:00", "Sun": "13:00-16:00,20:00-23:30"}'::jsonb
),
-- Vegan restaurant in Chueca
(
  'Vega',
  'Calle de Luna, 9, 28004 Madrid',
  40.4201,
  -3.7027,
  '+34910258626',
  'http://vegarestaurante.es',
  2,
  4.6,
  892,
  ARRAY['Vegana', 'Saludable'],
  ARRAY['Opciones Veganas', 'Opciones Sin Gluten', 'Orgánico'],
  '{"Mon": "12:30-16:00,20:00-23:00", "Tue": "12:30-16:00,20:00-23:00", "Wed": "12:30-16:00,20:00-23:00", "Thu": "12:30-16:00,20:00-23:00", "Fri": "12:30-16:00,20:00-23:00", "Sat": "12:30-16:00,20:00-23:00"}'::jsonb
),
-- Traditional tapas in Sol
(
  'Casa Labra',
  'Calle de Tetuán, 12, 28013 Madrid',
  40.4178,
  -3.7057,
  '+34915310081',
  'http://casalabra.es',
  1,
  4.4,
  1543,
  ARRAY['Española', 'Tapas'],
  ARRAY[]::text[],
  '{"Mon": "12:00-16:00,19:00-23:00", "Tue": "12:00-16:00,19:00-23:00", "Wed": "12:00-16:00,19:00-23:00", "Thu": "12:00-16:00,19:00-23:00", "Fri": "12:00-16:00,19:00-23:00", "Sat": "12:00-16:00,19:00-23:00"}'::jsonb
),
-- Indian restaurant in Lavapiés
(
  'Curry Masala',
  'Calle de Lavapiés, 44, 28012 Madrid',
  40.4094,
  -3.7019,
  '+34910235687',
  null,
  2,
  4.3,
  634,
  ARRAY['India', 'Asiática'],
  ARRAY['Opciones Vegetarianas', 'Halal'],
  '{"Mon": "12:30-16:00,20:00-23:30", "Tue": "12:30-16:00,20:00-23:30", "Wed": "12:30-16:00,20:00-23:30", "Thu": "12:30-16:00,20:00-23:30", "Fri": "12:30-16:00,20:00-23:30", "Sat": "12:30-16:00,20:00-23:30", "Sun": "12:30-16:00,20:00-23:30"}'::jsonb
),
-- Japanese in Chamberí
(
  'Sushi Bar 99',
  'Calle de Ponzano, 99, 28003 Madrid',
  40.4391,
  -3.7027,
  '+34914418967',
  'http://sushibar99.com',
  2,
  4.5,
  789,
  ARRAY['Japonesa', 'Sushi'],
  ARRAY['Opciones Sin Gluten'],
  '{"Mon": "13:30-16:00,20:30-23:30", "Tue": "13:30-16:00,20:30-23:30", "Wed": "13:30-16:00,20:30-23:30", "Thu": "13:30-16:00,20:30-23:30", "Fri": "13:30-16:00,20:30-23:30", "Sat": "13:30-16:00,20:30-23:30"}'::jsonb
),
-- Mexican in Tribunal
(
  'Takos Al Pastor',
  'Calle de la Abada, 2, 28013 Madrid',
  40.4197,
  -3.7046,
  '+34915212767',
  null,
  1,
  4.6,
  1123,
  ARRAY['Mexicana', 'Latina'],
  ARRAY['Opciones Vegetarianas'],
  '{"Mon": "12:00-00:00", "Tue": "12:00-00:00", "Wed": "12:00-00:00", "Thu": "12:00-00:00", "Fri": "12:00-02:00", "Sat": "12:00-02:00", "Sun": "12:00-00:00"}'::jsonb
);