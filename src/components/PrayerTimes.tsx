import React, { useState } from 'react';
import './PrayerTimes.css';
import { FaPrayingHands } from 'react-icons/fa';
import { IoNotifications, IoNotificationsOff } from 'react-icons/io5';

interface Prayer {
  name: {
    sq: string;
    en: string;
  };
  time: string;
  notificationEnabled: boolean;
}

const prayers: Prayer[] = [
  {
    name: { sq: 'Sabahu', en: 'Fajr' },
    time: '05:00',
    notificationEnabled: false
  },
  {
    name: { sq: 'Dreka', en: 'Dhuhr' },
    time: '12:23',
    notificationEnabled: false
  },
  {
    name: { sq: 'Ikindia', en: 'Asr' },
    time: '15:45',
    notificationEnabled: false
  },
  {
    name: { sq: 'Akshami', en: 'Maghrib' },
    time: '18:00',
    notificationEnabled: false
  },
  {
    name: { sq: 'Jacia', en: 'Isha' },
    time: '19:30',
    notificationEnabled: false
  }
];

interface PrayerTimesProps {
  currentLanguage: string;
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ currentLanguage }) => {
  const [prayerStates, setPrayerStates] = useState(prayers);

  const toggleNotification = async (index: number) => {
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }

    setPrayerStates(prev => prev.map((prayer, i) => 
      i === index ? { ...prayer, notificationEnabled: !prayer.notificationEnabled } : prayer
    ));
  };

  return (
    <div className="prayer-times-container">
      <h2 className="prayer-times-title">
        {currentLanguage === 'sq' ? 'Kohët e Namazit' : 'Prayer Times'}
      </h2>
      <div className="prayer-times-grid">
        {prayerStates.map((prayer, index) => (
          <div key={index} className="prayer-card">
            <div className="prayer-icon-container">
              <FaPrayingHands className="prayer-icon" />
            </div>
            <div className="prayer-info">
              <span className="prayer-name">
                {prayer.name[currentLanguage === 'sq' ? 'sq' : 'en']}
              </span>
              <span className="prayer-time">{prayer.time}</span>
            </div>
            <button 
              className={`notification-toggle ${prayer.notificationEnabled ? 'enabled' : ''}`}
              onClick={() => toggleNotification(index)}
              title={prayer.notificationEnabled ? 'Disable notifications' : 'Enable notifications'}
            >
              {prayer.notificationEnabled ? 
                <IoNotifications className="notification-icon" /> : 
                <IoNotificationsOff className="notification-icon" />
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes; 