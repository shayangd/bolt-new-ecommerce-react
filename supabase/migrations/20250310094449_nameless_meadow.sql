/*
  # Set admin status for users

  1. Changes
    - Update specific users to have admin status in their metadata
  
  2. Security
    - Only specific users will be granted admin access
*/

-- Set admin status for specific users (replace with actual email)
UPDATE auth.users
SET raw_user_meta_data = 
  CASE 
    WHEN email = 'admin@example.com' THEN 
      COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"is_admin": true}'::jsonb
    ELSE 
      COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"is_admin": false}'::jsonb
  END
WHERE email IN ('admin@example.com');