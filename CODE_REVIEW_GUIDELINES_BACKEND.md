# Backend Code Review Guidelines (C# / .NET)

Backend-specific review methodologies for C# / .NET code.

## Backend-Specific Review Methodologies

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

### Modern C# Language Features

Actively push for latest C# features:
- Primary constructors over traditional constructors
- Records over classes for immutable data
- Static methods when no instance state needed
- Collection expressions (`[]` over `Array.Empty<T>()`)
- File-scoped namespaces
- Target-typed new expressions

### Full Stack Verification

Integration tests must exercise entire vertical slice:
- HTTP request → endpoint → repository → file I/O
- Use `CustomWebApplicationFactory` for real ASP.NET pipeline
- Verify actual JSON serialization, not in-memory objects
- Test what users actually experience
