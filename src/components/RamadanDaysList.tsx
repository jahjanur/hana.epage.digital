import React, { useEffect, useState, useRef } from 'react';
import './RamadanDaysList.css';
import { ramadanTimes, getCityPrayerTimes, normalizeWeekday } from '../data/prayerTimes';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { BsSunset } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import confetti from 'canvas-confetti';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { FaPrayingHands, FaMosque, FaQuran } from 'react-icons/fa';
import { motion } from 'framer-motion';


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
  
  // Current day for highlighting
  const currentDay: number = 2;
  
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

  const navigate = useNavigate();

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

      let timeLeft: number;
      let totalDuration: number;

      // Check if it's exactly Iftar time
      if (now.getHours() === maghribHours && now.getMinutes() === maghribMinutes && !isIftarTime) {
        setIsIftarTime(true);
        setShowCelebration(true);
        triggerCelebration();
        setTimeout(() => {
          setShowCelebration(false);
          setIsIftarTime(false);
        }, 60000); // Reset after 1 minute
      }

      if (now >= fajrTime && now <= maghribTime) {
        // During fasting period
        timeLeft = maghribTime.getTime() - now.getTime();
        totalDuration = maghribTime.getTime() - fajrTime.getTime();
        setCurrentPeriod('fasting');
      } else {
        // During eating period
        const nextFajr = new Date(fajrTime);
        if (now > maghribTime) {
          nextFajr.setDate(nextFajr.getDate() + 1);
        }
        timeLeft = nextFajr.getTime() - now.getTime();
        totalDuration = nextFajr.getTime() - maghribTime.getTime();
        setCurrentPeriod('eating');
      }

      // Calculate progress percentage
      const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
      setProgress(progressPercent);

      // Format countdown
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [visibleDays, currentDay, isIftarTime]);

  const getDayStatus = (dayNumber: number) => {
    if (dayNumber < currentDay) {
      return 'past-day completed';
    } else if (dayNumber === currentDay) {
      return 'current-day';
    }
    return '';
  };

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

      <motion.div 
        className="goals-redirect-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="goals-content">
          <h3 className="goals-title">{t('trackYourJourney')}</h3>
          <p className="goals-description">{t('trackYourProgress')}</p>
          
          <div className="goals-features">
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPrayingHands className="feature-icon" />
              <span>{t('dailyPrayers')}</span>
            </motion.div>
            
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMosque className="feature-icon" />
              <span>{t('taraweehPrayer')}</span>
            </motion.div>
            
            <motion.div 
              className="feature-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaQuran className="feature-icon" />
              <span>{t('quranReading')}</span>
            </motion.div>
          </div>

          <motion.button
            className="start-tracking-btn"
            onClick={() => navigate('/goals')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('startTracking')}
          </motion.button>
        </div>
      </motion.div>

      <div className="powered-by">
        {t('poweredBy')} <a href="https://epage.digital" target="_blank" rel="noopener noreferrer">epage.digital</a>
      </div>
    </div>
  );
};

export default RamadanDaysList; 