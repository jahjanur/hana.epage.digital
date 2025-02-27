import React, { useState, useEffect } from 'react';
import './Duah-V.css';
import { Dua } from '../types/duas';
import { getDuas } from '../services/duaService';
import AppHeader from './AppHeader';
import Footer from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

const DuahV: React.FC = () => {
  const { language } = useLanguage();
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('gostivar');

  useEffect(() => {
    const fetchDuas = async () => {
      try {
        setIsLoading(true);
        const response = await getDuas();
        console.log('Fetched duas:', response);
        setDuas(response);
      } catch (err) {
        console.error('Error fetching duas:', err);
        setError('Failed to load duas. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuas();
  }, []);

  const getLocalizedContent = (dua: Dua) => {
    console.log('Current language:', language);
    console.log('Available translations:', Object.keys(dua.translations));
    
    // Try to get the translation in the current language, then fall back in this order:
    const translation = dua.translations[language] || 
                       dua.translations[language === 'tr' ? 'en' : 'tr'] || // If Turkish is selected but missing, try English, else try Turkish
                       dua.translations[language === 'de' ? 'en' : 'de'] || // If German is selected but missing, try English, else try German
                       dua.translations['en'] || 
                       dua.translations['sq'] ||
                       Object.values(dua.translations)[0];
                       
    console.log('Selected translation:', translation?.title);
    return translation;
  };

  if (isLoading) {
    return (
      <div className="duah-v-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>
            {language === 'tr' ? 'Dualar yükleniyor...' :
             language === 'de' ? 'Bittgebete werden geladen...' :
             language === 'en' ? 'Loading duas...' :
             'Duke ngarkuar duatë...'}
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="duah-v-container">
        <div className="error-message">
          <span>⚠️</span>
          <p>
            {language === 'tr' ? 'Duaları yüklerken bir hata oluştu. Lütfen tekrar deneyin.' :
             language === 'de' ? 'Fehler beim Laden der Bittgebete. Bitte versuchen Sie es erneut.' :
             language === 'en' ? 'Failed to load duas. Please try again.' :
             'Dështoi ngarkimi i duave. Ju lutemi provoni përsëri.'}
          </p>
          <button onClick={() => window.location.reload()}>
            {language === 'tr' ? 'Tekrar Dene' :
             language === 'de' ? 'Erneut Versuchen' :
             language === 'en' ? 'Try Again' :
             'Provo Përsëri'}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (selectedDua) {
    const localizedContent = getLocalizedContent(selectedDua);
    return (
      <div className="duah-v-container">
        <AppHeader selectedCity={selectedCity} onCityChange={setSelectedCity} />
        <div className="duah-header">
          <h1>{localizedContent?.title}</h1>
        </div>
        <div className="dua-detail">
          <button 
            className="dua-close-button" 
            onClick={() => setSelectedDua(null)}
            aria-label={
              language === 'tr' ? 'Duayı kapat' :
              language === 'de' ? 'Bittgebet schließen' :
              language === 'en' ? 'Close dua' :
              'Mbyll duanë'
            }
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {localizedContent?.content.map((content, index) => (
            <div key={index} className="dua-content">
              <div className="arabic-text">{Array.isArray(content.arabic) ? content.arabic.join(' ') : content.arabic}</div>
              <div className="transliteration">{Array.isArray(content.transliteration) ? content.transliteration.join(' ') : content.transliteration}</div>
              <div className="translation">{Array.isArray(content.translation) ? content.translation.join(' ') : content.translation}</div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="duah-v-container">
      <AppHeader selectedCity={selectedCity} onCityChange={setSelectedCity} />
      <div className="duah-header">
        <div className="book-title-wrapper">
          <div className="title-decoration left"></div>
          <div className="title-content">
            <h1 className="book-title">
              {language === 'en' ? 'Collection of Duas' :
               language === 'tr' ? 'Dua Koleksiyonu' :
               language === 'de' ? 'Sammlung von Bittgebeten' :
               'Koleksioni i Duave'}
            </h1>
            <p className="book-subtitle">
              {language === 'en' ? "Prayers of Prophet Muhammad ﷺ" :
               language === 'tr' ? "Peygamber Muhammed'in (ﷺ) Duaları" :
               language === 'de' ? "Gebete des Propheten Muhammad ﷺ" :
               "Lutjet e Profetit Muhamed ﷺ"}
            </p>
            <div className="title-accent"></div>
          </div>
          <div className="title-decoration right"></div>
        </div>
      </div>

      <div className="duas-grid">
        {duas.map((dua) => {
          const localizedContent = getLocalizedContent(dua);
          return (
            <div 
              key={dua.id} 
              className="dua-card" 
              onClick={() => setSelectedDua(dua)}
            >
              <div className="dua-card-content">
                <span className="dua-number">{dua.id}</span>
                <h2 className="dua-title">{localizedContent?.title}</h2>
                <div className="dua-card-footer">
                  <span className="read-more">
                    {language === 'en' ? 'Read →' :
                     language === 'tr' ? 'Oku →' :
                     language === 'de' ? 'Lesen →' :
                     'Lexo →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default DuahV;