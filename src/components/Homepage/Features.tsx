import React from 'react';
import { Calendar, ChefHat, ShoppingBag, LineChart, Users, Heart } from 'lucide-react';
import Card, { CardContent } from '../UI/Card';

const features = [
  {
    title: 'Personalized Meal Planning',
    description: 'Create daily, weekly, or monthly meal plans tailored to your preferences, dietary needs, and schedule.',
    icon: <Calendar className="h-8 w-8 text-green-600" />,
  },
  {
    title: 'Recipe Discovery',
    description: 'Browse thousands of recipes from various cuisines, filtered by dietary needs, ingredients, prep time, and more.',
    icon: <ChefHat className="h-8 w-8 text-green-600" />,
  },
  {
    title: 'Automated Shopping Lists',
    description: 'Generate shopping lists from your meal plans, organized by category with cost tracking.',
    icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
  },
  {
    title: 'Nutrition Tracking',
    description: 'Monitor calories, macros, and nutritional values for each meal and your entire meal plan.',
    icon: <LineChart className="h-8 w-8 text-green-600" />,
  },
  {
    title: 'Community Sharing',
    description: 'Share your favorite recipes and meal plans with the AngiDay community and discover popular creations.',
    icon: <Users className="h-8 w-8 text-green-600" />,
  },
  {
    title: 'Personalized Recommendations',
    description: 'Get AI-powered meal suggestions based on your preferences, past choices, and seasonal ingredients.',
    icon: <Heart className="h-8 w-8 text-green-600" />,
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How AngiDay Makes Meal Planning Easy</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you save time, reduce stress, and enjoy delicious meals every day.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-transform duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;