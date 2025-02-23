import React from 'react';
import './LoaderScreen.css';
import { ReactComponent as HanaLogo } from '../assets/hanaMainLogoWhite.svg';
import { ReactComponent as BackgroundParticles } from '../assets/BackgroundParticles.svg';

const LoaderScreen: React.FC = () => {
  return (
    <div className="loader-screen">
      <BackgroundParticles className="background-particles back" />
      <BackgroundParticles className="background-particles middle" />
      <BackgroundParticles className="background-particles front" />
      <div className="loader-content">
        <div className="logo-container">
          <div className="logo-ring"></div>
          <div className="logo-ring outer-ring"></div>
          <HanaLogo className="loader-logo" />
        </div>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen; 