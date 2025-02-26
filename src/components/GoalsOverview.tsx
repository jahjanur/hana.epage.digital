import React from 'react';
import { motion } from 'framer-motion';
import { useGoals } from '../contexts/GoalsContext';
import { FaPrayingHands, FaMosque, FaQuran } from 'react-icons/fa';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';
import { useNavigate } from 'react-router-dom';

const GoalsOverview: React.FC = () => {
  const { goals, isAuthenticated, getTodayProgress } = useGoals();
  const navigate = useNavigate();
  const progress = getTodayProgress();

  if (!isAuthenticated) {
    return (
      <motion.div 
        className="goals-overview empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="goals-illustration">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaPrayingHands size={40} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <FaMosque size={40} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <FaQuran size={40} />
          </motion.div>
        </div>
        <h3>Track Your Ramadan Journey</h3>
        <p>Sign in to start tracking your daily prayers, taraweeh, and Quran reading</p>
        <button 
          className="start-tracking-btn"
          onClick={() => navigate('/goals')}
        >
          Get Started
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="goals-overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="progress-items">
        <div className="progress-item">
          <CircularProgressWithLabel
            value={(progress.prayers / 5) * 100}
            label="Prayers"
            icon={<FaPrayingHands />}
          />
        </div>
        <div className="progress-item">
          <CircularProgressWithLabel
            value={(progress.taraweeh / 20) * 100}
            label="Taraweeh"
            icon={<FaMosque />}
          />
        </div>
        <div className="progress-item">
          <CircularProgressWithLabel
            value={Math.min((progress.quran / 10) * 100, 100)}
            label="Quran"
            icon={<FaQuran />}
          />
        </div>
      </div>
      <button 
        className="view-details-btn"
        onClick={() => navigate('/goals')}
      >
        View Details
      </button>
    </motion.div>
  );
};

export default GoalsOverview; 