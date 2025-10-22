# Code Review Guidelines

This document outlines universal review principles that apply to all code in this project.

## Universal Principles

These principles apply to both backend and frontend code.

### Question Every Line

Challenge the necessity of every defensive check, field, and method with "Why is this needed?"
- Don't accept code just because it compiles or tests pass
- Question existence, not just implementation
- Default stance: prove code should exist, not that it shouldn't

### IDE Warnings as Code Smells

Treat all IDE warnings seriously - they often indicate deeper issues:
- Unused variables/imports → copy-paste artifacts
- Field assigned but never read → design smell
- Multiple enumeration → inefficient code
- Type warnings → potential bugs

### Duplication Detective

Actively scan for duplicated code patterns across files:
- Configuration reading
- Error handling patterns
- API call patterns
- Logging patterns

Even small duplications (2-3 lines) are candidates for extraction when they appear 3+ times.

### Naming Context Awareness

Remove redundant prefixes when namespace/module/class provides context:
- `ImageRepository.GetImageAsync()` → `Repository.GetAsync()`
- `StudioDto` → `Studio` (when in Studio namespace/module)
- `useThemeHook` → `useTheme` (hooks already have "use" convention)
- Let the context speak, don't repeat it in names

### Business Value Focus

Question feature necessity based on actual UI/UX needs:
- "Will users actually use this?"
- "Does the UI require this data structure?"
- "Is this solving a real problem or a theoretical one?"

Remove features that don't serve clear user needs, even if "nice to have."

### Red Flags

- Code with tests but no actual callers in production
- Abstraction layers with only one implementation
- Features not mentioned in the original issue
- Patterns borrowed from large-scale systems we don't have
- Over-engineered solutions to simple problems

## Review Process Order

1. **Read the issue** - What was actually requested?
2. **Review each file** - Apply universal + language-specific methodologies
3. **Check architecture alignment** - Does this match documented patterns?
4. **Verify coding standards** - SRP, YAGNI, KISS, etc.
5. **Run and inspect IDE warnings** - Treat as code smells
6. **Question existence** - Should this code exist at all?
