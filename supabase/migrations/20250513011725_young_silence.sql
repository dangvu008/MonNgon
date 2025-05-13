/*
  # Create units table and update recipe_ingredients
  
  1. New Tables
    - `units` table for storing measurement units
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `abbreviation` (text)
      - `type` (text)
      - `language_code` (text)
      - `created_at` (timestamptz)
  
  2. Changes
    - Add `unit_id` column to `recipe_ingredients` table
    - Create index on `unit_id` column
  
  3. Security
    - Enable RLS on `units` table
    - Add policy for authenticated users to view units
*/

-- Create units table
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    abbreviation TEXT NOT NULL,
    type TEXT,
    language_code TEXT DEFAULT 'vi',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (abbreviation, language_code)
);

-- Add table comment
COMMENT ON TABLE public.units IS 'Master list of measurement units';

-- Enable RLS
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;

-- Create policies for units table
CREATE POLICY "Anyone can view units"
    ON public.units
    FOR SELECT
    TO authenticated
    USING (true);

-- Add unit_id to recipe_ingredients
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'recipe_ingredients' 
        AND column_name = 'unit_id'
    ) THEN
        ALTER TABLE public.recipe_ingredients 
        ADD COLUMN unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_unit_id 
ON public.recipe_ingredients(unit_id);

-- Insert default units
INSERT INTO public.units (name, abbreviation, type, language_code) VALUES
    ('gram', 'g', 'weight', 'en'),
    ('kilogram', 'kg', 'weight', 'en'),
    ('milliliter', 'ml', 'volume', 'en'),
    ('liter', 'l', 'volume', 'en'),
    ('teaspoon', 'tsp', 'volume', 'en'),
    ('tablespoon', 'tbsp', 'volume', 'en'),
    ('cup', 'cup', 'volume', 'en'),
    ('piece', 'pc', 'count', 'en'),
    ('pinch', 'pinch', 'volume', 'en'),
    ('ounce', 'oz', 'weight', 'en'),
    ('pound', 'lb', 'weight', 'en'),
    ('bunch', 'bunch', 'count', 'en'),
    ('clove', 'clove', 'count', 'en'),
    ('slice', 'slice', 'count', 'en'),
    -- Vietnamese translations
    ('gam', 'g', 'weight', 'vi'),
    ('ki-lô-gam', 'kg', 'weight', 'vi'),
    ('mi-li-lít', 'ml', 'volume', 'vi'),
    ('lít', 'l', 'volume', 'vi'),
    ('muỗng cà phê', 'mcf', 'volume', 'vi'),
    ('muỗng canh', 'mc', 'volume', 'vi'),
    ('chén', 'chen', 'volume', 'vi'),
    ('cái', 'cai', 'count', 'vi'),
    ('nhúm', 'nhum', 'volume', 'vi'),
    ('ao-xơ', 'oz', 'weight', 'vi'),
    ('pao', 'lb', 'weight', 'vi'),
    ('bó', 'bo', 'count', 'vi'),
    ('tép', 'tep', 'count', 'vi'),
    ('lát', 'lat', 'count', 'vi')
ON CONFLICT (name) DO NOTHING;