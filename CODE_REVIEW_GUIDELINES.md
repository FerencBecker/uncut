# Code Review Guidelines

This document outlines the review methodology used in this project. These guidelines help maintain code quality, architectural consistency, and adherence to project principles.

## Review Methodologies

### Question Every Line
Challenge the necessity of every defensive check, field, and method with "Why is this needed?"
- Don't accept code just because it compiles or tests pass
- Question existence, not just implementation
- Default stance: prove code should exist, not that it shouldn't

### IDE Warnings as Code Smells
Treat all IDE warnings seriously - they often indicate deeper issues:
- Unused fields → unnecessary state
- Multiple enumeration → inefficient code
- Unnecessary imports → copy-paste artifacts
- Field assigned but never read → design smell

### Duplication Detective
Actively scan for duplicated code patterns across files:
- JSON serialization options
- Try-catch blocks with identical error handling
- Logging patterns
- Configuration reading

Even small duplications (2-3 lines) are candidates for extraction when they appear 3+ times.

### Naming Context Awareness
Remove redundant prefixes when namespace/class provides context:
- `ImageRepository.GetImageAsync()` → `Repository.GetAsync()`
- `StudioDto` → `Studio` (when in Studio namespace)
- Let the context speak, don't repeat it in names

### Return Type Scrutiny
Question unnecessary materializations:
- `.ToArray()` when `IEnumerable<T>` works for the caller
- `.ToList()` when no list-specific operations needed
- Concrete types when interfaces suffice

Ask: "What does the caller actually need?"

### Test Architecture Alignment
Tests must match production architecture:
- VSA in production → test complete vertical slices
- No layer-based tests (separate repository tests, endpoint tests)
- Use real dependencies in integration tests, not mocks
- Test files mirror production structure

### Domain vs Infrastructure Separation
- Infrastructure (JSON options, logging config) → centralized in `Shared/`
- Domain logic → stays within slices
- Shared domain concepts → explicit discussion, not automatic extraction

### Exception Philosophy
Use exceptions for control flow when they map to HTTP semantics:
- `FileNotFoundException` → 404 Not Found
- `InvalidOperationException` → 500 Internal Server Error
- Don't catch exceptions just to return null/boolean
- Let exceptions propagate to proper handling layer (endpoints)

### Modern Language Features
Actively push for latest C# features:
- Primary constructors over traditional constructors
- Records over classes for immutable data
- Static methods when no instance state needed
- Collection expressions (`[]` over `Array.Empty<T>()`)

### Full Stack Verification
Integration tests must exercise entire vertical slice:
- HTTP request → endpoint → repository → file I/O
- Use `CustomWebApplicationFactory` for real ASP.NET pipeline
- Verify actual JSON serialization, not in-memory objects
- Test what users actually experience

### Business Value Focus
Question feature necessity based on actual UI/UX needs:
- "Will users actually use this?"
- "Does the UI require this data structure?"
- "Is this solving a real problem or a theoretical one?"

Remove features that don't serve clear user needs, even if "nice to have."

## Review Process Order

1. **Read the issue** - What was actually requested?
2. **Review each file** - Apply methodologies above
3. **Check architecture alignment** - Does this match documented patterns?
4. **Verify coding standards** - SRP, YAGNI, KISS, etc.
5. **Run and inspect IDE warnings** - Treat as code smells
6. **Question existence** - Should this code exist at all?

## Red Flags

- Code with tests but no actual callers in production
- Abstraction layers with only one implementation
- Features not mentioned in the original issue
- Horizontal infrastructure built before vertical features need it
- Patterns borrowed from large-scale systems we don't have
