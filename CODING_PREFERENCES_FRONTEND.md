# Frontend Coding Preferences (TypeScript / React)

Coding patterns for React 18 TypeScript frontend.

## Component Style

**Arrow functions everywhere:**

```typescript
const App = () => <div>Hello</div>;
export const Button = () => { ... };
```

## Type Definitions

**Use `type` not `interface`:**

```typescript
export type Studio = { id: number; name: BilingualText };
```

**Inline simple props, extract complex ones:**

```typescript
// Simple → inline
const Button = ({ label }: { label: string }) => <button>{label}</button>;

// Complex → extract
type Props = { label: string; variant: 'primary' | 'secondary'; size: 'sm' | 'md' | 'lg'; };
const Button = ({ label, variant, size }: Props) => { ... };
```

## File Organization

**Co-locate component-specific code, centralize shared code:**

- `components/Gallery/useGalleryState.ts` ← Only used by Gallery
- `hooks/useTheme.ts` ← Used by multiple components

**Import order:**

```typescript
import { useState } from "react"; // 1. External
import { useTheme } from "@/hooks"; // 2. Internal absolute
import { GalleryItem } from "./Gallery"; // 3. Relative
```

## State Management

**useState for local state, Context for global (3+ components):**

```typescript
const [count, setCount] = useState(0);

// Context pattern
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

**Avoid prop drilling** - Use Context if passing props through 2+ intermediate components.

**Store data in its natural form:**

```typescript
// ❌ Converting between types
localStorage.setItem("theme", isDark ? "dark" : "light");
const stored = localStorage.getItem("theme");
const isDark = stored === "dark";

// ✅ Store what you use
localStorage.setItem("isDark", String(isDark));
const isDark = localStorage.getItem("isDark") === "true";
```

## Service vs Consumer Separation

**Services provide everything consumers need:**

```typescript
// ❌ Consumer does computation
const { theme } = useTheme();
const isDark = theme === "dark"; // Logic leaked to consumer

// ✅ Service does all work
const { isDark } = useTheme(); // Consumer just uses
```

**Consumers should only contain UI logic:**

- Icon selection, labels, ARIA attributes → OK in component
- State derivation, boolean conversion → belongs in service

## API Integration

**Use Axios:**

```typescript
import { api } from "@/config/api";
const studios = await api.studios.getAll();
```

## React Dependencies and Effects

**Understand what triggers what:**

```typescript
// ❌ Stale closure
const toggleTheme = () => {
  applyTheme(!isDark); // Uses old isDark from closure
  setIsDark((d) => !d);
};

// ✅ Use current value
const toggleTheme = () => {
  setIsDark((d) => {
    applyTheme(!d); // Uses actual current value
    return !d;
  });
};
```

**Question useEffect dependencies:**

- Does this value actually change?
- What triggers this effect to run?
- Is this creating unnecessary re-renders?

**Avoid defensive programming:**

```typescript
// ❌ Defensive checks everywhere
if (typeof window !== "undefined" && window.matchMedia) {
  // Inside useEffect - window is always defined!
}

// ✅ Trust the environment
useEffect(() => {
  const mediaQuery = window.matchMedia("...");
  // useEffect only runs in browser
}, []);
```

## Testing

**Test user behavior, not implementation:**

```typescript
expect(screen.getByText("Test Studio")).toBeInTheDocument(); // ✅
expect(result.current.isOpen).toBe(false); // ❌ implementation detail
```

**Delete tests for trivial code:**

- Does `condition ? 'A' : 'B'` work? Don't test it.
- Does React render HTML? Don't test it.
- Does onClick call a function? Don't test it.
- Test non-obvious behavior and integration points.

**Query preference order:**

1. `getByRole('button', { name: /submit/i })` - Best
2. `getByLabelText('Email')` - Forms
3. `getByText('VÁGATLANUL')` - Content
4. `getByTestId('custom-element')` - Last resort
