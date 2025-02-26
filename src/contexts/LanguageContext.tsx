import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey, SupportedLanguages, TranslationType } from '../translations';

type LanguageContextType = {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'sq',
  setLanguage: () => {},
  t: (key: TranslationKey) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguages>(() => {
    const saved = localStorage.getItem('language') as SupportedLanguages;
    return saved || 'sq';
  });

  const handleLanguageChange = (newLanguage: SupportedLanguages) => {
    if (newLanguage !== language) {
      localStorage.setItem('language', newLanguage);
      setLanguage(newLanguage);
      // Only reload if we're changing to a different language
      window.location.reload();
    }
  };

  const t = (key: TranslationKey): string => {
    const currentTranslations: TranslationType = translations[language];
    console.log('Current translations:', currentTranslations);
    return currentTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleLanguageChange, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 