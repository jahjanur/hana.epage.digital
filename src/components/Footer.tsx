import React from 'react';
import './Footer.css';
import FooterLogo from '../assets/FooterEPAGE.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a 
        href="https://epage.digital" 
        target="_blank" 
        rel="noopener noreferrer"
        className="footer-link"
      >
        <img 
          src={FooterLogo} 
          alt="EPAGE Digital" 
          className="footer-logo"
        />
      </a>
    </footer>
  );
};

export default Footer; 