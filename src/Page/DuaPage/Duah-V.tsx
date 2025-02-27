import React, { useState, useEffect } from 'react';
import './Duah-V.css';
import { Dua } from '../../types/duas';
import { getDuas } from '../../services/duaService';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaHome, FaTrophy, FaBook, FaPray } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DuahV: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const getTitle = (dua: Dua) => {
    try {
      if (!dua?.translations) return 'Untitled';
      return dua.translations[language]?.title || 
             dua.translations['en']?.title || 
             Object.values(dua.translations)[0]?.title || 
             'Untitled';
    } catch (err) {
      console.error('Error getting title:', err);
      return 'Untitled';
    }
  };

  const filteredDuas = duas.filter(dua => {
    const title = getTitle(dua).toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const fetchDuas = async () => {
      try {
        setIsLoading(true);
        const response = await getDuas();
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

  if (isLoading) {
    return (
      <div className="duah-v-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="duah-v-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (selectedDua) {
    const currentTranslation = selectedDua.translations[language] || 
                             selectedDua.translations['en'] || 
                             Object.values(selectedDua.translations)[0];

    return (
      <div className="duah-v-container">
        <div className="duah-header">
          <button className="back-button" onClick={() => setSelectedDua(null)}>←</button>
          <h1>{getTitle(selectedDua)}</h1>
        </div>
        <div className="dua-detail">
          {currentTranslation?.content?.map((content, index) => (
            <div key={index} className="dua-content" data-number={`${selectedDua.id}.${index + 1}`}>
              <div className="arabic-text">{Array.isArray(content.arabic) ? content.arabic.join(' ') : content.arabic}</div>
              <div className="transliteration">{Array.isArray(content.transliteration) ? content.transliteration.join(' ') : content.transliteration}</div>
              <div className="translation">{Array.isArray(content.translation) ? content.translation.join(' ') : content.translation}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="duah-v-container">
      <div className="duah-header">
        <h1>Duas</h1>
        <button 
          className="search-button" 
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>

      {isSearchVisible && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search duas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>
      )}

      <div className="duas-list">
        {filteredDuas.map((dua, index) => (
          <div 
            key={dua.id} 
            className="dua-item" 
            onClick={() => setSelectedDua(dua)}
            style={{ '--index': index } as React.CSSProperties}
          >
            <span className="dua-number">{dua.id}</span>
            <span className="dua-title">{getTitle(dua)}</span>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/goals" className="nav-item">
          <FaTrophy />
          <span>Goals</span>
        </Link>
        <Link to="/book" className="nav-item">
          <FaBook />
          <span>Book</span>
        </Link>
        <Link to="/duah-v" className="nav-item active">
          <FaPray />
          <span>Duas</span>
        </Link>
      </nav>
    </div>
  );
};

export default DuahV;