import React from 'react';
import './BottomNavigation.css';
import { AiOutlineHome, AiOutlineFlag } from 'react-icons/ai';
import { FaPrayingHands } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav-container">
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <AiOutlineHome className="nav-icon" />
        </button>

        <button 
          className={`nav-item ${location.pathname === '/goals' ? 'active' : ''}`}
          onClick={() => navigate('/goals')}
        >
          <FaTrophy className="nav-icon" />
        </button>
        
        <button 
          className={`nav-item ${location.pathname === '/duah-v' ? 'active' : ''}`}
          onClick={() => navigate('/duah-v')}
        >
          <FaPrayingHands className="nav-icon" />
        </button>

        <button 
          className={`nav-item ${location.pathname === '/quran' ? 'active' : ''}`}
          onClick={() => navigate('/quran')}
        >
          <AiOutlineFlag className="nav-icon" />
        </button>
      </nav>
    </div>
  );
};

export default BottomNavigation; 