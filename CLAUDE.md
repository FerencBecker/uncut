# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VÁGATLANUL** - Historical Photography Map Application for the Museum of Ethnography (Néprajzi Múzeum)

A dual-platform solution showcasing historical photography studios and their work through an interactive map interface:
- **Phase 1 (Kiosk)**: Exhibition touchscreen application (Deadline: January 2026, Opening: February 12, 2026)
- **Phase 2 (Web)**: Online platform with CMS (Deadline: July 5, 2026)

## Technology Stack

### Frontend
- **Framework**: React with Ant Design (antd) component library
- **Animation Libraries**: Framer Motion, React Spring, Lottie-React
- **State Management**: Context/Store (TBD)
- **Build Tool**: (TBD - Vite/Webpack)
- **Typography**: Inter font family with Hungarian character support

### Backend
- **Runtime**: Node.js with Express.js API server
- **Phase 1 Database**: SQLite (embedded, offline)
- **Phase 2 Database**: PostgreSQL with MuseumPlus API integration
- **Image Processing**: Sharp.js for multi-resolution pipeline

### Platform-Specific
- **Kiosk Deployment**: Electron app packaged for Raspberry Pi 5 (Debian Linux) or alternative PC (Fedora Linux)
- **Web Deployment**: Responsive web application with nginx/CDN for image serving

### Testing
- **Unit Testing**: Jest with React Testing Library (95% coverage target)
- **E2E Testing**: Playwright (70% coverage on critical paths)
- **CI/CD**: GitHub Actions

## Architecture

### Layered Monolithic Pattern
- Shared React component library (80% code reuse between platforms)
- Platform-specific data adapters:
  - Kiosk: SQLite adapter with local image files
  - Web: REST API adapter connecting to Express/PostgreSQL

### Key Architectural Decisions
1. **Electron for kiosk**: Enables React code reuse, handles touch events, supports auto-restart and daily reboots
2. **PostgreSQL with scheduled MuseumPlus sync**: Handles complex search queries, rate-limited API integration
3. **Multi-resolution image pipeline**: Generates thumbnails/medium/zoom versions during preparation
4. **Shared component library**: Maximizes code reuse, ensures consistent UX across platforms

### Data Flow
```
Phase 1 (Kiosk):           Phase 2 (Web):
[React/Electron App] -----> [React Web App] -> [Express API] -> [PostgreSQL]
       |                         |                    |              |
   [SQLite DB]              [Responsive UI]    [Image Server]  [MuseumPlus Sync]
       |                                            |              |
  [Local Images]                              [nginx/CDN]    [CMS Backend]
```

## Project Structure

```
docs/
├── specs/               # Project specifications and requirements
│   ├── ajanlat-keres.md           # Main specification (Hungarian)
│   ├── Q&A.txt                    # Client Q&A
│   └── Vagatlanul_Terkepes_alkalmazas_2025_10_01.xlsx
├── prps/                # Product Requirement Prompts
│   └── prp_20251008-084457.md     # Latest PRP
├── prds/                # Product Requirements Documents
│   └── prd_20251007-153749.md     # Latest PRD
├── architecture/        # Architecture documents
│   └── architecture_20251007-154258.md  # Current architecture
└── designs/             # Design specifications
    └── design_20251008-093219.md  # Latest approved design

DESIGN_TO_HTML_INSTRUCTIONS.md  # Instructions for converting designs to HTML/CSS
```

## Development Workflow

### Working with Documentation
- **Requirements**: Start with `docs/specs/ajanlat-keres.md` for full specification
- **Architecture**: Reference `docs/architecture/architecture_20251007-154258.md`
- **Design System**: Use `docs/designs/design_20251008-093219.md` for approved UI/UX specifications
- **PRP Context**: Review `docs/prps/prp_20251008-084457.md` for business context

### Design to Implementation
When implementing designs from `docs/designs/`:
1. Extract timestamp from design filename (format: `design_YYYYMMDD-HHMMSS.md`)
2. Create folder structure: `{timestamp}/` with HTML files
3. Reference PRP, PRD, and architecture documents for context
4. Follow component library specifications (Ant Design)
5. Implement exact color palette and typography from design doc
6. See `DESIGN_TO_HTML_INSTRUCTIONS.md` for detailed process

### Data Management
- **Data Source Phase 1**: Excel tables → SQLite database + local image files
- **Data Source Phase 2**: MuseumPlus API (https://docs.zetcom.com/framework-public/index.html)
- **Content**: 70-80 photography studios, ~3000 images (continuous upload)
- **Locations**: Hungarian place names only (no GPS coordinates, no locations outside Hungary)
- **Languages**: Hungarian (default) + English

### Image Pipeline
- Generate multiple resolutions during preparation (not runtime):
  - Thumbnails for gallery views
  - Medium resolution for detail views
  - High resolution for zoom functionality
- Optimize for Raspberry Pi 5 performance

## Key Features

### Phase 1 (Kiosk)
- Screensaver with animated Hungary map
- Language selection (Hungarian/English)
- Fixed non-zoomable map with 21 highlighted studios
- Full-screen lightbox gallery (10-20 photos per studio)
- Touch-optimized interface (44px minimum touch targets)
- Auto-restart and offline operation
- **No internet or database connection required**

### Phase 2 (Web)
- Responsive design (mobile, desktop, 55-inch museum touchscreen)
- Zoomable interactive map (all 70-80 studios)
- Three-layer map data: studio location, photo location, catchment area
- Search and filtering (3-6 filters: gender, group/individual, year range, location, photographer)
- Frontend data filtering on pre-fetched records
- Minimal CMS (WYSIWYG editor, image upload/sequencing, preview, publish)
- MuseumPlus API integration
- Google Analytics 4 with GDPR cookie consent
- Social sharing (Facebook, link copy)
- Contact form with pre-filled image context
- Static pages (about, impressum, privacy policy)

## Design System

### Color Palette
- **Heritage Blue (#1F4A8C)**: Primary interactive elements
- **Warm Copper (#B87333)**: Secondary accent, CTAs
- **Museum Gray (#F5F5F5)**: Backgrounds
- **Deep Charcoal (#2C2C2C)**: Primary text
- **Success Green (#52C41A)**: Confirmations
- **Warning Amber (#FAAD14)**: Attention states
- **Error Red (#FF4D4F)**: Error states

### Typography Scale
- H1 Display: 32px/40px
- H2 Section: 24px/32px
- H3 Subsection: 20px/28px
- H4 Content: 18px/26px
- Body Large: 16px/24px
- Body Regular: 14px/22px
- Caption: 12px/18px
- **55-inch displays**: 1.25x typography multiplication

### Touch Interface
- Standard devices: 44px minimum touch targets
- 55-inch museum displays: 64px minimum touch targets
- Gesture support: swipe, pinch-to-zoom, tap with visual feedback

## Performance Targets

- Kiosk gallery loading: <2 seconds
- Web page loads: <3 seconds
- Animation framerate: 60fps on Raspberry Pi 5
- Pre-indexed SQLite queries
- nginx caching for web platform
- Progressive image loading

## Testing Strategy

### Unit Tests
- Jest with React Testing Library
- 95% coverage target on component logic, data adapters, MuseumPlus integration

### E2E Tests
- Playwright for user journey validation
- 70% coverage on critical paths:
  - Map interaction
  - Gallery viewing
  - Search functionality
  - CMS publishing workflow

### Test Organization
- Feature slice testing within frontend/backend boundaries
- API mocking at MuseumPlus integration layer
- CI/CD with GitHub Actions
- Automated testing on Pi hardware simulation

## Important Constraints

### System Boundaries
- Content creation in MuseumPlus (presentation layer only)
- No source record editing
- No complex workflow beyond preview/publish

### Growth Assumptions
- 70-80 studios with 3000+ images initially
- 50 concurrent web users peak
- Architecture supports 10x growth

### Hardware Constraints
- Raspberry Pi 5 limitations (or alternative PC with Fedora Linux)
- Offline exhibition operation required
- Annual maintenance budget: 2-3 hours/month (can be pooled annually)
- Full HD touchscreen provided by museum

### Support Timeline
- Intensive support until July 12, 2026
- Ongoing web platform support after launch
- 2-3 hours/month maintenance budget (poolable annually)

## CMS Decision Point

Two options for content management (both should be priced):
1. **MuseumPlus CMS Extension**: Develop content editing functionality within MuseumPlus
2. **Separate Frontend CMS**: WYSIWYG editor (likely simpler)

Both must support:
- Text editing
- Image upload/delete/sequencing
- Undo functionality
- Preview before publish
- Single combined role (editor + publisher)
- Unlimited simultaneous access

## Integration Notes

### MuseumPlus API
- Documentation: https://docs.zetcom.com/framework-public/index.html
- One-way data flow with scheduled incremental sync
- Circuit breaker pattern with exponential backoff retry
- Rate-limited integration
- Conflict resolution favors MuseumPlus as source

### Analytics
- Google Analytics 4
- Cookie consent management (GDPR compliant)
- Usage insights for both kiosk and web

### Accessibility
- WCAG 2.1 AA compliance required
- Screen reader compatibility
- Keyboard navigation support
- High contrast color combinations
- Alternative text for images and icons

## Cultural Context

### Hungarian Folk Pattern Integration
- Traditional textile-inspired loading states
- Photography darkroom development fades
- Aperture reveal effects
- Sequential studio highlighting showing historical timeline

### Museum Requirements
- Professional, institutional design language
- Culturally appropriate for diverse museum visitors
- Educational and research value emphasis
- No locations outside Hungary
- Hungarian place names (no GPS coordinates provided)
