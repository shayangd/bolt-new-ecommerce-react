/*
  # Update auth trigger for admin users

  1. Changes
    - Create a trigger to automatically set app_metadata.is_admin based on user_metadata.is_admin during registration
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'is_admin' = 'true' THEN
    NEW.raw_app_meta_data := jsonb_set(
      COALESCE(NEW.raw_app_meta_data, '{}'::jsonb),
      '{is_admin}',
      'true'::jsonb
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();