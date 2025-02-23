import React, { useEffect, useState, useRef } from 'react';
import './RamadanDaysList.css';
import { ramadanTimes, getCityPrayerTimes } from '../data/prayerTimes';
import { IoMoonOutline } from "react-icons/io5";
import { BsSunset } from "react-icons/bs";
import DuateContent from './DuateContent';

interface RamadanDay {
  dayNumber: number;
  date: string;
  weekday: string;
  syfyr: string;
  iftar: string;
  special?: string;
}

const RamadanDaysList: React.FC = () => {
  const [visibleDays, setVisibleDays] = useState<RamadanDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('gostivar');
  const currentDayRef = useRef<HTMLDivElement>(null);
  
  // Current day for highlighting
  const currentDay: number = 15;
  
  useEffect(() => {
    const allDays = ramadanTimes.map((day, index) => {
      const cityTimes = getCityPrayerTimes(selectedCity, day.date);
      return {
        dayNumber: index + 1,
        date: day.date,
        weekday: day.weekday.replace('E ', ''),
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
      <DuateContent />
    </div>
  );
};

export default RamadanDaysList; 