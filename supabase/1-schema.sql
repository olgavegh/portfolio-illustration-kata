-- =============================================
-- Kata Portfolio Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. CATEGORIES (filtering & structure)
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- 2. PROJECTS (storytelling layer)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cover_image TEXT,
  year INTEGER,
  category_slug TEXT,
  published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ARTWORKS (main content - homepage masonry)
CREATE TABLE artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  year INTEGER,
  category_slug TEXT,
  published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PAGES (static content like About)
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. SETTINGS (global config - footer, site info)
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL
);
