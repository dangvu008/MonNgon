import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, Search, User } from 'lucide-react';
import Button from '../UI/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ChefHat className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AngiDay</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link
                to="/recipes"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/recipes')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Recipes
              </Link>
              <Link
                to="/meal-planner"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/meal-planner')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Meal Plans
              </Link>
              <Link
                to="/shopping-list"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/shopping-list')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Shopping List
              </Link>
            </div>
          </div>

          {/* Right navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            <button className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/profile"
              className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
            <div className="ml-2">
              <Button variant="primary" size="sm">Sign In</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-green-600 hover:bg-gray-100 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/recipes"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/recipes')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Recipes
              </Link>
              <Link
                to="/meal-planner"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/meal-planner')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Meal Plans
              </Link>
              <Link
                to="/shopping-list"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/shopping-list')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                Shopping List
              </Link>
              <div className="flex space-x-2 px-3 py-2">
                <button className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
                  <Search className="h-5 w-5" />
                </button>
                <Link
                  to="/profile"
                  className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Link>
              </div>
              <div className="px-3 pt-2">
                <Button variant="primary" isFullWidth>Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;