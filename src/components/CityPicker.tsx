import React, { useState, useRef, useEffect } from 'react';
import './CityPicker.css';
import { cityAdjustments } from '../data/prayerTimes';

interface CityPickerProps {
  onCityChange: (cityId: string) => void;
  selectedCity: string;
}

const CityPicker: React.FC<CityPickerProps> = ({ onCityChange, selectedCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cities = Object.entries(cityAdjustments).map(([id, city]) => ({
    id,
    name: city.nameAlb
  }));

  const selectedCityName = cityAdjustments[selectedCity]?.nameAlb || 'Gostivar';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-picker" ref={dropdownRef}>
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="language-icon">🕌</span>
        <span className="language-code">{selectedCityName}</span>
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {cities.map((city) => (
            <button
              key={city.id}
              className={`language-option ${selectedCity === city.id ? 'active' : ''}`}
              onClick={() => {
                onCityChange(city.id);
                setIsOpen(false);
              }}
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityPicker; 