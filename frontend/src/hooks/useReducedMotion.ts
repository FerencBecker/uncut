import { useState, useEffect, useContext } from 'react';
import { AccessibilityContext } from '@/contexts/AccessibilityContext';

/**
 * Hook to detect user's preference for reduced motion
 * Checks both OS-level prefers-reduced-motion AND manual accessibility toggle
 * Returns true if EITHER preference is enabled
 */
export const useReducedMotion = (): boolean => {
  // Check manual override from AccessibilityContext
  const { reduceMotion: manualReduceMotion } = useContext(AccessibilityContext);

  // Check OS-level preference
  const [osReduceMotion, setOsReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setOsReduceMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Return true if EITHER OS preference OR manual toggle is enabled
  return osReduceMotion || manualReduceMotion;
};
