import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AccessibilityProvider, useAccessibility } from '@/contexts/AccessibilityContext';

describe('useReducedMotion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('returns false when user does not prefer reduced motion', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when OS preference is enabled', () => {
    // Override matchMedia to return matches: true
    const matchMediaMock = vi.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('returns true when manual override is enabled', () => {
    // Reset matchMedia mock to default
    const matchMediaMock = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AccessibilityProvider>{children}</AccessibilityProvider>
    );

    const { result } = renderHook(
      () => {
        const accessibility = useAccessibility();
        const reducedMotion = useReducedMotion();
        return { accessibility, reducedMotion };
      },
      { wrapper }
    );

    // Initially false
    expect(result.current.reducedMotion).toBe(false);

    // Enable manual override
    act(() => {
      result.current.accessibility.setReduceMotion(true);
    });

    // Now should be true
    expect(result.current.reducedMotion).toBe(true);
  });

  it('returns true when EITHER OS preference OR manual override is enabled', () => {
    const matchMediaMock = vi.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AccessibilityProvider>{children}</AccessibilityProvider>
    );

    const { result } = renderHook(() => useReducedMotion(), { wrapper });
    expect(result.current).toBe(true);
  });

  it('registers event listener for media query changes', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    const matchMediaMock = vi.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener,
      removeEventListener,
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });

    const { unmount } = renderHook(() => useReducedMotion());

    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
