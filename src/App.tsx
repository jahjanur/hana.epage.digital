import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';
import DuahV from './components/Duah-V';
import GoalsTracker from './components/GoalsTracker';
import { Routes, Route } from 'react-router-dom';
import { BottomNavigation } from './components/BottomNavigation';
import Book from './components/book/Book-v';
import { GoalsProvider } from './contexts/GoalsContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
import { ReactComponent as HanaLogo } from './assets/hanaMainLogoWhite.svg';
import { ReactComponent as FooterLogo } from './assets/FooterEPAGE.svg';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('gostivar');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate if the launch date has passed
  const launchDate = useMemo(() => new Date('2025-03-01T00:00:00'), []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsLaunched(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  React.useEffect(() => {
    // Force scroll to top and prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show preloader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="site-preloader">
        <div className="preloader-content">
          <HanaLogo className="preloader-logo" />
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="preloader-footer">
          <FooterLogo className="footer-logo" />
        </div>
      </div>
    );
  }

  if (!isLaunched) {
    return (
      <div className="countdown-container">
        <div className="logo-container">
          <HanaLogo className="countdown-logo" />
        </div>
        <h2>Në mesnatën e 1 Marsit, me hënën e plotë të Ramazanit, aplikacioni Hana do të ndriçojë për të gjithë.</h2>
        <div className="countdown">
          <div className="time-section">
            <span className="time">{timeLeft.days}</span>
            <span className="label">Days</span>
          </div>
          <div className="time-section">
            <span className="time">{timeLeft.hours}</span>
            <span className="label">Hours</span>
          </div>
          <div className="time-section">
            <span className="time">{timeLeft.minutes}</span>
            <span className="label">Minutes</span>
          </div>
          <div className="time-section">
            <span className="time">{timeLeft.seconds}</span>
            <span className="label">Seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <GoalsProvider>
          <Routes>
            <Route path="/" element={
              <RamadanCountdown 
                selectedCity={selectedCity} 
                onCityChange={setSelectedCity}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            } />
            <Route path="/duah-v" element={<DuahV />} />
            <Route path="/goals" element={<GoalsTracker />} />
            <Route path="/book-v" element={<Book />} />
          </Routes>
          <BottomNavigation />
        </GoalsProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App; 