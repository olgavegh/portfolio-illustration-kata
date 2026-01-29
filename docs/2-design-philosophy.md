# Design System & Philosophy

## Illustrating Portfolio Website

---

## 1. Design Philosophy

The website functions as a **digital exhibition space**. It is not a marketing website and not an agency portfolio. The interface must remain quiet so the artwork can speak.

### Core Values:

- Minimal
- Calm
- Professional
- Gallery-like
- Contemporary
- Artwork-first

> **The UI should feel almost invisible.**  
> If users notice the interface more than the artwork, the design has failed.

---

## 2. Visual References

### Approved Inspiration Sources:

- https://spencergabor.com/
- https://www.danieltriendl.com/
- https://www.stevewolf.co/

### Shared Characteristics:

- Generous negative space
- Restrained typography
- Image-driven layouts
- Editorial rhythm
- Modern art portfolio feeling

**Note:** These references inform tone and restraint, not layout imitation.

---

## 3. Layout System

### Core Structure

The entire website is built around a **masonry grid system**.

#### Grid Properties:

- Mixed image ratios are intentional
- Asymmetry is allowed
- Rhythm should feel organic
- Grid must never feel rigid or mechanical

#### Responsive Columns:

| Screen | Columns |
|--------|---------|
| Mobile | 2 |
| Tablet (md: 768px) | 3 |
| Desktop (lg: 1024px) | 4 |
| Large (xl: 1280px) | 5 |

> The masonry layout is a defining characteristic of the site.

### Page Rhythm

- Light pages
- Few sections per page
- Preference for overlays instead of long vertical scrolling
- Content should feel curated, not accumulated

**Less page equals more focus.**

### Artwork Overlay

The overlay presents a centered artwork card on a semi-transparent blurred backdrop, with adjacent artworks peeking from the sides to hint at horizontal browsing.

Users can navigate between artworks using arrow buttons (desktop), keyboard arrows, mouse wheel scrolling, or touch swipes, with Escape or backdrop click to close.

#### Navigation:

| Method | Availability |
|--------|--------------|
| Arrow buttons | Desktop only (hidden on mobile) |
| Swipe gesture | All platforms (touch screens) |
| Keyboard | ESC (close), ← → (navigate) |

#### Content:

- Large artwork image (centered)
- Title + year below image
- "View Project" button (if linked to project)
- Close button (top right)

---

## 4. Breakpoints

The system supports three responsive sizes:

- Mobile
- Tablet
- Desktop

**No additional breakpoint logic should be introduced unless absolutely necessary.**

---

## 5. Typography

### Approved Font Families:

```css
--font-sans: "Bricolage Grotesque", sans-serif;
--font-serif: "Bitter", serif;
```

### Usage Rules:

- **Serif font** is used for expressive, artistic, or narrative content
- **Sans-serif font** is used for UI, navigation, metadata, and labels
- Typography should feel human and warm
- Avoid sharp, technical, or corporate feeling

> Typography must support reading and mood — never dominate layout.

---

## 6. Color System

### Design Tone:

- Minimalist
- Professional
- Neutral
- Subdued
- Artwork-focused

**Color must never compete with images.**

### Primary Accent Color:

```
#7E85F2
```

---

## 7. Motion & Animation Principles

Motion exists to support orientation and subtle feedback.  
**It must never distract from the artwork.**

### General Rules:

- ❌ No dramatic transitions
- ❌ No parallax
- ❌ No heavy motion curves
- ❌ Avoid animation stacking

### Preferred Motion Types:

- ✅ Opacity fade
- ✅ Slight translate
- ✅ Short duration
- ✅ Soft easing

### Icons

Icons may include playful micro-animations.

**Reason:**  
The client is an illustrator — subtle personality is welcome at micro-level.

**Rules:**

- Playful, but controlled
- Short duration
- Loop only on interaction
- Never continuous distraction

---

## 8. What Must Never Change

The following decisions are **locked**:

1. ✓ Masonry grid as primary layout
2. ✓ Minimalist gallery tone
3. ✓ Restrained UI
4. ✓ Fixed typography system
5. ✓ Neutral color dominance
6. ✓ Subtle motion only
7. ✓ Artwork-first philosophy

> Any change to these principles requires explicit redesign approval.

---

## 9. Design Intent Summary

### This website should feel like:

- Walking into a quiet gallery
- Observing objects in space
- Slowing down
- Focusing on material and form

---

> **The design should never shout.**  
> **It should whisper.**

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Purpose:** Design System Guidelines for Development Team
