import React, { useState, useCallback } from 'react';
import './DuaDisplay.css';
import { IoBookOutline, IoChevronDown, IoCopyOutline, IoShareSocialOutline } from 'react-icons/io5';

interface DuaContent {
  title: string;
  arabic: string;
  translations: {
    sq: string;
    en: string;
  };
}

const duas: DuaContent[] = [
  {
    title: 'Nijeti',
    arabic: 'Nevejtu en esume gaden lil-lahi teala',
    translations: {
      sq: 'Kam për qëllim të agjëroj nesër për hir të Allahut të Madhëruar',
      en: 'I intend to fast tomorrow for the sake of Allah'
    }
  },
  {
    title: 'Duaja e iftarit',
    arabic: 'Allahumme leke sumtu ve bike amentu ve alejke tevekkeltu ve ala rizkike eftartu',
    translations: {
      sq: 'O Allah! Për Ty agjërova, në Ty besova, Ty të jam mbështetur dhe me furnizimin Tënd po bëj iftar',
      en: 'O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance'
    }
  }
];

const DuaDisplay: React.FC<{ currentLanguage: string }> = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  }, []);

  const handleShare = useCallback((dua: DuaContent) => {
    const text = `${dua.title}\n${dua.arabic}\n${dua.translations[currentLanguage === 'sq' ? 'sq' : 'en']}`;
    if (navigator.share) {
      navigator.share({
        title: dua.title,
        text: text
      }).catch(console.error);
    }
  }, [currentLanguage]);

  return (
    <div className="dua-display">
      {showCopyNotification && (
        <div className="copy-notification">
          Teksti u kopjua!
        </div>
      )}
      <button 
        className="dua-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoBookOutline className="dua-icon" />
        <span className="selected-dua">Duatë</span>
        <IoChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="dua-dropdown">
          {duas.map((dua, index) => (
            <div key={index} className="dua-section">
              <div className="dua-header">
                <h3>{dua.title}</h3>
                <div className="dua-actions">
                  <button 
                    className="action-button" 
                    onClick={() => handleCopy(dua.arabic)}
                    title="Kopjo tekstin"
                  >
                    <IoCopyOutline />
                  </button>
                  <button 
                    className="action-button"
                    onClick={() => handleShare(dua)}
                    title="Shpërndaje"
                  >
                    <IoShareSocialOutline />
                  </button>
                </div>
              </div>
              <div className="dua-content">
                <p className="arabic-text">{dua.arabic}</p>
                <p className="translation">
                  {dua.translations[currentLanguage === 'sq' ? 'sq' : 'en']}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DuaDisplay; 