import React, { useState } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';
import DuahV from './components/Duah-V';
import GoalsTracker from './components/GoalsTracker';
import { Routes, Route } from 'react-router-dom';
import { BottomNavigation } from './components/BottomNavigation';
import Book from './components/book/Book-v';
import LoaderScreen from './components/LoaderScreen';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('gostivar');
  const [selectedLanguage, setSelectedLanguage] = useState('sq');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Force scroll to top and prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Add a timer to hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <RamadanCountdown 
              selectedCity={selectedCity} 
              onCityChange={setSelectedCity}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </>
        } />
        <Route path="/duah-v" element={<DuahV />} />
        <Route path="/goals" element={<GoalsTracker />} />
        <Route path="/book-v" element={<Book />} />
      </Routes>
      <BottomNavigation />
    </div>
  );
};

export default App; 