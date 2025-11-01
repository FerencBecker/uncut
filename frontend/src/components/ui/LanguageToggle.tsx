import { useTranslation } from 'react-i18next';
import { Language } from '@/types';
import flagGB from '@/assets/flag-gb.svg';
import flagHU from '@/assets/flag-hu.svg';
import './LanguageToggle.css';

export const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language as Language;
  const otherLanguage: Language = language === 'hu' ? 'en' : 'hu';
  const toggleLanguage = () => void i18n.changeLanguage(otherLanguage);

  const flagSrc = otherLanguage === 'en' ? flagGB : flagHU;
  const label = t(`language.${otherLanguage === 'en' ? 'english' : 'hungarian'}`);
  const ariaLabel = `${t('language.switchTo')} ${label}`;

  return (
    <button className="language-toggle" onClick={toggleLanguage} aria-label={ariaLabel} title={ariaLabel} type="button">
      <img src={flagSrc} alt="" className="language-toggle__flag" aria-hidden="true" />
    </button>
  );
};
