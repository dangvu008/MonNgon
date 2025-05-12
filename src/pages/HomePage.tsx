import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import Hero from '../components/Homepage/Hero';
import Features from '../components/Homepage/Features';
import PopularRecipes from '../components/Homepage/PopularRecipes';
import RecipeDetail from '../components/Recipe/RecipeDetail';
import Footer from '../components/Layout/Footer';
import { supabase } from '../lib/supabase';
import { Recipe } from '../types';

const HomePage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
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
        .eq('is_public', true)
        .limit(3);

      if (error) throw error;

      if (data) {
        setRecipes(data as Recipe[]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToRecipes = () => {
    setSelectedRecipe(null);
  };

  const handleAddToMealPlan = async (recipe: Recipe) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // TODO: Show login modal
      alert('Please sign in to add recipes to your meal plan');
      return;
    }

    // TODO: Implement meal plan functionality
    alert('Meal plan functionality coming soon!');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {selectedRecipe ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RecipeDetail 
            recipe={selectedRecipe} 
            onBack={handleBackToRecipes}
            onAddToMealPlan={() => handleAddToMealPlan(selectedRecipe)}
          />
        </div>
      ) : (
        <>
          <Hero />
          <Features />
          <PopularRecipes 
            recipes={recipes} 
            onViewAll={() => {/* TODO: Implement view all */}}
            onRecipeClick={handleRecipeClick}
            loading={loading}
          />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default HomePage;