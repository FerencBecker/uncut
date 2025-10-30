# Frontend Code Review Guidelines (TypeScript / React)

## Review Method

**Ask "Why?" repeatedly** - Surface root principles, not surface-level fixes
**Identify concrete issues** - Fixable bugs > theoretical concerns
**One-line principles** - Conciseness forces clarity
**Understand before documenting** - Flip-flopping means you don't get it yet

## Question Everything

Before approving code, ask:

1. **Why does this exist?** - What problem does it solve?
2. **Is it actually needed now?** - YAGNI applies
3. **What are the trade-offs?** - Complexity vs. benefit
4. **Could this be simpler?** - Remove features, not add them
5. **Does it match actual usage?** - Grep for consumers

**Review process:**

1. Read issue - what was requested?
2. Check each file - grep for actual consumers
3. Verify patterns match CODING_PREFERENCES_FRONTEND.md
4. Question whether code should exist at all

**Red flags:**

- Code with tests but no callers
- Single-use abstractions (hooks, utils)
- Library API wrappers (just pass through)
- Tests for trivial logic (ternary operators, library functionality)
- Features not in issue
- Demo code with tests

## Specific Checks

**Custom hooks:** Used 2+ places? Adds real value? If single use or library wrapper → inline it

**CSS variables:** Exist in `themes.css`? Correct naming (`--text-color` not `--color-text`)? Both themes?

**Prop drilling:** 2+ levels deep → consider Context/composition

**Demo code:** Counter buttons, placeholders → delete with tests
