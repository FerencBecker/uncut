# Frontend Coding Preferences (TypeScript / React)

## AI Code Generation Rules

**After EVERY Write tool:** `cd frontend && npx prettier --write "path/to/file"`
**CSS variables:** Check `themes.css` first - use `--text-color` not `--color-text`
**Custom hooks:** Only extract if used in 2+ places. Don't wrap library APIs.
**Testing:** Don't test ternary operators, library code, or demo scaffolding.
**Self-review:** Grep for consumers before presenting code. Single consumer = inline it.

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

**Props are required by default. Only use `?` when truly optional:**

```typescript
// ❌ Defensive optional props
type HungaryMapProps = {
  studios?: Studio[];
  screensaverMode?: boolean;
};

// ✅ Required means required
type HungaryMapProps = {
  studios: Studio[];
  screensaverMode: boolean;
  children?: React.ReactNode; // Actually optional
};
```

**No explicit return types for component-specific hooks:**

```typescript
// ❌ Explicit type (unnecessary duplication)
export type UsePerformanceMonitoringResult = {
  snapshot: PerformanceSnapshot | null;
  start: () => void;
  stop: () => void;
};
const usePerformanceMonitoring = (): UsePerformanceMonitoringResult => {
  // ... implementation
  return { snapshot, start, stop };
};

// ✅ Inferred type (less duplication)
const usePerformanceMonitoring = () => {
  // ... implementation
  return { snapshot, start, stop };
};
```

**Rationale:**
- Component-specific hooks usually have 1 consumer (the component they serve)
- Explicit types require updating 3 places: type definition, function signature, return statement
- TypeScript inference provides same safety with less maintenance
- Single consumer means breaking changes are caught immediately at the call site
- Exception: Framework-provided or widely shared hooks (3+ consumers) benefit from explicit types

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

## No Classes or OOP Patterns

**React provides state primitives. Use them. Don't wrap them in classes or factories:**

```typescript
// ❌ Class-thinking in React
export class FPSMonitor {
  private frames: number[] = [];
  start() { ... }
  getMetrics() { ... }
}
const monitor = useRef(new FPSMonitor());

// ❌ Factory functions pretending not to be classes
export const createFPSMonitor = () => {
  let frames: number[] = [];
  return { start() { ... }, getMetrics() { ... } };
};
const monitor = useRef(createFPSMonitor());

// ✅ State belongs in hooks, operations are functions
const useFPSMonitoring = () => {
  const [metrics, setMetrics] = useState<FPSMetrics>(...);
  const framesRef = useRef<number[]>([]);

  const start = () => { /* operates on framesRef */ };
  const updateMetrics = () => { /* calculates from framesRef, updates metrics */ };

  return { metrics, start, updateMetrics };
};

// ✅ Stateless operations are just functions
export const calculateFPSMetrics = (frames: number[]): FPSMetrics => { ... };
export const checkFPSThreshold = (fps: number, thresholds: PerformanceThresholds): PerformanceAlert | null => { ... };
```

**Why:**
- Classes/factories are indirection - you're wrapping React's state system for no benefit
- `useRef(new Thing())` means you didn't understand what hooks provide
- State primitives (useState, useRef) are clear about what changes and when
- Pure functions are testable without mocking
- Composition through hooks is more flexible than inheritance or object composition

**Pattern for state + behavior:**
1. Is there state? → Hook (useState/useRef for local, Context for shared)
2. Pure computation? → Plain function
3. Need to compose? → Hooks compose hooks
4. Zero state? → Don't create an object, just export functions

**Hook cleanup:** If you expose start/stop, document it. If consumer can't control it, clean it up.

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

## Error Handling

**ErrorBoundary only catches render errors, not event handlers. Wrap handlers with withErrorHandling.**

```typescript
// ❌ Unprotected
const handleClick = () => fetch('/api/data');

// ✅ Protected
const handleClick = withErrorHandling(() => fetch('/api/data'));

// ✅ With callback
const handleSubmit = withErrorHandling(
  async () => saveData(),
  { onError: () => showToast('Failed') }
);
```

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
3. `getByText('App Title')` - Content
4. `getByTestId('custom-element')` - Last resort
