import React, { useState, useEffect } from 'react';
import './CitySelector.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { cityAdjustments, kosovoCityAdjustments, austriaCityAdjustments, swissCityAdjustments } from '../data/prayerTimes';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'macedonia' | 'kosovo' | 'austria' | 'switzerland'>(() => {
    // Initialize from localStorage or default to 'macedonia'
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry === 'macedonia' || savedCountry === 'kosovo' || 
        savedCountry === 'austria' || savedCountry === 'switzerland') {
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
    const macedoniaCities = cityAdjustments[cityId];
    const kosovoCities = kosovoCityAdjustments[cityId];
    const austrianCities = austriaCityAdjustments[cityId];
    const swissCities = swissCityAdjustments[cityId];
    return (macedoniaCities || kosovoCities || austrianCities || swissCities)?.nameAlb || cityId;
  };

  const handleCountryChange = (country: 'macedonia' | 'kosovo' | 'austria' | 'switzerland') => {
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

  const getCitiesList = (): [string, { name: string; nameAlb: string; adjustment: { [key: string]: number } }][] => {
    switch(selectedCountry) {
      case 'macedonia':
        return Object.entries(cityAdjustments);
      case 'kosovo':
        return Object.entries(kosovoCityAdjustments);
      case 'austria':
        return Object.entries(austriaCityAdjustments);
      case 'switzerland':
        return Object.entries(swissCityAdjustments);
      default:
        return [];
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
              Maqedonia
            </button>
            <button
              className={`country-option ${selectedCountry === 'kosovo' ? 'active' : ''}`}
              onClick={() => handleCountryChange('kosovo')}
            >
              Kosova
            </button>
            <button
              className={`country-option ${selectedCountry === 'austria' ? 'active' : ''}`}
              onClick={() => handleCountryChange('austria')}
            >
              Austria
            </button>
            <button
              className={`country-option ${selectedCountry === 'switzerland' ? 'active' : ''}`}
              onClick={() => handleCountryChange('switzerland')}
            >
              Zvicra
            </button>
          </div>
          <div className="cities-list">
            {getCitiesList().map(([cityId, city]) => (
              <button
                key={cityId}
                className={`city-option ${selectedCity === cityId ? 'active' : ''}`}
                onClick={() => handleCityChange(cityId)}
              >
                {city.nameAlb}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector; 