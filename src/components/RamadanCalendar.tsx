import React from 'react';
import './RamadanCalendar.css';
import { IoCalendarOutline, IoCheckmarkCircle, IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

interface DaySchedule {
  date: string;
  day: string;
  syfyr: string;
  iftar: string;
  completed?: boolean;
}

const ramadanSchedule: DaySchedule[] = [
  {
    date: '12 Mars',
    day: 'E Martë',
    syfyr: '04:30',
    iftar: '17:52',
    completed: true
  },
  {
    date: '13 Mars',
    day: 'E Mërkurë',
    syfyr: '04:28',
    iftar: '17:53',
    completed: false
  },
  {
    date: '14 Mars',
    day: 'E Enjte',
    syfyr: '04:26',
    iftar: '17:54',
    completed: false
  }
];

const RamadanCalendar: React.FC = () => {
  return (
    <div className="ramadan-calendar">
      <div className="calendar-header">
        <IoCalendarOutline className="calendar-icon" />
        <h2>Kalendari i Ramazanit</h2>
      </div>
      
      <div className="schedule-list">
        {ramadanSchedule.map((schedule, index) => (
          <div key={index} className={`schedule-item ${schedule.completed ? 'completed' : ''}`}>
            <div className="schedule-content">
              <div className="date-section">
                <div className="date">{schedule.date}</div>
                <div className="day">{schedule.day}</div>
              </div>
              
              <div className="times-section">
                <div className="time-item">
                  <IoMoonOutline className="time-icon" />
                  <span className="time-value">{schedule.syfyr}</span>
                </div>
                
                <div className="time-item">
                  <IoSunnyOutline className="time-icon" />
                  <span className="time-value">{schedule.iftar}</span>
                </div>
              </div>
            </div>
            
            {schedule.completed && (
              <div className="completion-marker">
                <IoCheckmarkCircle className="check-icon" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RamadanCalendar; 