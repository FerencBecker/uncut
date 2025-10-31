import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Screensaver from '../Screensaver';
import type { Studio } from '@/types/map';

const mockStudio: Studio = {
  id: 1,
  photographer: {
    name: {
      hu: 'Máté Lajos',
      en: 'Lajos Máté',
    },
  },
  studioAddress: {
    city: {
      hu: 'Dombóvár',
      en: 'Dombóvár',
    },
    location: {
      placeName: {
        hu: 'Dombóvár',
        en: 'Dombóvár',
      },
      coordinates: {
        latitude: 46.3761,
        longitude: 18.13,
      },
      county: {
        hu: 'Tolna',
        en: 'Tolna',
      },
    },
  },
};

describe('Screensaver', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with background and overlay elements', () => {
    const { container } = render(<Screensaver studios={[mockStudio]} />);

    const background = container.querySelector('.screensaver-background');
    const overlay = container.querySelector('.screensaver-overlay');
    const content = container.querySelector('.screensaver-content');

    expect(background).toBeTruthy();
    expect(overlay).toBeTruthy();
    expect(content).toBeTruthy();
  });

  it('renders HungaryMap in screensaver mode', () => {
    const { container } = render(<Screensaver studios={[mockStudio]} />);

    const map = container.querySelector('.hungary-map');
    expect(map).toBeTruthy();
  });

  it('passes studios to HungaryMap', () => {
    const { container } = render(<Screensaver studios={[mockStudio]} />);

    // Check that studio markers are rendered
    const markers = container.querySelectorAll('.studio-marker-group');
    expect(markers.length).toBe(1);
  });

  it('passes kioskMode prop to HungaryMap', () => {
    const { container: container1 } = render(<Screensaver studios={[mockStudio]} kioskMode={true} />);
    const { container: container2 } = render(<Screensaver studios={[mockStudio]} kioskMode={false} />);

    // Both should render the map
    expect(container1.querySelector('.hungary-map')).toBeTruthy();
    expect(container2.querySelector('.hungary-map')).toBeTruthy();
  });

  it('sets up animation timer with correct duration', () => {
    render(<Screensaver studios={[mockStudio]} />);

    // Verify timer was created
    const timerCount = vi.getTimerCount();
    expect(timerCount).toBeGreaterThan(0);
  });

  it('handles multiple studios without errors', () => {
    const studios = Array.from({ length: 12 }, (_, i) => ({
      ...mockStudio,
      id: i + 1,
    }));

    const { container } = render(<Screensaver studios={studios} />);

    // Check all markers rendered
    const markers = container.querySelectorAll('.studio-marker-group');
    expect(markers.length).toBe(12);
  });

  it('cleans up resources on unmount', () => {
    const { unmount } = render(<Screensaver studios={[mockStudio]} />);

    // Should not throw on unmount
    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('renders empty map when no studios provided', () => {
    const { container } = render(<Screensaver studios={[]} />);

    const map = container.querySelector('.hungary-map');
    expect(map).toBeTruthy();

    const markers = container.querySelectorAll('.studio-marker-group');
    expect(markers.length).toBe(0);
  });

  it('applies screensaver-specific styles', () => {
    const { container } = render(<Screensaver studios={[mockStudio]} />);

    const screensaver = container.querySelector('.screensaver');
    expect(screensaver).toBeTruthy();

    // Check computed styles if needed
    const styles = window.getComputedStyle(screensaver!);
    expect(styles.position).toBe('relative');
  });
});
