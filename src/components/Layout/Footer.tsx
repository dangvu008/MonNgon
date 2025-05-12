import React from 'react';
import { ChefHat, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-2xl font-bold">AngiDay</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your smart meal planning companion for stress-free cooking.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Meal Planning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Recipe Discovery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shopping Lists</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nutrition Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Sharing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cooking Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ingredient Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nutrition Facts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seasonal Produce</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AngiDay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;