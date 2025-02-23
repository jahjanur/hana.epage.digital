import React from 'react';
import BGImage from '../assets/BG.svg';
import './Background.css';

const Background: React.FC = () => {
  return (
    <div className="background-container">
      <div className="background-wrapper">
        <img src={BGImage} alt="background" className="background-image" />
      </div>
    </div>
  );
};

export default Background; 