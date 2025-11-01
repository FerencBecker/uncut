import { useEffect, useMemo, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import ScreensaverPage from '@/pages/Screensaver';
import MapPage from '@/pages/Map';
import MaintenancePage from '@/pages/Maintenance';
import useInactivityTimer from '@/hooks/useInactivityTimer';
import { useAppQuery } from '@/hooks/useAppQuery';
import { getStudios } from '@/config/api';
import { createQueryClient } from '@/config/queryClient';
import type { Studio } from '@/types/map';
import DemoApp from '@/DemoApp';
import '@/styles/globals.css';

const KIOSK_MODE = import.meta.env.VITE_KIOSK_MODE === 'true';

const App = () => (KIOSK_MODE ? <KioskApp /> : <DemoApp />);

const KioskApp = () => {
  const [queryError, setQueryError] = useState<Error | null>(null);
  const queryClient = useMemo(() => createQueryClient(err => setQueryError(err)), []);

  useEffect(() => {
    document.body.classList.add('kiosk-mode');
    return () => document.body.classList.remove('kiosk-mode');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <KioskAppContent queryError={queryError} />
    </QueryClientProvider>
  );
};

const KioskAppContent = ({ queryError }: { queryError: Error | null }) => {
  type Page = 'screensaver' | 'map';
  const [currentPage, setCurrentPage] = useState<Page>('screensaver');
  const [studios, isLoading, error] = useAppQuery<Studio[]>({
    queryKey: ['studios'],
    queryFn: getStudios,
    placeholderData: [],
  });

  useInactivityTimer({
    timeout: 15000, // 15-second inactivity timer (only active on map page)
    onTimeout: () => setCurrentPage('screensaver'),
    enabled: currentPage === 'map',
  });

  const handleBegin = () => setCurrentPage('map');

  if (error || queryError) return <MaintenancePage />; // Show maintenance page on any API failure
  if (currentPage === 'screensaver') return <ScreensaverPage studios={studios} onBegin={handleBegin} />;
  else return <MapPage studios={studios} loading={isLoading} error={error || null} kioskMode={true} />;
};

export default App;
