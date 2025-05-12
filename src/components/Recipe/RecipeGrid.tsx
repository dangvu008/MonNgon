import React from 'react';
import { Recipe } from '../../types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  title?: string;
  onRecipeClick?: (recipe: Recipe) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  title = 'Recipes',
  onRecipeClick 
}) => {
  if (recipes.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <h3 className="text-xl font-medium text-gray-500">No recipes found</h3>
        <p className="mt-2 text-gray-400">Try adjusting your filters or adding a new recipe.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={() => onRecipeClick && onRecipeClick(recipe)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;