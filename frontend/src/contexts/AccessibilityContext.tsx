import { createContext, type ReactNode, useContext, useState } from 'react';

type AccessibilityContextType = {
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
};

export const AccessibilityContext = createContext<AccessibilityContextType>({
  reduceMotion: false,
  setReduceMotion: () => {},
});

const STORAGE_KEY = 'accessibility-reduce-motion';

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [reduceMotion, setReduceMotionState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'true';
  });

  const setReduceMotion = (value: boolean) => {
    setReduceMotionState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  };

  return (
    <AccessibilityContext.Provider value={{ reduceMotion, setReduceMotion }}>{children}</AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  return useContext(AccessibilityContext);
};
