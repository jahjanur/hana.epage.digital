import React, { useState, useEffect } from 'react';
import './RamadanCountdown.css';
import { 
  IoCloudyNight, 
  IoMoonOutline, 
  IoSunnyOutline, 
  IoNotificationsOutline, 
  IoNotificationsOffOutline 
} from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import BottomNavigation from './BottomNavigation';
import { ReactComponent as HanaLogo } from '../assets/hanaMainLogoWhite.svg';
import { ReactComponent as BackgroundParticles } from '../assets/BackgroundParticles.svg';
import LanguagePicker from './LanguagePicker';
import DuaDisplay from './DuaDisplay';
import RamadanCalendar from './RamadanCalendar';
import Achievements from './Achievements';
import RamadanDaysList from './RamadanDaysList';


// Define fasting times: Syfyru (Fajr) at 04:30 and Iftar at 18:00
const FAJR_TIME = { hours: 5, minutes: 30 };
const IFTAR_TIME = { hours: 20, minutes: 42 };

const RamadanCountdown: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [remainingTime, setRemainingTime] = useState<string>('');
  // For the fasting period:
  // - "redProgress" represents the elapsed fasting time (time already fasted)
  // - "greenProgress" represents the remaining fasting time (time left to fast)
  const [greenProgress, setGreenProgress] = useState<number>(0);
  const [redProgress, setRedProgress] = useState<number>(0);
  // "progress" is used in eating mode (yellow) to show the remaining eating time until Syfyru.
  const [progress, setProgress] = useState<number>(0);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; city?: string } | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('sq');
  const [notifications, setNotifications] = useState({ syfyr: false, iftar: false });
  const [currentPeriod, setCurrentPeriod] = useState<'fasting' | 'eating'>('eating');
  const [fajrTime] = useState<{ hours: number; minutes: number }>(FAJR_TIME);
  const [iftarTime] = useState<{ hours: number; minutes: number }>(IFTAR_TIME);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [selectedCity, setSelectedCity] = useState('gostivar');

  const calculateProgress = (now: Date): number => {
    const fajr = new Date(now);
    fajr.setHours(fajrTime.hours, fajrTime.minutes, 0);
    
    const iftar = new Date(now);
    iftar.setHours(iftarTime.hours, iftarTime.minutes, 0);

    // Check if it's exactly Iftar time (including seconds)
    const isIftarTime = now.getHours() === iftarTime.hours && 
                       now.getMinutes() === iftarTime.minutes;

    // If it's Iftar time, show full green circle
    if (isIftarTime) {
      setCurrentPeriod('fasting');
      setGreenProgress(100);
      setRedProgress(0);
      setRemainingTime('Koha e Iftarit!');
      return 100;
    }

    // Handle next day's fajr time for non-fasting period
    const nextFajr = new Date(fajr);
    if (now > iftar) {
      nextFajr.setDate(nextFajr.getDate() + 1);
    }

    if (now >= fajr && now <= iftar) {
      // Fasting period (Suhoor to Iftar)
      const totalFastingDuration = iftar.getTime() - fajr.getTime();
      const elapsedTime = now.getTime() - fajr.getTime();
      const remainingTime = iftar.getTime() - now.getTime();

      // Calculate completed (green) and remaining (red) portions
      const completedPercent = (elapsedTime / totalFastingDuration) * 100;
      const remainingPercent = (remainingTime / totalFastingDuration) * 100;

      setGreenProgress(completedPercent);
      setRedProgress(remainingPercent);
      return completedPercent; // Return completed progress for main progress indicator
    } else {
      // Non-fasting period (current time to next Suhoor)
      const timeUntilNextFajr = nextFajr.getTime() - now.getTime();
      const totalNightDuration = nextFajr.getTime() - iftar.getTime();
      
      // Calculate yellow progress starting from current time
      const nonFastingProgress = (timeUntilNextFajr / totalNightDuration) * 100;
      
      setGreenProgress(0);
      setRedProgress(0);
      return nonFastingProgress;
    }
  };

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
      
      // Update current time display
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);

      // Calculate progress
      const currentProgress = calculateProgress(now);
      setProgress(currentProgress);

      // Calculate remaining time until Iftar
      const iftar = new Date(now);
      iftar.setHours(IFTAR_TIME.hours, IFTAR_TIME.minutes, 0);

      const syfyr = new Date(now);
      syfyr.setHours(FAJR_TIME.hours, FAJR_TIME.minutes, 0);

      // Determine current period
      if (now < syfyr) {
        setCurrentPeriod('fasting'); // Fasting period
      } else {
        setCurrentPeriod('eating'); // Eating period after Iftar
      }

      // Calculate remaining time until next Syfyr
      if (currentPeriod === 'eating') {
        const nextSyfyr = new Date(syfyr);
        if (now > syfyr) {
          nextSyfyr.setDate(nextSyfyr.getDate() + 1);
        }
        const diff = nextSyfyr.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0 || minutes > 0) {
          setRemainingTime(`${hours}h ${minutes}m`);
        } else {
          setRemainingTime(`Koha e Syfyrit!`);
        }
      } else {
        // Calculate remaining time until Iftar
        const diff = iftar.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
          setRemainingTime(`${hours}h ${minutes}m`);
        } else {
          setRemainingTime(`${minutes}m`);
        }
      }

      // Update the DOM directly for the color change
      const labelElement = document.querySelector('.inner-circle .label') as HTMLElement;
      if (labelElement) {
        labelElement.classList.remove('urgent', 'eating');
        if (currentPeriod === 'fasting') {
          labelElement.classList.add('urgent');
        } else if (currentPeriod === 'eating') {
          labelElement.classList.add('eating');
        }
      }

      console.log('Progress:', progress);
      console.log('Current Period:', currentPeriod);
      console.log('Remaining Time:', remainingTime);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 60000);

    return () => clearInterval(timer);
  }, [currentPeriod, progress]);

  // Get current fajr and iftar times for comparison
  const { fajr, iftar } = getCurrentFajrAndIftar(currentDateTime);

  // Update circle parameters for inner ring
  const radius = 90; // Smaller radius for inner ring
  const strokeWidth = 12; // Thinner stroke for modern look
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  const formatTimeDisplay = (hours: number, minutes: number) => {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const isTimeForSyfyr = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Check if current time is within 30 minutes of Syfyr time
    if (hours === fajrTime.hours) {
      return minutes <= fajrTime.minutes + 30;
    }
    if (hours === fajrTime.hours - 1) {
      return minutes >= 30;
    }
    return false;
  };

  const isTimeForIftar = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Check if current time is within 30 minutes of Iftar time
    if (hours === iftarTime.hours) {
      return minutes <= iftarTime.minutes + 30;
    }
    if (hours === iftarTime.hours - 1) {
      return minutes >= 30;
    }
    return false;
  };

  const toggleNotification = async (type: 'syfyr' | 'iftar') => {
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }

    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const progressRingColor = () => {
    if (currentPeriod === 'fasting') {
      return '#ff4d4d'; // Red for fasting
    } else if (currentPeriod === 'eating') {
      return '#3cd097'; // Green for eating
    } else {
      return '#ffffff'; // Default color
    }
  };

  return (
    <div className="ramadan-countdown">
      <div className="countdown-container">
        <DuaDisplay currentLanguage={currentLanguage} />
        <LanguagePicker 
          onLanguageChange={(lang) => setCurrentLanguage(lang.code)} 
        />
        
        {/* Background Particles */}
        <div className="background-particles">
          <BackgroundParticles className="particle" />
        </div>

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
          {location?.city && (
            <div className="location">
              <IoLocationOutline className="location-icon" />
              {location.city}
            </div>
          )}
        </div>

        {/* Clock Display */}
        <div className="clock-container scale-in">
          <div className="clock-ring">
           
            <div className="inner-circle">
              {/* Progress Ring SVG */}
              <svg className="progress-ring" width="200" height="200">
                {currentDateTime >= fajr && currentDateTime <= iftar ? (
                  <>
                    {greenProgress === 100 || 
                     (currentDateTime.getHours() === iftarTime.hours && 
                      currentDateTime.getMinutes() === iftarTime.minutes) ? (
                      // Full green circle for Iftar time
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
                          strokeDasharray: circumference,
                          strokeDashoffset: 0,
                          transform: 'rotate(-90deg)',
                          transformOrigin: '50% 50%',
                          filter: 'drop-shadow(0 0 6px #3cd097)'
                        }}
                      />
                    ) : (
                      <>
                        {/* Completed progress (Green) */}
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
                            strokeDasharray: circumference,
                            strokeDashoffset: circumference - (greenProgress / 100) * circumference,
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            filter: 'drop-shadow(0 0 6px #3cd097)'
                          }}
                        />
                        {/* Remaining progress (Red) */}
                        <circle
                          className="progress-ring__circle"
                          stroke="#ff4d4d"
                          strokeWidth={strokeWidth}
                          strokeLinecap="round"
                          fill="transparent"
                          r={radius}
                          cx="100"
                          cy="100"
                          style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: circumference - (redProgress / 100) * circumference,
                            transform: `rotate(${(greenProgress * 3.6) - 90}deg)`,
                            transformOrigin: '50% 50%',
                            filter: 'drop-shadow(0 0 6px #ff4d4d)'
                          }}
                        />
                      </>
                    )}
                  </>
                ) : (
                  // Non-fasting period - single yellow progress circle
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
                      strokeDasharray: circumference,
                      strokeDashoffset: circumference - (progress / 100) * circumference,
                      transform: 'rotate(-90deg)',
                      transformOrigin: '50% 50%',
                      filter: 'drop-shadow(0 0 6px #ffd700)'
                    }}
                  />
                )}
              </svg>
              <div className="inner-content">
                <IoCloudyNight className="weather-icon" />
                <div className="time">{currentTime}</div>
                <div className="label">
                  {remainingTime}<br />
                  {currentPeriod === 'fasting' ? 'Deri në Iftar' : 'Deri në Syfyr'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <RamadanCalendar />

        {/* Add the new RamadanDaysList component here */}
        <RamadanDaysList cityId={selectedCity} />

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
              <div className="time-value">
                {formatTimeDisplay(fajrTime.hours, fajrTime.minutes)}
              </div>
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
              <div className="time-value">
                {formatTimeDisplay(iftarTime.hours, iftarTime.minutes)}
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* Existing Suhoor and Iftar section */}
          

       


          {/* Rest of the components */}
          <RamadanCalendar />
          <Achievements />
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default RamadanCountdown; 