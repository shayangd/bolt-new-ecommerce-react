/*
  # Add admin metadata to users

  1. Changes
    - Add admin metadata to users using Supabase auth.users
  
  2. Security
    - Only admins can access admin features through user_metadata
*/

-- Update user_metadata to include admin status
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object('is_admin', false);