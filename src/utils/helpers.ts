// Utility functions for the application

// Format date for display
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format time (minutes) to hours and minutes
export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours} hr ${mins > 0 ? `${mins} min` : ''}`;
  }
  return `${mins} min`;
};

// Generate days for a week view, starting from a given date
export const generateWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 7; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

// Get a readable representation of a date range
export const getDateRangeText = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startMonth = start.toLocaleString('default', { month: 'short' });
  const endMonth = end.toLocaleString('default', { month: 'short' });
  
  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`;
  }
  
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
};

// Calculate total nutritional values for a recipe
export const calculateTotalNutrition = (
  recipe: { servings: number, calories: number, protein: number, carbs: number, fat: number },
  servings: number
) => {
  const multiplier = servings / recipe.servings;
  
  return {
    calories: Math.round(recipe.calories * multiplier),
    protein: Math.round(recipe.protein * multiplier),
    carbs: Math.round(recipe.carbs * multiplier),
    fat: Math.round(recipe.fat * multiplier)
  };
};

// Group recipes by tag category for better organization
export const groupRecipesByTag = (recipes: any[], tagCategory: string) => {
  const groupedRecipes: Record<string, any[]> = {};
  
  recipes.forEach(recipe => {
    recipe.tags.forEach((tag: string) => {
      // Simplified logic - in a real app, we'd check if the tag belongs to the category
      if (!groupedRecipes[tag]) {
        groupedRecipes[tag] = [];
      }
      groupedRecipes[tag].push(recipe);
    });
  });
  
  return groupedRecipes;
};