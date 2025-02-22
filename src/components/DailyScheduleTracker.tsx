import React from 'react';
import './DailyScheduleTracker.css';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

interface DaySchedule {
  date: string;
  weekday: string;
  suhoor: string;
  iftar: string;
}

const DailyScheduleTracker: React.FC = () => {
  const schedules: DaySchedule[] = [
    {
      date: '12 Mars',
      weekday: 'E Martë',
      suhoor: '04:45',
      iftar: '18:30'
    },
    {
      date: '13 Mars',
      weekday: 'E Mërkurë',
      suhoor: '04:43',
      iftar: '18:31'
    },
    {
      date: '14 Mars',
      weekday: 'E Enjte',
      suhoor: '04:41',
      iftar: '18:32'
    },
    {
      date: '15 Mars',
      weekday: 'E Premte',
      suhoor: '04:39',
      iftar: '18:33'
    },
  ];

  return (
    <div className="daily-schedule-tracker">
      <h3 className="schedule-title">Orari i Syfyrit dhe Iftarit</h3>
      <div className="schedule-container">
        <div className="schedule-header">
          <div className="header-date">Data</div>
          <div className="header-time">
            <IoMoonOutline /> Syfyri
          </div>
          <div className="header-time">
            <IoSunnyOutline /> Iftari
          </div>
        </div>
        {schedules.map((day, index) => (
          <div key={index} className="schedule-row">
            <div className="date-info">
              <span className="weekday">{day.weekday}</span>
              <span className="date">{day.date}</span>
            </div>
            <div className="time suhoor-time">{day.suhoor}</div>
            <div className="time iftar-time">{day.iftar}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyScheduleTracker; 