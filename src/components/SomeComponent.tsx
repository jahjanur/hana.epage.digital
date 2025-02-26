import { useLanguage } from '../contexts/LanguageContext';

const SomeComponent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('save')}</button>
    </div>
  );
}; 