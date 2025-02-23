import React, { useEffect, useState } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';
import DuahV from './components/Duah-V';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BottomNavigation from './components/BottomNavigation';
import LoaderScreen from './components/LoaderScreen';
import Book from './components/book/Book-v';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top and prevent default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Simulate loading time (remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<RamadanCountdown />} />
        <Route path="/duah-v" element={<DuahV />} />
        <Route path="/book-v" element={<Book />} />
      </Routes>
      <BottomNavigation />
    </>
  );
};

export default App; 