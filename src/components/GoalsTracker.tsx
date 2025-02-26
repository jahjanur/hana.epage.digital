import React, { useState, useEffect, useCallback } from 'react';
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
  onSnapshot,
  orderBy,
  setDoc,
  DocumentReference,
  DocumentData,
  doc,
  getDoc
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
  Bar,
  Cell,
  Legend
} from 'recharts';

type NameType = string | number;

const PRAYER_TIMES = [
  { id: 'fajr', label: 'Fajr', icon: <FaPrayingHands /> },
  { id: 'dhuhr', label: 'Dhuhr', icon: <FaPrayingHands /> },
  { id: 'asr', label: 'Asr', icon: <FaPrayingHands /> },
  { id: 'maghrib', label: 'Maghrib', icon: <FaPrayingHands /> },
  { id: 'isha', label: 'Isha', icon: <FaPrayingHands /> }
] as const;

type PrayerTime = typeof PRAYER_TIMES[number]['id'];

interface DailyActivity {
  id?: string;
  date: string;
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  taraweeh: number;
  quran: number;
}

interface ChartDataPoint {
  date: string;
  rawDate: string;
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  taraweeh: number;
  quran: number;
}

const selectedStyle = {
  background: 'rgba(74, 74, 255, 0.1)',
  borderColor: '#4a4aff'
};

const completedStyle = {
  background: 'rgba(0, 255, 135, 0.1)',
  borderColor: '#00ff87',
  pointerEvents: 'none' as const,
  cursor: 'not-allowed' as const
};

const GoalsTracker: React.FC = () => {
  const { 
    getTodayProgress, 
    isAuthenticated, 
    currentUser,
    signInWithEmail
  } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'prayer' | 'taraweeh' | 'quran' | null>(null);
  const [inputValue, setInputValue] = useState(0);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [prayedToday, setPrayedToday] = useState<Record<string, boolean>>({});
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedPrayerTimes, setSelectedPrayerTimes] = useState<Set<PrayerTime>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayProgress = async () => {
      try {
        const progress = await getTodayProgress();
        setPrayedToday({
          fajr: progress.prayers.fajr,
          dhuhr: progress.prayers.dhuhr,
          asr: progress.prayers.asr,
          maghrib: progress.prayers.maghrib,
          isha: progress.prayers.isha,
          taraweeh: progress.taraweeh
        });
      } catch (error) {
        console.error('Error fetching today\'s progress:', error);
      }
    };

    if (currentUser) {
      fetchTodayProgress();
    }
  }, [currentUser, getTodayProgress]);

  const fetchActivityData = useCallback(async () => {
    if (!currentUser) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const activitiesRef = collection(db, 'daily_activities');
      const today = new Date();
      
      let startDate = new Date();
      switch (activeTab) {
        case 'weekly':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - today.getDay());
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'monthly':
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0);
          break;
        default:
          startDate.setHours(0, 0, 0, 0);
          break;
      }

      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      
      const dateQuery = query(
        activitiesRef,
        where('email', '==', currentUser.email),
        where('date', '>=', formattedStartDate),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(dateQuery);
      
      if (querySnapshot.empty) {
        setChartData([]);
        setIsLoading(false);
        return;
      }

      const data = querySnapshot.docs.map((doc: any) => ({
        ...doc.data() as DailyActivity,
        id: doc.id
      }));

      const processedData = data
        .sort((a: DailyActivity, b: DailyActivity) => a.date.localeCompare(b.date))
        .map((day: DailyActivity) => ({
          date: format(new Date(day.date), 
            activeTab === 'daily' ? 'HH:mm' : 
            activeTab === 'weekly' ? 'EEE dd MMM' : 
            'dd MMM yyyy'
          ),
          fajr: day.fajr,
          dhuhr: day.dhuhr,
          asr: day.asr,
          maghrib: day.maghrib,
          isha: day.isha,
          taraweeh: day.taraweeh,
          quran: day.quran,
          rawDate: day.date
        }));

      const todayData = processedData.find((day: { date: string }) => day.date === format(new Date(), 'HH:mm'));
      const verticalChartData = [
        { name: 'Fajr', value: todayData?.fajr },
        { name: 'Dhuhr', value: todayData?.dhuhr },
        { name: 'Asr', value: todayData?.asr },
        { name: 'Maghrib', value: todayData?.maghrib },
        { name: 'Isha', value: todayData?.isha },
        { name: 'Taraweeh', value: todayData?.taraweeh }
      ];

      if (todayData) {
        setPrayedToday(prev => ({
          ...prev,
          fajr: todayData.fajr === 1,
          dhuhr: todayData.dhuhr === 1,
          asr: todayData.asr === 1,
          maghrib: todayData.maghrib === 1,
          isha: todayData.isha === 1,
          taraweeh: todayData.taraweeh === 1
        }));
      }

      setChartData(processedData);
    } catch (error) {
      console.error('Error fetching activity data:', error);
      setError('Failed to fetch activity data');
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, activeTab]);

  useEffect(() => {
    if (!currentUser) return;
    fetchActivityData();
  }, [currentUser, fetchActivityData]);

  useEffect(() => {
    console.log('Chart data updated:', chartData);
  }, [chartData]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await signInWithEmail(email);
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrayerTimeToggle = (prayerId: PrayerTime) => {
    if (prayedToday[prayerId]) {
      return;
    }

    if (selectedPrayerTimes.has(prayerId)) {
      return;
    }

    setSelectedPrayerTimes(prev => {
      const newSet = new Set(prev);
      newSet.add(prayerId);
      return newSet;
    });
  };

  const handleAddActivity = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return;
    }

    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const activityId = `${currentUser.email.replace(/\./g, '_')}_${today}`;

      const activityRef = doc(db, 'daily_activities', activityId);
      const docSnap = await getDoc(activityRef);
      const existingData = docSnap.exists() ? docSnap.data() : null;

      const baseData = {
        email: currentUser.email,
        date: today,
        fajr: existingData?.fajr || 0,
        dhuhr: existingData?.dhuhr || 0,
        asr: existingData?.asr || 0,
        maghrib: existingData?.maghrib || 0,
        isha: existingData?.isha || 0,
        taraweeh: existingData?.taraweeh || 0,
        quran: existingData?.quran || 0,
        lastUpdated: new Date()
      };

      const newData = {
        ...baseData,
        lastUpdated: new Date()
      };

      if (selectedType === 'prayer') {
        selectedPrayerTimes.forEach(prayer => {
          switch(prayer) {
            case 'fajr':
              newData.fajr = 1;
              break;
            case 'dhuhr':
              newData.dhuhr = 1;
              break;
            case 'asr':
              newData.asr = 1;
              break;
            case 'maghrib':
              newData.maghrib = 1;
              break;
            case 'isha':
              newData.isha = 1;
              break;
          }
        });
        
        // Immediately update local state to show completed prayers
        setChartData(prevData => prevData.map(item => {
          if (item.rawDate === today) {
            return {
              ...item,
              ...Array.from(selectedPrayerTimes).reduce((acc: Record<string, number>, prayer: string) => ({
                ...acc,
                [prayer]: 1
              }), {})
            };
          }
          return item;
        }));
      } else if (selectedType === 'taraweeh') {
        newData.taraweeh = 1;
        
        // Update the chart data immediately to show completed taraweeh
        setChartData(prev => prev.map(item => {
          if (item.rawDate === today) {
            return {
              ...item,
              taraweeh: 1 // This ensures the taraweeh property is a boolean
            };
          }
          return item;
        }));

        // Update prayedToday state to reflect taraweeh completion
        setPrayedToday(prev => ({
          ...prev,
          taraweeh: true
        }));

        // Close modal and reset states
        setIsModalOpen(false);
        setSelectedType(null);
        setInputValue(0);
      } else if (selectedType === 'quran') {
        newData.quran = Math.min(inputValue, 100);
      }

      await setDoc(activityRef, newData, { merge: true });
      console.log('Activity saved successfully');

      setSuccessMessage('Activity saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);

      // Close modal and reset states
      setIsModalOpen(false);
      setSelectedType(null);
      setInputValue(0);
      setSelectedPrayerTimes(new Set());
      setError(null);

      // Refresh data
      await fetchActivityData();

    } catch (error) {
      console.error('Error adding activity:', error);
      setError('Failed to add activity. Please try again.');
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
          className="auth-modal-overlay"
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
            <div className="auth-modal-content">
              <h2>Track Your Ramadan Journey</h2>
              <p>Enter your email to start tracking your daily prayers, Taraweeh, and Quran reading progress</p>
              
              <form onSubmit={handleSignIn} className="auth-form">
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="auth-input"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="auth-submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner-container">
                      <div className="loading-spinner"></div>
                      <span>Starting...</span>
                    </div>
                  ) : (
                    'Start Tracking'
                  )}
                </motion.button>
              </form>
              
              {error && (
                <motion.div 
                  className="auth-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="goals-content">
          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => fetchActivityData()}>Retry</button>
            </div>
          )}
          
          <motion.h1 className="goals-title">
            Welcome, {currentUser?.email?.split('@')[0] || 'User'}
          </motion.h1>

          <div className="activity-buttons">
            <motion.button
              className={`activity-button ${prayedToday['fajr'] || prayedToday['dhuhr'] || prayedToday['asr'] || prayedToday['maghrib'] || prayedToday['isha'] ? 'partially-completed' : ''}`}
              onClick={() => {
                setSelectedType('prayer');
                setIsModalOpen(true);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPrayingHands />
              <span>Daily Prayers</span>
              {Object.values(prayedToday).filter(Boolean).length > 0 && (
                <div className="completion-badge">
                  {Object.values(prayedToday).filter(Boolean).length}/5
                </div>
              )}
            </motion.button>

            <motion.button
              className={`activity-button ${chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh ? 'completed' : ''}`}
              onClick={() => {
                setSelectedType('taraweeh');
                setIsModalOpen(true);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh}
            >
              <FaMosque />
              <span>Taraweeh</span>
              {chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh && (
                <div className="completion-badge">✓</div>
              )}
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

          <div className="time-filter">
            <motion.button
              className={`filter-btn ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Daily
            </motion.button>
            <motion.button
              className={`filter-btn ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Weekly
            </motion.button>
            <motion.button
              className={`filter-btn ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
          </div>

          <div className="charts-section">
            <div className="chart-card">
              <h3>
                <FaPrayingHands size={18} />
                Daily Prayers
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={chartData}
                  margin={{ top: 20, right: 30, left: -10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="fajrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A6C8FF" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#D6A6FF" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="dhuhrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#FFA07A" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="asrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFBF00" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#D2B48C" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="maghribGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B0000" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#6A0DAD" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="ishaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#191970" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#4B0082" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="taraweehGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#C0C0C0" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 6]}
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickFormatter={(value: number) => Math.floor(value).toString()}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(26, 26, 26, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    formatter={(value: number, name: NameType) => [
                      value === 1 ? 'Completed' : 'Not completed',
                      typeof name === 'string' 
                        ? name.charAt(0).toUpperCase() + name.slice(1)
                        : name
                    ]}
                  />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                  />
                  {PRAYER_TIMES.map((prayer) => (
                    <Bar 
                      key={prayer.id}
                      dataKey={prayer.id}
                      name={prayer.label}
                      stackId="prayers"
                      fill={`url(#${prayer.id}Gradient)`}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                  <Bar 
                    dataKey="taraweeh"
                    name="Taraweeh"
                    stackId="prayers"
                    fill="url(#taraweehGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>
                <FaQuran size={18} />
                Quran Pages Read
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="quranGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4a4aff" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#4a4aff" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="date"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(26, 26, 26, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="quran" 
                    stroke="#4a4aff"
                    strokeWidth={2}
                    fill="url(#quranGradient)"
                  />
                </AreaChart>
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
                        setInputValue(0);
                      }}
                    >
                      <IoClose size={24} />
                    </button>
                  </div>

                  {selectedType === 'prayer' && (
                    <div className="prayer-times">
                      <div className="prayer-options">
                        {PRAYER_TIMES.map((prayer) => {
                          const isPrayed = prayedToday[prayer.id];
                          const isSelected = selectedPrayerTimes.has(prayer.id);
                          
                          return (
                            <motion.button
                              key={prayer.id}
                              className={`prayer-option ${isPrayed ? 'completed' : ''} ${isSelected ? 'selected' : ''}`}
                              onClick={() => handlePrayerTimeToggle(prayer.id as PrayerTime)}
                              disabled={isPrayed}
                              style={isPrayed ? completedStyle : isSelected ? selectedStyle : {}}
                              whileHover={!isPrayed ? { scale: 1.02 } : {}}
                              whileTap={!isPrayed ? { scale: 0.98 } : {}}
                            >
                              {prayer.icon}
                              <span>{prayer.label}</span>
                              {isPrayed ? (
                                <span className="completed-badge">✓ Completed</span>
                              ) : isSelected ? (
                                <span className="selected-badge">Selected</span>
                              ) : null}
                            </motion.button>
                          );
                        })}
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
                          className={`taraweeh-option ${
                            chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh 
                              ? 'completed' 
                              : inputValue === 1 ? 'selected' : ''
                          }`}
                          onClick={() => {
                            const todayActivity = chartData.find(d => 
                              d.rawDate === format(new Date(), 'yyyy-MM-dd')
                            );
                            
                            if (!todayActivity?.taraweeh) {
                              setInputValue(1);
                            }
                          }}
                          style={
                            chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh 
                              ? completedStyle 
                              : inputValue === 1 ? selectedStyle : {}
                          }
                          disabled={chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh}
                        >
                          <FaMosque size={24} />
                          <span>I prayed Taraweeh today</span>
                          {chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh ? (
                            <span className="completed-badge">✓ Completed</span>
                          ) : inputValue === 1 ? (
                            <span className="selected-badge">Selected</span>
                          ) : null}
                        </motion.button>
                      </div>
                      {inputValue === 1 && !chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh && (
                        <motion.button
                          className="submit-btn"
                          onClick={handleAddActivity}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Submit Taraweeh Prayer
                        </motion.button>
                      )}
                    </div>
                  )}

                  {selectedType === 'quran' && (
                    <div className="quran-options">
                      <div className="quran-input-container">
                        <div className="quran-input-wrapper">
                          <input
                            type="number"
                            value={inputValue || ''}
                            onChange={(e) => {
                              const value = Math.min(Math.max(0, Number(e.target.value)), 100);
                              setInputValue(value);
                            }}
                            onBlur={(e) => {
                              const value = Math.min(Math.max(0, Number(e.target.value)), 100);
                              setInputValue(value);
                            }}
                            placeholder=""
                            className="quran-input"
                            min={0}
                            max={100}
                          />
                          <div className="quran-input-controls">
                            <motion.button
                              className="quran-control-btn"
                              onClick={() => setInputValue(prev => Math.min(prev + 1, 100))}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={inputValue >= 100}
                            >
                              ▲
                            </motion.button>
                            <motion.button
                              className="quran-control-btn"
                              onClick={() => setInputValue(prev => Math.max(prev - 1, 0))}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={inputValue <= 0}
                            >
                              ▼
                            </motion.button>
                          </div>
                        </div>
                        <span className="quran-input-label">Pages Read Today (Max: 100)</span>
                      </div>
                      <motion.button
                        className="submit-btn"
                        onClick={handleAddActivity}
                        disabled={inputValue === 0 || inputValue > 100}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Submit Quran Reading
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {successMessage && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {successMessage}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default GoalsTracker;