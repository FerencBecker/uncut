import { useTranslation } from 'react-i18next';
import HungaryMap from '@/components/map/HungaryMap';
import type { Studio } from '@/types/map';
import { useAnimation } from './useAnimation';
import './Screensaver.css';

type ScreensaverProps = {
  studios: Studio[];
  kioskMode?: boolean;
};

const Screensaver = ({ studios, kioskMode = false }: ScreensaverProps) => {
  const { t } = useTranslation();
  const { animationKey } = useAnimation({
    studioCount: studios.length,
    enabled: true,
  });

  return (
    <div className="screensaver">
      <div className="screensaver-background" />
      <div className="screensaver-content">
        <div className="screensaver-overlay">
          <div className="screensaver-text-overlay">
            <h1 className="screensaver-title">{t('screensaver.title')}</h1>
            <p className="screensaver-cta">{t('screensaver.touchToBegin')}</p>
          </div>
        </div>
        <HungaryMap key={animationKey} studios={studios} screensaverMode={true} kioskMode={kioskMode} />
      </div>
    </div>
  );
};

export default Screensaver;
