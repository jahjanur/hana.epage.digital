import React, { useState } from 'react';
import './CitySelector.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { cityAdjustments, kosovoCityAdjustments } from '../data/prayerTimes';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'macedonia' | 'kosovo'>('macedonia');

  const getCityName = (cityId: string) => {
    const macedoniaCities = cityAdjustments[cityId];
    const kosovoCities = kosovoCityAdjustments[cityId];
    return (macedoniaCities || kosovoCities)?.nameAlb || cityId;
  };

  const handleCountryChange = (country: 'macedonia' | 'kosovo') => {
    setSelectedCountry(country);
    // Select first city of the country by default
    const cities = country === 'macedonia' ? Object.keys(cityAdjustments) : Object.keys(kosovoCityAdjustments);
    if (cities.length > 0) {
      onCityChange(cities[0]);
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
          </div>
          <div className="cities-list">
            {selectedCountry === 'macedonia' ? (
              Object.entries(cityAdjustments).map(([cityId, city]) => (
                <button
                  key={cityId}
                  className={`city-option ${selectedCity === cityId ? 'active' : ''}`}
                  onClick={() => {
                    onCityChange(cityId);
                    setIsOpen(false);
                  }}
                >
                  {city.nameAlb}
                </button>
              ))
            ) : (
              Object.entries(kosovoCityAdjustments).map(([cityId, city]) => (
                <button
                  key={cityId}
                  className={`city-option ${selectedCity === cityId ? 'active' : ''}`}
                  onClick={() => {
                    onCityChange(cityId);
                    setIsOpen(false);
                  }}
                >
                  {city.nameAlb}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector; 