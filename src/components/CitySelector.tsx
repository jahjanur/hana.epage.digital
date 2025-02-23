import React from 'react';
import './CitySelector.css';
import { IoLocationOutline } from "react-icons/io5";
import { cityAdjustments } from '../data/prayerTimes';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  // Sort cities alphabetically by Albanian name
  const sortedCities = Object.entries(cityAdjustments)
    .sort(([, a], [, b]) => a.nameAlb.localeCompare(b.nameAlb));

  return (
    <div className="city-selector">
      <select 
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="city-select"
        aria-label="Select city"
      >
        {sortedCities.map(([cityId, city]) => (
          <option key={cityId} value={cityId}>
            {city.nameAlb}
          </option>
        ))}
      </select>
      <IoLocationOutline className="location-icon" aria-hidden="true" />
    </div>
  );
};

export default CitySelector; 