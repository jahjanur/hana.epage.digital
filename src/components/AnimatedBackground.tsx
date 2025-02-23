import React from 'react';
import { ReactComponent as Particle2 } from '../assets/Particle2.svg';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      <Particle2 className="moving-outline-large" />
      <Particle2 className="moving-outline" />
    </div>
  );
};

export default AnimatedBackground; 