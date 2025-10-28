# Frontend Code Review Guidelines (TypeScript / React)

Frontend-specific review methodologies for TypeScript / React code.

## Frontend-Specific Review Methodologies

### Question Everything

Before approving code, ask:
1. **Why does this code exist?** - What problem does it solve?
2. **Is it actually needed now?** - Or solving future problems? (YAGNI)
3. **What are the trade-offs?** - Complexity cost vs. benefit
4. **Could this be simpler?** - Remove features, not add them
5. **Does it match actual usage?** - Check consumers, not imagination

**Example questions:**
- "Why are we listening to system preference changes?" (Kiosk doesn't need it)
- "Why store strings when we use booleans?" (See CODING_PREFERENCES: data in natural form)
- "Why compute isDark in the consumer?" (See CODING_PREFERENCES: service responsibility)
- "Why test this ternary operator?" (See CODING_PREFERENCES: delete trivial tests)
- "What triggers this effect?" (Trace cause-effect chain in dependencies)
- "Is this creating a stale closure?" (Check if using outer scope vs functional updates)
- "Why is typeof window checked in useEffect?" (useEffect only runs in browser)

**Review process:**
1. Read the issue - what was actually requested?
2. Check each file - grep for actual consumers
3. Verify patterns match CODING_PREFERENCES_FRONTEND.md
4. Question whether code should exist at all

### Avoid Prop Drilling
If props pass through 2+ levels, consider:
- React Context for global state
- Component composition
- State colocation

### API Client Simplicity
- Prefer established libraries (Axios, React Query) over custom fetch wrappers
- Question necessity of elaborate error handling before it's needed
- YAGNI applies to HTTP clients too
