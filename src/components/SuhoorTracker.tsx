import React, { useState, useEffect } from 'react';
import './SuhoorTracker.css';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface SuhoorDay {
  date: string;
  completed: boolean;
}

const SuhoorTracker: React.FC = () => {
  const [suhoorDays, setSuhoorDays] = useState<SuhoorDay[]>(() => {
    // Get last 5 days
    const days: SuhoorDay[] = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        completed: false,
      });
    }
    return days;
  });

  useEffect(() => {
    const saved = localStorage.getItem('suhoorDays');
    if (saved) {
      setSuhoorDays(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('suhoorDays', JSON.stringify(suhoorDays));
  }, [suhoorDays]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sq-AL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const toggleSuhoor = (index: number) => {
    setSuhoorDays(days =>
      days.map((day, i) =>
        i === index ? { ...day, completed: !day.completed } : day
      )
    );
  };

  return (
    <div className="suhoor-tracker">
      <h3 className="suhoor-tracker-title">Gjurmimi i Syfyrit</h3>
      <div className="suhoor-days">
        {suhoorDays.map((day, index) => (
          <button
            key={day.date}
            className={`suhoor-day ${day.completed ? 'completed' : ''}`}
            onClick={() => toggleSuhoor(index)}
          >
            <span className="date">{formatDate(day.date)}</span>
            <div className="status-indicator">
              {day.completed ? (
                <IoCheckmarkCircle className="check-icon" />
              ) : (
                <span className="empty-circle" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuhoorTracker; 