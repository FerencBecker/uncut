import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import huTranslations from '@/locales/hu.json';
import enTranslations from '@/locales/en.json';

const SELECTED_LANGUAGE_KEY = 'selectedLanguage';
const DEFAULT_LANGUAGE = 'hu';

const getInitialLanguage = (): string => {
  const stored = localStorage.getItem(SELECTED_LANGUAGE_KEY);
  if (stored === 'hu' || stored === 'en') {
    return stored;
  }
  return DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  resources: {
    hu: { translation: huTranslations },
    en: { translation: enTranslations },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'hu',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false,
  },
});

// Persist language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(SELECTED_LANGUAGE_KEY, lng);
});

export default i18n;
