import React, { useState, useEffect } from 'react';
import './Duah-V.css';
import { Dua } from '../types/duas';
import { getDuas } from '../services/duaService';
import AppHeader from './AppHeader';
import Footer from './Footer';

const DuahV: React.FC = () => {
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
        setDuas(response.duas);
      } catch (err) {
        setError('Failed to load duas. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuas();
  }, []);

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
        <Footer />
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
        <Footer />
      </div>
    );
  }

  if (selectedDua) {
    return (
      <div className="duah-v-container">
        <AppHeader selectedCity={selectedCity} onCityChange={setSelectedCity} />
        <div className="duah-header">
          <h1>{selectedDua.title}</h1>
        </div>
        <div className="dua-detail">
          <button 
            className="dua-close-button" 
            onClick={() => setSelectedDua(null)}
            aria-label="Close dua"
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
          {selectedDua.contents?.map((content, index) => (
            <div key={index} className="dua-content">
              <div className="arabic-text">{content.arabic}</div>
              <div className="transliteration">{content.transliteration}</div>
              <div className="translation">{content.translation}</div>
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
            <h1 className="book-title">Koleksioni i Duave</h1>
            <p className="book-subtitle">Lutjet e Profetit Muhamed ﷺ</p>
            <div className="title-accent"></div>
          </div>
          <div className="title-decoration right"></div>
        </div>
      </div>

      <div className="duas-grid">
        {duas.map((dua) => (
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
      <Footer />
    </div>
  );
};

export default DuahV;