import React from 'react';
import './BottomNavigation.css';
import { BiBook } from 'react-icons/bi';
import { RiRunLine } from 'react-icons/ri';
import { IoNutritionOutline } from 'react-icons/io5';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineFlag } from 'react-icons/ai';
import ramadanIcon from '../assets/ramadan.png';
import { ReactComponent as EpageLogo } from '../assets/epage.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPrayingHands } from 'react-icons/fa';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="bottom-nav-container">
        <div className="bottom-nav">
          <button className="nav-item">
            <BiBook className="nav-icon" />
          </button>
          
          <button 
            className={`nav-item ${location.pathname === '/duah-v' ? 'active' : ''}`} 
            onClick={() => navigate('/duah-v')}
          >
            <FaPrayingHands className="nav-icon" />
          </button>

          <button 
            className={`nav-item add-button ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <div className="add-button-inner">
              <img src={ramadanIcon} alt="Ramadan" className="main-icon" />
            </div>
          </button>

          <button 
            className={`nav-item ${location.pathname === '/goals' ? 'active' : ''}`}
            onClick={() => navigate('/goals')}
          >
            <AiOutlineFlag className="nav-icon" />
          </button>

          
          <button className="nav-item">
            <BsPerson className="nav-icon" />
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