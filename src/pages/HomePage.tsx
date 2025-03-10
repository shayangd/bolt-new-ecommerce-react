import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

export function HomePage({ products, loading, onAddToCart }: HomePageProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}