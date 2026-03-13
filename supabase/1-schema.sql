-- =============================================
-- Kata Portfolio Database Schema
-- Run in Supabase SQL Editor
-- Order matters: categories & projects before artworks
-- =============================================


-- 1. CATEGORIES
CREATE TABLE categories (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT    UNIQUE NOT NULL,
  title       TEXT    NOT NULL,
  order_index INTEGER DEFAULT 0
);


-- 2. PROJECTS
CREATE TABLE projects (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT        UNIQUE NOT NULL,
  title       TEXT        NOT NULL,
  subtitle    TEXT,
  description TEXT,
  cover_image TEXT,
  published   BOOLEAN     DEFAULT false,
  order_index INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);


-- 3. ARTWORKS
-- Image sizes: portrait 1080×var, landscape var×1080, square 1080×1080
CREATE TABLE artworks (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  image         TEXT        NOT NULL,
  category_slug TEXT        REFERENCES categories(slug) ON DELETE SET NULL,
  project_slug  TEXT        REFERENCES projects(slug) ON DELETE SET NULL,  -- NULL = standalone
  landing       BOOLEAN     DEFAULT false,                                  -- show on homepage masonry grid
  order_index   INTEGER     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);


-- 4. PAGES
-- content JSONB structure: { hero, content[], details[] }
CREATE TABLE pages (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug       TEXT        UNIQUE NOT NULL,
  title      TEXT        NOT NULL,
  content    JSONB,
  published  BOOLEAN     DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- 5. SETTINGS
-- String values must be quoted in JSONB: '"value"'
CREATE TABLE settings (
  id    UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  key   TEXT  UNIQUE NOT NULL,
  value JSONB NOT NULL
);
