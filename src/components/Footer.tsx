import React from 'react';
import './Footer.css';
import { ReactComponent as EpageLogo } from '../assets/epage.svg';

const Footer: React.FC = () => {
  return (
    <div className="footer-epage">
      <a 
        href="https://epage.digital" 
        target="_blank" 
        rel="noopener noreferrer"
        className="epage-link"
      >
        <EpageLogo className="epage-logo" />
      </a>
    </div>
  );
};

export default Footer; 