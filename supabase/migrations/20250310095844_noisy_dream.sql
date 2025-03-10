/*
  # Fix product table permissions

  1. Changes
    - Update RLS policies for products table to ensure proper access
    - Allow public read access to products
    - Allow admin users to manage products through app_metadata

  2. Security
    - Enable RLS on products table
    - Add policies for:
      - Public read access
      - Admin write access based on app_metadata
*/

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow admin to manage products" ON products;
DROP POLICY IF EXISTS "Anyone can view products" ON products;

-- Create new policies
CREATE POLICY "Anyone can view products"
ON products
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow admin to manage products"
ON products
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'app_metadata'::text = '{"is_admin":true}'::text)
WITH CHECK (auth.jwt() ->> 'app_metadata'::text = '{"is_admin":true}'::text);