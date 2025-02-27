import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="background-container">
      <div className="background-wrapper">
        <img 
          src={`${process.env.PUBLIC_URL}/assets/background.svg`} 
          alt="background" 
          className="background-image" 
        />
      </div>
    </div>
  );
};

export default Background; 