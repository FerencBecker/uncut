# VÁGATLANUL - Project Details

Historical Photography Map Application for Museum of Ethnography (Néprajzi Múzeum)

## Phases

- **Phase 1 (Kiosk)**: Exhibition touchscreen (Deadline: Jan 2026, Opening: Feb 12, 2026)
- **Phase 2 (Web)**: Online platform with CMS (Deadline: July 5, 2026)

## Tech Stack

- **Frontend**: React + Ant Design (antd)
- **Backend**: .NET 10.0 ASP.NET Core Minimal APIs
- **Phase 1 Database**: SQLite (embedded, offline)
- **Phase 2 Database**: PostgreSQL with MuseumPlus API integration
- **Deployment**: Electron (kiosk), Web (nginx/CDN)
- **Testing**: xUnit (backend), Jest+RTL (frontend), Playwright (E2E)

## Domain Constraints

- Hungarian place names only, no GPS coordinates
- No locations outside Hungary
- Languages: Hungarian (default) + English
- 70-80 photography studios, ~3000 images
- Raspberry Pi 5 (or alternative PC with Fedora Linux) for kiosk
- Offline operation required for Phase 1
- Performance: <2s gallery loading, 60fps animations
- MuseumPlus API integration (one-way sync, rate-limited, circuit breaker pattern)

## Project Structure

```
docs/
├── specs/           # Original specifications
├── prps/            # Product Requirement Prompts
├── prds/            # Product Requirements Documents
├── architecture/    # Architecture decisions (LIVING)
├── designs/         # UI/UX specifications
│   └── {timestamp}/ # Static HTML demos
└── data/            # Example and reference data

backend/             # .NET backend services
frontend/            # React frontend applications
```

## Testing Targets

- Unit tests: 95% coverage
- E2E tests: 70% coverage on critical paths
- See `docs/architecture/` for detailed strategy
