-- =============================================
-- Row Level Security (RLS) Policies
-- Run this AFTER schema.sql in Supabase SQL Editor
-- =============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- CATEGORIES: Public can read all
CREATE POLICY "categories_public_read" ON categories
  FOR SELECT TO anon USING (true);

-- PROJECTS: Public can read only published
CREATE POLICY "projects_public_read" ON projects
  FOR SELECT TO anon USING (published = true);

-- ARTWORKS: Public can read only published
CREATE POLICY "artworks_public_read" ON artworks
  FOR SELECT TO anon USING (published = true);

-- PAGES: Public can read only published
CREATE POLICY "pages_public_read" ON pages
  FOR SELECT TO anon USING (published = true);

-- SETTINGS: Public can read all
CREATE POLICY "settings_public_read" ON settings
  FOR SELECT TO anon USING (true);
