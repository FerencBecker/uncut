import { useTranslation } from 'react-i18next';
import { Language } from '@/types';
import './LanguageToggle.css';

export const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language as Language;
  const otherLanguage: Language = language === 'hu' ? 'en' : 'hu';
  const toggleLanguage = () => void i18n.changeLanguage(otherLanguage);

  const flag = otherLanguage === 'en' ? '🇬🇧' : '🇭🇺';
  const label = t(`language.${otherLanguage === 'en' ? 'english' : 'hungarian'}`);
  const ariaLabel = `${t('language.switchTo')} ${label}`;

  return (
    <button className="language-toggle" onClick={toggleLanguage} aria-label={ariaLabel} title={ariaLabel} type="button">
      <span className="language-toggle__icon" aria-hidden="true">
        {flag}
      </span>
      <span className="language-toggle__label">{label}</span>
    </button>
  );
};
