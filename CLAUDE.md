# CLAUDE.md

Guidance for Claude Code when working in this repository.

**Project-specific details:** See [PROJECT.md](PROJECT.md)

## Workflow

### Task Execution

1. Read GitHub issue (`gh issue view <number>`) for requirements
2. Implement based on task specifications
3. Consult project documentation only if unclear
4. **When unclear: ASK USER** - never guess

### Coding Standards

**Follow strictly:**

- [CODE_STANDARDS.md](CODE_STANDARDS.md) - Universal principles
- [CODING_PREFERENCES_FRONTEND.md](CODING_PREFERENCES_FRONTEND.md) - Frontend patterns
- [CODING_PREFERENCES_BACKEND.md](CODING_PREFERENCES_BACKEND.md) - Backend patterns

**Core principles:** Minimalism, SRP, YAGNI, KISS, single abstraction level

### Code Review

**Review guidelines:**

- [CODE_REVIEW_GUIDELINES_FRONTEND.md](CODE_REVIEW_GUIDELINES_FRONTEND.md)
- [CODE_REVIEW_GUIDELINES_BACKEND.md](CODE_REVIEW_GUIDELINES_BACKEND.md)

**Before presenting code:**

1. Check issue - what was requested?
2. Grep for consumers - is code actually used?
3. Question whether code should exist at all

**Red flags:** Code with tests but no callers, single-use abstractions, features not in issue

### Git Workflow

**IMPORTANT: Never commit without explicit user permission.**

1. Make changes
2. Run tests
3. Show summary
4. **STOP and ASK user for permission**
5. Only after approval: commit → push → create PR

**Commit format:** Brief (1-2 sentences), reference issue number, no implementation details

### Documentation

Update architecture documentation when completing tasks with new patterns, components, or tech decisions.

### Testing

See PROJECT.md for coverage targets and testing strategy.

### Design

Reference project design documentation for UI/UX implementation details.
