import React, { useState, useEffect, useRef } from 'react';
import './RamadanCountdown.css';
import { IoCloudyNight, IoMoonOutline, IoSunnyOutline, IoNotificationsOutline, IoNotificationsOffOutline } from "react-icons/io5";
import { FaPrayingHands, FaMosque } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import BottomNavigation from './BottomNavigation';
import { ReactComponent as HanaLogo } from '../assets/hanaMainLogoWhite.svg';
import RamadanDaysList from './RamadanDaysList';
import AnimatedBackground from './AnimatedBackground';

import CitySelector from './CitySelector';
import AppHeader from './AppHeader';
import { getCityPrayerTimes } from '../data/prayerTimes';
import { useLanguage } from '../contexts/LanguageContext';

interface RamadanCountdownProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const RamadanCountdown: React.FC<RamadanCountdownProps> = ({ 
  selectedCity, 
  onCityChange,
  selectedLanguage,
  onLanguageChange
}) => {
  const { t } = useLanguage();

  const [greenProgress, setGreenProgress] = useState<number>(0);
  const [redProgress, setRedProgress] = useState<number>(0);

  const [currentTime, setCurrentTime] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [notifications, setNotifications] = useState({
    syfyr: false,
    iftar: false
  });
  const [currentPeriod, setCurrentPeriod] = useState<'fasting' | 'eating' | 'free'>('free');
  const [isIftarDone, setIsIftarDone] = useState(false);
  const [fajrTime, setFajrTime] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [iftarTime, setIftarTime] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [completedProgress, setCompletedProgress] = useState<number>(0);
  const [remainingProgress, setRemainingProgress] = useState<number>(0);

  // Add refs for tracking previous values
  const prevTimeRef = useRef('');
  const prevProgressRef = useRef({ green: 0, red: 0, yellow: 0 });
  const prevPeriodRef = useRef<'fasting' | 'eating' | 'free'>('free');
  const prevRemainingTimeRef = useRef('');

  // Add this new useEffect for scroll behavior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this runs once when component mounts

  // Create date objects for comparison
  const getCurrentFajrAndIftar = (now: Date) => {
    const fajr = new Date(now);
    fajr.setHours(fajrTime.hours, fajrTime.minutes, 0);
    
    const iftar = new Date(now);
    iftar.setHours(iftarTime.hours, iftarTime.minutes, 0);

    return { fajr, iftar };
  };

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      // Only update if time string changed
      if (timeString !== prevTimeRef.current) {
        setCurrentTime(timeString);
        prevTimeRef.current = timeString;
      }

      // Create Date objects for today's Syfyru and Iftar
      const syfyr = new Date(now);
      syfyr.setHours(fajrTime.hours, fajrTime.minutes, 0, 0);
      const iftar = new Date(now);
      iftar.setHours(iftarTime.hours, iftarTime.minutes, 0, 0);

      // Check if current time matches Iftar time (within the same minute)
      const isIftarTime = now.getHours() === iftarTime.hours && 
                         now.getMinutes() === iftarTime.minutes;

      let newGreenProgress = prevProgressRef.current.green;
      let newRedProgress = prevProgressRef.current.red;
      let newProgress = prevProgressRef.current.yellow;
      let newPeriod = prevPeriodRef.current;
      let nextSyfyr: Date | null = null;

      if (isIftarTime) {
        // Show full green circle at Iftar time
        newGreenProgress = 100;
        newRedProgress = 0;
        newProgress = 0;
        newPeriod = 'fasting';
      } else if (now >= syfyr && now <= iftar) {
        // Regular fasting period logic
        const totalFastingDuration = iftar.getTime() - syfyr.getTime();
        const elapsedFasting = now.getTime() - syfyr.getTime();
        const remainingFasting = iftar.getTime() - now.getTime();

        // Calculate minutes until Iftar
        const minutesUntilIftar = remainingFasting / (1000 * 60);

        // Calculate percentages
        const greenProg = (elapsedFasting / totalFastingDuration) * 100;
        const redProg = (remainingFasting / totalFastingDuration) * 100;
        
        if (minutesUntilIftar <= 20) {
          // Store the progress values at exactly 20 minutes mark
          const twentyMinGreenProg = ((totalFastingDuration - (20 * 60 * 1000)) / totalFastingDuration) * 100;
          const twentyMinRedProg = ((20 * 60 * 1000) / totalFastingDuration) * 100;
          
          newRedProgress = twentyMinRedProg;
          newGreenProgress = twentyMinGreenProg;
        } else {
          newRedProgress = redProg;
          newGreenProgress = greenProg;
        }
        
        newProgress = 0;
        newPeriod = 'fasting';
      } else {
        // Eating period - calculate time until next Syfyr
        nextSyfyr = new Date(now);
        
        // If we're past Iftar but before midnight, set nextSyfyr to tomorrow's Syfyr
        if (now > iftar && now.getHours() >= iftar.getHours()) {
          nextSyfyr.setDate(nextSyfyr.getDate() + 1);
        }
        
        // Set the next Syfyr time
        nextSyfyr.setHours(fajrTime.hours, fajrTime.minutes, 0, 0);
        
        const timeLeftEating = nextSyfyr.getTime() - now.getTime();
        const totalEatingDuration = nextSyfyr.getTime() - iftar.getTime();
        
        // Calculate yellow progress (starts at 100% and decreases)
        newProgress = (timeLeftEating / totalEatingDuration) * 100;
        newGreenProgress = 0;
        newRedProgress = 0;
        newPeriod = 'eating';
      }

      // Only update states if they've changed significantly
      if (Math.abs(newGreenProgress - prevProgressRef.current.green) > 0.1) {
        setGreenProgress(newGreenProgress);
        prevProgressRef.current.green = newGreenProgress;
      }
      if (Math.abs(newRedProgress - prevProgressRef.current.red) > 0.1) {
        setRedProgress(newRedProgress);
        prevProgressRef.current.red = newRedProgress;
      }
      if (Math.abs(newProgress - prevProgressRef.current.yellow) > 0.1) {
        setProgress(newProgress);
        prevProgressRef.current.yellow = newProgress;
      }
      if (newPeriod !== prevPeriodRef.current) {
        setCurrentPeriod(newPeriod);
        prevPeriodRef.current = newPeriod;
      }

      // Calculate remaining time
      const timeLeft = newPeriod === 'fasting' 
        ? iftar.getTime() - now.getTime()
        : nextSyfyr ? nextSyfyr.getTime() - now.getTime() : 0;

      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Format the time with padStart to ensure two digits
      const formattedTime = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

      // Only update remaining time if it changed
      if (formattedTime !== prevRemainingTimeRef.current) {
        setRemainingTime(formattedTime);
        prevRemainingTimeRef.current = formattedTime;
      }
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [fajrTime, iftarTime]); // Removed remainingTime from dependencies

  // Define circle properties for the progress ring.
  const radius = 90;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  // Toggle notifications.
  const toggleNotification = async (type: 'syfyr' | 'iftar') => {
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Helpers for active time blocks.
  const isTimeForSyfyr = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 3 && hours < 5;
  };

  const isTimeForIftar = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 17 && hours < 19;
  };

  // Get styles for the bottom progress bar.
  const getProgressBarStyles = () => {
    if (currentPeriod === 'fasting') {
      return {
        // Red bar shows the elapsed fasting time.
        red: `${Math.max(0, Math.min(100, redProgress))}%`,
        // Green bar shows the remaining fasting time.
        green: `${Math.max(0, Math.min(100, greenProgress))}%`,
        yellow: '0%'
      };
    } else {
      return {
        red: '0%',
        green: '0%',
        yellow: `${Math.max(0, Math.min(100, progress))}%`
      };
    }
  };

  // Get today's prayer times based on selected city
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const cityTimes = getCityPrayerTimes(selectedCity, today);
    
    if (cityTimes) {
      const [fajrHours, fajrMinutes] = cityTimes.fajr.split(':').map(Number);
      const [maghribHours, maghribMinutes] = cityTimes.maghrib.split(':').map(Number);
      
      setFajrTime({ hours: fajrHours, minutes: fajrMinutes });
      setIftarTime({ hours: maghribHours, minutes: maghribMinutes });
    }
  }, [selectedCity, currentDateTime]);

  // Update current date time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ramadan-countdown">
      <AppHeader selectedCity={selectedCity} onCityChange={onCityChange} />
      <div className="countdown-container">

        <div className="content-wrapper" style={{ position: 'relative', zIndex: 3 }}>
          <AnimatedBackground />
          
          {/* Floating circles */}
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          
          {/* Clock Display */}
          <div className="clock-container scale-in">
            <div className="inner-circle">
              <div className="inner-content">
                <div className="icon-container">
                  <div className="weather-icon">
                    {currentPeriod === 'fasting' ? '🌙' : '☀️'}
                  </div>
                </div>
                <div className="countdown-display">
                  <div className="time-digits">
                    <span className="time-digit">
                      {parseInt(remainingTime.split(':')[0], 10).toString().padStart(2, '0')}
                    </span>
                    <span className="time-separator">:</span>
                    <span className="time-digit">
                      {parseInt(remainingTime.split(':')[1], 10).toString().padStart(2, '0')}
                    </span>
                    <span className="time-separator">:</span>
                    <span className="time-digit">
                      {parseInt(remainingTime.split(':')[2], 10).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="period-label">
                    <span className="period-text">
                      {currentPeriod === 'fasting' ? t('untilIftar') : t('untilSyfyr')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder Section */}
          <div className="reminder-section slide-up">
            <div className="times-container">
              <div className={`time-block ${isTimeForSyfyr() ? 'active' : ''}`}>
                <div className="time-header">
                  <IoMoonOutline className="time-icon" />
                  <span>{t('syfyr')}</span>
                  <button 
                    className={`notification-toggle ${notifications.syfyr ? 'enabled' : ''}`}
                    onClick={() => toggleNotification('syfyr')}
                    title={notifications.syfyr ? t('disableNotifications') : t('enableNotifications')}
                  >
                    {notifications.syfyr ? 
                      <IoNotificationsOutline className="notification-icon" /> : 
                      <IoNotificationsOffOutline className="notification-icon" />
                    }
                  </button>
                </div>
                <div className="time-value">
                  {`${fajrTime.hours}:${String(fajrTime.minutes).padStart(2, '0')}`}
                </div>
              </div>
              
              <div className={`time-block ${isTimeForIftar() ? 'active' : ''}`}>
                <div className="time-header">
                  <IoSunnyOutline className="time-icon" />
                  <span>{t('iftar')}</span>
                  <button 
                    className={`notification-toggle ${notifications.iftar ? 'enabled' : ''}`}
                    onClick={() => toggleNotification('iftar')}
                    title={notifications.iftar ? t('disableNotifications') : t('enableNotifications')}
                  >
                    {notifications.iftar ? 
                      <IoNotificationsOutline className="notification-icon" /> : 
                      <IoNotificationsOffOutline className="notification-icon" />
                    }
                  </button>
                </div>
                <div className="time-value">
                  {`${iftarTime.hours}:${String(iftarTime.minutes).padStart(2, '0')}`}
                </div>
              </div>
            </div>
          </div>

          {/* Days List */}
          <RamadanDaysList selectedCity={selectedCity} />

          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default RamadanCountdown; 