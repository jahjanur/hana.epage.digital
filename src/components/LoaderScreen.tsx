import React from 'react';
import './LoaderScreen.css';
import LogoHanaLoader from '../assets/LogoHanaLoader.svg';

const LoaderScreen: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={LogoHanaLoader} alt="Hana Logo" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.2
        }} />
      </div>
      <div className="powered-by">
        Powered by <span className="epage">EPAGE</span>
      </div>
    </div>
  );
};

export default LoaderScreen; 