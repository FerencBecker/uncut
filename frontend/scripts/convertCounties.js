// Convert Hungary counties GeoJSON to simplified SVG paths
import { readFileSync } from 'fs';

const HUNGARY_BOUNDS = {
  minLat: 45.7,
  maxLat: 48.6,
  minLng: 16.1,
  maxLng: 22.9,
};

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 600;

const coordsToSVG = ([lng, lat]) => {
  const { minLat, maxLat, minLng, maxLng } = HUNGARY_BOUNDS;
  const x = ((lng - minLng) / (maxLng - minLng)) * SVG_WIDTH;
  const y = SVG_HEIGHT - ((lat - minLat) / (maxLat - minLat)) * SVG_HEIGHT;
  return [x.toFixed(2), y.toFixed(2)];
};

const simplifyCoords = (coords, factor = 4) => coords.filter((_, i) => i % factor === 0 || i === coords.length - 1);

// Read the GeoJSON
const geojson = JSON.parse(readFileSync('./scripts/counties-raw.json', 'utf8'));

const counties = {};

geojson.features.forEach(feature => {
  const countyName = feature.properties.county;
  const coords = feature.geometry.coordinates[0];
  const simplified = simplifyCoords(coords, 4); // Simplify coordinates (keep every 4th point)

  // Convert to SVG
  const svgCoords = simplified.map(coordsToSVG);
  const pathData = `M ${svgCoords[0].join(',')} ${svgCoords
    .slice(1)
    .map(([x, y]) => `L ${x},${y}`)
    .join(' ')} Z`;
  counties[countyName] = pathData;
});

// Generate JSON file with metadata
const output = {
  _metadata: {
    source: 'OpenStreetMap / geoHungary',
    url: 'https://github.com/wuerdo/geoHungary',
    license: 'PDDL (Public Domain Dedication and License)',
    simplified: 'Every 4th coordinate point for performance'
  },
  counties: counties
};

console.log(JSON.stringify(output, null, 2));
