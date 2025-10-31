import type { CountySeat } from '@/data/countySeats';
import { COUNTY_SEATS } from '@/data/countySeats';
import type { Studio } from '@/types/map';
import { HUNGARY_PATH } from './hungaryPath';
import COUNTY_DATA from './countyPaths.json';
import { coordsToSVG } from '@/utils/mapCoordinates';
import StudioMarker from './StudioMarker';
import './HungaryMap.css';

const COUNTY_PATHS = COUNTY_DATA.counties;

type HungaryMapProps = {
  studios: Studio[];
  screensaverMode: boolean;
};

type CountyBoundaryProps = {
  path: string;
};

const CountyBoundary = ({ path }: CountyBoundaryProps) => <path className="county-boundary" d={path} />;

const CountySeatMarker = ({ seat }: { seat: CountySeat }) => {
  const { x, y } = coordsToSVG(seat.latitude, seat.longitude);
  const markerClass = seat.hasStudio ? 'seat-with-studio' : 'seat-without-studio';
  return (
    <g>
      <circle cx={x} cy={y} r="6" className={markerClass} />
      <text x={x} y={y - 10} className="seat-label">
        {seat.name}
      </text>
    </g>
  );
};

const HungaryMap = ({ studios, screensaverMode }: HungaryMapProps) => {
  return (
    <svg
      className="hungary-map"
      viewBox="0 0 1000 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Map of Hungary"
    >
      {/* SVG Definitions for gradients */}
      <defs>
        <radialGradient id="studioMarkerGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--heritage-gold)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity="1" />
        </radialGradient>
      </defs>

      <path className="country-fill" d={HUNGARY_PATH} />
      {Object.entries(COUNTY_PATHS).map(([countyName, path]) => (
        <CountyBoundary key={countyName} path={path} />
      ))}

      {!screensaverMode && COUNTY_SEATS.map(seat => <CountySeatMarker key={seat.name} seat={seat} />)}
      <path className="country-outline" d={HUNGARY_PATH} />

      {studios.map((studio, index) => (
        <StudioMarker key={studio.id} studio={studio} index={index} screensaverMode={screensaverMode} />
      ))}
    </svg>
  );
};

export default HungaryMap;
