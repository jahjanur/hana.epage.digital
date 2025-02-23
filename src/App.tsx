import React, { useEffect } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';
import DuahV from './components/Duah-V';
import { Routes, Route } from 'react-router-dom';
import BottomNavigation from './components/BottomNavigation';

const App: React.FC = () => {
  useEffect(() => {
    // Force scroll to top and prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<RamadanCountdown />} />
        <Route path="/duah-v" element={<DuahV />} />
      </Routes>
      <BottomNavigation />
    </>
  );
};

export default App; 