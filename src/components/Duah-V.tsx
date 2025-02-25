import React, { useState, useEffect } from 'react';
import './Duah-V.css';
import { Dua } from '../types/duas';
import { getDuas } from '../services/duaService';
import searchIcon from '../assets/search.png';

const DuahV: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDuas = async () => {
      try {
        setIsLoading(true);
        const response = await getDuas();
        setDuas(response.duas);
      } catch (err) {
        setError('Failed to load duas. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuas();
  }, []);

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filteredDuas = duas.filter(dua => 
    dua.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDuaClick = (dua: Dua) => {
    setSelectedDua(dua);
  };

  if (isLoading) {
    return (
      <div className="duah-v-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading duas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="duah-v-container">
        <div className="error-message">
          <span>⚠️</span>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (selectedDua) {
    return (
      <div className="duah-v-container">
        <button className="back-button" onClick={() => setSelectedDua(null)}>
          <span className="back-icon">←</span>
          <span className="back-text"></span>
        </button>
        <div className="duah-header">
          <h1>{selectedDua.title}</h1>
        </div>
        <div className="dua-detail">
          {selectedDua.contents?.map((content, index) => (
            <div key={index} className="dua-content">
              <div className="arabic-text">{content.arabic}</div>
              <div className="transliteration">{content.transliteration}</div>
              <div className="translation">{content.translation}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="duah-v-container">
      <div className="duah-header main-header">
        <h1>Duas Collection</h1>
        <button 
          className="search-toggle" 
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          aria-label="Toggle search"
        >
          <img src={searchIcon} alt="" />
        </button>
      </div>
      
      <div className={`search-wrapper ${isSearchVisible ? 'visible' : ''}`}>
        <input
          type="text"
          placeholder="Search duas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          autoFocus
        />
      </div>

      <div className="duas-grid">
        {filteredDuas.map((dua) => (
          <div 
            key={dua.id} 
            className="dua-card" 
            onClick={() => handleDuaClick(dua)}
          >
            <div className="dua-card-content">
              <span className="dua-number">{dua.id}</span>
              <h2 className="dua-title">{dua.title}</h2>
              <div className="dua-card-footer">
                <span className="read-more">Lexo →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuahV;