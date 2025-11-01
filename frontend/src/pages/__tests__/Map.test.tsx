import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Map from '../Map';
import type { Studio } from '@/types/map';

const mockStudios: Studio[] = [
  {
    id: 1,
    photographer: { name: { hu: 'Teszt Fotós', en: 'Test Photographer' } },
    studioAddress: {
      city: { hu: 'Budapest', en: 'Budapest' },
      location: {
        placeName: { hu: 'Budapest', en: 'Budapest' },
        coordinates: { latitude: 47.4979, longitude: 19.0402 },
        county: { hu: 'Budapest', en: 'Budapest' },
      },
    },
  },
];

describe('Map', () => {
  it('renders header with title and subtitle', () => {
    render(<Map studios={mockStudios} loading={false} error={null} />);

    const header = document.querySelector('.map-header');
    expect(header).toBeTruthy();
  });

  it('renders theme and language toggles', () => {
    render(<Map studios={mockStudios} loading={false} error={null} />);

    const controls = document.querySelector('.map-controls');
    expect(controls).toBeTruthy();
  });

  it('shows loading state when loading', () => {
    render(<Map studios={[]} loading={true} error={null} />);

    // Check for loading element by class (language-agnostic)
    const loading = document.querySelector('.map-loading');
    expect(loading).toBeTruthy();
  });

  it('shows error state when error occurs', () => {
    const error = new Error('Test error');
    render(<Map studios={[]} loading={false} error={error} />);

    // Check for error element by class (language-agnostic)
    const errorElement = document.querySelector('.map-error');
    expect(errorElement).toBeTruthy();
  });

  it('renders map when loaded successfully', () => {
    const { container } = render(<Map studios={mockStudios} loading={false} error={null} />);

    const map = container.querySelector('.hungary-map');
    expect(map).toBeTruthy();
  });

  it('does not render map while loading', () => {
    const { container } = render(<Map studios={[]} loading={true} error={null} />);

    const map = container.querySelector('.hungary-map');
    expect(map).toBeFalsy();
  });

  it('does not render map when error', () => {
    const { container } = render(<Map studios={[]} loading={false} error={new Error('Test')} />);

    const map = container.querySelector('.hungary-map');
    expect(map).toBeFalsy();
  });

  it('passes studios to HungaryMap', () => {
    const { container } = render(<Map studios={mockStudios} loading={false} error={null} />);

    // Verify markers are rendered
    const markers = container.querySelectorAll('.studio-marker-group');
    expect(markers.length).toBe(1);
  });
});
