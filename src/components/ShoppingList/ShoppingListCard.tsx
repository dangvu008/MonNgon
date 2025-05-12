import React, { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { ShoppingItem } from '../../types';
import Card, { CardHeader, CardContent, CardFooter } from '../UI/Card';
import Button from '../UI/Button';

interface ShoppingListCardProps {
  items: ShoppingItem[];
  title?: string;
  totalEstimatedCost?: number;
  onItemToggle?: (id: string, checked: boolean) => void;
}

const ShoppingListCard: React.FC<ShoppingListCardProps> = ({
  items,
  title = 'Shopping List',
  totalEstimatedCost,
  onItemToggle
}) => {
  // Group items by category
  const groupedItems: Record<string, ShoppingItem[]> = {};
  
  items.forEach(item => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });
  
  // Get all categories and sort them
  const categories = Object.keys(groupedItems).sort();
  
  // Get completion percentage
  const checkedItems = items.filter(item => item.checked).length;
  const completionPercentage = items.length ? Math.round((checkedItems / items.length) * 100) : 0;
  
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-sm font-medium text-gray-500">
          {checkedItems} of {items.length} items
        </div>
      </CardHeader>
      
      <CardContent className="overflow-y-auto max-h-[400px]">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No items in your shopping list yet.</p>
          </div>
        ) : (
          <div>
            {/* Progress bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-right mt-1 text-gray-500">
                {completionPercentage}% complete
              </div>
            </div>
            
            {/* Item categories */}
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category} className="border-b pb-2">
                  <h4 className="font-medium text-gray-800 mb-2 capitalize">{category}</h4>
                  <ul className="space-y-2">
                    {groupedItems[category].map(item => (
                      <li key={item.id} className="flex items-center">
                        <div 
                          className={`
                            flex-shrink-0 w-5 h-5 border rounded-md mr-3 cursor-pointer
                            ${item.checked 
                              ? 'bg-green-600 border-green-600 flex items-center justify-center' 
                              : 'border-gray-300 hover:border-green-500'}
                          `}
                          onClick={() => onItemToggle && onItemToggle(item.id, !item.checked)}
                        >
                          {item.checked && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span 
                          className={`flex-grow ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}
                        >
                          {item.amount} {item.unit} {item.name}
                        </span>
                        {item.estimatedCost && (
                          <span className="text-sm text-gray-500 ml-2">
                            ${item.estimatedCost.toFixed(2)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {totalEstimatedCost !== undefined && (
        <CardFooter className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Estimated Total:</span>
            <span className="ml-2 font-semibold">${totalEstimatedCost.toFixed(2)}</span>
          </div>
          <Button variant="primary" size="sm">
            Generate List
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ShoppingListCard;