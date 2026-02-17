-- =============================================
-- Seed Data for Testing
-- Run this AFTER all other scripts in Supabase SQL Editor
-- =============================================

-- CATEGORIES
INSERT INTO categories (slug, title, order_index) VALUES
  ('human', 'Human', 1),
  ('food', 'Food', 2),
  ('nature', 'Nature', 3),
  ('map', 'Map', 4);

-- PROJECTS
INSERT INTO projects (slug, title, subtitle, description, cover_image, year, category_slug, published, order_index) VALUES
  ('summer-fruits', 'Summer Fruits', 'A colorful collection', 'Exploring the vibrant colors and textures of summer fruits through illustration.', 'https://picsum.photos/seed/cover1/800/600', 2024, 'food', true, 1),
  ('city-maps', 'City Maps', 'Urban exploration', 'Hand-drawn maps of my favorite cities, capturing their unique character.', 'https://picsum.photos/seed/cover2/800/600', 2023, 'map', true, 2),
  ('portrait-series', 'Portrait Series', 'Faces and stories', 'A collection of portraits exploring human emotion and expression.', 'https://picsum.photos/seed/cover3/800/600', 2024, 'human', true, 3);

-- ARTWORKS
INSERT INTO artworks (project_slug, title, image, description, year, category_slug, published, order_index) VALUES
  ('summer-fruits', 'Strawberries', 'https://picsum.photos/seed/art1/600/800', 'Fresh summer strawberries', 2024, 'food', true, 1),
  ('summer-fruits', 'Watermelon Slice', 'https://picsum.photos/seed/art2/800/600', 'A refreshing watermelon slice', 2024, 'food', true, 2),
  ('summer-fruits', 'Citrus Bowl', 'https://picsum.photos/seed/art3/600/600', 'Oranges and lemons in a ceramic bowl', 2024, 'food', true, 3),
  ('city-maps', 'Budapest Map', 'https://picsum.photos/seed/art4/800/1000', 'Hand-drawn map of Budapest', 2023, 'map', true, 4),
  ('city-maps', 'Vienna Streets', 'https://picsum.photos/seed/art5/600/800', 'Walking through Vienna', 2023, 'map', true, 5),
  ('portrait-series', 'Morning Light', 'https://picsum.photos/seed/art6/600/800', 'Portrait in morning light', 2024, 'human', true, 6),
  ('portrait-series', 'The Reader', 'https://picsum.photos/seed/art7/800/600', 'Lost in a book', 2024, 'human', true, 7),
  (NULL, 'Autumn Leaves', 'https://picsum.photos/seed/art8/600/900', 'Standalone nature piece', 2024, 'nature', true, 8);

-- PAGES
INSERT INTO pages (slug, title, content, published) VALUES
  ('about', 'About', '{
    "meta": {
      "label": "Illustrator / Visual Storyteller",
      "location": "Budapest, Hungary",
      "availability": "Open for commissions"
    },
    "hero": {
      "name": "Food for the soul.",
      "tagline": "Illustrator & Visual Storyteller",
      "video": "https://your-supabase-project.supabase.co/storage/v1/object/public/media/KataProfile.mp4",
      "image": ""
    },
    "content": [
      { "label": "About", "paragraphs": ["Working like a chef in a creative kitchen, I collaborate with clients to craft visuals that explore education, science, nature, well-being, and the human experience.", "Together, we mix ideas, balance flavors, and create illustrations that truly connect—tailored to inspire and meaningful in ways that templates never could be."] },
      { "label": "Philosophy", "paragraphs": ["Illustration is my way of speaking. Lets create something meaningful together."] }
    ],
    "details": [
      { "label": "Specialties", "value": "Education, Science, Nature, Well-being" },
      { "label": "Available", "value": "Commissions & Collaborations" }
    ]
  }', true);

-- SETTINGS
INSERT INTO settings (key, value) VALUES
  ('site_title', '"Kata Studio"'),
  ('site_description', '"Illustrator artist"'),
  ('homepage_intro', '"Exploring material and form through illustration"'),
  ('contact_email', '"hello@kata.hu"'),
  ('instagram_url', '"https://instagram.com/katastudio"'),
  ('behance_url', '"https://behance.net/katastudio"'),
  ('location', '"Budapest"');
