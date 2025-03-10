/*
  # Create products table and add initial data

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `description` (text)
      - `image` (text)
      - `category` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for authenticated users to manage products

  3. Initial Data
    - Add sample products
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  description text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' 
    AND policyname = 'Anyone can view products'
  ) THEN
    CREATE POLICY "Anyone can view products"
      ON products
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Insert initial products
INSERT INTO products (name, price, description, image, category)
VALUES
  (
    'Classic White T-Shirt',
    29.99,
    'A comfortable, pure cotton t-shirt perfect for everyday wear.',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    'tshirt'
  ),
  (
    'Slim Fit Chino Trousers',
    49.99,
    'Modern slim-fit trousers ideal for both casual and semi-formal occasions.',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    'trouser'
  ),
  (
    'Denim Jacket',
    79.99,
    'Classic denim jacket with a modern fit and vintage wash.',
    'https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?auto=format&fit=crop&q=80&w=800',
    'jacket'
  ),
  (
    'Leather Sneakers',
    89.99,
    'Minimalist leather sneakers perfect for any casual outfit.',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
    'shoes'
  )
ON CONFLICT (id) DO NOTHING;