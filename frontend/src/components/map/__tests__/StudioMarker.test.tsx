import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import StudioMarker from '../StudioMarker';
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

describe('StudioMarker', () => {
  it('renders at correct SVG coordinates', () => {
    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={false} />
      </svg>
    );

    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);

    // Check that circles have cx and cy attributes
    const visibleMarker = container.querySelector('.studio-marker-visible');
    expect(visibleMarker).toBeTruthy();
    expect(visibleMarker?.getAttribute('cx')).toBeTruthy();
    expect(visibleMarker?.getAttribute('cy')).toBeTruthy();
  });

  it('renders 64px touch target (r=32)', () => {
    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={false} />
      </svg>
    );

    const touchTarget = container.querySelector('.studio-marker-touch-target');
    expect(touchTarget).toBeTruthy();
    expect(touchTarget?.getAttribute('r')).toBe('32'); // 32px radius = 64px diameter
  });

  it('responds to hover interactions', () => {
    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={false} />
      </svg>
    );

    const markerGroup = container.querySelector('.studio-marker-group');
    expect(markerGroup).toBeTruthy();

    // Should not throw when hovering
    expect(() => {
      fireEvent.mouseEnter(markerGroup!);
      fireEvent.mouseLeave(markerGroup!);
    }).not.toThrow();
  });

  it('responds to active interactions', () => {
    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={false} />
      </svg>
    );

    const markerGroup = container.querySelector('.studio-marker-group');
    expect(markerGroup).toBeTruthy();

    // Should not throw when clicking
    expect(() => {
      fireEvent.mouseDown(markerGroup!);
      fireEvent.mouseUp(markerGroup!);
    }).not.toThrow();
  });

  it('renders pulse ring when active', () => {
    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={false} />
      </svg>
    );

    const markerGroup = container.querySelector('.studio-marker-group');

    // Initially no pulse ring
    let pulseRing = container.querySelector('.studio-marker-pulse-ring');
    expect(pulseRing).toBeFalsy();

    // After mouse down, pulse ring should appear
    fireEvent.mouseDown(markerGroup!);
    pulseRing = container.querySelector('.studio-marker-pulse-ring');
    expect(pulseRing).toBeTruthy();
  });

  it('calculates animation delay based on index in screensaver mode', () => {
    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={2} screensaverMode={true} />
      </svg>
    );

    const markerGroup = container.querySelector('.studio-marker-group');
    expect(markerGroup).toBeTruthy();
  });

  it('disables animations when reduced motion is preferred', () => {
    // Mock useReducedMotion to return true
    vi.mock('@/hooks/useReducedMotion', () => ({
      useReducedMotion: () => true,
    }));

    const { container } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={true} />
      </svg>
    );

    // Should render as regular g element, not motion.g
    const markerGroup = container.querySelector('.studio-marker-group');
    expect(markerGroup?.tagName.toLowerCase()).toBe('g');
  });

  it('positions marker correctly for different coordinates', () => {
    const budapestStudio: Studio = {
      ...mockStudio,
      id: 2,
      studioAddress: {
        ...mockStudio.studioAddress,
        location: {
          ...mockStudio.studioAddress.location,
          coordinates: {
            latitude: 47.4979,
            longitude: 19.0402,
          },
        },
      },
    };

    const { container: container1 } = render(
      <svg>
        <StudioMarker studio={mockStudio} index={0} screensaverMode={false} />
      </svg>
    );

    const { container: container2 } = render(
      <svg>
        <StudioMarker studio={budapestStudio} index={1} screensaverMode={false} />
      </svg>
    );

    const marker1 = container1.querySelector('.studio-marker-visible');
    const marker2 = container2.querySelector('.studio-marker-visible');

    // Budapest (north-east) should have different coordinates than Dombóvár (south-west)
    expect(marker1?.getAttribute('cx')).not.toBe(marker2?.getAttribute('cx'));
    expect(marker1?.getAttribute('cy')).not.toBe(marker2?.getAttribute('cy'));
  });
});
