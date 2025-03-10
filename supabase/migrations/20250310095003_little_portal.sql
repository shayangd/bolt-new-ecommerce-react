/*
  # Set admin user

  1. Changes
    - Set app_metadata for user with email shanraisshan@gmail.com to include is_admin flag
*/

DO $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'::jsonb
  WHERE email = 'shanraisshan@gmail.com';
END $$;