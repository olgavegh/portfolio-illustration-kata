-- =============================================
-- Seed Data for Testing
-- Run this AFTER all other scripts in Supabase SQL Editor
-- =============================================

-- CATEGORIES
INSERT INTO categories (slug, title, type, icon, order_index) VALUES
  ('all',     'All',      'scale',    'https://your-supabase-project.supabase.co/storage/v1/object/public/icons/scale-all.svg',     1),
  ('project', 'Featured', 'scale',    'https://your-supabase-project.supabase.co/storage/v1/object/public/icons/scale-project.svg', 2),
  ('human',  'Human',    'thematic', NULL, 1),
  ('food',   'Food',     'thematic', NULL, 2),
  ('nature', 'Nature',   'thematic', NULL, 3),
  ('map',    'Map',      'thematic', NULL, 4);

-- PROJECTS
INSERT INTO projects (slug, title, subtitle, description, cover_image, year, category_slug, published, order_index) VALUES
  ('summer-fruits', 'Summer Fruits', 'A colorful collection', 'Exploring the vibrant colors and textures of summer fruits through illustration.', 'https://picsum.photos/seed/cover1/800/600', 2024, 'food', true, 1),
  ('city-maps', 'City Maps', 'Urban exploration', 'Hand-drawn maps of my favorite cities, capturing their unique character.', 'https://picsum.photos/seed/cover2/800/600', 2023, 'map', true, 2),
  ('portrait-series', 'Portrait Series', 'Faces and stories', 'A collection of portraits exploring human emotion and expression.', 'https://picsum.photos/seed/cover3/800/600', 2024, 'human', true, 3);

-- ARTWORKS
INSERT INTO artworks (project_slug, title, image, description, year, category_slug, landing, order_index) VALUES
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
  ('home', 'Home', '{
    "hero": {
      "headline": "I''m Kata — a visual translator who turns ideas into editorial illustrations."
    },
    "snippets": [
      {
        "id": "s1",
        "label": "contact",
        "image": { "src": "", "alt": "" },
        "body": "Open for commissions and collaborations. I''d love to hear about your project.",
        "link": { "label": "Get in touch", "href": "mailto:hello@kata.hu" },
        "order_index": 3
      },
      {
        "id": "s2",
        "label": "sparkles",
        "image": { "src": "", "alt": "" },
        "body": "Illustrator based in Budapest, crafting visuals for education, science, and the human experience.",
        "link": { "label": "Read more", "href": "/about" },
        "order_index": 9
      },
    ]
  }', true),
  ('about', 'About', '{
    "hero": {
      "title": "I believe in the power of illustration.",
      "tagline": "Illustrator & Visual Storyteller"
    },
    "about": {
      "paragraphs": [
        "I act as a visual translator—combining artistic expertise with strategic thinking to ensure every illustration has a purpose.",
        "I provide visual solutions designed to connect, educate, and entertain. With a focus on editorial illustration, I bridge the gap between a complex concept and a finished visual through my collaborative process.",
        "I am particularly drawn to projects involving nature, the environment, science, and gastronomy—or better yet, a mixture of all four.",
        "My dream list includes more book projects, cover designs, and deep-dives into educational illustration.",
        "If I weren''t a visual translator, I''d likely be an ornithologist or a beekeeper (or both)."
      ]
    },
    "journey": {
      "title": "What''s next?",
      "paragraphs": [
        "I''m preparing for a big adventure: moving to Denmark with my family in the summer of 2026. Spændende! If you''re visiting my site from there: Vi ses! Hav en god dag, og måske kan vi mødes!",
        "I''m on the lookout for new collaborations and creative partners to join me in this next chapter. Whether you''re in Denmark or halfway across the world, let''s give your story a powerful visual voice."
      ]
    },
    "wishlist": {
      "title": "",
      "items": []
    },
    "quote": {
      "text": "",
      "author": ""
    },
    "gallery": [
      { "type": "image", "src": "", "alt": "" },
      { "type": "image", "src": "", "alt": "" },
      { "type": "image", "src": "", "alt": "" }
    ],
    "services": {
      "label": "Services",
      "title": "",
      "desc": "I am particularly drawn to projects involving nature, lifestyle, science, and gastronomy—or better yet, a mixture of all four.",
      "cards": [
        {
          "icon": "",
          "title": "Illustration",
          "desc": "Thought-to-Form. Translating the invisible into the visible.",
          "details": "editorial illustration / book cover / infographic / cover art / storytelling"
        },
        {
          "icon": "",
          "title": "Graphic Design",
          "desc": "Brand Nesting. Building a cohesive visual home for your message.",
          "details": "brand identity & logo design / layout & editorial design / social media visuals / packaging / presentation design"
        },
        {
          "icon": "",
          "title": "Walk & Talk",
          "desc": "Getting out of the nest to brainstorm in the wild.",
          "details": "strategic birdwatching / field notes"
        }
      ]
    }
  }', true);

-- SETTINGS
INSERT INTO settings (key, value) VALUES
  ('site_title', '"Kata Studio"'),
  ('site_description', '"Illustrator artist"'),
  ('homepage_intro', '"Exploring material and form through illustration"'),
  ('contact_email', '"hello@kata.hu"'),
  ('instagram_url', '"https://instagram.com/katastudio"'),
  ('behance_url', '"https://behance.net/katastudio"'),
  ('linkedin_url', '"https://linkedin.com/in/katastudio"'),
  ('location', '"Budapest"'),
  ('footer_message', '"Let''s give your story a powerful visual language."'),
  ('logo_url', '"https://your-supabase-project.supabase.co/storage/v1/object/public/brand/logo.svg"');
