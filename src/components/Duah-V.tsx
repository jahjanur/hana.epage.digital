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
    return (
      <div className="duah-v-container">
        <div className="duah-header">
          <button className="back-button" onClick={() => setSelectedDua(null)}>←</button>
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
      <div className="duah-header">
        <h1>Duas</h1>
        <button 
          className="search-button" 
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <img src={searchIcon} alt="Search" />
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
        {filteredDuas.map((dua) => (
          <div key={dua.id} className="dua-item" onClick={() => handleDuaClick(dua)}>
            <span className="dua-number">{dua.id}</span>
            <span className="dua-title">{dua.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuahV; 