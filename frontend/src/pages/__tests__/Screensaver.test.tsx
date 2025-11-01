import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Screensaver from '../Screensaver';
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

describe('Screensaver', () => {
  it('renders screensaver with title and CTA', () => {
    const onBegin = vi.fn();
    render(<Screensaver studios={mockStudios} onBegin={onBegin} />);

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('calls onBegin when clicked', () => {
    const onBegin = vi.fn();
    const { container } = render(<Screensaver studios={mockStudios} onBegin={onBegin} />);

    const screensaver = container.querySelector('.screensaver-page');
    expect(screensaver).toBeTruthy();

    fireEvent.click(screensaver!);
    expect(onBegin).toHaveBeenCalledOnce();
  });

  it('calls onBegin on Enter key press', () => {
    const onBegin = vi.fn();
    const { container } = render(<Screensaver studios={mockStudios} onBegin={onBegin} />);

    const screensaver = container.querySelector('.screensaver-page');
    expect(screensaver).toBeTruthy();

    fireEvent.keyDown(screensaver!, { key: 'Enter' });
    expect(onBegin).toHaveBeenCalledOnce();
  });

  it('renders with empty studios array', () => {
    const onBegin = vi.fn();
    const { container } = render(<Screensaver studios={[]} onBegin={onBegin} />);

    expect(container.querySelector('.screensaver-page')).toBeTruthy();
  });

  it('passes studios to Screensaver component', () => {
    const onBegin = vi.fn();
    const { container } = render(<Screensaver studios={mockStudios} onBegin={onBegin} />);

    // Verify map is rendered (Screensaver contains HungaryMap)
    const map = container.querySelector('.hungary-map');
    expect(map).toBeTruthy();
  });
});
