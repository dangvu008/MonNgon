import React, { useState, useEffect } from 'react';
import RecipeGrid from '../components/Recipe/RecipeGrid';
import { Recipe } from '../types';
import { supabase } from '../lib/supabase';

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          recipe_ingredients (*),
          recipe_tags (*)
        `)
        .eq('is_public', true);

      if (error) throw error;
      if (data) setRecipes(data as Recipe[]);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recipes</h1>
      <RecipeGrid 
        recipes={recipes}
        loading={loading}
      />
    </div>
  );
};

export default RecipesPage;