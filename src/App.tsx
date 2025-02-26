import React, { useState } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';
import DuahV from './components/Duah-V';
import GoalsTracker from './components/GoalsTracker';
import { Routes, Route } from 'react-router-dom';
import { BottomNavigation } from './components/BottomNavigation';
import Book from './components/book/Book-v';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('gostivar');

  React.useEffect(() => {
    // Force scroll to top and prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <RamadanCountdown 
                selectedCity={selectedCity} 
                onCityChange={setSelectedCity}
              />
            </>
          } />
          <Route path="/duah-v" element={<DuahV />} />
          <Route path="/goals" element={<GoalsTracker />} />
          <Route path="/book-v" element={<Book />} />
        </Routes>
        <BottomNavigation />
      </div>
    </LanguageProvider>
  );
};

export default App; 