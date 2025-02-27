import React from 'react';
import { ReactComponent as HanaLogo } from '../assets/hanaMainLogoWhite.svg';
import CitySelector from './CitySelector';
import LanguageSelector from './LanguageSelector';
import './AppHeader.css';

interface AppHeaderProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ selectedCity, onCityChange }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
      </div>
      <div className="header-center">
        <HanaLogo className="app-logo" />
      </div>
      <div className="header-right">
        <LanguageSelector />
      </div>
    </header>
  );
};

export default AppHeader; 