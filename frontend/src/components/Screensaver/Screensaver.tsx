import HungaryMap from '@/components/map/HungaryMap';
import type { Studio } from '@/types/map';
import { useAnimation } from './useAnimation';
import './Screensaver.css';

type ScreensaverProps = {
  studios: Studio[];
  kioskMode?: boolean;
};

const Screensaver = ({ studios, kioskMode = false }: ScreensaverProps) => {
  const { animationKey } = useAnimation({
    studioCount: studios.length,
    enabled: true,
  });

  return (
    <div className="screensaver">
      <div className="screensaver-background" />
      <div className="screensaver-overlay" />
      <div className="screensaver-content">
        <HungaryMap key={animationKey} studios={studios} screensaverMode={true} kioskMode={kioskMode} />
      </div>
    </div>
  );
};

export default Screensaver;
