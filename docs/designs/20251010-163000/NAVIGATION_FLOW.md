# Navigation Flow Diagram

## Page Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     K01-screensaver.html                        │
│                                                                 │
│  • Dark background (black/dark grey)                           │
│  • Animated Hungary map with pulsing markers                   │
│  • "Vágatlanul" title in gold                                  │
│  • "Touch screen to begin" call-to-action                      │
│  • NO theme selector (respects saved theme from other pages)   │
│  • Auto-displays after 2 minutes of inactivity                 │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ [Click anywhere]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              K03-interactive-map.html (LANDING PAGE)            │
│                                                                 │
│  Header:                                                        │
│    • Title: "VÁGATLANUL"                                       │
│    • Subtitle: "Magyar Fotóműtermek Interaktív Térképe"       │
│    • Theme Toggle: ☀️/🌙 (Light/Dark)                          │
│    • Language Toggle: 🇬🇧/🇭🇺 (Shows opposite language)       │
│                                                                 │
│  Map Area:                                                      │
│    • Large Hungary map                                         │
│    • 21 clickable studio markers (pulsing animation)           │
│    • Hover tooltips with studio names                          │
│    • Legend showing marker types                               │
│                                                                 │
│  Features:                                                      │
│    • 2-minute inactivity timer → K01                          │
│    • Click studio marker → K04 with that studio               │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ [Click studio marker #7: Máté Lajos]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              K04-studio-info-panel.html                         │
│                                                                 │
│  Layout: Split view (Map left | Info panel right)              │
│                                                                 │
│  Left Side (Map):                                               │
│    • Map with selected studio highlighted                      │
│    • Back to Map button → K03                                  │
│                                                                 │
│  Right Side (Info Panel):                                       │
│    Header:                                                      │
│      • Studio name: "Máté Lajos"                              │
│      • Location: "Dombóvár, Esterházy utca 7."                │
│      • Theme toggle ☀️/🌙                                       │
│      • Language toggle 🇬🇧/🇭🇺                                 │
│      • Close button → K03                                      │
│                                                                 │
│    Content:                                                     │
│      • Biography (3 paragraphs)                                │
│      • Metadata grid (4 items):                                │
│        - Működési időszak: 1921-1937                           │
│        - Fotográfus: Máté Lajos                                │
│        - Szakosodás: Üvegnegatív                               │
│        - Képek száma: 192 üvegnegatív                          │
│      • Gallery preview (6 thumbnail images)                     │
│      • "Galéria megtekintése (10 kép)" button → K06           │
│                                                                 │
│  Features:                                                      │
│    • 2-minute inactivity timer → K01                          │
│    • Scrollable content                                        │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ [Click "Galéria megtekintése"]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│         K06-fullscreen-gallery.html (MERGED GALLERY)            │
│                                                                 │
│  Header:                                                        │
│    • Title: "Máté Lajos Képgaléria"                           │
│    • Subtitle: "Dombóvár, 1921-1937"                          │
│    • Theme toggle ☀️/🌙                                         │
│    • Language toggle 🇬🇧/🇭🇺                                   │
│    • Close button × → K04                                      │
│                                                                 │
│  Main Content Area (3-panel layout):                           │
│    ┌───────────────────────────┬──────────────────────┐       │
│    │                           │                      │       │
│    │   CENTER/LEFT PANEL       │   RIGHT SIDEBAR      │       │
│    │   (Main Image Display)    │   (Metadata Panel)   │       │
│    │                           │                      │       │
│    │  • Large main photo       │  • Photo title       │       │
│    │  • Prev/Next arrows (◄/►) │  • Description       │       │
│    │  • Image counter (1/10)   │  • Location          │       │
│    │  • Navigation arrows      │  • Year              │       │
│    │                           │  • Photographer      │       │
│    │                           │  • Type              │       │
│    │                           │  • Inventory number  │       │
│    │                           │  • (Scrollable)      │       │
│    │                           │                      │       │
│    └───────────────────────────┴──────────────────────┘       │
│                                                                 │
│  Bottom Panel:                                                  │
│    • Horizontal scrollable thumbnail banner                     │
│    • All 10 photos visible                                     │
│    • Click thumbnail → Update main image + metadata            │
│    • Active thumbnail highlighted with blue border             │
│                                                                 │
│  10 Photos (in order):                                         │
│    1. F41074 - Szüreti mulatság (Szakcs)                      │
│    2. F41159 - Két lány (Dombóvár)                            │
│    3. F41104 - Férfi (Pári)                                   │
│    4. F41217 - Házaspár (Nagykónyi)                           │
│    5. F41135 - Fiatalasszony (Kocsola)                        │
│    6. F41032 - Kettős lakodalom (Dombóvár vidéke)             │
│    7. F41085 - Násznép (Kocsola)                              │
│    8. F41054 - Munkások (Makó)                                │
│    9. F41063 - Iskolai csoportkép (Nagykónyi)                 │
│   10. F41175 - Négy portré (Dombóvár)                         │
│                                                                 │
│  Features:                                                      │
│    • Keyboard navigation: ←/→ arrows, ESC to close            │
│    • Touch swipe: Left/right gestures                          │
│    • 2-minute inactivity timer → K01                          │
│    • Current photo saved in localStorage                       │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ [Click Close button]
                         │
                         ▼
              Back to K04-studio-info-panel.html

═══════════════════════════════════════════════════════════════════

                    K08-session-timeout.html
                    (Timeout Warning Modal)

  This is NOT a separate page in the flow, but a modal that
  appears as an overlay after 90 seconds of inactivity warning:

  ┌────────────────────────────────────────────────────────┐
  │  [Current page content dimmed in background]           │
  │                                                         │
  │                                   ┌──────────────────┐ │
  │                                   │   ⏱️ Modal      │ │
  │                                   │                  │ │
  │                                   │  Még itt van?   │ │
  │                                   │                  │ │
  │                                   │      90         │ │
  │                                   │                  │ │
  │                                   │  Click anywhere │ │
  │                                   │  to continue    │ │
  │                                   │                  │ │
  │                                   │  [Progress bar] │ │
  │                                   └──────────────────┘ │
  │                                   Bottom-right corner  │
  └────────────────────────────────────────────────────────┘

  Modal Behavior:
    • Appears in BOTTOM-RIGHT corner (not center)
    • Shows 90-second countdown
    • NO "Folytatom" button needed
    • Click ANYWHERE (modal or outside) → Dismisses and resets timer
    • After 90 seconds with no interaction → Redirect to K01
    • Progress bar animates from full to empty over 90 seconds

═══════════════════════════════════════════════════════════════════
```

## User Interaction Patterns

### Theme Switching
```
Light Mode (Default)
  ↕ Click ☀️/🌙 button
Dark Mode (Persisted in localStorage)
```

### Language Switching
```
Magyar (Default) → Shows: 🇬🇧 English
  ↕ Click language button
English → Shows: 🇭🇺 Magyar
```

### Inactivity Timer
```
User Active
  ↓ [2 minutes of no activity]
Show K08 modal (90 second warning)
  ↓ [Click anywhere → Reset and continue]
  OR
  ↓ [90 seconds with no click]
Return to K01 Screensaver
```

## File Dependencies

```
All Pages
├── styles.css (theme variables and base styles)
└── theme-switcher.js (theme persistence)

K01-screensaver.html
├── styles.css (minimal dependency, mostly inline styles)
└── theme-switcher.js (respects saved theme, no toggle button)

K03-interactive-map.html
├── styles.css
└── theme-switcher.js

K04-studio-info-panel.html
├── styles.css
└── theme-switcher.js

K06-fullscreen-gallery.html
├── styles.css
├── theme-switcher.js
└── Photo data array (inline JavaScript)

K08-session-timeout.html
├── styles.css
└── theme-switcher.js
```

## State Management

### localStorage Keys
- `theme`: 'light' | 'dark'
- `selectedLanguage`: 'hu' | 'en'
- `currentPhoto`: 1-10 (gallery position)

### Session Flow
```
1. User touches K01 screensaver
2. Navigate to K03 (interactive map)
3. User explores, theme/language preferences saved
4. Navigate through K04 → K06
5. All preferences persist across navigation
6. After 2 minutes idle → Back to K01
7. Touch K01 again → Preferences still remembered
```

## Responsive Behavior

### Standard Display (1920x1080)
- Touch targets: 64px minimum
- Font sizes: Base 16px scale

### 55-inch Display (3840x2160)
- Touch targets: 80px (1.25x)
- Font sizes: 1.25x base scale
- Media query: `@media (min-width: 3840px)`

## Accessibility Features

- **Keyboard Navigation**: Arrow keys, ESC
- **Touch Gestures**: Tap, swipe left/right
- **Visual Feedback**: Hover states, active states
- **Color Contrast**: Both light and dark themes meet WCAG 2.1 AA
- **Focus Indicators**: All interactive elements
- **ARIA Labels**: All buttons have aria-label or title attributes
