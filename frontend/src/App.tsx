import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import '@/styles/globals.css';

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('common.appTitle')}</h1>
        <p>Fotóműtermek - Néprajzi Múzeum</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>
    </div>
  );
};

export default App;
