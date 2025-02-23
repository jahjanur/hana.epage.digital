import React, { useEffect, useState } from 'react';
import './App.css';
import RamadanCountdown from './components/RamadanCountdown';
import LoaderScreen from './components/LoaderScreen';

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

  return (
    <>
      {isLoading ? <LoaderScreen /> : <RamadanCountdown />}
    </>
  );
};

export default App; 