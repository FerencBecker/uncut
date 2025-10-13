# VÁGATLANUL Design System & Guidelines

**Project:** VÁGATLANUL - Historical Photography Map Application
**Client:** Museum of Ethnography (Néprajzi Múzeum)
**Date:** 2025-10-12
**Version:** 3.0

## Overview

This document defines the design system, component library, page inventory, and guidelines for the VÁGATLANUL application.

## Current Design State (October 2025)

- **Active Design Version:** 20251010-163000
- **Theme System:** Clean museum aesthetic (sepia/brown heritage colors removed)
- **Kiosk:** Dual light/dark theme support
- **Web/CMS:** Single light theme only
- **Color Palette:** Deep charcoal, grays, whites, subtle warm brown accent

---

## 1. Technical Foundation

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Raspberry Pi 5 Chromium (kiosk mode)
- Mobile Safari and Chrome (iOS/Android)

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1919px
- **Kiosk**: 1920px (55-inch touchscreen)

---

## 2. Platform Guidelines

### Kiosk Platform (Museum Installation)
**Purpose**: Casual visitor discovery experience

**Requirements:**
- Touch-optimized interface (64px minimum touch targets for 55-inch displays)
- No keyboard input required
- Screensaver mode (idle timeout)
- Offline operation
- Dual theme support (light/dark mode)
- Simple navigation (no deep menus)
- Auto-return to screensaver after 2-minute timeout

**Features:**
- ✅ Interactive map with studio markers
- ✅ Gallery lightbox viewer
- ✅ Language toggle (Hungarian/English)
- ✅ Studio information panels
- ❌ NO search functionality
- ❌ NO filters
- ❌ NO text input
- ❌ NO CMS access

### Web Platform (Online Research)
**Purpose**: Research, exploration, content management

**Requirements:**
- Full keyboard and mouse support
- Search engine optimization
- Responsive design (mobile to desktop)
- Online operation
- Deep linking support
- User authentication (CMS)

**Features:**
- ✅ Interactive map with studio markers
- ✅ Advanced search with filters
- ✅ Gallery with detailed metadata
- ✅ CMS for content management
- ✅ Contact forms
- ✅ Social sharing
- ✅ Download functionality

---

## 3. Design Guidelines by Area

### A. Navigation
**Principles:**
- Clear information hierarchy
- Consistent navigation patterns
- Breadcrumb trails for deep pages
- Language toggle always visible
- Back buttons on detail pages

**Kiosk Navigation:**
- Large touch targets (64px minimum for 55-inch displays)
- Simple forward/back flow
- No nested menus
- Visual state indicators
- Theme toggle (light/dark mode) on interactive pages
- Language toggle always visible

**Web Navigation:**
- Standard header with menu
- Breadcrumbs for location context
- Sidebar for filters (when applicable)
- Footer with links

### B. Map Interface
**Principles:**
- Map as primary navigation metaphor
- Clear visual hierarchy (pins over map)
- Smooth zoom/pan interactions
- Touch and mouse support

**Features:**
- Studio location markers
- Hover/touch preview panels
- Zoom controls
- Legend (if needed)
- Location highlighting

**Kiosk-Specific:**
- Touch-optimized zoom controls
- No search integration
- Simplified interactions

**Web-Specific:**
- Integrated search bar
- Filter panel overlay
- Advanced zoom controls
- Right-click context menu

### C. Gallery & Lightbox
**Principles:**
- Full-screen immersive viewing
- Easy navigation between photos
- Metadata visibility toggle
- Zoom functionality
- Swipe/arrow key support

**Required Elements:**
- Previous/Next navigation
- Photo counter (e.g., "3 of 24")
- Close button
- Zoom in/out controls
- Metadata panel (toggleable)

**Metadata Display:**
- Photo title
- Date/era
- Studio name
- Technical details
- Identified people
- Location information

### D. Search & Filtering
**Web Only - Not on Kiosk**

**Search Types:**
- **Text Search**: Studio names, photo titles, people, locations
- **Geographic Filter**: By city/region
- **Date Range Filter**: By year or era
- **Studio Filter**: By specific studios
- **Catchment Area Filter**: By origin locations

**Interface:**
- Search bar (always visible in header)
- Advanced filters panel (expandable)
- Tag-based filter chips
- Clear all filters button
- Result count display

### E. Content Management (CMS)
**Web Only - Staff Access**

**Principles:**
- Context-aware forms (reduce redundancy)
- Auto-calculated fields (prevent inconsistency)
- Clear navigation (breadcrumbs)
- Batch operations support
- Preview before publish

**Required Features:**
- User authentication
- Role-based access control
- Draft/publish workflow
- Audit logging
- Data validation

---

## 4. Page Inventory

### Kiosk Pages (Museum Installation)

#### K01 - Screensaver (`K01-screensaver.html`)
- **Purpose**: Attract mode when kiosk is idle
- **Key Elements**:
  - Animated Hungary map with pulsing markers
  - "VÁGATLANUL" title in gold
  - Bilingual subtitle
  - "Touch screen to begin" call-to-action
  - Respects saved theme (light/dark) but no toggle button
  - Auto-displays after 2 minutes of inactivity

#### K03 - Interactive Map (`K03-interactive-map.html`)
- **Purpose**: Fixed map showing 21 highlighted studios (LANDING PAGE)
- **Key Elements**:
  - Interactive Hungary map (non-zoomable)
  - 21 clickable studio markers (64px touch targets)
  - Theme toggle button (☀️/🌙)
  - Language toggle button (🇬🇧/🇭🇺)
  - Hover tooltips with studio names
  - NO search bar
  - NO filter panel
  - Auto-timeout to K01 after 2 minutes

#### K04 - Studio Info Panel (`K04-studio-info-panel.html`)
- **Purpose**: Detailed studio information with side panel
- **Key Elements**:
  - Split layout: Map (left) + Info panel (right, 600px)
  - Studio name, location, historical description
  - Metadata grid (operational years, photographer, technique, image count)
  - Gallery preview (6 thumbnail images)
  - "View Gallery" button → K06
  - Theme toggle, Language toggle, Close button
  - Back to map button
  - Auto-timeout to K01 after 2 minutes

#### K06 - Fullscreen Gallery (`K06-fullscreen-gallery.html`)
- **Purpose**: Full-screen lightbox image viewer
- **Key Elements**:
  - Main image display (centered, large)
  - Thumbnail strip (bottom, scrollable, all 10 photos)
  - Metadata panel (right sidebar, toggleable)
  - Previous/Next navigation arrows
  - Image counter (e.g., "3 / 10")
  - Theme toggle, Language toggle, Close button
  - Keyboard navigation (←/→ arrows, ESC)
  - Touch swipe support
  - Auto-timeout to K01 after 2 minutes

#### K08 - Session Timeout Warning (`K08-session-timeout.html`)
- **Purpose**: Warn user before auto-logout
- **Key Elements**:
  - Corner modal (bottom-right position, NOT center)
  - 90-second countdown timer
  - Progress bar showing remaining time
  - NO "Folytatom" button
  - Click anywhere to dismiss and reset timer
  - Auto-redirect to K01 after countdown
  - Theme-aware styling

### Web Application Pages

#### W01 - Landing Page (`W01-landing-page.html`)
- **Purpose**: Main entry point for web application
- **Key Elements**:
  - Hero section with project title
  - Search interface
  - Featured studios or collections
  - Call-to-action buttons

#### W02 - Interactive Map (`W02-interactive-map.html`)
- **Purpose**: Zoomable map showing all 70-80 studios
- **Key Elements**:
  - Full-screen zoomable map
  - Three-layer map data (studio locations, photo locations, catchment areas)
  - Search bar in header
  - Filter sidebar (expandable)
  - Language toggle

#### W03 - Search Results (`W03-search-results.html`)
- **Purpose**: Display filtered/searched results
- **Key Elements**:
  - Results header with count
  - Active filter tags (removable)
  - Grid view / List view toggle
  - Sort controls
  - Pagination

#### W04 - Advanced Search (`W04-advanced-search.html`)
- **Purpose**: Detailed filtering interface
- **Key Elements**:
  - Multiple filter categories (year range, location, photo type, gender, event type)
  - Search button
  - Clear filters button

#### W05 - Studio Detail (`W05-studio-detail.html`)
- **Purpose**: Comprehensive studio information
- **Key Elements**:
  - Studio name and location
  - Historical description
  - Operational years
  - Photographer information
  - Image gallery preview
  - Link to full gallery

#### W06 - Image Detail (`W06-image-detail.html`)
- **Purpose**: Full-screen image viewer with metadata
- **Key Elements**:
  - Large image display with zoom
  - Metadata panel
  - Navigation arrows (previous/next)
  - Social sharing buttons
  - Contact form link (pre-filled with image context)

#### W08 - Contact Form (`W08-contact-form.html`)
- **Purpose**: User inquiry submission
- **Key Elements**:
  - Name, email, subject fields
  - Message textarea
  - Image reference (if navigating from W06)
  - GDPR consent checkbox

#### W09 - About Project (`W09-about-project.html`)
- **Purpose**: Project information and credits
- **Key Elements**:
  - Project description
  - Museum of Ethnography information
  - Historical context
  - Credits and acknowledgments

### CMS Pages (Web Only - Staff)

#### W10 - CMS Dashboard (`W10-cms-dashboard.html`)
- **Purpose**: Content management overview
- **Key Elements**:
  - Summary cards (total studios, photos, draft items, pending approval)
  - Recent activity feed
  - Quick action buttons
  - Statistics graphs (optional)

#### W11 - Studio Editor (`W11-studio-editor.html`)
- **Purpose**: Edit studio metadata and content
- **Key Elements**:
  - Studio name (HU/EN)
  - Location and address
  - Historical description (WYSIWYG editor)
  - Operational years
  - Photographer information
  - Image gallery management (upload, delete, reorder)
  - Preview, Save draft, Publish buttons

#### W12 - Photo Editor (`W12-photo-editor.html`)
- **Purpose**: Edit photo metadata
- **Key Elements**:
  - Photo preview (left sidebar, sticky)
  - Metadata form (center)
  - **Catchment area** (multi-select cities) - CRITICAL FIELD
  - Title (HU/EN), Description, Date, Location
  - Subject type, Identified people, Tags
  - Actions sidebar (Publish, Request approval, Save draft)

---

## 5. Component Library

### Navigation Components

#### NavHeader
- **Purpose**: Site-wide navigation
- **Elements**: Logo, menu, search, language toggle
- **Variants**: Kiosk (minimal), Web (full)

#### Breadcrumb
- **Purpose**: Location in information architecture
- **Format**: `Home → Section → Subsection → Current`
- **Behavior**: Clickable links, current page not linked

#### BackButton
- **Purpose**: Return to previous page
- **Placement**: Below breadcrumb or top-left
- **Label**: "« Back to [Previous]"

### Map Components

#### InteractiveMap
- **Purpose**: Geographic navigation
- **Features**: Pan, zoom, markers, hover states
- **Props**: `markers[]`, `onMarkerClick`, `showSearch`

#### StudioMarker
- **Purpose**: Location indicator on map
- **Appearance**: Custom icon (camera or pin)
- **States**: Default, hover, active, visited
- **Size**: 60px touch target on kiosk

### Content Display Components

#### StudioCard
- **Purpose**: Studio preview/summary
- **Elements**: Name, location, photo count, era, thumbnail
- **Usage**: Gallery selector, search results, dashboard
- **Variants**: List view, grid view

#### PhotoCard
- **Purpose**: Photo thumbnail with metadata
- **Elements**: Thumbnail, title, date, studio name
- **Usage**: Gallery grid, search results
- **Action**: Click to open lightbox

#### Lightbox
- **Purpose**: Full-screen photo viewing
- **Elements**:
  - Photo display (zoomable)
  - Previous/next navigation
  - Photo counter
  - Metadata panel (toggleable)
  - Close button
- **Controls**: Swipe, arrow keys, click navigation

### Form Components

#### TagInput
- **Purpose**: Enter multiple tags (locations, subjects, etc.)
- **Elements**:
  - Tag chips with × remove button
  - Text input (Enter to add)
  - Suggestions (if applicable)
- **Variants**: Standard, highlighted (catchment area)

#### DynamicList
- **Purpose**: Add/remove list items (e.g., people)
- **Elements**:
  - List items with text input + remove button
  - Add new item button
- **Behavior**: Unlimited items, reorderable

#### ReadOnlyField
- **Purpose**: Display calculated values
- **Appearance**: Gray background, lock icon
- **Elements**: Value display, calculation note
- **Usage**: Photo counts, derived data

#### FormField
- **Standard form inputs**: Text, textarea, number, date
- **Requirements**: Labels, validation, error messages
- **Accessibility**: Proper ARIA labels

### Action Components

#### PrimaryButton
- **Purpose**: Main actions
- **Size**: 48px height (kiosk), 40px (web)
- **Usage**: Submit, Save, Publish

#### SecondaryButton
- **Purpose**: Secondary actions
- **Usage**: Cancel, Back, Delete

#### IconButton
- **Purpose**: Compact actions with icon only
- **Size**: 44px minimum
- **Usage**: Close, zoom, favorite

### Utility Components

#### LoadingSpinner
- **Purpose**: Indicate loading state
- **Variants**: Full-page, inline, overlay

#### ErrorMessage
- **Purpose**: Display errors to user
- **Types**: Inline (form), toast (notification), page (404)

#### Modal
- **Purpose**: Overlay for focused interactions
- **Usage**: Batch edit, confirmations, image preview
- **Elements**: Title, content area, action buttons, close

#### Tooltip
- **Purpose**: Additional information on hover
- **Trigger**: Hover (web), touch-hold (kiosk)
- **Content**: Brief text, no complex UI

---

## 6. Form Guidelines

### Field Types

#### Text Input
- **Usage**: Names, titles, single-line text
- **Validation**: Max length, required
- **Enhancement**: Datalist for suggestions (e.g., cities)

#### Textarea
- **Usage**: Descriptions, multi-line text
- **Validation**: Max length
- **Enhancement**: Character counter, rich text (if needed)

#### Tag Input
- **Usage**: Multiple related values (tags, locations)
- **Behavior**: Type + Enter to add, × to remove
- **Validation**: Duplicate prevention

#### Dynamic List
- **Usage**: Variable number of items (people)
- **Behavior**: Add/remove items
- **Validation**: At least one item (if required)

#### Date Input
- **Usage**: Years, date ranges
- **Format**: YYYY or YYYY-YYYY
- **Validation**: Reasonable date range

#### File Upload
- **Usage**: Photo images
- **Accepted**: JPEG, PNG, TIFF
- **Validation**: File size, dimensions
- **Enhancement**: Drag-and-drop, preview

### Auto-Calculated Fields
- **Display**: Read-only with gray background
- **Calculation Note**: Brief explanation below field
- **Examples**: Photo counts, derived statistics

### Context-Aware Forms
- **Principle**: Don't ask for information already known
- **Example**: Photo editor doesn't ask for studio (known from navigation)
- **Implementation**: Hidden input or derived from context

### Form Validation
- **Client-Side**: Immediate feedback
- **Server-Side**: Final validation before save
- **Error Display**: Inline below field + summary at top
- **Success State**: Visual confirmation after save

---

## 7. Data & Content Guidelines

### Bilingual Support
- **Languages**: Hungarian (primary), English (secondary)
- **Toggle**: Always visible (HU/EN)
- **Storage**: Separate fields for each language
- **Fallback**: Show original language if translation missing

### Photo Metadata Fields

**Required:**
- Title (HU/EN)
- Studio association
- Image file

**Optional but Important:**
- Date/era
- Technical details (plate size, process)
- Description (HU/EN)
- Location where taken
- Catchment area (origin locations)
- Identified people
- Subject tags
- Technical tags

### Studio Metadata Fields

**Required:**
- Studio name (HU/EN)
- City
- Operating dates (approximate)

**Optional but Important:**
- Photographer name(s)
- Historical description (HU/EN)
- Significance
- Related studios

### Catchment Area
- **Definition**: Geographic origins of photo subjects
- **Purpose**: Research value (studio reach analysis)
- **Format**: Tag input (multiple locations)
- **Distinction**: Different from "location where taken"

---

## 8. Accessibility Guidelines

### WCAG 2.1 AA Compliance
- ✅ Color contrast ratios (4.5:1 text, 3:1 UI)
- ✅ Keyboard navigation
- ✅ Screen reader support (ARIA labels)
- ✅ Focus indicators
- ✅ Alternative text for images

### Touch Target Sizing
- **64px**: Kiosk touch targets on 55-inch displays (primary)
- **55px**: Kiosk standard touch targets (1.25x for kiosk)
- **44px**: Minimum acceptable (WCAG 2.1) - standard devices
- **40px**: Dense interfaces (CMS tables, not touch-primary)

**Kiosk Scaling:**
- Standard displays: 44px minimum
- 55-inch displays (≥3840px): All targets scaled 1.25x = 64px minimum

### Visual Accessibility
- High contrast between text and background
- No color-only indicators (use icons + color)
- Readable font sizes (minimum 16px body text)
- Clear focus states for keyboard navigation

### Content Accessibility
- Descriptive link text (not "click here")
- Alt text for all images
- Captions for media
- Clear error messages

---

## 9. Design Principles

### Content First
- Design serves the historical photography content
- Clear information hierarchy
- Minimal decoration that doesn't compete with photos

### Dual Context
- Kiosk = casual discovery (simple, touch-optimized)
- Web = research depth (full features, keyboard/mouse)

### Data Integrity
- Auto-calculated fields prevent inconsistency
- Validation at input time
- Clear error messages

### Workflow Efficiency
- Context-aware forms (no redundancy)
- Batch operations for repetitive tasks
- Clear navigation with breadcrumbs

### Museum Standards
- Professional presentation
- Respectful of historical content
- Aligned with Néprajzi Múzeum identity
- Appropriate for academic/research users

---

## 10. Technical Requirements

### Performance
- Page load < 2 seconds
- Image optimization (responsive images)
- Lazy loading for galleries
- Offline support (kiosk via service worker)

### Security
- HTTPS only
- CMS authentication (JWT or session)
- Input sanitization
- File upload validation
- CSRF protection

### SEO (Web Only)
- Semantic HTML
- Meta tags (title, description)
- Open Graph tags for social sharing
- Sitemap generation
- Structured data for rich results

### Analytics
- Page views tracking
- User interaction events
- Search query logging
- Error logging
- Kiosk usage statistics

---

## 11. Theme System

### Kiosk Application
- **Dual Theme Support:** Light (default) + Dark mode
- **Persistence:** Theme preference saved in localStorage
- **Files:** `styles.css` + `theme-switcher.js`
- **Toggle Location:** Header controls on K03, K04, K06
- **K01 Behavior:** Respects saved theme but has no toggle button

### Web Application
- **Single Theme:** Light museum theme only
- **Files:** `web-light-theme.css`
- **No theme switching**

### CMS Application
- **Single Theme:** Clean museum theme (light only)
- **Files:** `cms-styles.css`
- **No theme switching**

### Color Evolution
- **Previous (Before Oct 2025):** Sepia/brown heritage colors, warm nostalgic aesthetic
- **Current (Oct 2025):** Clean museum palette (white, charcoal, gray, subtle warm brown accent)
- **Rationale:** More contemporary, professional appearance aligned with modern museum standards

---

**Document Status:** Complete
**Reference Implementation:** docs/designs/20251010-163000/
**Last Updated:** 2025-10-12
