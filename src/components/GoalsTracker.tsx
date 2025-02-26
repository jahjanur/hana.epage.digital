import React, { useState, useEffect } from 'react';
import './GoalsTracker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPrayingHands, FaMosque, FaQuran } from 'react-icons/fa';
import { IoAddOutline, IoClose } from 'react-icons/io5';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';
import { useGoals } from '../contexts/GoalsContext';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData 
} from 'firebase/firestore';
import { format } from 'date-fns';

const PRAYER_TIMES = [
  { id: 'fajr', label: 'Fajr', icon: <FaPrayingHands /> },
  { id: 'dhuhr', label: 'Dhuhr', icon: <FaPrayingHands /> },
  { id: 'asr', label: 'Asr', icon: <FaPrayingHands /> },
  { id: 'maghrib', label: 'Maghrib', icon: <FaPrayingHands /> },
  { id: 'isha', label: 'Isha', icon: <FaPrayingHands /> }
] as const;

interface DailyActivity {
  userId: string;
  date: string;
  prayers: {
    [K in typeof PRAYER_TIMES[number]['id']]: boolean;
  };
  quran_progress: number;
  taraweeh: boolean;
  createdAt: any;
  lastUpdated: any;
}

const GoalsTracker: React.FC = () => {
  const { 
    goals, 
    addGoal: addGoalToContext, 
    getTodayProgress, 
    isAuthenticated, 
    signInWithGoogle,
    currentUser 
  } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'prayer' | 'taraweeh' | 'quran' | null>(null);
  const [inputValue, setInputValue] = useState(0);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedPrayerTime, setSelectedPrayerTime] = useState<string | null>(null);
  const [prayedToday, setPrayedToday] = useState<Record<string, boolean>>({});

  const progress = getTodayProgress();
  
  const chartData = [
    { name: 'Prayers', value: (progress.prayers / 5) * 100, color: '#00ff87' },
    { name: 'Taraweeh', value: (progress.taraweeh / 20) * 100, color: '#4a4aff' },
    { name: 'Quran', value: Math.min((progress.quran / 10) * 100, 100), color: '#ff4a4a' }
  ];

  // Fetch today's activities when component mounts
  useEffect(() => {
    if (currentUser) {
      const fetchTodayActivities = async () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const activitiesRef = collection(db, 'daily_activities');
        const q = query(
          activitiesRef,
          where('userId', '==', currentUser.uid),
          where('date', '==', today)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as DailyActivity;
          // Update local state with fetched data
          setPrayedToday({
            fajr: data.prayers.fajr,
            dhuhr: data.prayers.dhuhr,
            asr: data.prayers.asr,
            maghrib: data.prayers.maghrib,
            isha: data.prayers.isha
          });
          setInputValue(data.quran_progress || 0);
        }
      };

      fetchTodayActivities();
    }
  }, [currentUser]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleAddActivity = async () => {
    if (!selectedType || !currentUser) return;

    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const activitiesRef = collection(db, 'daily_activities');
      const q = query(
        activitiesRef,
        where('userId', '==', currentUser.uid),
        where('date', '==', today)
      );

      const querySnapshot = await getDocs(q);
      let dailyDocRef: DocumentReference<DocumentData>;
      let dailyDocData: DocumentData | undefined;
      
      if (querySnapshot.empty) {
        // Create new daily document with ordered prayers
        const newDailyActivity: DailyActivity = {
          userId: currentUser.uid,
          date: today,
          prayers: {
            fajr: false,
            dhuhr: false,
            asr: false,
            maghrib: false,
            isha: false
          },
          quran_progress: 0,
          taraweeh: false,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        };
        
        dailyDocRef = await addDoc(activitiesRef, newDailyActivity);
        dailyDocData = newDailyActivity;
      } else {
        dailyDocRef = querySnapshot.docs[0].ref;
        dailyDocData = querySnapshot.docs[0].data();
      }

      // Update the document based on activity type
      if (selectedType === 'prayer' && selectedPrayerTime) {
        // Create an ordered prayers object
        const currentPrayers = dailyDocData?.prayers || {
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false
        };

        await setDoc(dailyDocRef, {
          prayers: {
            fajr: currentPrayers.fajr,
            dhuhr: currentPrayers.dhuhr,
            asr: currentPrayers.asr,
            maghrib: currentPrayers.maghrib,
            isha: currentPrayers.isha,
            [selectedPrayerTime]: true // This will maintain the order while updating the selected prayer
          },
          lastUpdated: serverTimestamp()
        }, { merge: true });

        setPrayedToday(prev => ({
          ...prev,
          [selectedPrayerTime]: true
        }));
      } else if (selectedType === 'quran') {
        await setDoc(dailyDocRef, {
          quran_progress: inputValue,
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } else if (selectedType === 'taraweeh') {
        await setDoc(dailyDocRef, {
          taraweeh: inputValue === 1,
          lastUpdated: serverTimestamp()
        }, { merge: true });
      }

      // Reset form and close modal
      setSelectedType(null);
      setSelectedPrayerTime(null);
      setInputValue(0);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handlePrayerClick = () => {
    setSelectedType('prayer');
    setIsModalOpen(true);
  };

  const handleTaraweehClick = () => {
    setSelectedType('taraweeh');
    setIsModalOpen(true);
  };

  const handleQuranClick = () => {
    setSelectedType('quran');
    setIsModalOpen(true);
  };

  return (
    <motion.div className="goals-container">
      {!isAuthenticated ? (
        <motion.div 
          className="goals-container unauthenticated"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="auth-prompt">
            <motion.div 
              className="floating-icons"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[<FaPrayingHands />, <FaMosque />, <FaQuran />].map((icon, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>
            <h2>Start Your Spiritual Journey</h2>
            <p>Sign in to track your daily prayers, taraweeh, and Quran reading</p>
            <motion.button
              className="sign-in-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign In to Begin
            </motion.button>
          </div>

          <AnimatePresence>
            {isAuthModalOpen && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="auth-modal"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="modal-header">
                    <h2>Sign In</h2>
                    <button 
                      className="close-btn"
                      onClick={() => setIsAuthModalOpen(false)}
                    >
                      <IoClose size={24} />
                    </button>
                  </div>
                  <div className="auth-content">
                    <p>Sign in with your Google account to start tracking your spiritual journey</p>
                    <motion.button
                      className="google-sign-in-btn"
                      onClick={handleSignIn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img src="https://www.google.com/favicon.ico" alt="Google" />
                      Continue with Google
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="goals-content">
          <motion.h1 className="goals-title">
            Welcome, {currentUser?.displayName || 'User'}
          </motion.h1>

          <div className="time-filter">
            {['daily', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                className={`filter-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="activity-buttons">
            <motion.button
              className="activity-button prayer"
              onClick={handlePrayerClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPrayingHands />
              <span>Prayers</span>
            </motion.button>

            <motion.button
              className="activity-button taraweeh"
              onClick={handleTaraweehClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaMosque />
              <span>Taraweeh</span>
            </motion.button>

            <motion.button
              className="activity-button quran"
              onClick={handleQuranClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaQuran />
              <span>Quran</span>
            </motion.button>
          </div>

          <div className="goals-grid">
            <motion.div 
              className="progress-section"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="progress-rings">
                {chartData.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    className="progress-item"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <CircularProgressWithLabel
                      value={item.value}
                      label={item.name}
                      icon={
                        item.name === 'Prayers' ? <FaPrayingHands /> :
                        item.name === 'Taraweeh' ? <FaMosque /> :
                        <FaQuran />
                      }
                      color={item.color}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="activity-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Recent Activities</h2>
              <div className="activity-list">
                {goals.slice(-5).reverse().map((goal, index) => (
                  <motion.div 
                    key={index}
                    className="activity-item"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="activity-icon">
                      {goal.type === 'prayer' ? <FaPrayingHands /> :
                       goal.type === 'taraweeh' ? <FaMosque /> :
                       <FaQuran />}
                    </div>
                    <div className="activity-details">
                      <span className="activity-type">
                        {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}
                      </span>
                      <span className="activity-value">
                        {goal.value} {goal.type === 'quran' ? 'pages' : 'rakats'}
                      </span>
                    </div>
                    <span className="activity-time">
                      {new Date(goal.date).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.button
            className="add-activity-btn"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoAddOutline size={24} />
            Add New Activity
          </motion.button>

          <AnimatePresence>
            {isModalOpen && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="activity-modal"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="modal-header">
                    <h2>
                      {selectedType === 'prayer' ? 'Daily Prayers' :
                       selectedType === 'taraweeh' ? 'Taraweeh Prayer' :
                       'Quran Reading'}
                    </h2>
                    <button 
                      className="close-btn"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedType(null);
                        setSelectedPrayerTime(null);
                        setInputValue(0);
                      }}
                    >
                      <IoClose size={24} />
                    </button>
                  </div>

                  {selectedType === 'prayer' && (
                    <div className="prayer-times">
                      <div className="prayer-options">
                        {PRAYER_TIMES.map((prayer) => (
                          <motion.button
                            key={prayer.id}
                            className={`prayer-option ${selectedPrayerTime === prayer.id ? 'selected' : ''} ${
                              prayedToday[prayer.id] ? 'prayed' : ''
                            }`}
                            onClick={() => !prayedToday[prayer.id] && setSelectedPrayerTime(prayer.id)}
                            disabled={prayedToday[prayer.id]}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {prayer.icon}
                            <span>{prayer.label}</span>
                            {prayedToday[prayer.id] && (
                              <span className="prayed-badge">✓</span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <motion.button
                        className="submit-btn"
                        onClick={handleAddActivity}
                        disabled={!selectedPrayerTime}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Prayer
                      </motion.button>
                    </div>
                  )}

                  {selectedType === 'taraweeh' && (
                    <div className="taraweeh-options">
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="taraweeh"
                            value="1"
                            checked={inputValue === 1}
                            onChange={() => setInputValue(1)}
                          />
                          <span>Prayed</span>
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="taraweeh"
                            value="0"
                            checked={inputValue === 0}
                            onChange={() => setInputValue(0)}
                          />
                          <span>Not Prayed</span>
                        </label>
                      </div>
                      <motion.button
                        className="submit-btn"
                        onClick={handleAddActivity}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit
                      </motion.button>
                    </div>
                  )}

                  {selectedType === 'quran' && (
                    <div className="quran-input">
                      <div className="number-scroll">
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(Math.max(0, parseInt(e.target.value) || 0))}
                          min="0"
                          max="604"
                        />
                        <span className="unit">pages</span>
                      </div>
                      <motion.button
                        className="submit-btn"
                        onClick={handleAddActivity}
                        disabled={!inputValue}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default GoalsTracker; 