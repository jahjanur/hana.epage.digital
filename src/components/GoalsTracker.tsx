import React, { useState, useEffect, useRef } from 'react';
import './GoalsTracker.css';
import { IoAddOutline, IoClose, IoStatsChart } from "react-icons/io5";
import { FaPrayingHands, FaMosque, FaQuran } from "react-icons/fa";
import { ReactComponent as HanaLogo } from '../assets/hanaMainLogoWhite.svg';
import { ReactComponent as BGPattern } from '../assets/BG.svg';
import BG from '../assets/BG.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Goal {
  id: string;
  type: 'namaz' | 'teravi' | 'quran';
  date: Date;
  details: {
    prayerName?: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
    pagesRead?: number;
    tarawihRakats?: number;
  };
}

interface DailyActivity {
  date: string;
  prayers: number;
  taraweeh: number;
  quranPages: number;
}

const GoalsTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem('ramadanGoals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<Goal['type'] | null>(null);
  const [selectedDate] = useState<Date>(new Date());
  const [selectedPrayers, setSelectedPrayers] = useState<Set<string>>(new Set());
  const [prayerDetails, setPrayerDetails] = useState({
    prayerName: undefined as Goal['details']['prayerName'],
    pagesRead: 0,
    tarawihRakats: 0
  });
  const [activeTab, setActiveTab] = useState<'goals' | 'reports'>('goals');

  useEffect(() => {
    localStorage.setItem('ramadanGoals', JSON.stringify(goals));
  }, [goals]);

  const getGoalProgress = (type: Goal['type']) => {
    const todayGoals = goals.filter(goal => 
      goal.type === type && 
      new Date(goal.date).toDateString() === selectedDate.toDateString()
    );

    switch(type) {
      case 'namaz':
        return `${todayGoals.length}/5 Prayers`;
      case 'teravi':
        const rakats = todayGoals.reduce((sum, goal) => sum + (goal.details.tarawihRakats || 0), 0);
        return `${rakats}/20 Rakats`;
      case 'quran':
        const pages = todayGoals.reduce((sum, goal) => sum + (goal.details.pagesRead || 0), 0);
        return `${pages} Pages`;
      default:
        return '0';
    }
  };

  const handleModalSubmit = () => {
    if (!modalType) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      type: modalType,
      date: selectedDate,
      details: {
        prayerName: modalType === 'namaz' ? prayerDetails.prayerName : undefined,
        pagesRead: modalType === 'quran' ? prayerDetails.pagesRead : undefined,
        tarawihRakats: modalType === 'teravi' ? prayerDetails.tarawihRakats : undefined
      }
    };

    setGoals(prev => [...prev, newGoal]);
    setIsModalOpen(false);
    setPrayerDetails({
      prayerName: undefined,
      pagesRead: 0,
      tarawihRakats: 0
    });
  };

  const getStatistics = () => {
    const today = new Date().toDateString();
    const todayGoals = goals.filter(goal => 
      new Date(goal.date).toDateString() === today
    );

    return {
      prayers: {
        total: todayGoals.filter(g => g.type === 'namaz').length,
        target: 5
      },
      taraweeh: {
        total: todayGoals.reduce((sum, g) => 
          g.type === 'teravi' ? sum + (g.details.tarawihRakats || 0) : sum, 0),
        target: 20
      },
      quran: {
        total: todayGoals.reduce((sum, g) => 
          g.type === 'quran' ? sum + (g.details.pagesRead || 0) : sum, 0),
        target: 20
      }
    };
  };

  const getDailyActivities = (): DailyActivity[] => {
    const activities: { [key: string]: DailyActivity } = {};
    
    goals.forEach(goal => {
      const date = new Date(goal.date).toISOString().split('T')[0];
      if (!activities[date]) {
        activities[date] = {
          date,
          prayers: 0,
          taraweeh: 0,
          quranPages: 0
        };
      }
      
      switch (goal.type) {
        case 'namaz':
          activities[date].prayers += 1;
          break;
        case 'teravi':
          activities[date].taraweeh += goal.details.tarawihRakats || 0;
          break;
        case 'quran':
          activities[date].quranPages += goal.details.pagesRead || 0;
          break;
      }
    });

    return Object.values(activities);
  };

  const renderPrayerSelector = () => (
    <div className="prayer-grid">
      {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => (
        <button
          key={prayer}
          className={`prayer-button ${selectedPrayers.has(prayer) ? 'completed' : 'pending'}`}
          onClick={() => {
            const newSelected = new Set(selectedPrayers);
            if (newSelected.has(prayer)) {
              newSelected.delete(prayer);
            } else {
              newSelected.add(prayer);
            }
            setSelectedPrayers(newSelected);
            setPrayerDetails(prev => ({
              ...prev,
              prayerName: prayer as Goal['details']['prayerName']
            }));
          }}
        >
          <div className="prayer-icon">
            <FaPrayingHands />
          </div>
          <span>{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</span>
        </button>
      ))}
    </div>
  );

  const renderTarawihSelector = () => (
    <div className="tarawih-selector">
      <button
        className={`tarawih-button ${prayerDetails.tarawihRakats === 20 ? 'completed' : ''}`}
        onClick={() => setPrayerDetails(prev => ({ ...prev, tarawihRakats: 20 }))}
      >
        <FaMosque />
        <span>Prayed</span>
      </button>
      <button
        className={`tarawih-button ${prayerDetails.tarawihRakats === 0 ? 'not-prayed' : ''}`}
        onClick={() => setPrayerDetails(prev => ({ ...prev, tarawihRakats: 0 }))}
      >
        <IoClose />
        <span>Not Prayed</span>
      </button>
    </div>
  );

  const renderQuranInput = () => (
    <div className="quran-input">
      <div className="pages-display">
        <span className="pages-number">{prayerDetails.pagesRead}</span>
        <span className="pages-label">Pages</span>
      </div>
      <input
        type="range"
        min="0"
        max="50"
        value={prayerDetails.pagesRead}
        onChange={(e) => setPrayerDetails(prev => ({
          ...prev,
          pagesRead: parseInt(e.target.value)
        }))}
        className="pages-slider"
      />
    </div>
  );

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Prayers',
        data: [3, 4, 5, 4, 5, 5, 4],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      }
    }
  };

  const renderActivityHeatmap = () => {
    const activities = getDailyActivities();
    const today = new Date();
    
    return (
      <div className="activity-heatmap">
        <h3 className="heatmap-title">
          <span className="title-icon">📊</span>
          Ramadan Activity Tracker
        </h3>
        <div className="heatmap-list">
          {Array.from({ length: 29 }, (_, index) => {
            const day = `2024-03-${(index + 1).toString().padStart(2, '0')}`;
            const activity = activities.find(a => a.date === day) || { prayers: 0, taraweeh: 0, quranPages: 0 };
            const isToday = index + 1 === today.getDate();
            
            return (
              <div 
                key={day}
                className={`heatmap-item ${isToday ? 'current-day' : ''}`}
              >
                <div className="day-info">
                  <div className="day-number-wrapper">
                    <span className="day-label">DAY</span>
                    <span className="day-number">{index + 1}</span>
                  </div>
                  <div className="achievements">
                    <div className="achievement-item prayers">
                      <FaPrayingHands className="achievement-icon" />
                      <span className="achievement-value">{activity.prayers}/5</span>
                    </div>
                    <div className="achievement-item taraweeh">
                      <FaMosque className="achievement-icon" />
                      <span className="achievement-value">{activity.taraweeh}/20</span>
                    </div>
                    <div className="achievement-item quran">
                      <FaQuran className="achievement-icon" />
                      <span className="achievement-value">{activity.quranPages}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="goals-tracker" style={{ backgroundImage: `url(${BG})` }}>
      <div className="goals-overlay"></div>
      <div className="goals-header">
        <HanaLogo className="hana-logo" />
      </div>

      <div className="goals-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            Goals
          </button>
          <button 
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {activeTab === 'goals' ? (
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <div className="action-card" onClick={() => {
                setModalType('namaz');
                setIsModalOpen(true);
              }}>
                <FaPrayingHands className="action-icon" />
                <div className="action-info">
                  <h3>Daily Prayers</h3>
                  <p>{getGoalProgress('namaz')}</p>
                </div>
              </div>

              <div className="action-card" onClick={() => {
                setModalType('teravi');
                setIsModalOpen(true);
              }}>
                <FaMosque className="action-icon" />
                <div className="action-info">
                  <h3>Taraweeh</h3>
                  <p>{getGoalProgress('teravi')}</p>
                </div>
              </div>

              <div className="action-card" onClick={() => {
                setModalType('quran');
                setIsModalOpen(true);
              }}>
                <FaQuran className="action-icon" />
                <div className="action-info">
                  <h3>Quran Reading</h3>
                  <p>{getGoalProgress('quran')}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="reports-container">
            {renderActivityHeatmap()}
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Daily Prayers</h3>
                <div className="stat-value">{getStatistics().prayers.total}/5</div>
              </div>
              <div className="stat-card">
                <h3>Taraweeh</h3>
                <div className="stat-value">{getStatistics().taraweeh.total}/20</div>
              </div>
              <div className="stat-card">
                <h3>Quran Pages</h3>
                <div className="stat-value">{getStatistics().quran.total}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{modalType ? `Add ${modalType.charAt(0).toUpperCase()}${modalType.slice(1)}` : 'Add Activity'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <IoClose />
              </button>
            </div>
            
            <div className="modal-body">
              {modalType === 'namaz' && (
                <>
                  <p className="modal-subtitle">Select the prayers you've completed</p>
                  {renderPrayerSelector()}
                </>
              )}
              {modalType === 'teravi' && (
                <>
                  <p className="modal-subtitle">Did you pray Taraweeh today?</p>
                  {renderTarawihSelector()}
                </>
              )}
              {modalType === 'quran' && (
                <>
                  <p className="modal-subtitle">How many pages did you read?</p>
                  {renderQuranInput()}
                </>
              )}
            </div>
            
            <button 
              className="modal-submit"
              onClick={handleModalSubmit}
              disabled={
                (modalType === 'namaz' && !prayerDetails.prayerName) ||
                (modalType === 'quran' && !prayerDetails.pagesRead) ||
                (modalType === 'teravi' && prayerDetails.tarawihRakats === undefined)
              }
            >
              Add Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsTracker; 