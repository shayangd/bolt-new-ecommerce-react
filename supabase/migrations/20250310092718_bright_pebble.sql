/*
  # Add admin flag to auth.users

  1. Changes
    - Add admin column to auth.users table
    - Add policy to allow admin users to manage products
  
  2. Security
    - Only admin users can access product management
*/

ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Update RLS policies for products table to allow admin access
CREATE POLICY "Allow admin to manage products"
ON public.products
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.is_admin = true
  )
);