import React from 'react';
import './LoaderScreen.css';
import { ReactComponent as HanaLogo } from '../assets/epage.svg';

const LoaderScreen: React.FC = () => {
  return (
    <div className="loader-screen">
      <div className="loader-container">
        <HanaLogo className="loader-logo" />
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default LoaderScreen; 