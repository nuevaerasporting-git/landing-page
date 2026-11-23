-- Seed-like script for the public image bucket. Not a migration: it only inserts a
-- bucket row and creates no tables, grants or policies. No storage policy is defined
-- for `authenticated` because this project has no Supabase Auth; every write happens
-- on the server with the service role key, and public read comes from `public = true`.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- If this Supabase version has no `allowed_mime_types` column, insert only
-- (id, name, public, file_size_limit). MIME enforcement then relies on the
-- server-side validation in src/features/media/utils/validate-image.ts.
