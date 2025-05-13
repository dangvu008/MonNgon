import { Recipe, MealPlan, Tag } from '../types';

// Sample tags for filtering
export const tags: Tag[] = [
  // Cuisine tags
  { id: '1', name: 'Vietnamese', category: 'cuisine' },
  { id: '2', name: 'Chinese', category: 'cuisine' },
  { id: '3', name: 'Italian', category: 'cuisine' },
  { id: '4', name: 'Thai', category: 'cuisine' },
  { id: '5', name: 'Mexican', category: 'cuisine' },
  { id: '6', name: 'Indian', category: 'cuisine' },
  { id: '7', name: 'Japanese', category: 'cuisine' },
  
  // Diet tags
  { id: '8', name: 'Vegetarian', category: 'diet' },
  { id: '9', name: 'Vegan', category: 'diet' },
  { id: '10', name: 'Gluten-Free', category: 'diet' },
  { id: '11', name: 'Low-Carb', category: 'diet' },
  { id: '12', name: 'Keto', category: 'diet' },
  
  // Meal course
  { id: '13', name: 'Breakfast', category: 'course' },
  { id: '14', name: 'Lunch', category: 'course' },
  { id: '15', name: 'Dinner', category: 'course' },
  { id: '16', name: 'Appetizer', category: 'course' },
  { id: '17', name: 'Dessert', category: 'course' },
  { id: '18', name: 'Snack', category: 'course' },
  
  // Cooking method
  { id: '19', name: 'Baked', category: 'method' },
  { id: '20', name: 'Grilled', category: 'method' },
  { id: '21', name: 'Steamed', category: 'method' },
  { id: '22', name: 'Fried', category: 'method' },
  { id: '23', name: 'Slow-Cooked', category: 'method' },
  
  // Time & difficulty
  { id: '24', name: 'Quick & Easy', category: 'occasion' },
  { id: '25', name: 'Weekend', category: 'occasion' },
  { id: '26', name: 'Special Occasion', category: 'occasion' }
];

// Sample recipes for the application
export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Vietnamese Pho Soup',
    description: 'A traditional Vietnamese soup with rice noodles, herbs, and beef.',
    imageUrl: 'https://images.pexels.com/photos/9993041/pexels-photo-9993041.jpeg',
    prepTime: 30,
    cookTime: 120,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { id: '1', name: 'Rice noodles', amount: 200, unit: 'g' },
      { id: '2', name: 'Beef bones', amount: 1, unit: 'kg' },
      { id: '3', name: 'Beef slices', amount: 300, unit: 'g' },
      { id: '4', name: 'Onion', amount: 1, unit: 'large' },
      { id: '5', name: 'Ginger', amount: 50, unit: 'g' },
      { id: '6', name: 'Star anise', amount: 3, unit: 'pieces' },
      { id: '7', name: 'Cinnamon stick', amount: 1, unit: 'piece' },
      { id: '8', name: 'Bean sprouts', amount: 100, unit: 'g' },
      { id: '9', name: 'Thai basil', amount: 1, unit: 'bunch' },
      { id: '10', name: 'Lime', amount: 2, unit: 'pieces' }
    ],
    instructions: [
      'Roast the bones, onion, and ginger in the oven at 220°C for 20 minutes.',
      'Transfer the bones and vegetables to a large pot, add water, and bring to a boil.',
      'Reduce heat and simmer for 2 hours, skimming occasionally.',
      'Add star anise and cinnamon for the last 30 minutes.',
      'Strain the broth and return to the pot. Season with salt and fish sauce.',
      'Cook the rice noodles according to package instructions.',
      'Place noodles in bowls, top with thinly sliced raw beef.',
      'Pour hot broth over the beef to cook it.',
      'Serve with bean sprouts, Thai basil, and lime wedges.'
    ],
    tags: ['Vietnamese', 'Dinner', 'Soup', 'Weekend'],
    cuisine: 'Vietnamese',
    calories: 450,
    protein: 30,
    carbs: 45,
    fat: 15,
    createdBy: 'user1',
    createdAt: '2023-05-15'
  },
  {
    id: '2',
    title: 'Easy Avocado Toast',
    description: 'A quick and healthy breakfast option with creamy avocado on toast.',
    imageUrl: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    difficulty: 'easy',
    ingredients: [
      { id: '1', name: 'Whole grain bread', amount: 2, unit: 'slices' },
      { id: '2', name: 'Avocado', amount: 1, unit: 'large' },
      { id: '3', name: 'Lemon juice', amount: 1, unit: 'teaspoon' },
      { id: '4', name: 'Red pepper flakes', amount: 0.5, unit: 'teaspoon' },
      { id: '5', name: 'Salt', amount: 0.25, unit: 'teaspoon' },
      { id: '6', name: 'Black pepper', amount: 0.25, unit: 'teaspoon' }
    ],
    instructions: [
      'Toast the bread slices until golden brown.',
      'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.',
      'Add lemon juice, salt, and pepper, and mash to your desired consistency.',
      'Spread the avocado mixture evenly on the toast.',
      'Sprinkle with red pepper flakes.',
      'Serve immediately.'
    ],
    tags: ['Vegetarian', 'Breakfast', 'Quick & Easy', 'Healthy'],
    cuisine: 'International',
    calories: 220,
    protein: 5,
    carbs: 22,
    fat: 12,
    createdBy: 'user2',
    createdAt: '2023-07-10'
  },
  {
    id: '3',
    title: 'Thai Green Curry',
    description: 'A flavorful and aromatic Thai curry with coconut milk and vegetables.',
    imageUrl: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: 500, unit: 'g' },
      { id: '2', name: 'Green curry paste', amount: 3, unit: 'tablespoons' },
      { id: '3', name: 'Coconut milk', amount: 400, unit: 'ml' },
      { id: '4', name: 'Bamboo shoots', amount: 100, unit: 'g' },
      { id: '5', name: 'Thai eggplant', amount: 4, unit: 'pieces' },
      { id: '6', name: 'Bell pepper', amount: 1, unit: 'large' },
      { id: '7', name: 'Thai basil leaves', amount: 1, unit: 'cup' },
      { id: '8', name: 'Fish sauce', amount: 2, unit: 'tablespoons' },
      { id: '9', name: 'Palm sugar', amount: 1, unit: 'tablespoon' }
    ],
    instructions: [
      'Cut chicken into bite-size pieces.',
      'In a large pan, heat 2 tablespoons of vegetable oil over medium heat.',
      'Add the green curry paste and stir-fry for 1 minute until fragrant.',
      'Add chicken and cook until no longer pink on the outside.',
      'Pour in coconut milk and bring to a simmer.',
      'Add bamboo shoots, Thai eggplant, and bell pepper.',
      'Simmer for 15 minutes until chicken is cooked through and vegetables are tender.',
      'Season with fish sauce and palm sugar.',
      'Garnish with Thai basil leaves before serving.',
      'Serve hot with steamed jasmine rice.'
    ],
    tags: ['Thai', 'Dinner', 'Spicy', 'Curry'],
    cuisine: 'Thai',
    calories: 380,
    protein: 25,
    carbs: 12,
    fat: 28,
    createdBy: 'user3',
    createdAt: '2023-09-05'
  }
];

// Sample meal plan for the current week
export const mealPlan = {
  id: '1',
  userId: 'user1',
  title: 'This Week\'s Plan',
  startDate: '2023-11-06',
  endDate: '2023-11-12',
  meals: [
    {
      id: '1',
      date: '2023-11-06',
      type: 'breakfast',
      recipeId: '2',
      recipe: recipes[1],
      servings: 1
    },
    {
      id: '2',
      date: '2023-11-06',
      type: 'dinner',
      recipeId: '3',
      recipe: recipes[2],
      servings: 2
    },
    {
      id: '3',
      date: '2023-11-07',
      type: 'dinner',
      recipeId: '1',
      recipe: recipes[0],
      servings: 4
    },
    {
      id: '4',
      date: '2023-11-08',
      type: 'breakfast',
      recipeId: '2',
      recipe: recipes[1],
      servings: 1
    }
  ]
};

// Export mockData object containing all mock data
export const mockData = {
  tags,
  recipes,
  mealPlan
};