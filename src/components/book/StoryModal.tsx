import React from 'react';
import './StoryModal.css';
import backgroundImage from './book-wallpaper-stories/1.webp';

interface Story {
  id: number;
  title: string;
  content: string;
  image?: string; // Optional property for the image
}

interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNavigate }) => {
  if (!story) {
    return <div>Loading...</div>; // Handle loading or error state
  }

  const paragraphs = story.content.split('\n\n');

  const handleShare = () => {
    const shareText = `${story.title}\n\n${story.content}`;
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: shareText,
        url: window.location.href,
      })
      .then(() => console.log('Share successful'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Sharing is not supported in this browser. Copy the text to share it.');
    }
  };

  return (
    <div className="story-page" style={{ height: '100vh' }}>
      <button className="back-button" onClick={onClose}>←</button>
      <div className="story-image-section" style={{ backgroundImage: `url(${story.image})`, backgroundSize: 'cover' }}>
        {/* You can remove the img tag if you want to use the background image only */}
      </div>
      <div className="story-container">
        <div className="story-content-wrapper">
          <h1>
            {story.title}
            <button className="share-button" onClick={handleShare}>
              <i className="fa fa-share-alt"></i>
            </button>
          </h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={() => onNavigate('prev')}>&#9664;</button>
        <button className="nav-button" onClick={() => onNavigate('next')}>&#9654;</button>
      </div>
    </div>
  );
};

export default StoryModal; 