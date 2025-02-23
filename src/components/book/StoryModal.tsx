import React, { useEffect, useState } from 'react';
import './StoryModal.css';
import backgroundImage from '../../assets/backgroundForBooks.jpeg';

interface StoryModalProps {
  story: {
    title: string;
    content: string;
  } | null;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.story-container');
    
    const updateScroll = () => {
      if (container) {
        const scrollPosition = container.scrollTop;
        const totalHeight = container.scrollHeight - container.clientHeight;
        const progress = (scrollPosition / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };

    container?.addEventListener('scroll', updateScroll);
    return () => container?.removeEventListener('scroll', updateScroll);
  }, []);

  if (!story) return null;

  const paragraphs = story.content.split('\n\n');

  return (
    <div className="story-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="reading-progress">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>
      <button className="back-button" onClick={onClose}>←</button>
      <div className="story-container">
        <div className="story-content-wrapper">
          <h1>{story.title}</h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryModal; 