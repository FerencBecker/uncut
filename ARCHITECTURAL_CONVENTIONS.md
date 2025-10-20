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
- Non-nullable objects with empty defaults (`new()`)
- Nullable primitives at leaf level (`int?`, `double?`, `DateTime?`)
- Never nullable: complex objects, collections, strings, value objects
- Rationale: No cascading null checks, cleaner navigation, domain accuracy

## Data Access

**Repository Pattern**
- Business-focused operations (`GetStudiosByCity`), not file operations (`ReadJsonFile`)
- API endpoints express domain intent, not storage mechanics
- Same implementation serves Phase 1 (curated files) and Phase 2 (synced cache)
- Repository handles deserialization, querying, filtering
