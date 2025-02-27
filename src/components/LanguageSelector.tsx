import React, { useState } from 'react';
import './LanguageSelector.css';
import { IoLanguageOutline, IoChevronDownOutline } from 'react-icons/io5';
import { useLanguage } from '../contexts/LanguageContext';

// Define supported languages type
type SupportedLanguages = 'sq' | 'en' | 'tr' | 'mk' | 'it' | 'de';

const languages: { code: SupportedLanguages; name: string }[] = [
  { code: 'sq', name: 'Shqip' },
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Turkish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'it', name: 'Italian' },
  { code: 'de', name: 'Deutsch' },
];

const getLanguageName = (code: SupportedLanguages): string => {
  return languages.find(lang => lang.code === code)?.name || code;
};

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (code: SupportedLanguages) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLanguageOutline className="language-icon" />
        <span className="language-name">
          {getLanguageName(language as SupportedLanguages)}
        </span>
        <IoChevronDownOutline className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map(({ code, name }) => (
            <button
              key={code}
              className={`language-option ${language === code ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(code)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 