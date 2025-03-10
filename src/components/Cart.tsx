import React from 'react';
import { CartItem } from '../types';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, isOpen, onClose }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart />
            Shopping Cart
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-auto">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => alert('Checkout functionality coming soon!')}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}