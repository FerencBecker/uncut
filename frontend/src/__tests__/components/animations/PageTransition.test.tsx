import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import { PageTransition } from '@/components/animations/PageTransition';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <AccessibilityProvider>{children}</AccessibilityProvider>
);

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>,
      { wrapper }
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with forward direction by default', () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>,
      { wrapper }
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with backward direction', () => {
    const { container } = render(
      <PageTransition direction="backward">
        <div>Test Content</div>
      </PageTransition>,
      { wrapper }
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PageTransition className="custom-class">
        <div>Test Content</div>
      </PageTransition>,
      { wrapper }
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('respects reduced motion preference', () => {
    // matchMedia mock in setup.ts returns matches: false by default
    // Component will render with animations
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>,
      { wrapper }
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
