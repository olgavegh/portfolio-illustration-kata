# CMS Structure & Content Strategy

## Illustrating Portfolio Website

---

## Overview

**Backend:** Supabase (PostgreSQL)  
**Updates:** Instant (no redeploy needed)  
**Philosophy:** Content-first, structure-protected

### Core Principle:

> **Customer manages content.**  
> **Developer manages structure.**

---

## Content Types

### MVP (Current)

- ✅ Projects
- ✅ Artworks (project child)
- ✅ Categories
- ✅ Pages (home, project view, about)
- ✅ Settings (global config)

### Future

- ⏳ Blog
- ⏳ Testimonials

---

## Database Schema

### 1. **artworks** (Core Content)

Main exploration content — appears on homepage masonry.

```
artworks
├─ id (uuid)
├─ project_slug (text)
├─ title (text)
├─ image (text/url)
├─ year (int)
├─ category_slug (text)
├─ published (boolean)
├─ order_index (int)
└─ created_at (timestamp)
```

**Purpose:**

- Homepage masonry grid
- Fullscreen overlay exploration
- Image-first discovery

**Key Rules:**

- Only `published = true` artworks appear on site
- Independent from project visibility
- `order_index` controls masonry position

---

### 2. **projects** (Storytelling Layer)

Groups artworks into narrative projects.

```
projects
├─ id (uuid)
├─ slug (text, unique)
├─ title (text)
├─ subtitle (text)
├─ description (text)
├─ cover_image (text/url)
├─ year (int)
├─ category_slug (text)
├─ published (boolean)
├─ order_index (int)
└─ created_at (timestamp)
```

**Purpose:**

- Project detail pages
- Deeper storytelling
- Context for artwork collections

**Key Rules:**

- Slug = URL routing (must not change after publish)
- Can exist as drafts
- Contains narrative/context

---

### 3. **categories** (Filtering & Structure)

Simple taxonomy for artwork filtering.

```
categories
├─ id (uuid)
├─ slug (text, unique)
├─ title (text)
└─ order_index (int)
```

**Examples:**

- human
- food
- nature
- map

**Purpose:**

- Homepage filtering
- Navigation labels
- Content organization

---

### 4. **pages** (Static Content)

Editable pages (About, etc.)

```
pages
├─ id (uuid)
├─ slug (text, unique)
├─ title (text)
├─ content (json/text)
├─ published (boolean)
└─ created_at (timestamp)
```

**Example Slugs:**

- `home`
- `about`

**Note:** Contact information lives in footer (via `settings` table), not as a separate page.

**Key Rules:**

- Layout = fixed (frontend controlled)
- Content = editable (CMS controlled)

---

### 5. **settings** (Global Config)

Site-wide configuration values.

```
settings
├─ id (uuid)
├─ key (text, unique)
└─ value (json)
```

**Example Settings:**

| Key                | Value                          |
| ------------------ | ------------------------------ |
| `site_title`       | "Kata Studio"                  |
| `site_description` | "Illustrator & ceramic artist" |
| `homepage_intro`   | "Exploring material and form"  |
| `contact_email`    | "hello@kata.hu"                |
| `instagram_url`    | "https://instagram.com/..."    |
| `behance_url`      | "https://behance.net/..."      |
| `location`         | "Budapest"                     |

**Why This Exists:**

- Avoids hardcoding
- Global values used everywhere (especially footer)
- Client can edit without touching code
- **Contact information appears in footer sitewide**

**Footer Strategy:**
Contact lives in the footer on every page, not as a separate page. This keeps the site minimal and ensures contact info is always accessible.

---

## Data Relationships

```
projects
   ↓ (via slug)
artworks

artworks
   ↓ (via category_slug)
categories

projects
   ↓ (via category_slug)
categories
```

**Why Simple String Relations?**

- ✅ No foreign keys
- ✅ No complex joins
- ✅ React-friendly queries
- ✅ Framer-friendly
- ✅ Supabase-simple

**Example Query:**

```javascript
artworks.filter((a) => a.project_slug === project.slug);
```

---

## Content Flow & User Journey

### Homepage Flow

```
1. Homepage loads
   ↓
2. Query: artworks WHERE published = true
   ↓
3. Display masonry grid (images only)
   ↓
4. User clicks artwork
   ↓
5. Open fullscreen overlay
   ↓
6. Horizontal scroll through artworks
   ↓
7. User clicks "View Project" CTA
   ↓
8. Navigate to /project/:slug
   ↓
9. Load project + related artworks
   ↓
10. Full storytelling experience
```

### Content Hierarchy

```
ARTWORK (visual discovery)
    ↓
PROJECT (narrative context)
```

**Not the other way around.**

This matches how illustrators think and how galleries work.

---

## Roles & Responsibilities

### 👩‍🎨 Kata (Content Editor)

**Access:** Supabase Studio only

#### ✅ Can Edit:

**Artworks:**

- Upload/delete images
- Edit titles & descriptions
- Toggle published status
- Reorder artworks

**Projects:**

- Edit titles & descriptions
- Change cover images
- Assign categories
- Publish/unpublish
- Reorder projects

**Pages:**

- Update About text
- Edit bio content
- Manage page text

**Categories:**

- Rename labels
- Reorder categories

**Settings (Footer Contact):**

- Update contact email
- Edit social media links
- Change location text
- Update homepage intro

#### ❌ Cannot Touch:

- Database structure
- Table columns
- Field names
- Slugs (after publish)
- API keys
- GitHub repository
- Deployment settings
- Layout/design code

**Supabase Role:** Editor / Content Manager  
(NOT Owner, NOT Admin, NOT Developer)

---

### 💻 Developer (You)

**Owns:**

- Visual design
- React components
- Animations & interactions
- Layout structure
- Database schema
- Deployment pipeline
- Code repository

**Does NOT Own:**

- Content text
- Images
- Publishing decisions

---

## Update Behavior

| Action          | Result                  |
| --------------- | ----------------------- |
| Publish artwork | ✅ Appears instantly    |
| Hide artwork    | ✅ Disappears instantly |
| Edit text       | ✅ Updates live         |
| Upload image    | ✅ Updates live         |
| Reorder content | ✅ Updates instantly    |

**No redeploy. No GitHub. No waiting.**

---

## Security Strategy (RLS)

### Roles

**1. Public (Website Visitors)**

- Anonymous users
- Frontend React app
- Read-only access

**2. Authenticated Admin (Kata)**

- Logged into Supabase Studio
- Full content editing access

---

### Access Rules

| Table          | Public (Read)           | Admin (Write)  |
| -------------- | ----------------------- | -------------- |
| **artworks**   | `published = true` only | ✅ Full access |
| **projects**   | `published = true` only | ✅ Full access |
| **categories** | ✅ Read all             | ✅ Full access |
| **pages**      | `published = true` only | ✅ Full access |
| **settings**   | ✅ Read all             | ✅ Full access |

---

### What Public Users CANNOT Do:

- ❌ Create content
- ❌ Update content
- ❌ Delete rows
- ❌ See drafts
- ❌ See unpublished artworks
- ❌ Access admin-only data

**Even with network inspection — RLS blocks everything.**

---

### API Key Security

**Public Frontend Uses:**

```
SUPABASE_ANON_KEY
```

**This key is:**

- ✅ Safe to expose in frontend code
- ✅ Read-only (enforced by RLS)
- ✅ Cannot bypass security rules
- ✅ Industry standard approach

> 👉 API key is visible in code  
> 👉 But useless without proper permissions

---

## Content Guidelines for Kata

### Footer Contact Strategy

**Contact information appears in the footer on every page.**

**What Kata Can Edit (via Settings):**

- Contact email
- Instagram URL
- Behance URL (optional)
- Location text
- Any other social links

**Frontend Implementation:**

- Footer is a persistent component
- Pulls data from `settings` table
- Appears on all pages automatically
- No separate contact page needed

**Example Footer:**

```
hello@kata.hu  |  Instagram  |  Budapest
```

This approach:

- ✅ Keeps site minimal
- ✅ Contact always accessible
- ✅ Aligns with gallery philosophy
- ✅ One less page to maintain

---

### Artworks

**Best Practices:**

- Use consistent image sizes (recommend min 1200px width)
- Write category names in lowercase
- Use descriptive titles
- Keep descriptions concise
- Use `order_index` to control masonry flow

**Publishing:**

- Draft = `published: false`
- Live = `published: true`

---

### Projects

**Best Practices:**

- Slug must be URL-friendly (lowercase, hyphens only)
- Never change slug after publishing
- Use cover image that represents the project
- Write narrative descriptions (not just lists)

---

### Categories

**Rules:**

- Keep names short
- Use lowercase
- Be consistent (don't create duplicates)
- Think about filtering logic

---

### Settings

**What to Edit:**

- Intro text for homepage
- Contact information (footer)
- Social media links (footer)
- Location text (footer)

**What NOT to Edit:**

- JSON structure
- Key names
- System values

**Note:** Settings power the footer contact section. Changes here update the footer sitewide instantly.

---

## Technical Notes

### Why Slug-Based Relations?

Instead of foreign keys (`project_id`), we use text slugs (`project_slug`).

**Benefits:**

- Simpler queries in React
- No join complexity
- Easier debugging
- Better for static generation
- Future-proof for migration

**Trade-off:**

- Slug consistency is important
- Must not change slugs after publish

---

### Data Fetching Strategy

**Homepage:**

```javascript
// Load only published artworks
const { data: artworks } = await supabase
  .from("artworks")
  .select("*")
  .eq("published", true)
  .order("order_index");
```

**Project Page:**

```javascript
// Load project + its artworks
const { data: project } = await supabase
  .from("projects")
  .select("*")
  .eq("slug", projectSlug)
  .single();

const { data: artworks } = await supabase
  .from("artworks")
  .select("*")
  .eq("project_slug", projectSlug);
```

---

## Why This Structure Works

### For the Client (Kata):

✅ Independence — no developer needed for content  
✅ Confidence — can't break site structure  
✅ Control — publish/unpublish anytime  
✅ Simple — familiar CMS interface

### For the Developer (You):

✅ Protected — structure can't be damaged  
✅ Maintainable — clear separation of concerns  
✅ Scalable — can add features without breaking content  
✅ Professional — proper boundaries

### For the Website:

✅ Performance — minimal queries, no joins  
✅ Real-time — instant content updates  
✅ Flexible — easy to add new content types  
✅ Safe — RLS protects everything

---

## Design Philosophy Alignment

This CMS structure supports:

- ✅ Masonry grid layout
- ✅ Image-first exploration
- ✅ Minimal UI
- ✅ Gallery-like experience
- ✅ Artwork-first hierarchy
- ✅ Calm, professional tone

**The CMS is invisible.**  
The artwork speaks.

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Status:** Production Ready
