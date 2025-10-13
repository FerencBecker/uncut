# VÁGATLANUL - Theme Guide

## Current Theme System (October 2025)

All sepia/brown heritage colors have been removed. The application now uses clean, professional museum aesthetics across all platforms.

---

## Color Palette by Platform

### Web Application (`web-light-theme.css`)
**Single light theme only**

- **Primary**: Deep Charcoal (#2B2B2B) - Headers
- **Secondary**: Medium Gray (#6B6B6B) - Body text
- **Accent**: Warm Brown (#8B7355) - Subtle heritage reference
- **Background**: Pure White (#FFFFFF) / Very Light Gray (#F8F8F8)
- **Text**: High contrast black/gray

**Status Colors:**
- Success: #2F855A (Muted green)
- Warning: #C05621 (Muted orange)
- Error: #9B2C2C (Muted red)
- Info: #2C5282 (Muted blue)

### CMS Application (`cms-styles.css`)
**Single light theme only**

- Uses same clean museum palette as web application
- All legacy sepia variables removed
- Direct references to museum theme colors
- Clean, professional aesthetic for content management

### Kiosk Application (`styles.css`)
**Dual light/dark theme system**

**Light Theme (Default):**
- Background: #FEFCF7 (Cream)
- Surface: #FFFFFF (White)
- Text: #2D3748 (Dark charcoal)
- Gold Accent: #D4AF74
- Blue Accent: #1B365D

**Dark Theme:**
- Background: #1A1A1A (Dark gray)
- Surface: #2C2C2C (Medium gray)
- Text: #E8E8E8 (Light gray)
- Gold Accent: #D4AF74 (unchanged)
- Blue Accent: #2B4A7C (lighter for dark mode)

---

## Theme Evolution

### Previous State (Before October 2025)
- ❌ Sepia/brown "heritage" color scheme
- ❌ Warm, nostalgic aesthetic
- ❌ Inconsistent theming across platforms

### Current State (October 2025)
- ✅ Clean museum aesthetic
- ✅ Contemporary, professional design
- ✅ Unified color palette across all platforms
- ✅ High contrast for better accessibility
- ✅ Kiosk dual theme support (light/dark)

---

## How to Apply the Light Theme

### Option 1: Replace CSS File (Quick Switch)
In any web page HTML file, change line 6:

```html
<!-- FROM: -->
<link rel="stylesheet" href="styles.css">

<!-- TO: -->
<link rel="stylesheet" href="web-light-theme.css">
```

### Option 2: Use Both (Cascading Override)
Load both files to keep structure but override colors:

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="web-light-theme.css">
```

### Option 3: Conditional Loading
Use different themes for different sections:

```html
<!-- For public web pages (W01-W09): -->
<link rel="stylesheet" href="web-light-theme.css">

<!-- For kiosk pages (K01-K08): -->
<link rel="stylesheet" href="styles.css">

<!-- For CMS pages (W10-W12): -->
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="cms-styles.css">
```

---

## CSS Variables Reference

### Colors

#### Backgrounds
```css
--bg-primary: #FFFFFF           /* Pure white */
--bg-secondary: #F8F8F8         /* Very light gray */
--bg-tertiary: #F0F0F0          /* Light gray */
```

#### Text
```css
--text-primary: #2B2B2B         /* Main text */
--text-secondary: #6B6B6B       /* Secondary text */
--text-muted: #999999           /* Captions, hints */
```

#### Accents
```css
--museum-primary: #2B2B2B       /* Deep charcoal */
--museum-accent: #8B7355        /* Warm brown */
--museum-accent-light: #C4A882  /* Light warm tone */
```

#### Borders
```css
--border-light: #E5E5E5
--border-medium: #D0D0D0
--border-dark: #B0B0B0
```

#### Status Colors (Muted & Professional)
```css
--success: #2F855A              /* Muted green */
--warning: #C05621              /* Muted orange */
--error: #9B2C2C                /* Muted red */
--info: #2C5282                 /* Muted blue */
```

### Typography
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...
--font-serif: Georgia, 'Times New Roman', serif
--font-mono: 'Courier New', Courier, monospace
```

### Spacing
```css
--space-xs: 0.25rem    (4px)
--space-sm: 0.5rem     (8px)
--space-md: 1rem       (16px)
--space-lg: 1.5rem     (24px)
--space-xl: 2rem       (32px)
--space-2xl: 3rem      (48px)
--space-3xl: 4rem      (64px)
```

### Shadows (Subtle & Refined)
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.06)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.05)
```

---

## Component Classes

### Buttons
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-accent">Accent Action</button>
```

### Cards
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <p>Card content...</p>
</div>
```

### Forms
```html
<div class="form-group">
  <label class="form-label">Label</label>
  <input type="text" class="form-input" placeholder="Input">
  <span class="form-hint">Helper text</span>
</div>
```

### Navigation
```html
<nav class="nav">
  <a href="#" class="nav-link">Link</a>
  <a href="#" class="nav-link active">Active Link</a>
</nav>
```

### Status Badges
```html
<span class="status-badge status-published">Published</span>
<span class="status-badge status-draft">Draft</span>
<span class="status-badge status-pending">Pending</span>
```

---

## Accessibility Features

The light theme includes:
- ✅ High contrast text (WCAG AA compliant)
- ✅ Focus rings on all interactive elements
- ✅ Skip links for screen readers
- ✅ Minimum 44px touch targets
- ✅ Semantic HTML support
- ✅ Print-friendly styles

---

## Responsive Breakpoints

```css
@media (max-width: 768px) {
  /* Mobile adjustments */
  /* Spacing reduced */
  /* Typography scaled down */
  /* Navigation stacks vertically */
}
```

---

## Current Implementation Status

### Web Pages (W01-W09)
✅ **Using:** `web-light-theme.css`
✅ **Theme:** Single light theme only
✅ **Colors:** Clean museum palette (white, charcoal, subtle brown accent)
✅ **Status:** Finalized and implemented

### CMS Pages (W10-W12)
✅ **Using:** `cms-styles.css` + `web-light-theme.css`
✅ **Theme:** Single light theme only
✅ **Colors:** Clean museum palette (sepia variables removed)
✅ **Status:** Finalized and cleaned up

### Kiosk Pages (K01-K08)
✅ **Using:** `styles.css` + `theme-switcher.js`
✅ **Theme:** Dual light/dark mode
✅ **Colors:** Cream/white for light, dark gray for dark
✅ **Status:** Finalized with working theme toggle

---

## CSS File Usage

### web-light-theme.css
- **Purpose:** Professional, clean museum aesthetic for public web pages
- **Used by:** W01-W09 (web application pages)
- **Features:**
  - High contrast text
  - Pure white/light gray backgrounds
  - Muted status colors
  - System font stack (fast loading)
  - Comprehensive component library
  - WCAG 2.1 AA compliant

### cms-styles.css
- **Purpose:** Clean styling for content management interface
- **Used by:** W10-W12 (CMS pages)
- **Features:**
  - References web-light-theme variables
  - Form-focused components
  - Status badges for workflow states
  - Legacy sepia variables removed (Oct 2025)

### styles.css
- **Purpose:** Dual theme support for kiosk touchscreen
- **Used by:** K01-K08 (kiosk pages)
- **Features:**
  - Light and dark theme CSS variables
  - Theme-aware color switching
  - Touch-optimized (64px targets)
  - Smooth theme transitions
  - Minimal footprint (57 lines after cleanup)

---

## Customization Examples

### Custom Accent Color
Want to use the Museum's brand color?

```css
:root {
  --museum-accent: #YOUR_BRAND_COLOR;
  --museum-accent-light: #LIGHTER_VERSION;
}
```

### Custom Font
Use a specific museum font:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-primary: 'Your Font', -apple-system, sans-serif;
}
```

---

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

Uses modern CSS features:
- CSS Custom Properties (variables)
- Flexbox & Grid
- Modern box model

---

## Performance Notes

The light theme is optimized for:
- **Fast loading**: Uses system fonts (no web font downloads)
- **Small file size**: ~8KB compressed
- **Efficient rendering**: Minimal shadow/gradient usage
- **Print-friendly**: Specific print styles included

---

## Questions?

Refer to:
- `web-light-theme.css` - Full source code with comments
- `styles.css` - Original heritage theme
- `cms-styles.css` - CMS-specific styles

---

**Created**: 2025-10-10
**Version**: 1.0
**Project**: VÁGATLANUL - Museum of Ethnography
