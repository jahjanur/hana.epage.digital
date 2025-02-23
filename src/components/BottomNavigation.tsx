import React from 'react';
import './BottomNavigation.css';
import { BiBook } from 'react-icons/bi';
import { RiRunLine } from 'react-icons/ri';
import { IoNutritionOutline } from 'react-icons/io5';
import { BsPerson } from 'react-icons/bs';
import ramadanIcon from '../assets/ramadan.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ReactComponent as EpageLogo } from '../assets/epage.svg';

const BottomNavigation: React.FC = () => {
  return (
    <>
      <div className="bottom-nav-container">
        <div className="bottom-nav">
          <button className="nav-item">
            <BiBook className="nav-icon" />
          </button>
          <button className="nav-item">
          <i className="fas fa-praying-hands"></i>
          </button>
          <button className="nav-item add-button">
            <div className="add-button-inner">
              <img src={ramadanIcon} alt="Ramadan" className="main-icon" />
            </div>
          </button>
          <button className="nav-item">
          <i className="fas fa-calendar-days"></i>
          </button>
          <button className="nav-item">
          <i className="fas fa-bullseye"></i>
          </button>
        </div>
        <div className="powered-by">
          <a href="https://epage.digital/" target="_blank" rel="noopener noreferrer">
            Powered by <EpageLogo className="epage-logo" />
          </a>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation; 