import React from 'react';
import { Clock, ChefHat, Users, ArrowLeft, Tag, Flame } from 'lucide-react';
import { Recipe } from '../../types';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import { formatTime } from '../../utils/helpers';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onAddToMealPlan?: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ 
  recipe, 
  onBack,
  onAddToMealPlan 
}) => {
  const { 
    title, 
    description, 
    imageUrl, 
    prepTime, 
    cookTime, 
    servings, 
    difficulty, 
    ingredients, 
    instructions, 
    tags, 
    cuisine, 
    calories, 
    protein, 
    carbs, 
    fat 
  } = recipe;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={onBack}>
          Back to recipes
        </Button>
        {onAddToMealPlan && (
          <Button variant="primary" onClick={onAddToMealPlan}>
            Add to Meal Plan
          </Button>
        )}
      </div>
      
      <div className="relative">
        <div className="h-[300px] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              color="blue" 
              size="md"
              className="shadow-md"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Prep Time</p>
              <p className="font-medium">{formatTime(prepTime)}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-orange-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Cook Time</p>
              <p className="font-medium">{formatTime(cookTime)}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Servings</p>
              <p className="font-medium">{servings}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <ChefHat className="w-5 h-5 text-purple-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Cuisine</p>
              <p className="font-medium">{cuisine}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Flame className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-medium">{calories} kcal</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-green-600" />
              Ingredients
            </h2>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  <span>
                    <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <ChefHat className="w-5 h-5 mr-2 text-green-600" />
              Instructions
            </h2>
            <ol className="space-y-4">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="inline-block w-6 h-6 rounded-full bg-green-600 text-white flex-shrink-0 flex items-center justify-center font-medium mr-3">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Nutrition Information</h2>
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-bold text-xl text-gray-800">{calories}</p>
              <p className="text-xs text-gray-500">kcal</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Protein</p>
              <p className="font-bold text-xl text-gray-800">{protein}</p>
              <p className="text-xs text-gray-500">g</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Carbs</p>
              <p className="font-bold text-xl text-gray-800">{carbs}</p>
              <p className="text-xs text-gray-500">g</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Fat</p>
              <p className="font-bold text-xl text-gray-800">{fat}</p>
              <p className="text-xs text-gray-500">g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;