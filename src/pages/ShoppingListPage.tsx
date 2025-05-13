import React from 'react';
import ShoppingListCard from '../components/ShoppingList/ShoppingListCard';

const ShoppingListPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping List</h1>
      <ShoppingListCard 
        items={[]}
        title="Current Shopping List"
      />
    </div>
  );
};

export default ShoppingListPage;