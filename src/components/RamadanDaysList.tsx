import React, { useEffect, useState, useRef, useMemo } from 'react';
import './RamadanDaysList.css';
import { ramadanTimes, getCityPrayerTimes, normalizeWeekday } from '../data/prayerTimes';
import { IoMoonOutline, IoSunnyOutline, IoShareOutline, IoAddCircleOutline } from "react-icons/io5";
import { BsSunset } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoDownloadOutline } from "react-icons/io5";
import confetti from 'canvas-confetti';
import { useLanguage } from '../contexts/LanguageContext';
import { FaPrayingHands, FaMosque, FaQuran, FaSafari, FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FooterEpageLogo } from '../assets/FooterEPAGE.svg';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface RamadanDay {
  dayNumber: number;
  date: string;
  weekday: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  syfyr: string;
  iftar: string;
  special?: 'laylatulQadr' | null;
}

interface RamadanDaysListProps {
  selectedCity: string;
}

const RamadanDaysList: React.FC<RamadanDaysListProps> = ({ selectedCity }) => {
  const { t } = useLanguage();
  const [visibleDays, setVisibleDays] = useState<RamadanDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const currentDayRef = useRef<HTMLDivElement>(null);
  const [expandedDua, setExpandedDua] = useState<'syfyr' | 'iftar' | null>(null);
  const [countdown, setCountdown] = useState('00:00:00');
  const [progress, setProgress] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState<'fasting' | 'eating'>('fasting');
  const [isIftarTime, setIsIftarTime] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  
  // Current day for highlighting - using actual current date
  const currentDay = useMemo(() => new Date().getDate(), []);

  // Add refs for tracking previous values
  const prevCountdownRef = useRef('00:00:00');
  const prevProgressRef = useRef(0);
  const prevPeriodRef = useRef<'fasting' | 'eating'>('fasting');

  const duas = {
    syfyr: {
      title: t('nijetTitle'),
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
      transliteration: t('nijetTransliteration'),
      translation: t('nijetTranslation')
    },
    iftar: {
      title: t('iftarDuaTitle'),
      arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ وَعَلَيْكَ تَوَكَّلْتُ",
      transliteration: t('iftarDuaTransliteration'),
      translation: t('iftarDuaTranslation')
    }
  };

  useEffect(() => {
    const allDays = ramadanTimes.map((day, index) => {
      const cityTimes = getCityPrayerTimes(selectedCity, day.date);
      return {
        dayNumber: index + 1,
        date: day.date,
        weekday: normalizeWeekday(day.weekday),
        syfyr: cityTimes?.fajr || day.fajr,
        iftar: cityTimes?.maghrib || day.maghrib,
        special: day.special as 'laylatulQadr' | null
      };
    });
    setVisibleDays(allDays);

    // Scroll to current day after render
    setTimeout(() => {
      if (currentDayRef.current) {
        currentDayRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  }, [selectedCity]);

  // Function to trigger confetti
  const triggerCelebration = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  // Calculate countdown and progress
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentDayData = visibleDays.find(day => day.dayNumber === currentDay);
      
      if (!currentDayData) return;

      const [fajrHours, fajrMinutes] = currentDayData.syfyr.split(':').map(Number);
      const [maghribHours, maghribMinutes] = currentDayData.iftar.split(':').map(Number);

      const fajrTime = new Date(now);
      fajrTime.setHours(fajrHours, fajrMinutes, 0, 0);
      
      const maghribTime = new Date(now);
      maghribTime.setHours(maghribHours, maghribMinutes, 0, 0);

      // Check if it's exactly Iftar time - only update if state would change
      if (now.getHours() === maghribHours && now.getMinutes() === maghribMinutes && !isIftarTime) {
        setIsIftarTime(true);
        setShowCelebration(true);
        triggerCelebration();
        setTimeout(() => {
          setShowCelebration(false);
          setIsIftarTime(false);
        }, 60000); // Reset after 1 minute
        return; // Exit early to prevent other state updates
      }

      let timeLeft: number;
      let totalDuration: number;
      let newPeriod: 'fasting' | 'eating' = prevPeriodRef.current;

      if (now >= fajrTime && now <= maghribTime) {
        // During fasting period
        timeLeft = maghribTime.getTime() - now.getTime();
        totalDuration = maghribTime.getTime() - fajrTime.getTime();
        newPeriod = 'fasting';
      } else {
        // During eating period
        const nextFajr = new Date(fajrTime);
        if (now > maghribTime) {
          nextFajr.setDate(nextFajr.getDate() + 1);
        }
        timeLeft = nextFajr.getTime() - now.getTime();
        totalDuration = nextFajr.getTime() - maghribTime.getTime();
        newPeriod = 'eating';
      }

      // Only update period if it changed
      if (newPeriod !== prevPeriodRef.current) {
        setCurrentPeriod(newPeriod);
        prevPeriodRef.current = newPeriod;
      }

      // Calculate progress percentage
      const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
      
      // Only update progress if it changed significantly (more than 0.1%)
      if (Math.abs(progressPercent - prevProgressRef.current) > 0.1) {
        setProgress(progressPercent);
        prevProgressRef.current = progressPercent;
      }

      // Format countdown
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const newCountdown = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      // Only update countdown if it changed
      if (newCountdown !== prevCountdownRef.current) {
        setCountdown(newCountdown);
        prevCountdownRef.current = newCountdown;
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [visibleDays, currentDay, isIftarTime]);

  // Add event listener for PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const checkInstallation = () => {
      // Check if running as standalone PWA
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone ||
                          document.referrer.includes('android-app://') ||
                          window.location.href.includes('?mode=pwa');
      
      // Handle PWA URL cleanup
      if (isStandalone || window.matchMedia('(display-mode: standalone)').matches) {
        // Clean up URL if needed
        const currentPath = window.location.pathname;
        if (currentPath.includes('index.html') || currentPath !== '/') {
          const basePath = window.location.origin + '/';
          // Use replace to avoid adding to browser history
          window.location.replace(basePath);
          return;
        }
      }
      
      setIsAppInstalled(isStandalone);
    };

    // Check on mount and when display mode changes
    checkInstallation();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('load', checkInstallation);
    
    const displayModeQuery = window.matchMedia('(display-mode: standalone)');
    displayModeQuery.addListener(checkInstallation);

    // Also check when the page becomes visible (handles iOS "Add to Home Screen" case)
    document.addEventListener('visibilitychange', checkInstallation);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('load', checkInstallation);
      displayModeQuery.removeListener(checkInstallation);
      document.removeEventListener('visibilitychange', checkInstallation);
    };
  }, []);

  const handleInstallClick = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) {
      // Check if it's already installed
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isStandalone) {
        alert('The app is already installed!');
        return;
      }
      
      // For desktop Chrome/Edge, show manual install instructions
      const isChromium = navigator.userAgent.toLowerCase().includes('chrome') || 
                        navigator.userAgent.toLowerCase().includes('edge');
      if (isChromium) {
        alert('To install: click the install icon (⊕) in the address bar or open the menu (⋮) and select "Install app"');
      } else {
        alert('To install the app, add this page to your home screen through your browser menu');
      }
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsAppInstalled(true);
        // Ensure the app opens to the root path after installation
        if (window.location.pathname !== '/') {
          window.location.replace(window.location.origin + '/');
        }
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  const getDayStatus = (dayNumber: number) => {
    if (dayNumber < currentDay) {
      return 'past-day completed';
    } else if (dayNumber === currentDay) {
      return 'current-day';
    }
    return '';
  };

  const IOSInstallModal = () => (
    <div className="ios-install-modal" onClick={() => setShowIOSModal(false)}>
      <div className="ios-install-content" onClick={e => e.stopPropagation()}>
        <button className="ios-install-close" onClick={() => setShowIOSModal(false)}>
          <IoClose size={24} />
        </button>
        <div className="ios-install-header">
          <h2 className="ios-install-title">
            {t('installOnIOS')} <FaApple className="apple-logo" />
          </h2>
        </div>
        <div className="ios-install-steps">
          <div className="ios-install-step">
            <div className="step-number">1</div>
            <FaSafari className="step-icon" />
            <div className="step-text">{t('openInSafari')}</div>
          </div>
          <div className="ios-install-step">
            <div className="step-number">2</div>
            <IoShareOutline className="step-icon" />
            <div className="step-text">{t('tapShareButton')}</div>
          </div>
          <div className="ios-install-step">
            <div className="step-number">3</div>
            <IoAddCircleOutline className="step-icon" />
            <div className="step-text">{t('tapAddToHomeScreen')}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative' }} className={showCelebration ? 'celebration-active' : ''}>
      {/* Modern Circular Progress Section */}
      <div className="countdown-circle-container">
        <div className="countdown-circle-wrapper" data-period={currentPeriod}>
          {!showCelebration ? (
            <>
              <svg 
                className="countdown-circle" 
                viewBox="0 0 100 100"
                data-progress={Math.round(progress)}
              >
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" />
                    <stop offset="100%" />
                  </linearGradient>
                </defs>
                
                {/* Background circle */}
                <circle
                  className="countdown-circle-bg"
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                />
                {/* Progress circle */}
                <circle
                  className="countdown-circle-progress"
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  strokeDasharray="270.2"
                  strokeDashoffset={270.2 - (270.2 * progress) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="countdown-content">
                <div className="countdown-time">
                  {countdown.split('').map((char, index) => (
                    <span 
                      key={index} 
                      className="countdown-digit"
                      style={{
                        color: currentPeriod === 'fasting' 
                          ? progress < 50 
                            ? `rgba(255, ${Math.round(77 + (progress * 2.5))}, ${Math.round(77 + (progress * 2.5))}, 1)`
                            : '#3cd097'
                          : '#ffd700',
                        textShadow: `0 0 20px ${
                          currentPeriod === 'fasting'
                            ? progress < 50
                              ? 'rgba(255, 77, 77, 0.5)'
                              : 'rgba(60, 208, 151, 0.5)'
                            : 'rgba(255, 215, 0, 0.5)'
                        }`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="countdown-label">
                  {currentPeriod === 'fasting' ? t('untilIftar') : t('untilSyfyr')}
                </div>
              </div>
            </>
          ) : (
            <div className="celebration-message">
              {t('acceptancePrayer')}
            </div>
          )}
        </div>
      </div>

      {!isAppInstalled && (
        <motion.div 
          className="install-button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="install-button" onClick={handleInstallClick}>
            <IoDownloadOutline className="install-icon" />
            <span>{t('installApp')}</span>
          </button>
        </motion.div>
      )}

      {showIOSModal && <IOSInstallModal />}

      <div className="dua-buttons-container">
        <button 
          className="dua-button"
          onClick={() => setExpandedDua(expandedDua === 'syfyr' ? null : 'syfyr')}
        >
          <IoMoonOutline className="dua-button-icon" />
          <span className="dua-button-text">{t('nijetTitle')}</span>
        </button>
        <button 
          className="dua-button"
          onClick={() => setExpandedDua(expandedDua === 'iftar' ? null : 'iftar')}
        >
          <IoSunnyOutline className="dua-button-icon" />
          <span className="dua-button-text">{t('iftarDuaTitle')}</span>
        </button>
      </div>

      {expandedDua && (
        <div className="dua-content-wrapper">
          <div className="dua-header">
            <h3 className="dua-title">{duas[expandedDua].title}</h3>
            <button className="close-button" onClick={() => setExpandedDua(null)}>
              <IoClose size={18} />
            </button>
          </div>
          <div className="dua-content-nijet">
            <div className="arabic-text">{duas[expandedDua].arabic}</div>
            <div className="transliteration">{duas[expandedDua].transliteration}</div>
            <div className="translation">{duas[expandedDua].translation}</div>
          </div>
        </div>
      )}

      <div className="schedule">
        <div className="schedule-list">
          {visibleDays.map((day, index) => (
            <div 
              key={day.dayNumber} 
              ref={day.dayNumber === currentDay ? currentDayRef : null}
              className={`schedule-item 
                ${selectedDay === day.dayNumber ? 'selected' : ''} 
                ${getDayStatus(day.dayNumber)}
                ${day.special ? 'laylatul-qadr' : ''}`}
              onClick={() => setSelectedDay(day.dayNumber)}
              style={{ '--index': index } as React.CSSProperties}
            >
              {day.dayNumber === currentDay && !day.special && <span className="today-badge">{t('today')}</span>}
              <div className="item-left">
                <div className="day-number">{day.dayNumber}</div>
                <div className="day-text">
                  {t(day.weekday)}
                  {day.special && <span className="special-night">{t('laylatulQadr')}</span>}
                </div>
              </div>
              <div className="item-right">
                <div className="time">
                  <span className="time-label">
                    <IoMoonOutline className="time-icon" />
                  </span>
                  <span className="time-value">{day.syfyr}</span>
                </div>
                <div className="time">
                  <span className="time-label">
                    <BsSunset className="time-icon" />
                  </span>
                  <span className="time-value">{day.iftar}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tracking-container">
        <h3 className="tracking-title">{t('trackYourJourney')}</h3>
        <button 
          className="tracking-button"
          onClick={() => navigate('/goals')}
        >
          {t('startTracking')}
        </button>
      </div>

      <div className="epage-footer">
        <a 
          href="https://epage.digital" 
          target="_blank" 
          rel="noopener noreferrer"
          className="epage-link"
        >
          <FooterEpageLogo className="epage-logo" />
        </a>
      </div>

      <div className="powered-by">
        {t('poweredBy')} <a href="https://epage.digital" target="_blank" rel="noopener noreferrer">epage.digital</a>
      </div>
    </div>
  );
};

export default RamadanDaysList; 