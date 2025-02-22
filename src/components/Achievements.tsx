import React, { useState } from 'react';
import { BiBook } from 'react-icons/bi';
import { IoTimeOutline } from 'react-icons/io5';
import { FaHandHoldingHeart, FaPrayingHands } from 'react-icons/fa';
import './Achievements.css';
import PrayerActivity from './PrayerActivity';

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  completed: boolean;
  progress?: number;
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'quran',
      icon: <BiBook className="achievement-icon" />,
      title: 'Përfundo një kapitull të Kuranit',
      subtitle: 'Shkëlqyeshëm',
      completed: true,
      progress: 100
    },
    {
      id: 'dhikr',
      icon: <IoTimeOutline className="achievement-icon" />,
      title: 'Bëj Dhikr çdo ditë',
      subtitle: 'Në ritëm të shkëlqyer',
      completed: true,
      progress: 100
    },
    {
      id: 'charity',
      icon: <FaHandHoldingHeart className="achievement-icon" />,
      title: 'Bëj bamirësi çdo të premte',
      subtitle: 'Gjurmo sadakanë tënde',
      completed: false,
      progress: 0
    },
    {
      id: 'prayers',
      icon: <FaPrayingHands className="achievement-icon" />,
      title: 'Lutjet e përditshme',
      subtitle: 'Gjurmo namazin tënd',
      completed: false,
      progress: 60
    }
  ]);

  const toggleAchievement = (id: string) => {
    setAchievements(achievements.map(achievement => 
      achievement.id === id 
        ? { ...achievement, completed: !achievement.completed }
        : achievement
    ));
  };

  return (
    <div className="achievements-container">
      <h2 className="achievements-title">
        Festoni Arritjet Tuaja
      </h2>
      <div className="achievements-list">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`achievement-card ${achievement.completed ? 'completed' : ''}`}
          >
            <div className="achievement-content">
              <div className="achievement-icon-wrapper">
                {achievement.icon}
              </div>
              <div className="achievement-text">
                <h3>{achievement.title}</h3>
                <p>{achievement.subtitle}</p>
              </div>
            </div>
            <button 
              className={`achievement-check ${achievement.completed ? 'checked' : ''}`}
              onClick={() => toggleAchievement(achievement.id)}
            >
              {achievement.completed && <span className="checkmark">✓</span>}
            </button>
          </div>
        ))}
      </div>
      <PrayerActivity />
    </div>
  );
};

export default Achievements; 