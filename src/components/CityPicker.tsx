import React, { useState } from 'react';
import { IoLocationOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import './CityPicker.css';

interface CityPickerProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CityPicker: React.FC<CityPickerProps> = ({ selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cities = [
    { id: 'gostivar', name: 'Gostivar' },
    { id: 'tetovo', name: 'Tetovo' },
    { id: 'skopje', name: 'Skopje' },
    { id: 'struga', name: 'Struga' },
    { id: 'ohrid', name: 'Ohrid' },
    { id: 'debar', name: 'Dibër' }
  ];

  const handleCitySelect = (cityId: string) => {
    onCityChange(cityId);
    setIsOpen(false);
  };

  return (
    <div className="city-picker">
      <button 
        className="city-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLocationOutline className="city-icon" />
        <span className="city-name">
          {cities.find(city => city.id === selectedCity)?.name || selectedCity}
        </span>
        {isOpen ? <IoChevronUp /> : <IoChevronDown />}
      </button>

      {isOpen && (
        <div className="city-dropdown">
          {cities.map(city => (
            <button
              key={city.id}
              className={`city-option ${selectedCity === city.id ? 'active' : ''}`}
              onClick={() => handleCitySelect(city.id)}
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