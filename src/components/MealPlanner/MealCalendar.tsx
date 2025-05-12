import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { MealPlan, Meal } from '../../types';
import Button from '../UI/Button';
import Card, { CardContent } from '../UI/Card';
import Badge from '../UI/Badge';
import { formatDate, generateWeekDays } from '../../utils/helpers';

interface MealCalendarProps {
  mealPlan: MealPlan;
  onAddMeal?: (date: string, mealType: string) => void;
  onEditMeal?: (meal: Meal) => void;
}

const MealCalendar: React.FC<MealCalendarProps> = ({ 
  mealPlan, 
  onAddMeal,
  onEditMeal
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(mealPlan.startDate));
  const weekDays = generateWeekDays(currentWeekStart);
  
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };
  
  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };
  
  const getMealForDateAndType = (date: Date, type: string): Meal | undefined => {
    const dateString = date.toISOString().split('T')[0];
    return mealPlan.meals.find(
      meal => meal.date === dateString && meal.type === type
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <Button 
          variant="ghost" 
          leftIcon={<ChevronLeft size={16} />}
          className="text-white hover:bg-green-700" 
          onClick={goToPreviousWeek}
        >
          Previous
        </Button>
        <h2 className="text-xl font-bold">
          {formatDate(currentWeekStart.toISOString())} - {formatDate(weekDays[6].toISOString())}
        </h2>
        <Button 
          variant="ghost" 
          rightIcon={<ChevronRight size={16} />}
          className="text-white hover:bg-green-700" 
          onClick={goToNextWeek}
        >
          Next
        </Button>
      </div>
      
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 font-medium text-gray-500 border-r"></div>
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`p-2 text-center border-r ${
              day.toDateString() === new Date().toDateString() 
                ? 'bg-green-50 font-semibold' 
                : ''
            }`}
          >
            <div className="text-xs text-gray-500">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className="font-medium">{day.getDate()}</div>
          </div>
        ))}
      </div>
      
      <div className="divide-y">
        {mealTypes.map((type) => (
          <div key={type} className="grid grid-cols-8">
            <div className="p-3 font-medium text-gray-700 border-r capitalize bg-gray-50">
              {type}
            </div>
            
            {weekDays.map((day, dayIndex) => {
              const meal = getMealForDateAndType(day, type);
              return (
                <div key={dayIndex} className="p-2 border-r min-h-[100px]">
                  {meal ? (
                    <div 
                      className="h-full cursor-pointer"
                      onClick={() => onEditMeal && onEditMeal(meal)}
                    >
                      <Card hover className="h-full">
                        <CardContent className="p-2">
                          <div className="text-sm font-medium mb-1 line-clamp-2">
                            {meal.recipe.title}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge color="green" size="sm">
                              {meal.recipe.calories} kcal
                            </Badge>
                            <span className="text-xs text-gray-500">
                              × {meal.servings}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    onAddMeal && (
                      <button 
                        onClick={() => onAddMeal(day.toISOString().split('T')[0], type)}
                        className="w-full h-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCalendar;