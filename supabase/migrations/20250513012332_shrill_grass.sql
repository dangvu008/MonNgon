/*
  # Initial Schema Setup for Recipe Management System

  This migration creates the core tables and relationships for the recipe management system.

  1. Tables Created:
    - profiles: User profiles linked to auth.users
    - recipes: Recipe details and metadata
    - ingredients: Master list of ingredients
    - recipe_ingredients: Links recipes to ingredients with quantities
    - tags: Categorization tags
    - recipe_tags: Links recipes to tags
    - meal_plans: User meal plans
    - meal_plan_items: Individual items in meal plans
    - user_favorite_recipes: User's favorite recipes
    - comments: Recipe comments

  2. Security:
    - RLS enabled on all tables
    - Policies for user data access control
    - Secure trigger for user profile creation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    dietary_preferences JSONB,
    favorite_cuisines JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Stores public user profile information linked to auth.users.';
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recipes table
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER,
    difficulty TEXT,
    image_url TEXT,
    calorie_info JSONB,
    is_public BOOLEAN DEFAULT true,
    language_code TEXT DEFAULT 'en',
    cuisine TEXT,
    meal_course TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.recipes IS 'Stores recipe details.';
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Ingredients table
CREATE TABLE IF NOT EXISTS public.ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    language_code TEXT DEFAULT 'en'
);

COMMENT ON TABLE public.ingredients IS 'Master list of ingredients.';
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

-- Recipe ingredients table
CREATE TABLE IF NOT EXISTS public.recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE RESTRICT,
    quantity NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    notes TEXT
);

COMMENT ON TABLE public.recipe_ingredients IS 'Links recipes to ingredients with quantities and units.';
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;

-- Tags table
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    type TEXT,
    language_code TEXT DEFAULT 'en'
);

COMMENT ON TABLE public.tags IS 'Master list of tags for categorizing recipes.';
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Recipe tags table
CREATE TABLE IF NOT EXISTS public.recipe_tags (
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, tag_id)
);

COMMENT ON TABLE public.recipe_tags IS 'Links recipes to tags.';
ALTER TABLE public.recipe_tags ENABLE ROW LEVEL SECURITY;

-- Meal plans table
CREATE TABLE IF NOT EXISTS public.meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT DEFAULT 'Kế hoạch bữa ăn của tôi',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.meal_plans IS 'Stores user-created meal plans.';
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- Meal plan items table
CREATE TABLE IF NOT EXISTS public.meal_plan_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
    custom_dish_name TEXT,
    meal_date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    notes TEXT,
    sort_order INTEGER DEFAULT 0
);

COMMENT ON TABLE public.meal_plan_items IS 'Individual items within a meal plan.';
ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;

-- User favorite recipes table
CREATE TABLE IF NOT EXISTS public.user_favorite_recipes (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (user_id, recipe_id)
);

COMMENT ON TABLE public.user_favorite_recipes IS 'Stores users favorite recipes.';
ALTER TABLE public.user_favorite_recipes ENABLE ROW LEVEL SECURITY;

-- Comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.comments IS 'Stores comments for recipes.';
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create trigger function for handling new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, username)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
    RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user handling
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Creates a profile entry for a new user.';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_tags_recipe_id ON recipe_tags(recipe_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_items_meal_plan_id ON meal_plan_items(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_comments_recipe_id ON comments(recipe_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- Create RLS policies
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile"
            ON profiles FOR SELECT
            TO authenticated
            USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile"
            ON profiles FOR UPDATE
            TO authenticated
            USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'recipes' 
        AND policyname = 'Users can view public recipes'
    ) THEN
        CREATE POLICY "Users can view public recipes"
            ON recipes FOR SELECT
            TO authenticated
            USING (is_public = true OR user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'recipes' 
        AND policyname = 'Users can manage their own recipes'
    ) THEN
        CREATE POLICY "Users can manage their own recipes"
            ON recipes FOR ALL
            TO authenticated
            USING (user_id = auth.uid())
            WITH CHECK (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'ingredients' 
        AND policyname = 'Users can view ingredients'
    ) THEN
        CREATE POLICY "Users can view ingredients"
            ON ingredients FOR SELECT
            TO authenticated
            USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'recipe_ingredients' 
        AND policyname = 'Users can view recipe ingredients'
    ) THEN
        CREATE POLICY "Users can view recipe ingredients"
            ON recipe_ingredients FOR SELECT
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM recipes
                WHERE recipes.id = recipe_ingredients.recipe_id
                AND (recipes.is_public = true OR recipes.user_id = auth.uid())
            ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'meal_plans' 
        AND policyname = 'Users can manage their meal plans'
    ) THEN
        CREATE POLICY "Users can manage their meal plans"
            ON meal_plans FOR ALL
            TO authenticated
            USING (user_id = auth.uid())
            WITH CHECK (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'meal_plan_items' 
        AND policyname = 'Users can manage their meal plan items'
    ) THEN
        CREATE POLICY "Users can manage their meal plan items"
            ON meal_plan_items FOR ALL
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM meal_plans
                WHERE meal_plans.id = meal_plan_items.meal_plan_id
                AND meal_plans.user_id = auth.uid()
            ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_favorite_recipes' 
        AND policyname = 'Users can manage their favorites'
    ) THEN
        CREATE POLICY "Users can manage their favorites"
            ON user_favorite_recipes FOR ALL
            TO authenticated
            USING (user_id = auth.uid())
            WITH CHECK (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' 
        AND policyname = 'Users can manage their comments'
    ) THEN
        CREATE POLICY "Users can manage their comments"
            ON comments FOR ALL
            TO authenticated
            USING (user_id = auth.uid())
            WITH CHECK (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' 
        AND policyname = 'Users can view comments'
    ) THEN
        CREATE POLICY "Users can view comments"
            ON comments FOR SELECT
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM recipes
                WHERE recipes.id = comments.recipe_id
                AND (recipes.is_public = true OR recipes.user_id = auth.uid())
            ));
    END IF;
END $$;