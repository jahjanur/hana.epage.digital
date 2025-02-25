import React from 'react';
import './LoaderScreen.css';
import LogoHanaLoader from '../assets/LogoHanaLoader.svg';

const LoaderScreen: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="powered-by">
        Powered by <span className="epage">EPAGE</span>
      </div>
    </div>
  );
};

export default LoaderScreen; 