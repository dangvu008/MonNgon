// Common types used throughout the application
export type User = {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
};

export type UserPreferences = {
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  allergies: string[];
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  cuisine: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdBy: string;
  createdAt: string;
};

export type Ingredient = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  estimatedCost?: number;
};

export type MealPlan = {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
  meals: Meal[];
};

export type Meal = {
  id: string;
  date: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId: string;
  recipe: Recipe;
  servings: number;
};

export type ShoppingItem = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
  category: string;
  estimatedCost?: number;
};

export type ShoppingList = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  items: ShoppingItem[];
  totalEstimatedCost: number;
};

export type Tag = {
  id: string;
  name: string;
  category: 'cuisine' | 'diet' | 'ingredient' | 'course' | 'occasion' | 'method';
};