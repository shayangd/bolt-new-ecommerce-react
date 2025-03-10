export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'tshirt' | 'trouser';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthError {
  message: string;
}