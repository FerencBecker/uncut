# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VÁGATLANUL** - Historical Photography Map Application for the Museum of Ethnography (Néprajzi Múzeum)

A dual-platform solution showcasing historical photography studios and their work through an interactive map interface:
- **Phase 1 (Kiosk)**: Exhibition touchscreen application (Deadline: January 2026, Opening: February 12, 2026)
- **Phase 2 (Web)**: Online platform with CMS (Deadline: July 5, 2026)

## Project Structure

```
docs/
├── specs/           # Original specifications - for scope and requirements understanding
├── prps/            # Product Requirement Prompts - business context and "why"
├── prds/            # Product Requirements Documents - detailed feature definitions
├── architecture/    # Architecture (LIVING) - technical decisions and patterns
├── designs/         # Design specifications - UI/UX details, colors, typography
│   └── {timestamp}/ # Static HTML demos of designs
└── data/            # Example and reference data

backend/             # .NET backend services
frontend/            # React frontend applications
```

**Note:** User stories and tasks are managed as GitHub issues, not files. Use `gh issue list` and `gh issue view <number>` to review them.

## Architecture & Technology Stack

**Source of Truth:** See [Architecture Document](docs/architecture/) for detailed system design, technology decisions, and rationale.

The architecture document is maintained as a living document and updated as part of each task's acceptance criteria.

**Quick Reference:**
- **Frontend**: React + Ant Design (antd)
- **Backend**: .NET 10.0 ASP.NET Core Minimal APIs
- **Phase 1 Database**: SQLite (embedded, offline)
- **Phase 2 Database**: PostgreSQL with MuseumPlus API integration
- **Deployment**: Electron (kiosk), Web (nginx/CDN)
- **Testing**: xUnit + Playwright

## Development Workflow

### When to Consult Which Documents

**Executing a task:**
1. Start with the GitHub issue (`gh issue view <number>`) - contains synthesized requirements and acceptance criteria
2. Implement based on task specifications
3. Only consult upstream documents if clarification needed

**When a task needs clarification:**
1. Check related GitHub issues (stories/parent tasks)
2. For design details: `docs/designs/`
3. For architecture decisions: `docs/architecture/`
4. For business context: `docs/prds/` or `docs/prps/`
5. For data structure examples: `docs/data/`

**When still unclear - ASK THE USER:**
- If documentation is ambiguous or contradictory
- If task requirements are incomplete
- If implementation approach is uncertain
- If you need business/scope clarification
- Always prefer asking over guessing

**Design implementation:**
- Extract timestamp from design filename (format: `design_YYYYMMDD-HHMMSS.md`)
- Reference `docs/designs/{timestamp}/` for static HTML demos
- See `DESIGN_TO_HTML_INSTRUCTIONS.md` for detailed conversion process

### Key Constraints

**Data:**
- Hungarian place names only (no GPS coordinates)
- No locations outside Hungary
- Languages: Hungarian (default) + English
- 70-80 photography studios, ~3000 images

**Hardware:**
- Raspberry Pi 5 (or alternative PC with Fedora Linux) for kiosk
- Offline operation required for Phase 1
- Performance: <2s gallery loading, 60fps animations

**Integration:**
- MuseumPlus API: https://docs.zetcom.com/framework-public/index.html
- One-way sync, rate-limited, circuit breaker pattern

## Development Guidelines

### Coding Principles

**Follow [CODE_STANDARDS.md](CODE_STANDARDS.md) strictly** - these are behavioral guardrails to prevent common AI mistakes:
- **Minimalism first**: Smallest solution that works
- **SRP is foundation**: Single responsibility drives all design decisions
- **Context boundaries**: Independent features, duplication across contexts is acceptable
- **DRY within boundaries only**: Eliminate duplication inside contexts, not across them
- **KISS, YAGNI, SLA**: Keep simple, build only what's needed, single abstraction level
- **No obvious comments**: Code explains WHAT/HOW, comments only explain WHY
- **Client-driven design**: Consumer needs shape APIs, not server convenience
- **Lifecycle-first thinking**: Understand creation/ownership/death before coding

These principles prevent over-engineering, premature abstraction, and unnecessary complexity.

### Documentation Updates

When completing tasks, always update the architecture document (docs/architecture/) with:
- New patterns or architectural decisions
- Component additions or changes
- Integration implementations
- Technology stack changes

This ensures the architecture document remains the living source of truth for the project.

### Commit Messages

**Keep commits brief** - focus on high-level achievements only:
- ✅ "Add backend infrastructure with Docker support"
- ✅ "Improve source control hygiene"
- ❌ No implementation details, no file lists
- One or two sentences maximum describing what was accomplished

### Testing Requirements

- Unit tests: 95% coverage target (xUnit for backend, Jest/RTL for frontend)
- E2E tests: 70% coverage on critical paths (Playwright)
- See `docs/architecture/` for detailed testing strategy

### Design System

All design details (colors, typography, touch targets, etc.) are documented in `docs/designs/`. Always reference the latest design document for UI implementation.
