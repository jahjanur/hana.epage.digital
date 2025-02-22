import React, { useEffect } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';

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
      <RamadanCountdown />
    </>
  );
};

export default App; 