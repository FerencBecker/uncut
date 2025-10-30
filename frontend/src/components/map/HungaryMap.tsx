import type { CountySeat } from '@/data/countySeats';
import { COUNTY_SEATS } from '@/data/countySeats';
import { HUNGARY_PATH } from './hungaryPath';
import COUNTY_DATA from './countyPaths.json';
import { coordsToSVG } from '@/utils/mapCoordinates';
import './HungaryMap.css';
import * as React from 'react';

const COUNTY_PATHS = COUNTY_DATA.counties;

type HungaryMapProps = {
  showCounties: boolean;
  showCountySeats: boolean;
  children?: React.ReactNode;
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

const HungaryMap = ({ showCounties, showCountySeats, children }: HungaryMapProps) => {
  return (
    <svg
      className="hungary-map"
      viewBox="0 0 1000 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Map of Hungary"
    >
      <path className="country-fill" d={HUNGARY_PATH} />
      {showCounties &&
        Object.entries(COUNTY_PATHS).map(([countyName, path]) => <CountyBoundary key={countyName} path={path} />)}

      {showCountySeats && COUNTY_SEATS.map(seat => <CountySeatMarker key={seat.name} seat={seat} />)}
      <path className="country-outline" d={HUNGARY_PATH} />

      {/* Custom children (e.g., studio markers) */}
      {children}
    </svg>
  );
};

export default HungaryMap;
