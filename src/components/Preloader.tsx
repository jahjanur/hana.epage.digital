import React from 'react';
import './Preloader.css';

const Preloader: React.FC = () => {
  return (
    <div className="preloader-container">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="preloader-video"
      >
        <source src={require('../assets/PreLoader.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Preloader; 