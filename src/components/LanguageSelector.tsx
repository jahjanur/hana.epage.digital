import React, { useState } from 'react';
import './LanguageSelector.css';
import { IoLanguageOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLanguages } from '../translations';

type Language = {
  code: SupportedLanguages;
  name: string;
  flag: string;
};

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'sq' as const, name: 'Shqip', flag: '🇦🇱' },
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' }
  ];

  const getLanguageName = (code: SupportedLanguages) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="language-selector">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLanguageOutline className="language-icon" />
        <span className="language-name">{getLanguageName(language)}</span>
        <IoChevronDownOutline className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 