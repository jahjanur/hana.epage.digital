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
        weekday: day.weekday,
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

  const getDayStatus = (date: string) => {
    const selectedDate = new Date("2024-03-06"); // Replace with your selected day logic
    const dayDate = new Date(date);
    
    // Check if the day is before the selected day
    if (dayDate < selectedDate) {
      return 'past-day completed'; // Class for past days
    } else if (dayDate.toDateString() === selectedDate.toDateString()) {
      return 'current-day'; // Class for the selected day
    }
    
    return ''; // Default class for future days
  };

  return (
    <div className="schedule">
      <div className="schedule-fade-top" />
      <div className="schedule-list">
        {visibleDays.map((day) => (
          <div 
            key={day.dayNumber} 
            ref={day.date === "2024-03-06" ? currentDayRef : null}
            className={`schedule-item ${selectedDay === day.dayNumber ? 'selected' : ''} ${getDayStatus(day.date)}`}
            onClick={() => setSelectedDay(day.dayNumber)}
          >
            <div className="day-info">
              <div className="day-number">{day.dayNumber}</div>
              <div className="day-details">
                <div className="day-weekday">{day.weekday}</div>
                <div className="day-date">
                  {new Date(day.date).getDate()} {
                    new Date(day.date).toLocaleDateString('sq-AL', { month: 'long' })
                      .toLowerCase()
                  }
                </div>
              </div>
            </div>
            <div className="times">
              <div className="time">
                <span className="time-label">Syfyri</span>
                <span className="time-value">{day.syfyr}</span>
              </div>
              <div className="time">
                <span className="time-label">Iftari</span>
                <span className="time-value">{day.iftar}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="schedule-fade-bottom" />
    </div>
  );
};

export default RamadanDaysList; 