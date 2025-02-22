import React, { useState, useEffect } from 'react';
import './PrayerActivity.css';

interface PrayerDay {
  date: string;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

const PrayerActivity: React.FC = () => {
  const [prayerHistory, setPrayerHistory] = useState<PrayerDay[]>(() => {
    // Get last 3 days instead of 7
    const days: PrayerDay[] = [];
    for (let i = 2; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        prayers: {
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false,
        },
      });
    }
    return days;
  });

  // Load saved prayer history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('prayerHistory');
    if (saved) {
      setPrayerHistory(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when prayer history changes
  useEffect(() => {
    localStorage.setItem('prayerHistory', JSON.stringify(prayerHistory));
  }, [prayerHistory]);

  const togglePrayer = (dayIndex: number, prayer: keyof PrayerDay['prayers']) => {
    setPrayerHistory(history => 
      history.map((day, idx) => 
        idx === dayIndex
          ? {
              ...day,
              prayers: {
                ...day.prayers,
                [prayer]: !day.prayers[prayer],
              },
            }
          : day
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sq-AL', { 
      weekday: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="prayer-activity-container">
      <h2 className="prayer-activity-title">Aktiviteti i Namazit</h2>
      <div className="prayer-grid">
        <div className="prayer-headers">
          <div className="date-header">Data</div>
          <div className="prayer-name">Sabah</div>
          <div className="prayer-name">Dreka</div>
          <div className="prayer-name">Ikindia</div>
          <div className="prayer-name">Akshami</div>
          <div className="prayer-name">Jacia</div>
        </div>
        {prayerHistory.map((day, dayIndex) => (
          <div key={day.date} className="prayer-row">
            <div className="date-cell">{formatDate(day.date)}</div>
            {Object.entries(day.prayers).map(([prayer, completed]) => (
              <button
                key={prayer}
                className={`prayer-cell ${completed ? 'completed' : 'missed'}`}
                onClick={() => togglePrayer(dayIndex, prayer as keyof PrayerDay['prayers'])}
              >
                {completed ? '✓' : '×'}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerActivity; 