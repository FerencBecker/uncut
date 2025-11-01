import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle';
import HungaryMap from '@/components/map/HungaryMap';
import type { Studio } from '@/types/map';
import './Map.css';

type MapProps = {
  studios: Studio[];
  loading: boolean;
  error: Error | null;
  kioskMode: boolean;
};

const Map = ({ studios, loading, error, kioskMode }: MapProps) => {
  const { t } = useTranslation();
  return (
    <div className="map-page">
      <div className="map-controls">
        <LanguageToggle />
        <ThemeToggle />
        <AccessibilityToggle />
      </div>

      <header className="map-header">
        <h1 className="map-title">{t('map.title')}</h1>
        <p className="map-subtitle">{t('map.subtitle')}</p>
      </header>

      <main className="map-container">
        {loading && (
          <div className="map-loading">
            <p>{t('common.loading')}</p>
          </div>
        )}
        {error && (
          <div className="map-error">
            <p>
              {t('common.error')}: {error.message}
            </p>
          </div>
        )}
        {!loading && !error && <HungaryMap studios={studios} screensaverMode={false} kioskMode={kioskMode} />}
      </main>
    </div>
  );
};

export default Map;
