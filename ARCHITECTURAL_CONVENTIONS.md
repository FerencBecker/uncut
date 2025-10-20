# Architectural Conventions

Project-specific architectural preferences for VÁGATLANUL. These are not universal rules, but chosen approaches that fit our domain, scale, and development philosophy.

## Development Approach

**Vertical Slice Architecture**
- Build features as complete vertical slices (endpoint → repository → storage → tests)
- Each GitHub issue delivers a working feature, not infrastructure layers
- Repository methods emerge from endpoint requirements
- No separate issues for horizontal infrastructure
- Prevents speculative code built before features need it

## Data Modeling

**Null Object Pattern**
- Non-nullable objects with empty defaults (`new()`) for objects that always exist in the domain model
- Nullable complex objects when JSON schema marks them optional AND absence has clear semantic meaning
- Nullable primitives at leaf level (`int?`, `double?`, `DateTime?`) to represent unknown/absent values
- Never nullable: collections, strings, value objects that always exist
- Rationale: Balance between cleaner navigation (avoid `?.` chains) and domain accuracy (distinguish "absent" from "empty")

**Examples:**
- `Photographer` → Non-nullable (every studio has a photographer, even if details are unknown)
- `OperatingPeriod?` → Nullable (historical records may lack this information entirely)
- `DateTaken?` → Nullable (not all images have date information)
- `StartYear` inside OperatingPeriod → `int?` (the period exists but year is unknown)

## Data Access

**Repository Pattern**
- Business-focused operations (`GetStudiosByCity`), not file operations (`ReadJsonFile`)
- API endpoints express domain intent, not storage mechanics
- Same implementation serves Phase 1 (curated files) and Phase 2 (synced cache)
- Repository handles deserialization, querying, filtering
