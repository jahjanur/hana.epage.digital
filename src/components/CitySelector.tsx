import React, { useState, useEffect } from 'react';
import './CitySelector.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { cityAdjustments, kosovoCityAdjustments, austriaCityAdjustments, swissCityAdjustments, germanCityAdjustments } from '../data/prayerTimes';
import { useLanguage } from '../contexts/LanguageContext';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'macedonia' | 'kosovo' | 'austria' | 'switzerland' | 'germany'>(() => {
    // Initialize from localStorage or default to 'macedonia'
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry === 'macedonia' || savedCountry === 'kosovo' || 
        savedCountry === 'austria' || savedCountry === 'switzerland' || savedCountry === 'germany') {
      return savedCountry;
    }
    return 'macedonia';
  });

  // Effect to initialize the selected city from localStorage
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      onCityChange(savedCity);
    }
  }, []);

  const getCityName = (cityId: string) => {
    const cityData = germanCityAdjustments[cityId] || 
                    austriaCityAdjustments[cityId] || 
                    swissCityAdjustments[cityId] || 
                    kosovoCityAdjustments[cityId] || 
                    cityAdjustments[cityId];

    if (!cityData) return cityId;

    // Return the appropriate name based on the current language
    switch (language) {
      case 'sq':
        return cityData.nameAlb;
      case 'en':
        return cityData.nameEn;
      case 'de':
        return cityData.name;
      case 'tr':
        return cityData.nameTr;
      default:
        return cityData.name;
    }
  };

  const handleCountryChange = (country: 'macedonia' | 'kosovo' | 'austria' | 'switzerland' | 'germany') => {
    setSelectedCountry(country);
    localStorage.setItem('selectedCountry', country);
    
    // Select first city of the country by default
    let cities: string[] = [];
    switch(country) {
      case 'macedonia':
        cities = Object.keys(cityAdjustments);
        break;
      case 'kosovo':
        cities = Object.keys(kosovoCityAdjustments);
        break;
      case 'austria':
        cities = Object.keys(austriaCityAdjustments);
        break;
      case 'switzerland':
        cities = Object.keys(swissCityAdjustments);
        break;
      case 'germany':
        cities = Object.keys(germanCityAdjustments);
        break;
      default:
        cities = [];
    }
    if (cities.length > 0) {
      const newCity = cities[0];
      onCityChange(newCity);
      localStorage.setItem('selectedCity', newCity);
    }
  };

  const handleCityChange = (cityId: string) => {
    onCityChange(cityId);
    localStorage.setItem('selectedCity', cityId);
    setIsOpen(false);
  };

  const getCitiesList = () => {
    switch(selectedCountry) {
      case 'macedonia':
        return Object.entries(cityAdjustments);
      case 'kosovo':
        return Object.entries(kosovoCityAdjustments);
      case 'austria':
        return Object.entries(austriaCityAdjustments);
      case 'switzerland':
        return Object.entries(swissCityAdjustments);
      case 'germany':
        return Object.entries(germanCityAdjustments);
      default:
        return Object.entries(cityAdjustments);
    }
  };

  return (
    <div className="city-selector">
      <button
        className="city-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLocationOutline className="city-icon" />
        <span className="city-name">{getCityName(selectedCity)}</span>
        <IoChevronDownOutline className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="city-dropdown">
          <div className="country-selector">
            <button
              className={`country-option ${selectedCountry === 'macedonia' ? 'active' : ''}`}
              onClick={() => handleCountryChange('macedonia')}
            >
              {t('macedonia')}
            </button>
            <button
              className={`country-option ${selectedCountry === 'kosovo' ? 'active' : ''}`}
              onClick={() => handleCountryChange('kosovo')}
            >
              {t('kosovo')}
            </button>
            <button
              className={`country-option ${selectedCountry === 'austria' ? 'active' : ''}`}
              onClick={() => handleCountryChange('austria')}
            >
              {t('austria')}
            </button>
            <button
              className={`country-option ${selectedCountry === 'switzerland' ? 'active' : ''}`}
              onClick={() => handleCountryChange('switzerland')}
            >
              {t('switzerland')}
            </button>
            <button
              className={`country-option ${selectedCountry === 'germany' ? 'active' : ''}`}
              onClick={() => handleCountryChange('germany')}
            >
              {t('germany')}
            </button>
          </div>
          <div className="cities-list">
            {getCitiesList().map(([cityId, city]) => (
              <button
                key={cityId}
                className={`city-option ${selectedCity === cityId ? 'active' : ''}`}
                onClick={() => handleCityChange(cityId)}
              >
                {getCityName(cityId)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector; 