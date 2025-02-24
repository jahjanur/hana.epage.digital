import React, { useState, useEffect, useRef } from 'react';
import './RamadanCountdown.css';
import { IoCloudyNight, IoMoonOutline, IoSunnyOutline, IoNotificationsOutline, IoNotificationsOffOutline } from "react-icons/io5";
import { FaPrayingHands, FaMosque } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import BottomNavigation from './BottomNavigation';
import { ReactComponent as HanaLogo } from '../assets/hanaMainLogoWhite.svg';
import RamadanDaysList from './RamadanDaysList';
import AnimatedBackground from './AnimatedBackground';
import Background from './Background';
import CitySelector from './CitySelector';
import { getCityPrayerTimes } from '../data/prayerTimes';

const FAJR_TIME = { hours: 4, minutes: 34 }; // Updated Imsak time for the first day
const IFTAR_TIME = { hours: 21, minutes: 23 }; // Updated Akşam time for the first day

const RamadanCountdown: React.FC = () => {

  const [greenProgress, setGreenProgress] = useState<number>(0);
  const [redProgress, setRedProgress] = useState<number>(0);

  const [currentTime, setCurrentTime] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
    city?: string;
  } | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('sq');
  const [notifications, setNotifications] = useState({
    syfyr: false,
    iftar: false
  });
  const [currentPeriod, setCurrentPeriod] = useState<'fasting' | 'eating' | 'free'>('free');
  const [isIftarDone, setIsIftarDone] = useState(false);
  const [fajrTime, setFajrTime] = useState<{ hours: number; minutes: number }>({ hours: FAJR_TIME.hours, minutes: FAJR_TIME.minutes });
  const [iftarTime, setIftarTime] = useState<{ hours: number; minutes: number }>({ hours: IFTAR_TIME.hours, minutes: IFTAR_TIME.minutes });
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [completedProgress, setCompletedProgress] = useState<number>(0);
  const [remainingProgress, setRemainingProgress] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState('gostivar');

  // Create date objects for comparison
  const getCurrentFajrAndIftar = (now: Date) => {
    const fajr = new Date(now);
    fajr.setHours(fajrTime.hours, fajrTime.minutes, 0);
    
    const iftar = new Date(now);
    iftar.setHours(iftarTime.hours, iftarTime.minutes, 0);

    return { fajr, iftar };
  };

  // Get user's location
  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
              // Reverse geocoding to get city name
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await response.json();
              
              setLocation({
                latitude,
                longitude,
                city: data.address.city || data.address.town || data.address.village
              });
            } catch (error) {
              console.error('Error getting location details:', error);
              setLocation({ latitude, longitude });
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            // Handle error or set default location
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        // Handle lack of geolocation support
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setCurrentDateTime(now);
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);

      // Create Date objects for today's Syfyru and Iftar
      const syfyr = new Date(now);
      syfyr.setHours(fajrTime.hours, fajrTime.minutes, 0, 0);
      const iftar = new Date(now);
      iftar.setHours(iftarTime.hours, iftarTime.minutes, 0, 0);

      // Check if current time matches Iftar time (within the same minute)
      const isIftarTime = now.getHours() === iftarTime.hours && 
                         now.getMinutes() === iftarTime.minutes;

      if (isIftarTime) {
        // Show full green circle at Iftar time
        setGreenProgress(100);
        setRedProgress(0);
        setProgress(0);
        setCurrentPeriod('fasting');
        setRemainingTime('It\'s Iftar time!');
      } else if (now >= syfyr && now <= iftar) {
        // Regular fasting period logic
        const totalFastingDuration = iftar.getTime() - syfyr.getTime();
        const elapsedFasting = now.getTime() - syfyr.getTime();
        const remainingFasting = iftar.getTime() - now.getTime();

        // Calculate minutes until Iftar
        const minutesUntilIftar = remainingFasting / (1000 * 60);

        // Calculate percentages
        const greenProg = (elapsedFasting / totalFastingDuration) * 100;
        const redProg = (remainingFasting / totalFastingDuration) * 100;
        
        if (minutesUntilIftar <= 20) {
          // Store the progress values at exactly 20 minutes mark
          const twentyMinGreenProg = ((totalFastingDuration - (20 * 60 * 1000)) / totalFastingDuration) * 100;
          const twentyMinRedProg = ((20 * 60 * 1000) / totalFastingDuration) * 100;
          
          setRedProgress(twentyMinRedProg);
          setGreenProgress(twentyMinGreenProg);
        } else {
          setRedProgress(redProg);
          setGreenProgress(greenProg);
        }
        
        setProgress(0);
        setCurrentPeriod('fasting');

        // Format the remaining time without HTML tags
        const hoursLeft = Math.floor(remainingFasting / (1000 * 60 * 60));
        const minutesLeft = Math.floor((remainingFasting % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((remainingFasting % (1000 * 60)) / 1000);

        // Format the time with padStart to ensure two digits
        const formattedHours = String(hoursLeft).padStart(2, '0');
        const formattedMinutes = String(minutesLeft).padStart(2, '0');
        const formattedSeconds = String(secondsLeft).padStart(2, '0');

        setRemainingTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      } else {
        // Eating period
        let nextSyfyr = new Date(syfyr);
        if (now > iftar) {
          nextSyfyr.setDate(nextSyfyr.getDate() + 1);
        }

        const totalEatingDuration = nextSyfyr.getTime() - iftar.getTime();
        const timeLeftEating = nextSyfyr.getTime() - now.getTime();
        
        // Calculate yellow progress (starts at 100% and decreases)
        const yellowProg = (timeLeftEating / totalEatingDuration) * 100;
        setProgress(yellowProg);
        setGreenProgress(0);
        setRedProgress(0);
        setCurrentPeriod('eating');

        const hoursLeft = Math.floor(timeLeftEating / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeftEating % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeLeftEating % (1000 * 60)) / 1000);

        // Format the time with padStart to ensure two digits
        const formattedHours = String(hoursLeft).padStart(2, '0');
        const formattedMinutes = String(minutesLeft).padStart(2, '0');
        const formattedSeconds = String(secondsLeft).padStart(2, '0');

        setRemainingTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      }
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [fajrTime, iftarTime]);

  // Get user's location and reverse geocode for the city name.
  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await response.json();
              setLocation({
                latitude,
                longitude,
                city: data.address.city || data.address.town || data.address.village
              });
            } catch (error) {
              console.error('Error getting location details:', error);
              setLocation({ latitude, longitude });
            }
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  // Define circle properties for the progress ring.
  const radius = 90;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  // Toggle notifications.
  const toggleNotification = async (type: 'syfyr' | 'iftar') => {
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Helpers for active time blocks.
  const isTimeForSyfyr = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 3 && hours < 5;
  };

  const isTimeForIftar = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 17 && hours < 19;
  };

  // Get styles for the bottom progress bar.
  const getProgressBarStyles = () => {
    if (currentPeriod === 'fasting') {
      return {
        // Red bar shows the elapsed fasting time.
        red: `${Math.max(0, Math.min(100, redProgress))}%`,
        // Green bar shows the remaining fasting time.
        green: `${Math.max(0, Math.min(100, greenProgress))}%`,
        yellow: '0%'
      };
    } else {
      return {
        red: '0%',
        green: '0%',
        yellow: `${Math.max(0, Math.min(100, progress))}%`
      };
    }
  };

  // Update prayer times when city changes
  useEffect(() => {
    const cityTimes = getCityPrayerTimes(selectedCity, new Date().toISOString().split('T')[0]);
    if (cityTimes) {
      const [fajrHours, fajrMinutes] = cityTimes.fajr.split(':').map(Number);
      const [maghribHours, maghribMinutes] = cityTimes.maghrib.split(':').map(Number);
      
      setFajrTime({ hours: fajrHours, minutes: fajrMinutes });
      setIftarTime({ hours: maghribHours, minutes: maghribMinutes });
    }
  }, [selectedCity]);

  return (
    <div className="ramadan-countdown">
      <div className="countdown-container">
        <Background />
        <CitySelector 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
        <div className="content-wrapper" style={{ position: 'relative', zIndex: 3 }}>
          <AnimatedBackground />
          
          {/* Floating circles */}
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          
          {/* Header */}
          <div className="header fade-in">
            <div className="status-icons">
              <div className="signal"></div>
              <div className="wifi"></div>
              <div className="battery"></div>
            </div>
          </div>
          {/* Navigation */}
          <div className="nav-bar fade-in">
            <HanaLogo className="hana-logo" />
          </div>
          {/* Clock Display */}
          <div className="clock-container scale-in">
            <div className="clock-ring">
              <div className="time-markers">
                <span className="marker twelve"></span>
                <span className="marker three"></span>
                <span className="marker six"></span>
                <span className="marker nine"></span>
              </div>
              <div className="inner-circle">
                <svg className="progress-ring" width="200" height="200">
                  {currentPeriod === 'fasting' ? (
                    <>
                      {/* Complete background circle in lighter color */}
                      <circle
                        className="progress-ring__circle-background"
                        stroke="#ff4d4d"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="100"
                        cy="100"
                        style={{
                          opacity: 0.3
                        }}
                      />
                      {/* Green arc for elapsed fasting time */}
                      <circle
                        className="progress-ring__circle"
                        stroke="#3cd097"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="100"
                        cy="100"
                        style={{
                          strokeDasharray: `${circumference}`,
                          strokeDashoffset: `${circumference * (1 - greenProgress / 100)}`,
                          transform: 'rotate(-90deg)',
                          transformOrigin: '50% 50%',
                          filter: 'drop-shadow(0 0 6px #3cd097)'
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {/* Complete background circle in lighter color */}
                      <circle
                        className="progress-ring__circle-background"
                        stroke="#ffd700"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="100"
                        cy="100"
                        style={{
                          opacity: 0.3
                        }}
                      />
                      {/* Yellow arc for eating time */}
                      <circle
                        className="progress-ring__circle"
                        stroke="#ffd700"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="100"
                        cy="100"
                        style={{
                          strokeDasharray: `${circumference}`,
                          strokeDashoffset: `${circumference * (1 - progress / 100)}`,
                          transform: 'rotate(-90deg)',
                          transformOrigin: '50% 50%',
                          filter: 'drop-shadow(0 0 6px #ffd700)'
                        }}
                      />
                    </>
                  )}
                </svg>
                <div className="inner-content">
                  <div className="icon-container">
                    <FaMosque className="weather-icon" />
                    <div className="icon-ring"></div>
                  </div>
                  <div className="countdown-display">
                    <div className="time-digits">
                      {remainingTime.split('').map((char, index) => (
                        <span key={index} className="time-digit">
                          {char}
                        </span>
                      ))}
                    </div>
                    <div className="period-label">
                      <span className="period-text">
                        {currentPeriod === 'fasting' ? 'until Iftar' : 'until Syfyr'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add the new RamadanDaysList component here */}
          <RamadanDaysList selectedCity={selectedCity} />

          {/* Updated Reminder Section */}
          <div className="reminder-section slide-up">
            <div className="times-container">
              <div className={`time-block ${isTimeForSyfyr() ? 'active' : ''}`}>
                <div className="time-header">
                  <IoMoonOutline className="time-icon" />
                  <span>Syfyru</span>
                  <button 
                    className={`notification-toggle ${notifications.syfyr ? 'enabled' : ''}`}
                    onClick={() => toggleNotification('syfyr')}
                    title={notifications.syfyr ? 'Çaktivizo njoftimet' : 'Aktivizo njoftimet'}
                  >
                    {notifications.syfyr ? 
                      <IoNotificationsOutline className="notification-icon" /> : 
                      <IoNotificationsOffOutline className="notification-icon" />
                    }
                  </button>
                </div>
                <div className="time-value">{`${fajrTime.hours}:${String(fajrTime.minutes).padStart(2, '0')}`}</div>
              </div>
              
              <div className={`time-block ${isTimeForIftar() ? 'active' : ''}`}>
                <div className="time-header">
                  <IoSunnyOutline className="time-icon" />
                  <span>Iftari</span>
                  <button 
                    className={`notification-toggle ${notifications.iftar ? 'enabled' : ''}`}
                    onClick={() => toggleNotification('iftar')}
                    title={notifications.iftar ? 'Çaktivizo njoftimet' : 'Aktivizo njoftimet'}
                  >
                    {notifications.iftar ? 
                      <IoNotificationsOutline className="notification-icon" /> : 
                      <IoNotificationsOffOutline className="notification-icon" />
                    }
                  </button>
                </div>
                <div className="time-value">{`${iftarTime.hours}:${String(iftarTime.minutes).padStart(2, '0')}`}</div>
              </div>
            </div>
          </div>

          <div className="main-content">
            {/* Existing Suhoor and Iftar section */}
            

         


            {/* Rest of the components */}
          </div>

          <BottomNavigation />
          
          
        </div>
      </div>
    </div>
  );
};

export default RamadanCountdown; 