import { Product } from '../types';

export interface HomePageProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}