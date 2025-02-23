import React, { useState } from 'react';
import './CitySelector.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { cityAdjustments } from '../data/prayerTimes';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Sort cities alphabetically by Albanian name
  const sortedCities = Object.entries(cityAdjustments)
    .sort(([, a], [, b]) => a.nameAlb.localeCompare(b.nameAlb));

  return (
    <div className="city-selector">
      <IoLocationOutline className="city-location-icon" />
      <select 
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="city-select"
        aria-label="Select city"
      >
        {sortedCities.map(([cityId, city]) => (
          <option key={cityId} value={cityId}>
            {city.nameAlb}
          </option>
        ))}
      </select>
      <IoChevronDownOutline className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
    </div>
  );
};

export default CitySelector; 