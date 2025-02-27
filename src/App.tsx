import React, { useState } from 'react';
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
import RamadanDaysList from './components/RamadanDaysList';
import PrayerAlarmSettings from './components/PrayerAlarmSettings';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Gostivar');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  React.useEffect(() => {
    // Force scroll to top and prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <GoalsProvider>
          <div className="App">
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
              <Route path="/ramadan-days-list" element={<RamadanDaysList selectedCity={selectedCity} />} />
              <Route path="/set-alarms" element={<PrayerAlarmSettings selectedCity={selectedCity} />} />
            </Routes>
            <BottomNavigation />
          </div>
        </GoalsProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App; 