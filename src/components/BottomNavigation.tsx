import React from 'react';
import './BottomNavigation.css';
import { BiHomeAlt2, BiBook } from 'react-icons/bi';
import { FaPrayingHands } from 'react-icons/fa';
import { IoTrophyOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav">
        <button 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <BiHomeAlt2 className="nav-icon" />
        </button>

        <button 
          className={`nav-item ${location.pathname === '/goals' ? 'active' : ''}`}
          onClick={() => navigate('/goals')}
        >
          <IoTrophyOutline className="nav-icon" />
        </button>

        <button 
          className={`nav-item ${location.pathname === '/book-v' ? 'active' : ''}`}
          onClick={() => navigate('/book-v')}
        >
          <BiBook className="nav-icon" />
        </button>

        <button 
          className={`nav-item ${location.pathname === '/duah-v' ? 'active' : ''}`}
          onClick={() => navigate('/duah-v')}
        >
          <FaPrayingHands className="nav-icon" />
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation; 