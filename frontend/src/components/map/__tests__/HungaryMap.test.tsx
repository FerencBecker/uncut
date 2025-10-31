import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HungaryMap from '../HungaryMap';
import { coordsToSVG, isWithinHungary, HUNGARY_BOUNDS } from '@/utils/mapCoordinates';

describe('HungaryMap', () => {
  it('renders SVG with correct viewBox', () => {
    render(<HungaryMap studios={[]} screensaverMode={false} />);
    const svg = screen.getByRole('img', { name: /map of hungary/i });
    expect(svg).toHaveAttribute('viewBox', '0 0 1000 600');
  });

  it('renders country outline path', () => {
    const { container } = render(<HungaryMap studios={[]} screensaverMode={false} />);
    const path = container.querySelector('path');
    expect(path).toBeTruthy();
    expect(path?.getAttribute('d')).toBeTruthy();
  });

  it('renders county boundaries in interactive mode', () => {
    const { container } = render(<HungaryMap studios={[]} screensaverMode={false} />);
    const paths = container.querySelectorAll('path');
    // Should have base fill + country outline + 20 boundaries (19 counties + Budapest)
    expect(paths.length).toBe(22); // 2 base + 20 county/Budapest boundaries
  });

  it('renders county boundaries in screensaver mode', () => {
    const { container } = render(<HungaryMap studios={[]} screensaverMode={true} />);
    const paths = container.querySelectorAll('path');
    // Should have base fill + country outline + 20 boundaries (19 counties + Budapest)
    expect(paths.length).toBe(22); // 2 base + 20 county/Budapest boundaries
  });

  it('renders county seats in interactive mode', () => {
    const { container } = render(<HungaryMap studios={[]} screensaverMode={false} />);
    const circles = container.querySelectorAll('circle');
    // Should have 19 county seat markers (Budapest is one of the 19)
    expect(circles.length).toBe(19);
  });

  it('does not render county seats in screensaver mode', () => {
    const { container } = render(<HungaryMap studios={[]} screensaverMode={true} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(0);
  });

  it('renders all layers in interactive mode', () => {
    const { container } = render(<HungaryMap studios={[]} screensaverMode={false} />);
    const paths = container.querySelectorAll('path');
    const circles = container.querySelectorAll('circle');

    expect(paths.length).toBe(22); // Base + outline + 20 counties/Budapest
    expect(circles.length).toBe(19); // 19 county seats (Budapest is one of them)
  });
});

describe('mapCoordinates', () => {
  describe('coordsToSVG', () => {
    it('converts Dombóvár coordinates correctly', () => {
      const svg = coordsToSVG(46.3761, 18.13);

      // Dombóvár should be in the southern-western part of Hungary
      // Longitude 18.13 is ~29% across Hungary's width (16.1 to 22.9)
      // Latitude 46.3761 is ~23% up from bottom (45.7 to 48.6)
      expect(svg.x).toBeGreaterThan(200);
      expect(svg.x).toBeLessThan(400);
      expect(svg.y).toBeGreaterThan(400);
      expect(svg.y).toBeLessThan(600);
    });

    it('places western coordinates on left side', () => {
      const svg = coordsToSVG(47.0, 16.5);
      expect(svg.x).toBeLessThan(200);
    });

    it('places eastern coordinates on right side', () => {
      const svg = coordsToSVG(47.0, 22.5);
      expect(svg.x).toBeGreaterThan(800);
    });

    it('places northern coordinates on top', () => {
      const svg = coordsToSVG(48.5, 19.0);
      expect(svg.y).toBeLessThan(100);
    });

    it('places southern coordinates on bottom', () => {
      const svg = coordsToSVG(45.8, 19.0);
      expect(svg.y).toBeGreaterThan(500);
    });
  });

  describe('isWithinHungary', () => {
    it('validates coordinates within Hungary bounds', () => {
      expect(isWithinHungary(47.5, 19.0)).toBe(true);
    });

    it('rejects coordinates outside Hungary bounds', () => {
      expect(isWithinHungary(49.0, 19.0)).toBe(false); // too north
      expect(isWithinHungary(45.0, 19.0)).toBe(false); // too south
      expect(isWithinHungary(47.0, 23.5)).toBe(false); // too east
      expect(isWithinHungary(47.0, 15.0)).toBe(false); // too west
    });

    it('validates boundary edge cases', () => {
      expect(isWithinHungary(HUNGARY_BOUNDS.minLat, HUNGARY_BOUNDS.minLng)).toBe(true);
      expect(isWithinHungary(HUNGARY_BOUNDS.maxLat, HUNGARY_BOUNDS.maxLng)).toBe(true);
    });
  });
});
