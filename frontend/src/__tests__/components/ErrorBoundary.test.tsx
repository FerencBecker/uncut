import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Suppress console errors in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error fallback when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument();
    expect(screen.getByText(/váratlan hibába ütközött/i)).toBeInTheDocument();
  });

  it('displays error correlation ID', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for correlation ID format (err-timestamp-random)
    const correlationText = screen.getByText(/Hibaazonosító:/i);
    expect(correlationText).toBeInTheDocument();
    expect(correlationText.textContent).toMatch(/err-[a-z0-9]+-[a-z0-9]+/);
  });

  it('provides retry button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /Újrapróbálás/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('provides reload button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /Alkalmazás újratöltése/i });
    expect(reloadButton).toBeInTheDocument();
  });

  it('calls custom onError handler when error occurs', () => {
    const onError = vi.fn();

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it('recovers from error when retry button is clicked', () => {
    let shouldThrow = true;
    const TestComponent = () => <ThrowError shouldThrow={shouldThrow} />;

    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    // Error boundary should be showing
    expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument();

    // Fix the error condition
    shouldThrow = false;

    // Click retry
    const retryButton = screen.getByRole('button', { name: /Újrapróbálás/i });
    act(() => {
      retryButton.click();
    });

    // Re-render to reflect the fixed component
    rerender(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    // Should show normal content now
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('uses custom fallback when provided', () => {
    const customFallback = vi.fn(() => <div>Custom error UI</div>);

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
    expect(customFallback).toHaveBeenCalledWith(expect.any(Error), expect.any(Object), expect.any(Function));
  });

  it('handles manual retry correctly', async () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // First error
    expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument();

    // Click retry
    const retryButton = screen.getByRole('button', { name: /Újrapróbálás/i });
    act(() => {
      retryButton.click();
    });

    // Still shows error (because we haven't fixed the component)
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should still be showing
    expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('maintains error boundary functionality across theme changes', () => {
    const { container } = render(
      <div data-theme="light">
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </div>
    );

    // Error boundary should render in light theme
    const errorBoundary = container.querySelector('.error-boundary');
    expect(errorBoundary).toBeInTheDocument();
    expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument();

    // Simulate theme change to dark
    const themeContainer = container.querySelector('[data-theme]');
    if (themeContainer) {
      themeContainer.setAttribute('data-theme', 'dark');
    }

    // Error boundary should still be functional
    expect(screen.getByText(/Hiba történt/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Újrapróbálás/i })).toBeInTheDocument();
  });
});
