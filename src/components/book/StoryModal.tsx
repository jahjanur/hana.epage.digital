import React, { useEffect } from 'react';
import './StoryModal.css';
import { ReactComponent as HanaLogoComponent } from '../../assets/hana-logo.svg';
import Footer from '../Footer';

interface Story {
  id: number;
  title: string;
  content: string;
  image?: string;
}

interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNavigate }) => {
  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onNavigate('prev');
    } else if (e.key === 'ArrowRight') {
      onNavigate('next');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleShare = async () => {
    if (!story) return;
    
    const shareText = `${story.title}\n\n${story.content}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: story.title,
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareText);
        alert('Story copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!story) {
    return null;
  }

  const paragraphs = story.content.split('\n\n');

  return (
    <div className="story-page">
      <button className="back-button" onClick={onClose} aria-label="Close">
        ←
      </button>
      <button className="share-button" onClick={handleShare} aria-label="Share">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
      </button>
      <div className="story-header">
        <img 
          src={`${process.env.PUBLIC_URL}/assets/hana-logo.svg`} 
          alt="Hana Logo" 
          className="story-logo" 
        />
      </div>
      <div 
        className="story-image-section" 
        style={{ 
          backgroundImage: story.image ? `url(${story.image})` : 'none'
        }}
      />
      <div className="story-container">
        <div className="story-content-wrapper">
          <h1>
            {story.title}
          </h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="powered-by">
        Powered by <a href="https://epage.digital/" target="_blank" rel="noopener noreferrer">EPAGE</a>
      </div>
      <div className="navigation-buttons">
        <button 
          className="nav-button" 
          onClick={() => onNavigate('prev')}
          aria-label="Previous story"
        >
          ←
        </button>
        <button 
          className="nav-button" 
          onClick={() => onNavigate('next')}
          aria-label="Next story"
        >
          →
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default StoryModal;