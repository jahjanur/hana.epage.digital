import React, { useEffect, useState, useRef } from 'react';
import './RamadanDaysList.css';
import { ramadanTimes, getCityPrayerTimes } from '../data/prayerTimes';

interface RamadanDay {
  dayNumber: number;
  date: string;
  weekday: string;
  syfyr: string;
  iftar: string;
}

const RamadanDaysList: React.FC = () => {
  const [visibleDays, setVisibleDays] = useState<RamadanDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const currentDayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const days = ramadanTimes.map((day, index) => {
      const cityTimes = getCityPrayerTimes('gostivar', day.date);
      return {
        dayNumber: index + 1,
        date: day.date,
        weekday: day.weekday.replace('E ', ''),
        syfyr: cityTimes?.fajr || day.fajr,
        iftar: cityTimes?.maghrib || day.maghrib
      };
    });
    
    setVisibleDays(days);

    // Scroll to current day after render
    setTimeout(() => {
      if (currentDayRef.current) {
        currentDayRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  }, []);

  const getDayStatus = (dayNumber: number) => {
    const currentDay = 9; // Since we're on day 9
    
    // Check if the day is before the current day
    if (dayNumber < currentDay) {
      return 'past-day completed'; // Class for past days
    } else if (dayNumber === currentDay) {
      return 'current-day'; // Class for the current day
    }
    
    return ''; // Default class for future days
  };

  return (
    <div className="schedule">
      <div className="schedule-list">
        {visibleDays.map((day) => (
          <div 
            key={day.dayNumber} 
            ref={day.date === "2024-03-06" ? currentDayRef : null}
            className={`schedule-item ${selectedDay === day.dayNumber ? 'selected' : ''} ${getDayStatus(day.dayNumber)}`}
            onClick={() => setSelectedDay(day.dayNumber)}
          >
            <div className="item-left">
              <div className="day-number">{day.dayNumber}</div>
              <div className="day-text">{day.weekday}</div>
            </div>
            <div className="item-right">
              <div className="time">
                <span className="time-value">{day.syfyr}</span>
              </div>
              <div className="time">
                <span className="time-value">{day.iftar}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RamadanDaysList; 