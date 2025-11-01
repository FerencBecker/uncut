import { useCallback, useEffect, useRef } from 'react';

type UseInactivityTimerOptions = {
  timeout: number; // milliseconds
  onTimeout: () => void;
  enabled?: boolean;
};

/**
 * Detect user inactivity and trigger callback after timeout period.
 * Resets timer on mouse/keyboard/touch events.
 */
const useInactivityTimer = ({ timeout, onTimeout, enabled = true }: UseInactivityTimerOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (!enabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => onTimeout(), timeout);
  }, [timeout, onTimeout, enabled]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    resetTimer();
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer, enabled]);

  return { resetTimer };
};
export default useInactivityTimer;
