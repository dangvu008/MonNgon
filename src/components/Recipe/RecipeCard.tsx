import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../../types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { formatTime } from '../../utils/helpers';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const { title, imageUrl, prepTime, cookTime, difficulty, servings, tags, cuisine } = recipe;
  
  // Get first 3 tags for display
  const displayTags = tags.slice(0, 3);
  
  // Determine difficulty color
  const difficultyColor = {
    easy: 'green',
    medium: 'orange',
    hard: 'red'
  }[difficulty] as 'green' | 'orange' | 'red';
  
  return (
    <Card hover onClick={onClick} className="h-full transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Badge color={difficultyColor} size="sm" className="capitalize">
              {difficulty}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatTime(prepTime + cookTime)}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {servings}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <ChefHat className="h-4 w-4 mr-1" />
            {cuisine}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {displayTags.map((tag, index) => (
            <Badge 
              key={index} 
              color="blue" 
              variant="outline" 
              size="sm"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge color="gray" size="sm">+{tags.length - 3}</Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;