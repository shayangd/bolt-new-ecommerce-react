import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    description: 'A comfortable, pure cotton t-shirt perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'tshirt'
  },
  {
    id: '2',
    name: 'Slim Fit Chino Trousers',
    price: 49.99,
    description: 'Modern slim-fit trousers ideal for both casual and semi-formal occasions.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    category: 'trouser'
  }
];