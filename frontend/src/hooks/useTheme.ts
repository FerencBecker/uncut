import { useEffect, useReducer } from 'react';
import { not } from 'ramda';

const IS_DARK_STORAGE_KEY = 'isDark';

const isSystemDark = (): boolean =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false);

const isInitiallyDark = (): boolean => {
  const stored = localStorage.getItem(IS_DARK_STORAGE_KEY);
  return stored === null ? isSystemDark() : stored === 'true';
};

const applyTheme = (isDark: boolean) => {
  localStorage.setItem(IS_DARK_STORAGE_KEY, String(isDark));
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
};

export const useTheme = () => {
  const [isDark, toggleTheme] = useReducer(not, isInitiallyDark());
  useEffect(() => applyTheme(isDark), [isDark]);
  return { isDark, toggleTheme };
};
