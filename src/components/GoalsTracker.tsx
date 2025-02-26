import React, { useState, useEffect } from 'react';
import './GoalsTracker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPrayingHands, FaMosque, FaQuran } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useGoals } from '../contexts/GoalsContext';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  setDoc,
  DocumentReference,
  DocumentData,
  orderBy,
  limit
} from 'firebase/firestore';
import { format } from 'date-fns';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

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
  const [chartData, setChartData] = useState<any[]>([]);

  // Add state for tracking daily progress
  const [dailyProgress, setDailyProgress] = useState({
    prayers: 0,
    taraweeh: 0,
    quran: 0
  });

  const [selectedPrayerTimes, setSelectedPrayerTimes] = useState<Set<string>>(new Set());

  const progress = getTodayProgress();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add type for drag event info
  type DragInfo = {
    point: {
      y: number;
    };
  };

  const fetchActivityData = async () => {
    if (!currentUser) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const activitiesRef = collection(db, 'daily_activities');
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // First try to fetch today's activity
      try {
        const todayQuery = query(
          activitiesRef,
          where('userId', '==', currentUser.uid),
          where('date', '==', today)
        );

        const todaySnapshot = await getDocs(todayQuery);
        const todayDoc = todaySnapshot.docs[0]?.data() as DailyActivity | undefined;

        if (todayDoc) {
          setPrayedToday(todayDoc.prayers);
        }
      } catch (error) {
        console.error('Error fetching today\'s activity:', error);
      }

      // Then try to fetch historical data
      const historicalQuery = query(
        activitiesRef,
        where('userId', '==', currentUser.uid),
        orderBy('date', 'desc'),
        limit(30)
      );

      const querySnapshot = await getDocs(historicalQuery);
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as (DailyActivity & { id: string })[];

      const processedData = data
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(day => ({
          id: day.id,
          date: format(new Date(day.date), 'MMM dd'),
          prayers: Object.values(day.prayers).filter(Boolean).length,
          taraweeh: day.taraweeh ? 1 : 0,
          quran: day.quran_progress || 0,
          fajr: day.prayers.fajr ? 1 : 0,
          dhuhr: day.prayers.dhuhr ? 1 : 0,
          asr: day.prayers.asr ? 1 : 0,
          maghrib: day.prayers.maghrib ? 1 : 0,
          isha: day.prayers.isha ? 1 : 0
        }));

      setChartData(processedData);
    } catch (error) {
      console.error('Error fetching activity data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add fetchActivityData to useEffect dependencies with useCallback
  const memoizedFetchActivityData = React.useCallback(fetchActivityData, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      memoizedFetchActivityData();
    }
  }, [currentUser, activeTab, memoizedFetchActivityData]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handlePrayerTimeToggle = (prayerId: string) => {
    if (prayedToday[prayerId]) return; // Already prayed, can't modify

    setSelectedPrayerTimes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(prayerId)) {
        newSet.delete(prayerId);
      } else {
        newSet.add(prayerId);
      }
      return newSet;
    });
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
      let dailyDocData: DailyActivity | undefined;
      
      if (querySnapshot.empty) {
        // Create new daily document
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
          quran_progress: selectedType === 'quran' ? Math.min(inputValue, 50) : 0,
          taraweeh: false,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        };
        
        const docRef = await addDoc(activitiesRef, newDailyActivity);
        dailyDocRef = docRef;
        dailyDocData = newDailyActivity;
      } else {
        dailyDocRef = querySnapshot.docs[0].ref;
        dailyDocData = querySnapshot.docs[0].data() as DailyActivity;
      }

      // Update based on activity type
      if (selectedType === 'prayer') {
        const updatedPrayers = { ...dailyDocData?.prayers };
        selectedPrayerTimes.forEach(prayerId => {
          updatedPrayers[prayerId as keyof typeof updatedPrayers] = true;
        });

        await setDoc(dailyDocRef, {
          prayers: updatedPrayers,
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } else if (selectedType === 'taraweeh') {
        await setDoc(dailyDocRef, {
          taraweeh: inputValue === 1,
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } else if (selectedType === 'quran') {
        await setDoc(dailyDocRef, {
          quran_progress: Math.min(inputValue, 50),
          lastUpdated: serverTimestamp()
        }, { merge: true });
      }

      await fetchActivityData();

      // Reset form
      setIsModalOpen(false);
      setSelectedType(null);
      setSelectedPrayerTimes(new Set());
      setInputValue(0);
    } catch (error) {
      console.error('Error adding activity:', error);
      setError('Failed to update activity. Please try again.');
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
          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => fetchActivityData()}>Retry</button>
            </div>
          )}
          
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
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

              <div className="charts-container">
                {/* Prayer Progress Chart */}
                <div className="chart-card">
                  <h3>Prayer Progress</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Bar dataKey="fajr" stackId="prayers" fill="#ff4a4a" name="Fajr" />
                      <Bar dataKey="dhuhr" stackId="prayers" fill="#4a4aff" name="Dhuhr" />
                      <Bar dataKey="asr" stackId="prayers" fill="#00ff87" name="Asr" />
                      <Bar dataKey="maghrib" stackId="prayers" fill="#ffa500" name="Maghrib" />
                      <Bar dataKey="isha" stackId="prayers" fill="#9c27b0" name="Isha" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Quran Progress Chart */}
                <div className="chart-card">
                  <h3>Quran Pages Read</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="quran" 
                        stroke="#ff4a4a" 
                        fill="#ff4a4a" 
                        fillOpacity={0.3}
                        name="Pages"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Taraweeh Progress Chart */}
                <div className="chart-card">
                  <h3>Taraweeh Completion</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Bar 
                        dataKey="taraweeh" 
                        fill="#4a4aff" 
                        name="Completed"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

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
                                className={`prayer-option ${
                                  selectedPrayerTimes.has(prayer.id) ? 'selected' : ''
                                } ${prayedToday[prayer.id] ? 'prayed' : ''}`}
                                onClick={() => handlePrayerTimeToggle(prayer.id)}
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
                            disabled={selectedPrayerTimes.size === 0}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Submit Selected Prayers
                          </motion.button>
                        </div>
                      )}

                      {selectedType === 'taraweeh' && (
                        <div className="taraweeh-options">
                          <div className="radio-group">
                            <motion.button
                              className={`taraweeh-option ${inputValue === 1 ? 'selected' : ''}`}
                              onClick={() => setInputValue(1)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaMosque size={24} />
                              <span>I prayed Taraweeh today</span>
                              {inputValue === 1 && <span className="check-mark">✓</span>}
                            </motion.button>
                            <motion.button
                              className={`taraweeh-option ${inputValue === 0 ? 'selected' : ''}`}
                              onClick={() => setInputValue(0)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaMosque size={24} opacity={0.5} />
                              <span>I haven't prayed yet</span>
                              {inputValue === 0 && <span className="check-mark">✓</span>}
                            </motion.button>
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
                          <div className="quran-input-container">
                            <div className="quran-input-header">
                              <FaQuran size={32} />
                              <h3>How many pages did you read today?</h3>
                            </div>
                            
                            <div className="page-input-section">
                              <div className="page-counter">
                                <motion.button
                                  className="counter-btn"
                                  onClick={() => setInputValue(Math.max(0, inputValue - 1))}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={inputValue <= 0}
                                >
                                  -
                                </motion.button>
                                
                                <div className="page-display">
                                  <span className="page-number">{inputValue}</span>
                                  <span className="page-label">pages</span>
                                </div>
                                
                                <motion.button
                                  className="counter-btn"
                                  onClick={() => setInputValue(Math.min(50, inputValue + 1))}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  disabled={inputValue >= 50}
                                >
                                  +
                                </motion.button>
                              </div>
                              
                              <div className="page-slider">
                                <input
                                  type="range"
                                  min="0"
                                  max="50"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(Number(e.target.value))}
                                  className="slider"
                                />
                                <div className="slider-labels">
                                  <span>0</span>
                                  <span>25</span>
                                  <span>50</span>
                                </div>
                              </div>
                            </div>

                            <div className="quran-progress-info">
                              <span>{inputValue} pages selected</span>
                              <span>{50 - inputValue} pages until max</span>
                            </div>

                            <motion.button
                              className="submit-btn"
                              onClick={handleAddActivity}
                              disabled={inputValue === 0}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Submit
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default GoalsTracker; 