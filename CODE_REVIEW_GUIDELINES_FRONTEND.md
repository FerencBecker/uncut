# Frontend Code Review Guidelines (TypeScript / React)

Frontend-specific review methodologies for TypeScript / React code.

## Frontend-Specific Review Methodologies

### Component Organization

- Component-specific hooks → co-located with component
- Shared hooks → `src/hooks/`
- Component-specific types → co-located
- Shared types → `src/types/`

### Avoid Prop Drilling

If props pass through 2+ levels, consider:
- React Context for global state
- Component composition
- State colocation

### Hook Dependencies

Ensure exhaustive dependencies in `useEffect`, `useMemo`, `useCallback`:
- Enable ESLint `react-hooks/exhaustive-deps` rule
- Don't silence warnings without understanding them

### API Client Simplicity

- Prefer established libraries (Axios, React Query) over custom fetch wrappers
- Question necessity of elaborate error handling before it's needed
- YAGNI applies to HTTP clients too

### Test Component Behavior, Not Implementation

```typescript
// ✅ Test user behavior
expect(screen.getByText('VÁGATLANUL')).toBeInTheDocument();

// ❌ Test implementation details
expect(component.state.count).toBe(0);
```
