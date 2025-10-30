import { coordsToSVG } from '@/utils/mapCoordinates';
import './LocationMarker.css';

type LocationMarkerProps = {
  latitude: number;
  longitude: number;
  label: string;
};

const LocationMarker = ({ latitude, longitude, label }: LocationMarkerProps) => {
  const { x, y } = coordsToSVG(latitude, longitude);
  return (
    <g>
      <circle cx={x} cy={y} className="location-marker" data-testid="location-marker-circle" />
      <text x={x} y={y - 15} className="location-marker-label" data-testid="location-marker-label">
        {label}
      </text>
    </g>
  );
};

export default LocationMarker;
