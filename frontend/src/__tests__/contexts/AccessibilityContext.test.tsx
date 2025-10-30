import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { AccessibilityProvider, useAccessibility } from '@/contexts/AccessibilityContext';

describe('AccessibilityContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => <AccessibilityProvider>{children}</AccessibilityProvider>;

  it('provides default reduceMotion value of false', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.reduceMotion).toBe(false);
  });

  it('allows toggling reduceMotion on', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => {
      result.current.setReduceMotion(true);
    });

    expect(result.current.reduceMotion).toBe(true);
  });

  it('allows toggling reduceMotion off', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => {
      result.current.setReduceMotion(true);
    });

    act(() => {
      result.current.setReduceMotion(false);
    });

    expect(result.current.reduceMotion).toBe(false);
  });

  it('persists reduceMotion preference to localStorage', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => {
      result.current.setReduceMotion(true);
    });

    expect(localStorage.getItem('accessibility-reduce-motion')).toBe('true');
  });

  it('loads reduceMotion preference from localStorage', () => {
    localStorage.setItem('accessibility-reduce-motion', 'true');

    const { result } = renderHook(() => useAccessibility(), { wrapper });

    expect(result.current.reduceMotion).toBe(true);
  });

  it('returns default values when used outside AccessibilityProvider', () => {
    const { result } = renderHook(() => useAccessibility());

    // Should return default values without throwing
    expect(result.current.reduceMotion).toBe(false);
    expect(typeof result.current.setReduceMotion).toBe('function');
  });
});
