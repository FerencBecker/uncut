import { useTranslation } from 'react-i18next';
import './Maintenance.css';

const Maintenance = () => {
  const { t } = useTranslation();

  return (
    <div className="maintenance-page">
      <div className="maintenance-content">
        <h1 className="maintenance-title">{t('maintenance.title')}</h1>
        <p className="maintenance-message">{t('maintenance.message')}</p>
        <p className="maintenance-contact">{t('maintenance.contact')}</p>
      </div>
    </div>
  );
};

export default Maintenance;
