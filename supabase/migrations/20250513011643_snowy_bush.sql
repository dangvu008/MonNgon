/*
  # Add measurement units and update recipe ingredients

  1. New Tables
    - `units`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Full name of the unit (e.g., 'gram', 'piece')
      - `abbreviation` (text, unique) - Short form (e.g., 'g', 'pc')
      - `type` (text) - Category of measurement (weight, volume, piece, etc.)
      - `language_code` (text) - For localization support
      - `created_at` (timestamptz)

  2. Changes to Existing Tables
    - `recipe_ingredients`
      - Add `unit_id` column (uuid, references units.id)
      - Add foreign key constraint
      - Add index for better performance

  3. Security
    - Enable RLS on units table
    - Add policies for authenticated users
*/

-- Create units table
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    abbreviation TEXT UNIQUE,
    type TEXT,
    language_code TEXT DEFAULT 'vi',
    created_at TIMESTAMPTZ DEFAULT now()
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
    ('chén', 'chén', 'volume', 'vi'),
    ('cái', 'cái', 'count', 'vi'),
    ('nhúm', 'nhúm', 'volume', 'vi'),
    ('ao-xơ', 'oz', 'weight', 'vi'),
    ('pao', 'lb', 'weight', 'vi'),
    ('bó', 'bó', 'count', 'vi'),
    ('tép', 'tép', 'count', 'vi'),
    ('lát', 'lát', 'count', 'vi')
ON CONFLICT (name) DO NOTHING;