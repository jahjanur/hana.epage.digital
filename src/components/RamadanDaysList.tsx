import React, { useEffect, useState, useRef } from 'react';
import './RamadanDaysList.css';
import { ramadanTimes, getCityPrayerTimes } from '../data/prayerTimes';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { BsSunset } from "react-icons/bs";
import { IoClose } from "react-icons/io5";


interface RamadanDay {
  dayNumber: number;
  date: string;
  weekday: string;
  syfyr: string;
  iftar: string;
  special?: string;
}

interface RamadanDaysListProps {
  selectedCity: string;
}

const RamadanDaysList: React.FC<RamadanDaysListProps> = ({ selectedCity }) => {
  const [visibleDays, setVisibleDays] = useState<RamadanDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const currentDayRef = useRef<HTMLDivElement>(null);
  const [expandedDua, setExpandedDua] = useState<'syfyr' | 'iftar' | null>(null);
  const [countdown, setCountdown] = useState('00:00:00');
  const [progress, setProgress] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState<'fasting' | 'eating'>('fasting');
  
  // Current day for highlighting
  const currentDay: number = 29;
  
  const duas = {
    syfyr: {
      title: "Dua e Syfyrit",
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
      transliteration: "Nevejtus savme gadin min šehri Ramadane",
      translation: "Kam për qëllim të agjëroj nesër në muajin e Ramazanit për hir të Allahut të Madhëruar."
    },
    iftar: {
      title: "Dua e Iftarit",
      arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ وَعَلَيْكَ تَوَكَّلْتُ",
      transliteration: "Allahumme leke sumtu ve bike amentu ve ala rizkike eftertu ve alejke tevekkeltu",
      translation: "O Allah, për Ty agjërova, në Ty besova, me furnizimin Tënd e prisha agjërimin dhe në Ty u mbështeta."
    }
  };

  useEffect(() => {
    const allDays = ramadanTimes.map((day, index) => {
      const cityTimes = getCityPrayerTimes(selectedCity, day.date);
      return {
        dayNumber: index + 1,
        date: day.date,
        weekday: day.weekday,
        syfyr: cityTimes?.fajr || day.fajr,
        iftar: cityTimes?.maghrib || day.maghrib,
        special: day.special
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
  }, [visibleDays, currentDay]);

  const getDayStatus = (dayNumber: number) => {
    if (dayNumber < currentDay) {
      return 'past-day completed';
    } else if (dayNumber === currentDay) {
      return 'current-day';
    }
    return '';
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Modern Circular Progress Section */}
      <div className="countdown-circle-container">
        <div className="countdown-circle-wrapper" data-period={currentPeriod}>
          <svg className="countdown-circle" viewBox="0 0 100 100">
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ 
                  stopColor: '#ff4d4d',
                  stopOpacity: 1 
                }} />
                <stop offset={`${progress}%`} style={{ 
                  stopColor: progress < 50 ? '#ff4d4d' : '#3cd097',
                  stopOpacity: 1 
                }} />
                <stop offset="100%" style={{ 
                  stopColor: '#3cd097',
                  stopOpacity: 1 
                }} />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3cd097', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#2ecc71', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#27ae60', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#ffb900', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff9500', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background circle */}
            <circle
              className="countdown-circle-bg"
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke={currentPeriod === 'fasting' ? 'url(#greenGradient)' : 'url(#goldGradient)'}
              filter="url(#glow)"
            />
            {/* Progress circle */}
            <circle
              className="countdown-circle-progress"
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke={currentPeriod === 'fasting' ? 'url(#progressGradient)' : 'url(#goldGradient)'}
              strokeDasharray="270.2"
              strokeDashoffset={270.2 - (270.2 * progress) / 100}
              transform="rotate(-90 50 50)"
              filter="url(#glow)"
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
              {currentPeriod === 'fasting' ? 'until Iftar' : 'until Syfyr'}
            </div>
          </div>
        </div>
      </div>

      <div className="dua-buttons-container">
        <button 
          className="dua-button"
          onClick={() => setExpandedDua(expandedDua === 'syfyr' ? null : 'syfyr')}
        >
          <IoMoonOutline className="dua-button-icon" />
          <span className="dua-button-text">Dua e Syfyrit</span>
        </button>
        <button 
          className="dua-button"
          onClick={() => setExpandedDua(expandedDua === 'iftar' ? null : 'iftar')}
        >
          <IoSunnyOutline className="dua-button-icon" />
          <span className="dua-button-text">Dua e Iftarit</span>
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
          <div className="dua-content">
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
              {day.dayNumber === currentDay && !day.special && <span className="today-badge">SOT</span>}
              <div className="item-left">
                <div className="day-number">{day.dayNumber}</div>
                <div className="day-text">
                  {day.weekday}
                  {day.special && <span className="special-night">{day.special}</span>}
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
    </div>
  );
};

export default RamadanDaysList; 