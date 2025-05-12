import React from 'react';
import { Search, Calendar, ShoppingBag } from 'lucide-react';
import Button from '../UI/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-500 to-green-700 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5965642/pexels-photo-5965642.jpeg')] bg-cover bg-center opacity-15"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Stop wondering<br />
              <span className="text-yellow-300">"What's for dinner?"</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Plan your meals with ease, track nutrition, manage grocery costs, and share recipes with a global community of home cooks.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                leftIcon={<Calendar size={18} />}
                size="lg"
                className="font-medium"
              >
                Start Planning
              </Button>
              
              <Button
                variant="outline"
                leftIcon={<Search size={18} />}
                size="lg"
                className="text-white border-white hover:bg-white/20 font-medium"
              >
                Browse Recipes
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm mt-1">Recipes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm mt-1">Cuisines</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-sm mt-1">Happy Users</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply opacity-30 animate-blob"></div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute inset-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply opacity-30 animate-blob animation-delay-4000 mx-auto"></div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1">
                <div className="bg-green-600 text-white p-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <div className="text-sm font-medium">Weekly Meal Plan</div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-100 p-3">
                      <div className="text-xs text-gray-500 mb-1">Monday - Dinner</div>
                      <div className="text-sm font-medium">Thai Green Curry</div>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <div className="text-xs text-gray-500 mb-1">Tuesday - Dinner</div>
                      <div className="text-sm font-medium">Vietnamese Pho</div>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <div className="text-xs text-gray-500 mb-1">Wednesday - Dinner</div>
                      <div className="text-sm font-medium">Pasta Carbonara</div>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-3">
                      <div className="text-xs text-gray-500 mb-1">Thursday - Dinner</div>
                      <div className="text-sm font-medium">Chicken Tacos</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl overflow-hidden w-48 transform -rotate-3">
                <div className="bg-orange-500 text-white p-2 flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <div className="text-xs font-medium">Shopping List</div>
                </div>
                <div className="p-3">
                  <div className="text-xs space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 border border-gray-300 rounded-sm mr-1"></div>
                      <span className="text-gray-700">2 lbs chicken</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border border-gray-300 rounded-sm mr-1"></div>
                      <span className="text-gray-700">1 avocado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border border-gray-300 rounded-sm mr-1"></div>
                      <span className="text-gray-700">Rice noodles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;