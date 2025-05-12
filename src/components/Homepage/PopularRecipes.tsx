import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Recipe } from '../../types';
import RecipeGrid from '../Recipe/RecipeGrid';
import Button from '../UI/Button';

interface PopularRecipesProps {
  recipes: Recipe[];
  loading?: boolean;
  onViewAll?: () => void;
  onRecipeClick?: (recipe: Recipe) => void;
}

const PopularRecipes: React.FC<PopularRecipesProps> = ({ 
  recipes, 
  loading = false,
  onViewAll,
  onRecipeClick
}) => {
  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Recipes</h2>
          {onViewAll && (
            <Button 
              variant="outline" 
              rightIcon={<ArrowRight size={16} />}
              onClick={onViewAll}
            >
              View All Recipes
            </Button>
          )}
        </div>
        
        <RecipeGrid 
          recipes={recipes} 
          title="" 
          onRecipeClick={onRecipeClick} 
        />
      </div>
    </section>
  );
};

export default PopularRecipes;