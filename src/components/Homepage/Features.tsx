import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ChefHat, ShoppingBag, LineChart, Users, Heart } from 'lucide-react';
import Card, { CardContent } from '../UI/Card';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      key: 'mealPlanning',
      icon: <Calendar className="h-8 w-8 text-green-600" />,
    },
    {
      key: 'recipeDiscovery',
      icon: <ChefHat className="h-8 w-8 text-green-600" />,
    },
    {
      key: 'shoppingList',
      icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
    },
    {
      key: 'nutritionTracking',
      icon: <LineChart className="h-8 w-8 text-green-600" />,
    },
    {
      key: 'community',
      icon: <Users className="h-8 w-8 text-green-600" />,
    },
    {
      key: 'recommendations',
      icon: <Heart className="h-8 w-8 text-green-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('features.title')}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.key} className="transition-transform duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(`features.items.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`features.items.${feature.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;