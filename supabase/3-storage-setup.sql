-- =============================================
-- Storage Bucket Setup for Images
-- Run this AFTER rls-policies.sql in Supabase SQL Editor
-- =============================================

-- Create a public bucket for artwork images
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true);

-- Allow public to view images
CREATE POLICY "artworks_public_view" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'artworks');

-- Allow authenticated users (Kata in Supabase Studio) to upload
CREATE POLICY "artworks_admin_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'artworks');

-- Allow authenticated users to update images
CREATE POLICY "artworks_admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'artworks');

-- Allow authenticated users to delete images
CREATE POLICY "artworks_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'artworks');
