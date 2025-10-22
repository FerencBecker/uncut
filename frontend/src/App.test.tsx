import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the application title', () => {
    render(<App />);
    expect(screen.getByText('VÁGATLANUL')).toBeInTheDocument();
  });

  it('renders the museum subtitle', () => {
    render(<App />);
    expect(screen.getByText('Fotóműtermek - Néprajzi Múzeum')).toBeInTheDocument();
  });

  it('renders the counter button', () => {
    render(<App />);
    expect(screen.getByText(/Count is/)).toBeInTheDocument();
  });
});
