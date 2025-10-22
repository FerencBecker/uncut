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
export type Studio = { id: number; name: BilingualText; };
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
import { useState } from 'react';        // 1. External
import { useTheme } from '@/hooks';      // 2. Internal absolute
import { GalleryItem } from './Gallery'; // 3. Relative
```

## State Management

**useState for local state, Context for global (3+ components):**
```typescript
const [count, setCount] = useState(0);

// Context pattern
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

**Avoid prop drilling** - Use Context if passing props through 2+ intermediate components.

## API Integration

**Use Axios:**
```typescript
import { api } from '@/config/api';
const studios = await api.studios.getAll();
```

## Testing

**Test user behavior, not implementation:**
```typescript
expect(screen.getByText('Test Studio')).toBeInTheDocument(); // ✅
expect(result.current.isOpen).toBe(false); // ❌ implementation detail
```

**Query preference order:**
1. `getByRole('button', { name: /submit/i })` - Best
2. `getByLabelText('Email')` - Forms
3. `getByText('VÁGATLANUL')` - Content
4. `getByTestId('custom-element')` - Last resort
