/*import React, { useEffect } from 'react';

const DuahV = () => {
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll('.dua-item');
      const viewportHeight = window.innerHeight;
      
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        
        // Calculate how close the element is to the center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        if (distanceFromCenter < rect.height / 2) {
          item.classList.add('centered');
        } else {
          item.classList.remove('centered');
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Cleanupß
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Rest of the component code
  );
};

export default DuahV; */