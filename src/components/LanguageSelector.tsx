import React, { useState } from 'react';
import './LanguageSelector.css';
import { IoLanguageOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'sq', name: 'Shqip' },
    { code: 'en', name: 'English' }
  ];

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="language-selector">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLanguageOutline className="language-icon" />
        <span className="language-name">{getLanguageName(selectedLanguage)}</span>
        <IoChevronDownOutline className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${selectedLanguage === lang.code ? 'active' : ''}`}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 