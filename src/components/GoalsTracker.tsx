import React, { useState, useEffect, useCallback } from 'react';
import './GoalsTracker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPrayingHands, FaMosque, FaQuran } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useGoals } from '../contexts/GoalsContext';
import { getUserFromStorage } from '../firebase/auth-utils';
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
import AppHeader from './AppHeader';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from './Footer';

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

interface ActivityData {
  email: string;
  date: string;
  lastUpdated: Date;
  fajr?: number;
  dhuhr?: number;
  asr?: number;
  maghrib?: number;
  isha?: number;
  taraweeh?: number;
  quran?: number;
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

interface PrayerStatus {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  taraweeh: boolean;
}

const GoalsTracker: React.FC = () => {
  const { 
    getTodayProgress, 
    isAuthenticated, 
    currentUser,
    signInWithEmail
  } = useGoals();
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'prayer' | 'taraweeh' | 'quran' | null>(null);
  const [inputValue, setInputValue] = useState(0);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [prayedToday, setPrayedToday] = useState<PrayerStatus>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    taraweeh: false
  });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedPrayerTimes, setSelectedPrayerTimes] = useState<Set<PrayerTime>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('gostivar');
  const [isInitializing, setIsInitializing] = useState(true);

  const getLocalizedText = () => {
    switch (language) {
      case 'tr':
        return {
          title: 'Ramazan Yolculuğunuzu Takip Edin',
          subtitle: 'Günlük namazlarınızı, teravih ve Kuran okuma ilerleyişinizi takip etmek için e-postanızı girin',
          emailPlaceholder: 'E-posta adresiniz',
          startButton: 'Takibe Başla',
          loading: 'Yükleniyor...',
          error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          welcome: 'Hoşgeldin',
          dailyPrayers: 'Günlük Namazlar',
          taraweehPrayer: 'Teravih Namazı',
          quranReading: 'Kuran Okuma',
          daily: 'Günlük',
          weekly: 'Haftalık',
          monthly: 'Aylık',
          sabah: 'Sabah',
          ogle: 'Öğle',
          ikindi: 'İkindi',
          aksam: 'Akşam',
          yatsi: 'Yatsı',
          teraweeh: 'Teravih',
          quranPagesRead: 'Okunan Kuran Sayfaları',
          noDataMessage: 'Grafikleri görmek için günlük ibadetlerinizi kaydedin',
          tapToAdd: 'Kaydetmek için simgelere tıklayın',
          startYourJourney: 'Ramazan yolculuğunuza başlayın',
          noteTitle: 'Not',
          noteMessage: 'Grafiklerinizi görmek için günlük ibadetlerinizi kaydedin',
          noteAction: 'Yukarıdaki simgelere tıklayarak başlayın'
        };
      case 'de':
        return {
          title: 'Verfolgen Sie Ihre Ramadan-Reise',
          subtitle: 'Geben Sie Ihre E-Mail-Adresse ein, um Ihre täglichen Gebete, Tarawih und Koran-Lesungen zu verfolgen',
          emailPlaceholder: 'Ihre E-Mail-Adresse',
          startButton: 'Tracking starten',
          loading: 'Wird geladen...',
          error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
          welcome: 'Willkommen',
          dailyPrayers: 'Tägliche Gebete',
          taraweehPrayer: 'Tarawih-Gebet',
          quranReading: 'Koran-Lesung',
          daily: 'Täglich',
          weekly: 'Wöchentlich',
          monthly: 'Monatlich',
          sabah: 'Fajr',
          ogle: 'Dhuhr',
          ikindi: 'Asr',
          aksam: 'Maghrib',
          yatsi: 'Isha',
          teraweeh: 'Tarawih',
          quranPagesRead: 'Gelesene Koran-Seiten',
          noDataMessage: 'Zeichnen Sie Ihre täglichen Gebete auf, um die Diagramme zu sehen',
          tapToAdd: 'Tippen Sie auf die Symbole zum Aufzeichnen',
          startYourJourney: 'Beginnen Sie Ihre Ramadan-Reise',
          noteTitle: 'Hinweis',
          noteMessage: 'Zeichnen Sie Ihre täglichen Gebete auf, um Ihre Grafiken zu sehen',
          noteAction: 'Klicken Sie auf die obigen Symbole, um zu beginnen'
        };
      case 'sq':
        return {
          title: 'Gjurmoni Udhëtimin tuaj të Ramazanit',
          subtitle: 'Vendosni emailin tuaj për të gjurmuar namazet e përditshme, teravitë dhe leximin e Kuranit',
          emailPlaceholder: 'Email-i juaj',
          startButton: 'Fillo Gjurmimin',
          loading: 'Duke u ngarkuar...',
          error: 'Ndodhi një gabim. Ju lutemi provoni përsëri.',
          welcome: 'Mirësevini',
          dailyPrayers: 'Namazet e Përditshme',
          taraweehPrayer: 'Namazi i Teravisë',
          quranReading: 'Leximi i Kuranit',
          daily: 'Ditore',
          weekly: 'Javore',
          monthly: 'Mujore',
          sabah: 'Sabah',
          ogle: 'Dreka',
          ikindi: 'Ikindia',
          aksam: 'Akshami',
          yatsi: 'Jacia',
          teraweeh: 'Teravia',
          quranPagesRead: 'Faqet e Lexuara të Kuranit',
          noDataMessage: 'Regjistroni lutjet tuaja ditore për të parë grafikët tuaj',
          tapToAdd: 'Prekni ikonat për të regjistruar',
          startYourJourney: 'Filloni udhëtimin tuaj të Ramazanit',
          noteTitle: 'Shënim',
          noteMessage: 'Regjistroni lutjet tuaja ditore për të parë grafikët tuaj',
          noteAction: 'Klikoni ikonat më sipër për të filluar'
        };
      default:
        return {
          title: 'Track Your Ramadan Journey',
          subtitle: 'Enter your email to start tracking your daily prayers, Taraweeh and Quran reading progress',
          emailPlaceholder: 'Enter your email',
          startButton: 'Start Tracking',
          loading: 'Loading...',
          error: 'An error occurred. Please try again.',
          welcome: 'Welcome',
          dailyPrayers: 'Daily Prayers',
          taraweehPrayer: 'Taraweeh Prayer',
          quranReading: 'Quran Reading',
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
          sabah: 'Fajr',
          ogle: 'Dhuhr',
          ikindi: 'Asr',
          aksam: 'Maghrib',
          yatsi: 'Isha',
          teraweeh: 'Taraweeh',
          quranPagesRead: 'Quran Pages Read',
          noDataMessage: 'Record your daily prayers to see the charts',
          tapToAdd: 'Tap the icons to record',
          startYourJourney: 'Start your Ramadan journey',
          noteTitle: 'Note',
          noteMessage: 'Record your daily prayers to see your charts',
          noteAction: 'Click the icons above to begin'
        };
    }
  };

  const localizedText = getLocalizedText();

  const fetchTodayProgress = useCallback(async () => {
    if (!currentUser) return;

    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const activityRef = doc(db, 'daily_activities', `${currentUser.email}_${today}`);
      const docSnap = await getDoc(activityRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPrayedToday({
          fajr: data.fajr === 1,
          dhuhr: data.dhuhr === 1,
          asr: data.asr === 1,
          maghrib: data.maghrib === 1,
          isha: data.isha === 1,
          taraweeh: data.taraweeh === 1
        });

        setChartData(prevData => {
          const updatedData = [...prevData];
          const todayIndex = updatedData.findIndex(item => item.rawDate === today);
          
          if (todayIndex >= 0) {
            updatedData[todayIndex] = {
              ...updatedData[todayIndex],
              fajr: data.fajr || 0,
              dhuhr: data.dhuhr || 0,
              asr: data.asr || 0,
              maghrib: data.maghrib || 0,
              isha: data.isha || 0,
              taraweeh: data.taraweeh || 0
            };
          }
          
          return updatedData;
        });
      }
    } catch (error) {
      console.error('Error fetching today\'s progress:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchTodayProgress();
    }
  }, [currentUser, fetchTodayProgress]);

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

  useEffect(() => {
    // Add error logging
    const handleError = async () => {
      try {
        if (currentUser) {
          console.log('Current user state:', currentUser);
          const today = format(new Date(), 'yyyy-MM-dd');
          console.log('Attempting to fetch data for:', today);
          
          const activityRef = doc(db, 'daily_activities', `${currentUser.email}_${today}`);
          const docSnap = await getDoc(activityRef);
          console.log('Document exists:', docSnap.exists());
          
          if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
          }
        } else {
          console.log('No current user');
        }
      } catch (error) {
        console.error('Debug error:', error);
      }
    };

    handleError();
  }, [currentUser]);

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
    if (prayedToday[prayerId as keyof PrayerStatus]) {
      return; // Prevent clicking again if already submitted
    }
  
    setSelectedPrayerTimes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(prayerId)) {
        newSet.delete(prayerId); // Allow unselecting if not submitted
      } else {
        newSet.add(prayerId);
      }
      return newSet;
    });
  };

  const handleAddActivity = async () => {
    if (!currentUser) return;

    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const activityRef = doc(db, 'daily_activities', `${currentUser.email}_${today}`);
      const docSnap = await getDoc(activityRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};

      const newData: ActivityData = {
        ...existingData,
        email: currentUser.email,
        date: today,
        lastUpdated: new Date()
      };

      if (selectedType === 'prayer') {
        selectedPrayerTimes.forEach((prayer) => {
          newData[prayer as keyof Pick<ActivityData, 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'>] = 1;
        });

        setPrayedToday(prev => ({
          ...prev,
          ...Array.from(selectedPrayerTimes).reduce((acc, prayer) => ({
            ...acc,
            [prayer]: true
          }), {})
        }));
      } else if (selectedType === 'taraweeh') {
        newData.taraweeh = 1;
      } else if (selectedType === 'quran') {
        newData.quran = Math.min(inputValue, 100);
      }

      await setDoc(activityRef, newData, { merge: true });

      setSuccessMessage('Activity saved successfully');
      setTimeout(() => setSuccessMessage(null), 3000);

      setIsModalOpen(false);
      setSelectedType(null);
      setSelectedPrayerTimes(new Set());
      setInputValue(0);

      await fetchTodayProgress();

    } catch (error) {
      console.error('Error saving activity:', error);
      setError('Failed to save activity');
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Wait for auth state to be determined
        const user = getUserFromStorage();
        if (user) {
          console.log('Found user in storage:', user);
        } else {
          console.log('No user in storage');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const hasNoData = () => {
    // Get today's date in yyyy-MM-dd format
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if there's any data for today
    const todayData = chartData.find(day => day.rawDate === today);
    
    if (todayData) {
      // Check if any prayer, taraweeh, or quran reading was recorded today
      const hasAnyActivity = 
        todayData.fajr > 0 || 
        todayData.dhuhr > 0 || 
        todayData.asr > 0 || 
        todayData.maghrib > 0 || 
        todayData.isha > 0 || 
        todayData.taraweeh > 0 || 
        todayData.quran > 0;

      // If there's any activity today, don't show the note
      if (hasAnyActivity) {
        return false;
      }
    }

    // Show note if there's no data at all or no activity today
    return true;
  };

  if (isInitializing) {
    return (
      <div className="goals-container">
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="goals-container">
      <AppHeader 
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />
      
      {!isAuthenticated ? (
        <AnimatePresence>
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
                <h2>{localizedText.title}</h2>
                <p>{localizedText.subtitle}</p>
                
                <form onSubmit={handleSignIn} className="auth-form">
                  <div className="input-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={localizedText.emailPlaceholder}
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
                        <span>{localizedText.loading}</span>
                      </div>
                    ) : (
                      localizedText.startButton
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
        </AnimatePresence>
      ) : (
        <div className="goals-content">
          <motion.h1 className="goals-title">
            {localizedText.welcome}, {currentUser?.email?.split('@')[0] || 'User'} 
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
              <span>{localizedText.dailyPrayers}</span>
              {Object.values(prayedToday).filter(Boolean).length > 0 && (
                <div className="completion-badge">
                  {Object.values(prayedToday).filter(Boolean).length}/6
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
              <span>{localizedText.taraweehPrayer}</span>
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
              <span>{localizedText.quranReading}</span>
            </motion.button>
          </div>

          <div className="time-filter">
            <motion.button
              className={`filter-btn ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {localizedText.daily}
            </motion.button>
            <motion.button
              className={`filter-btn ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {localizedText.weekly}
            </motion.button>
            <motion.button
              className={`filter-btn ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {localizedText.monthly}
            </motion.button>
          </div>

          {hasNoData() && (
            <div className="info-note">
              <div className="info-note-content">
                <h4>{localizedText.noteTitle}</h4>
                <p>{localizedText.noteMessage}</p>
                <span>{localizedText.noteAction}</span>
              </div>
            </div>
          )}

          <div className="charts-section">
            <div className="chart-card">
              <h3>
                <FaPrayingHands size={18} />
                {localizedText.dailyPrayers}
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
                  {PRAYER_TIMES.map((prayer) => {
                    const isPrayed = prayedToday[prayer.id as keyof PrayerStatus];
                    const isSelected = selectedPrayerTimes.has(prayer.id as PrayerTime);
                    
                    return (
                      <Bar 
                        key={prayer.id}
                        dataKey={prayer.id}
                        name={t(prayer.id)}
                        stackId="prayers"
                        fill={`url(#${prayer.id}Gradient)`}
                        radius={[4, 4, 0, 0]}
                      />
                    );
                  })}
                  <Bar 
                    dataKey="taraweeh"
                    name={t('taraweehPrayer')}
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
                {localizedText.quranPagesRead}
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
                      {selectedType === 'prayer' ? localizedText.dailyPrayers :
                       selectedType === 'taraweeh' ? localizedText.taraweehPrayer :
                       localizedText.quranReading}
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
                          const isPrayed = prayedToday[prayer.id as keyof PrayerStatus];
                          const isSelected = selectedPrayerTimes.has(prayer.id as PrayerTime);
                          
                          return (
                            <motion.button
                              key={prayer.id}
                              className={`prayer-option ${isPrayed ? 'completed' : ''} ${isSelected ? 'selected' : ''}`}
                              onClick={() => handlePrayerTimeToggle(prayer.id as PrayerTime)}
                              disabled={isPrayed}
                              style={isPrayed ? completedStyle : isSelected ? selectedStyle : {}}
                            >
                              {prayer.icon}
                              <span>{t(prayer.id)}</span>
                              {isPrayed && <span className="completed-badge">✓ {t('completed')}</span>}
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
                        {t('submitSelectedPrayers')}
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
                          <span>{t('iPrayedTaraweeh')}</span>
                          {chartData.find(d => d.rawDate === format(new Date(), 'yyyy-MM-dd'))?.taraweeh ? (
                            <span className="completed-badge">✓ {t('completed')}</span>
                          ) : inputValue === 1 ? (
                            <span className="selected-badge">{t('selected')}</span>
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
                          {t('submitTaraweehPrayer')}
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
                            placeholder="0"
                            className="quran-input"
                            min={0}
                            max={100}
                          />
                          <div className="quran-input-controls">
                            <button
                              className="quran-control-btn"
                              onClick={() => setInputValue(prev => Math.min(prev + 1, 100))}
                              disabled={inputValue >= 100}
                            >
                              +
                            </button>
                            <button
                              className="quran-control-btn"
                              onClick={() => setInputValue(prev => Math.max(prev - 1, 0))}
                              disabled={inputValue <= 0}
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <span className="quran-input-label">{t('pagesReadToday')}</span>
                      </div>
                      <motion.button
                        className="submit-btn"
                        onClick={handleAddActivity}
                        disabled={inputValue === 0 || inputValue > 100}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t('submitQuranReading')}
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

          <Footer />
        </div>
      )}
    </div>
  );
};

export default GoalsTracker; 