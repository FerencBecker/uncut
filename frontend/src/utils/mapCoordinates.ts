import type { MapBounds, SVGPoint } from '@/types/map';

export const HUNGARY_BOUNDS: MapBounds = {
  minLat: 45.7,
  maxLat: 48.6,
  minLng: 16.1,
  maxLng: 22.9,
};

// SVG viewBox dimensions for optimal resolution
export const SVG_WIDTH = 1000;
export const SVG_HEIGHT = 600;

/**
 * Converts geographic coordinates (lat/lng) to SVG coordinates (x/y) within the viewBox.
 * Uses Web Mercator projection for Hungary's bounds.
 */
export const coordsToSVG = (latitude: number, longitude: number): SVGPoint => {
  const { minLat, maxLat, minLng, maxLng } = HUNGARY_BOUNDS;

  // Validate coordinates are within Hungary bounds
  if (latitude < minLat || latitude > maxLat || longitude < minLng || longitude > maxLng)
    console.warn(`Coordinates (${latitude}, ${longitude}) outside Hungary bounds`);

  // Simple linear projection for Hungary's small geographic area
  const x = ((longitude - minLng) / (maxLng - minLng)) * SVG_WIDTH;
  const y = SVG_HEIGHT - ((latitude - minLat) / (maxLat - minLat)) * SVG_HEIGHT;
  return { x, y };
};

/**
 * Validates if coordinates are within Hungary's geographic bounds.
 */
export const isWithinHungary = (latitude: number, longitude: number): boolean => {
  const { minLat, maxLat, minLng, maxLng } = HUNGARY_BOUNDS;
  return latitude >= minLat && latitude <= maxLat && longitude >= minLng && longitude <= maxLng;
};
