# Vágatlanul - Consolidated Design Draft 20251010-163000

## Overview

This consolidated design draft combines the best elements from three previous design iterations:
- **20251010-094330**: Screensaver animations and MUI v5 design patterns
- **20251010-103116**: Chakra UI design system and gallery structure
- **20251010-103731**: Interactive map and modern UI components

## Key Features

### Theme Switching
- **Light/Dark Mode**: Full theme support with CSS variables
- **Persistent State**: Theme preference saved in localStorage
- **Smooth Transitions**: All elements transition smoothly between themes
- **Theme Toggle**: Available on all interactive pages (K03, K04, K06)

### Navigation Flow
```
K01 (Screensaver)
  ↓ [Click anywhere]
K03 (Interactive Map - LANDING PAGE)
  ↓ [Click studio marker]
K04 (Studio Info Panel)
  ↓ [Click "View Gallery"]
K06 (Fullscreen Gallery - MERGED)
  ↓ [Close button]
K04 (Back to Studio Info)
```

### Inactivity Handling
- **2-minute timer**: All pages return to K01 after 2 minutes of inactivity
- **90-second warning**: K08 modal appears 30 seconds before timeout (optional implementation)
- **Any click resets**: All user interactions reset the inactivity timer

## File Structure

### Core Files
- **styles.css**: Unified design system with theme variables
- **theme-switcher.js**: Theme persistence and switching logic

### Kiosk Pages
1. **K01-screensaver.html**
   - Dark background (black/dark grey)
   - Animated Hungary map with pulsing studio markers
   - Click anywhere to go to K03
   - NO theme selector (always dark theme)

2. **K03-interactive-map.html**
   - **LANDING PAGE** (first thing users see when active)
   - Large Hungary map with 21 clickable studio markers
   - Theme selector (☀️/🌙) in header
   - Language selector (🇬🇧/🇭🇺) showing opposite language
   - Hover tooltips for studio names
   - Click marker → K04

3. **K04-studio-info-panel.html**
   - Split view: map + info panel
   - Theme and language selectors in panel header
   - Real Máté Lajos data (bio, metadata, 6 preview images)
   - "View Gallery" button → K06
   - Back button → K03

4. **K06-fullscreen-gallery.html** (MERGED K05+K06+K07)
   - **Bottom**: Horizontal scrollable thumbnail banner (all 10 photos)
   - **Center/Left**: Large main photo display with prev/next arrows
   - **Right Sidebar**: Photo metadata panel (title, description, location, year, type, inventory)
   - Theme and language selectors in header
   - All 10 Máté Lajos photos in correct order
   - Keyboard navigation (arrows, ESC)
   - Touch swipe support
   - Close button → K04

5. **K08-session-timeout.html**
   - Modal in bottom-right corner (NOT center)
   - 90-second countdown with progress bar
   - NO "Folytatom" button
   - Click anywhere (modal or outside) to dismiss
   - Auto-return to K01 after 90 seconds

## Design System

### Color Palette

**Kiosk Application (dual light/dark theme):**
```css
/* Light Theme (Default) */
--bg-color: #FEFCF7              /* Cream background */
--surface-color: #FFFFFF         /* White surfaces */
--text-color: #2D3748            /* Dark text */
--heritage-gold: #D4AF74         /* Gold accent */
--museum-deep-blue: #1B365D      /* Deep blue */

/* Dark Theme */
--bg-color: #1A1A1A              /* Dark background */
--surface-color: #2C2C2C         /* Dark surfaces */
--text-color: #E8E8E8            /* Light text */
--heritage-gold: #D4AF74         /* Gold accent (unchanged) */
--museum-deep-blue: #2B4A7C      /* Lighter blue for dark mode */
```

**Web Application (light theme only):**
```css
--museum-primary: #2B2B2B        /* Deep charcoal */
--museum-secondary: #6B6B6B      /* Medium gray */
--museum-accent: #8B7355         /* Warm brown accent (subtle) */
--bg-primary: #FFFFFF            /* Pure white */
--bg-secondary: #F8F8F8          /* Very light gray */
--text-primary: #2B2B2B          /* Main text */
--text-secondary: #6B6B6B        /* Secondary text */
```

**CMS Application (light theme only):**
- Uses same clean museum palette as web application
- All sepia/brown heritage colors removed
- Clean, professional aesthetic

### Typography
- **Primary Font**: Source Sans Pro
- **Serif Font**: Source Serif Pro
- **Header Font**: Playfair Display
- **UI Font**: Inter

### Touch Targets
- **Standard**: 44px minimum
- **Kiosk**: 64px (55-inch displays)
- **55-inch scaling**: 1.25x all text and elements

## Data Integration

### Image Paths
- **Thumbnails**: `../data/Dombóvár_Máté_Lajos/thumbs/[ID].jpg`
- **Full Images**: `../data/Dombóvár_Máté_Lajos/[ID].jpg`

### Photo Order (10 images)
1. F41074 - Szüreti mulatság (Szakcs)
2. F41159 - Két lány (Dombóvár)
3. F41104 - Férfi (Pári)
4. F41217 - Házaspár (Nagykónyi)
5. F41135 - Fiatalasszony (Kocsola)
6. F41032 - Kettős lakodalom (Dombóvár vidéke)
7. F41085 - Násznép (Kocsola)
8. F41054 - Munkások (Makó)
9. F41063 - Iskolai csoportkép (Nagykónyi)
10. F41175 - Négy portré (Dombóvár)

## Language Support

### Language Toggle Behavior
- Shows **opposite** language with flag emoji
- When Hungarian active: Shows "🇬🇧 English"
- When English active: Shows "🇭🇺 Magyar"
- State persisted in localStorage

### Translation Status
- Currently: Hungarian content only
- Framework ready: All text IDs prepared for i18n
- Next step: Add English translations

## Browser Compatibility

### Tested Features
- CSS Grid and Flexbox
- CSS Variables (theme switching)
- localStorage API
- Touch events
- Keyboard navigation

### Target Platforms
- Electron app (Raspberry Pi 5 / PC with Fedora)
- Modern browsers (Chrome, Firefox, Edge)
- Touch-optimized for kiosk displays

## Implementation Notes

### Theme Switching
1. `theme-switcher.js` loaded on all pages except K01
2. Reads `data-theme` attribute from `<html>` element
3. Persists to `localStorage` key: `theme`
4. Smooth CSS transitions on all themeable properties

### Inactivity Timer
```javascript
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    window.location.href = 'K01-screensaver.html';
  }, 120000); // 2 minutes
}

// Attach to all user events
document.addEventListener('click', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);
document.addEventListener('mousemove', resetInactivityTimer);
```

### Gallery State
- Current photo index stored in `localStorage` key: `currentPhoto`
- Preserves position when navigating back from detail views
- Resets on session restart

## Improvements Over Previous Drafts

### From 20251010-094330
✅ Dark screensaver background (not brown)
✅ Animated map with pulsing markers
✅ Click-to-proceed UX

### From 20251010-103116
✅ Clean Chakra-inspired design system
✅ Merged gallery layout (thumbnails + main + metadata)
✅ Real Máté Lajos data integration

### From 20251010-103731
✅ Interactive map as landing page
✅ Modern header controls
✅ Corner-positioned timeout modal

### Current Features (October 2025)
✅ **Removed all sepia/brown heritage colors** - Clean museum aesthetic
✅ **Kiosk dual theme** - Full light/dark mode switching
✅ **Web light theme** - Clean, professional museum palette
✅ **CMS clean theme** - Removed legacy sepia variables
✅ **CSS cleanup** - Removed 72 lines of unused code from styles.css
✅ **Consistent theming** - Unified color palette across all platforms
✅ **Better touch targets** - 64px for kiosk displays
✅ **Smooth transitions** - Theme switching with CSS transitions
✅ **Comprehensive documentation** - Complete design specification

## Next Steps

1. **Testing**
   - Test on actual Raspberry Pi 5 hardware
   - Verify touch interactions on 55-inch display
   - Test theme persistence across navigation

2. **Translation**
   - Add English translations for all text
   - Implement i18n framework (if needed)

3. **Real Data**
   - Replace placeholder map with actual Hungary SVG
   - Integrate all 21 studios with correct locations
   - Add remaining 182 Máté Lajos photos

4. **Performance**
   - Optimize image loading (lazy load thumbnails)
   - Test animation performance on Pi hardware
   - Implement progressive image loading

5. **Accessibility**
   - Add ARIA labels to all interactive elements
   - Test keyboard navigation flows
   - Verify color contrast ratios (WCAG 2.1 AA)

## Credits

Design consolidated from previous drafts by Ferenc
Date: 2025-10-10 16:30:00
Project: VÁGATLANUL - Museum of Ethnography (Néprajzi Múzeum)
