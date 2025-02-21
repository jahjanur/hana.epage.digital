import React, { useState } from 'react';
import './LanguagePicker.css';
import { IoLanguage, IoChevronDown } from 'react-icons/io5';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'sq', name: 'Shqip' },    // Albanian name for Albanian
  { code: 'en', name: 'English' },   // Added English
  { code: 'tr', name: 'Turkish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'it', name: 'Italian' },
  { code: 'de', name: 'Deutsch' },
];

interface LanguagePickerProps {
  onLanguageChange: (language: Language) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ onLanguageChange }) => {
  // Set Albanian as default by finding it in the languages array
  const defaultLanguage = languages.find(lang => lang.code === 'sq') || languages[0];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(defaultLanguage);

  const handleSelect = (language: Language) => {
    setSelectedLang(language);
    setIsOpen(false);
    onLanguageChange(language);
  };

  return (
    <div className="language-picker">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLanguage className="language-icon" />
        <span className="selected-language">
          {selectedLang.name}
        </span>
        <IoChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${selectedLang.code === lang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang)}
            >
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagePicker; 