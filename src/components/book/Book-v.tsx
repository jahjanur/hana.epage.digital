import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Book-v.css';
import StoryModal from './StoryModal';
import images from '../../utils/loadImages'; // Import the images
import AppHeader from '../AppHeader';
import Footer from '../Footer';
import hanaLogo from '../../assets/hanaMainLogoWhite.svg';
import epageLogo from '../../assets/epage.png';
import { useLanguage } from '../../contexts/LanguageContext';

interface Story {
  id: number;
  title: string;
  content: string;
  image?: string; // Optional property for the image
  date: Date;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface StoryTranslation {
  title: string;
  content: string;
}

const Book: React.FC = () => {
  const { t, tStory, language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('gostivar');
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [countdowns, setCountdowns] = useState<{ [key: number]: CountdownTime }>({});

  // Wrap currentDate in useMemo

  //para 00:00
  const currentDate = useMemo(() => new Date(), []);


  const calculateTimeLeft = useCallback((targetDate: Date): CountdownTime => {
    const difference = targetDate.getTime() - currentDate.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, [currentDate]);

  const isStoryLocked = useCallback((storyDate: Date) => {
    return storyDate.getTime() > currentDate.getTime();
  }, [currentDate]);

  const stories = useMemo(() => [
    {
      id: 1,
      title: tStory('story1').title,
      content: tStory('story1').content,
      image: images['1.webp'],
      date: new Date(2025, 2, 1),
    },
    {
      id: 2,
      title: tStory('story2').title,
      content: tStory('story2').content,
      image: images['3.webp'],
      date: new Date(2025, 2, 2),
    },
    {
      id: 3,
      title: tStory('story3').title,
      content: tStory('story3').content,
      image: images['2.webp'],
      date: new Date(2025, 2, 3),
    },
    {
      id: 4,
      title: tStory('story4').title,
      content: tStory('story4').content,
      image: images['3.webp'],
      date: new Date(2025, 2, 4),
    },
    {
      id: 5,
      title: tStory('story5').title,
      content: tStory('story5').content,
      image: images['4.webp'],
      date: new Date(2025, 2, 5),
    },
    {
      id: 6,
      title: tStory('story6').title,
      content: tStory('story6').content,
      image: images['5.webp'],
      date: new Date(2025, 2, 6),
    },
    {
      id: 7,
      title: tStory('story7').title,
      content: tStory('story7').content,
      image: images['6.webp'],
      date: new Date(2025, 2, 7),
    },
    {
      id: 8,
      title: tStory('story8').title,
      content: tStory('story8').content,
      image: images['7.webp'],
      date: new Date(2025, 2, 8),
    },
    {
      id: 9,
      title: tStory('story9').title,
      content: tStory('story9').content,
      image: images['8.webp'],
      date: new Date(2025, 2, 9),
    },
    {
      id: 10,
      title: tStory('story10').title,
      content: tStory('story10').content,
      image: images['9.webp'],
      date: new Date(2025, 2, 10),
    },
    {
      id: 11,
      title: tStory('story11').title,
      content: tStory('story11').content,
      image: images['10.webp'],
      date: new Date(2025, 2, 11),
    },
    {
      id: 12,
      title: tStory('story12').title,
      content: tStory('story12').content,
      image: images['11.webp'],
      date: new Date(2025, 2, 12),
    },
    {
      id: 13,
      title: tStory('story13').title,
      content: tStory('story13').content,
      image: images['12.webp'],
      date: new Date(2025, 2, 13),
    },
    {
      id: 14,
      title: tStory('story14').title,
      content: tStory('story14').content,
      image: images['13.webp'],
      date: new Date(2025, 2, 14),
    },
    {
      id: 15,
      title: tStory('story15').title,
      content: tStory('story15').content,
      image: images['14.webp'],
      date: new Date(2025, 2, 15),
    },
    {
      id: 16,
      title: tStory('story16').title,
      content: tStory('story16').content,
      image: images['15.webp'],
      date: new Date(2025, 2, 16),
    },
    {
      id: 17,
      title: tStory('story17').title,
      content: tStory('story17').content,
      image: images['17.webp'],
      date: new Date(2025, 2, 17),
    },
    {
      id: 18,
      title: tStory('story18').title,
      content: tStory('story18').content,
      image: images['18.webp'],
      date: new Date(2025, 2, 18),
    },
    {
      id: 19,
      title: tStory('story19').title,
      content: tStory('story19').content,
      image: images['19.webp'],
      date: new Date(2025, 2, 19),
    },
    {
      id: 20,
      title: tStory('story20').title,
      content: tStory('story20').content,
      image: images['20.webp'],
      date: new Date(2025, 2, 20),
    },
    {
      id: 21,
      title: tStory('story21').title,
      content: tStory('story21').content,
      image: images['21.webp'],
      date: new Date(2025, 2, 21),
    },
    {
      id: 22,
      title: tStory('story22').title,
      content: tStory('story22').content,
      image: images['22.webp'],
      date: new Date(2025, 2, 22),
    },
    {
      id: 23,
      title: tStory('story23').title,
      content: tStory('story23').content,
      image: images['23.webp'],
      date: new Date(2025, 2, 23),
    },
    {
      id: 24,
      title: tStory('story24').title,
      content: tStory('story24').content,
      image: images['24.webp'],
      date: new Date(2025, 2, 24),
    },
    {
      id: 25,
      title: tStory('story25').title,
      content: tStory('story25').content,
      image: images['25.webp'],
      date: new Date(2025, 2, 25),
    },
    {
      id: 26,
      title: tStory('story26').title,
      content: tStory('story26').content,
      image: images['26.webp'],
      date: new Date(2025, 2, 26),
    },
    {
      id: 27,
      title: tStory('story27').title,
      content: tStory('story27').content,
      image: images['27.webp'],
      date: new Date(2025, 2, 27),
    },
    {
      id: 28,
      title: tStory('story28').title,
      content: tStory('story28').content,
      image: images['28.webp'],
      date: new Date(2025, 2, 28),
    },
    {
      id: 29,
      title: tStory('story29').title,
      content: tStory('story29').content,
      image: images['29.webp'],
      date: new Date(2025, 2, 29),
    },
    {
      id: 30,
      title: tStory('story30').title,
      content: tStory('story30').content,
      image: images['30.webp'],
      date: new Date(2025, 2, 30),
    },
  ], [tStory, language]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdowns: { [key: number]: CountdownTime } = {};
      stories.forEach(story => {
        if (isStoryLocked(story.date)) {
          newCountdowns[story.id] = calculateTimeLeft(story.date);
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeLeft, isStoryLocked, stories]);

  // Add useEffect to handle body scrolling
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStory]);

  // Update selected story when language changes
  useEffect(() => {
    if (selectedStory) {
      const updatedStory = stories.find(s => s.id === selectedStory.id);
      if (updatedStory) {
        setSelectedStory(updatedStory);
      }
    }
  }, [language, stories, selectedStory]);

  const handleStoryClick = (story: Story) => {
    if (isStoryLocked(story.date)) {
      return; // Do nothing for locked stories
    }
    
    setIsLoading(true);
    setIsFadingOut(false);
    document.body.classList.add('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setSelectedStory(story);
    setCurrentIndex(stories.findIndex(s => s.id === story.id));
    
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsFadingOut(false);
        document.body.classList.remove('loading');
      }, 300);
    }, 500);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (currentIndex !== null) {
      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= 0 && newIndex < stories.length) {
        const nextStory = stories[newIndex];
        if (!isStoryLocked(nextStory.date)) {
          setSelectedStory(nextStory);
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  // Function to get the day of the week (starting from Monday)
  const getDayOfWeek = (index: number): string => {
    const days = [
      t('monday'),
      t('tuesday'),
      t('wednesday'),
      t('thursday'),
      t('friday'),
      t('saturday'),
      t('sunday')
    ];
    return days[(index + 1) % 7];
  };

  // Function to create calendar array with only filled slots
  const createCalendarArray = () => {
    const calendar = new Array(35).fill(null); // 5 rows x 7 columns
    stories.slice(0, 30).forEach((story, index) => {
      calendar[index + 4] = story; // Start filling from index 4 (Saturday)
    });
    return calendar;
  };

  return (
    <div className="book-container">
      {isLoading && (
        <div className={`loader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="loader-content">
            <div className="loader"></div>
          </div>
        </div>
      )}

      <AppHeader selectedCity={selectedCity} onCityChange={setSelectedCity} />
      <div className="book-header">
        <div className="book-title-wrapper">
          <div className="title-decoration left"></div>
          <div className="title-content">
            <h1 className="book-title">{t('storiesAndMiracles')}</h1>
            <p className="book-subtitle">{t('scientificInQuran')}</p>
            <div className="title-accent"></div>
          </div>
          <div className="title-decoration right"></div>
        </div>
      </div>
      <div className="stories-grid">
        {createCalendarArray().map((story, index) => {
          if (!story) return null; // Skip rendering for empty days

          const isLocked = isStoryLocked(story.date);
          const countdown = countdowns[story.id];
          
          return (
            <div
              key={`${story.id}-${language}`}
              className={`story-card ${isLocked ? 'locked' : ''}`}
              style={{ '--i': index } as React.CSSProperties}
              onClick={() => handleStoryClick(story)}
            >
              <div className="content-wrapper">
                <h3>{story.title}</h3>
                <div className="story-number">{getDayOfWeek(index)}</div>
                <div className="date-number">{index - 3}</div>
                {isLocked && (
                  <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                )}
              </div>
              {isLocked && countdown && (
                <div className="countdown-wrapper">
                  <div className="countdown-time">
                    {countdown.days}d {countdown.hours}h
                  </div>
                  <div className="countdown-label">{t('untilAvailable')}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onNavigate={handleNavigate}
        />
      )}
      <Footer />
    </div>
  );
};

export default Book;