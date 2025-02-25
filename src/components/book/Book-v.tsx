import React, { useState } from 'react';
import './Book-v.css';
import StoryModal from './StoryModal';
import images from '../../utils/loadImages'; // Import the images

interface Story {
  id: number;
  title: string;
  content: string;
  image?: string; // Optional property for the image
}

const Book: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: "The Pain Receptors in Skin",
      content: "🔹 The Quran states:\n'We shall burn them in the Fire; as soon as their skins are burnt completely, We shall replace them so they may continue to feel the pain.' (Quran 4:56)\n\n🌍 Scientific Discovery:\nScience confirms that pain receptors are in the skin. 1400 years ago, people believed pain was felt through the brain or blood.",
      image: images['1.webp'], // Use the imported image
    },
    {
      id: 2,
      title: "The Blind Man's Daughter",
      content: "A girl wished her father could see her beauty. One day, she found an old letter:\n'I gave you my eyes when you were 5. It was worth it.'\n\n🌙 Lesson: Some love is so deep, it remains unseen.",
      image: images['3.webp'], // Use the imported image
    },
    {
      id: 3,
      title: "Faith",
      content: "The faith of Islam, as highlighted in the Quran, centers on the belief in one God and provides guidance for humanity, emphasizing righteous deeds, compassion, mercy and the significance of the Day of Judgment.",
      image: images['2.webp'], // Use the imported image
    },
    {
      id: 4,
      title: "The Husband Who Never Apologized",
      content: "A man never apologized to his wife for his mistakes. After she passed, he cried, wishing he had just said, 'I'm sorry.'\n\n🌙 Lesson: Apologize while you still have the chance.",
      image: images['3.webp'], // Use the imported image
    },
    {
      id: 5,
      title: "The Kaaba's Mysterious Gravitational Pull",
      content: "🔹 The Kaaba in Makkah is the spiritual center of the world, and millions face it for prayer.\n\n🌍 Scientific Mystery: It aligns perfectly with Earth's magnetic center, with no scientific explanation for this phenomenon.\n\n🌙 Lesson: Some divine mysteries remain beyond human understanding."
      ,image: images['4.webp'], // Use the imported image
    },
    {
      id: 6,
      title: "The Power of Patience",
      content: "Prophet Nuh (Noah) preached for 950 years, yet only a few believed. He continued with patience. When Allah commanded him to build an ark, people laughed at him. But when the flood came, only the believers survived.\n\n🌙 Lesson: Patience in the face of adversity leads to success."
      ,image: images['5.webp'],
    },
    {
      id: 7,
      title: "The Fibonacci Sequence in Creation",
      content: "🔹 The Fibonacci sequence (1,1,2,3,5,8,13…) appears throughout nature - in plants, galaxies, and DNA.\n\n🌍 Scientific Wonder: This mathematical pattern is found in the structure of everything Allah created.\n\n🌙 Lesson: There is divine order in all of creation."
      ,image: images['6.webp'],
    },
    {
      id: 8,
      title: "The Doctor's Regret",
      content: "A doctor refused to treat poor patients. One day, his own son needed emergency care at another hospital. The doctor there also refused, saying 'No money, no treatment.' The child didn't survive.\n\n🌙 Lesson: Treat others as you wish to be treated."
      ,image: images['7.webp'],
    },
    {
      id: 9,
      title: "The Weight of Good Deeds",
      content: "A man gave water to a thirsty dog. Prophet Muhammad ﷺ said this simple act earned him Paradise.\n\n🌙 Lesson: No good deed is too small in Allah's sight."
      ,image: images['8.webp'],
    },
    {
      id: 10,
      title: "The Mother's Prayer",
      content: "A mother prayed for her son's success every day. Years later, when he became successful, he said, 'I worked hard for this.' She smiled and said, 'And I prayed hard for this.'\n\n🌙 Lesson: Never underestimate the power of a mother's prayer."
      ,image: images['9.webp'],
    },
    {
      id: 11,
      title: "The Mountain of Mercy",
      content: "On Mount Arafat, Prophet Muhammad ﷺ delivered his final sermon, emphasizing human equality and rights. Today, millions gather there during Hajj.\n\n🌙 Lesson: All humans are equal in Islam, like the teeth of a comb."
      ,image: images['10.webp'],
    },
    {
      id: 12,
      title: "The Expanding Universe",
      content: "🔹 The Quran states: 'And the heaven We constructed with strength, and indeed, We are [its] expander.' (51:47)\n\n🌍 Scientific Discovery: In 1929, scientists discovered that the universe is expanding.\n\n🌙 Lesson: The Quran described cosmic expansion 1400 years ago."
      ,image: images['11.webp'],
    },
    {
      id: 13,
      title: "The Power of Dua",
      content: "A young man prayed for years to become a better person. Years later, his friends noticed the change before he did.\n\n🌙 Lesson: Consistent dua brings gradual but permanent change."
      ,image: images['12.webp'],
    },
    {
      id: 14,
      title: "The Iron Miracle",
      content: "🔹 The Quran mentions that iron was 'sent down' to Earth. (57:25)\n\n🌍 Scientific Fact: Iron is not naturally formed on Earth; it came from outer space through meteorites.\n\n🌙 Lesson: The Quran contains scientific facts unknown at its time."
      ,image: images['13.webp'],
    },
    {
      id: 15,
      title: "The Value of Time",
      content: "Prophet Muhammad ﷺ said: 'Take advantage of five before five: your youth before old age, your health before sickness, your wealth before poverty, your free time before becoming busy, and your life before death.'\n\n🌙 Lesson: Time is our most precious asset."
      ,image: images['14.webp'],
    },
    {
      id: 16,
      title: "The Deep Seas and Internal Waves",
      content: "🔹 The Quran describes 'darkness in a deep sea, covered by waves, above which are waves.'\n\n🌍 Modern Science: Deep seas have internal waves beneath surface waves, discovered only with modern equipment.\n\n🌙 Lesson: The Quran describes oceanic phenomena accurately."
      ,image: images['15.webp'],
    },
    {
      id: 17,
      title: "The Patient Mother",
      content: "A mother waited 23 years for her son to return. When asked why she kept a light on every night, she said, 'So he can find his way home.'\n\n🌙 Lesson: A mother's love knows no bounds."
      ,image: images['17.webp'],
    },
    {
      id: 18,
      title: "The Mountains as Pegs",
      content: "🔹 The Quran describes mountains as pegs (78:7).\n\n🌍 Geological Discovery: Mountains have deep roots that stabilize Earth's crust, like pegs stabilizing a tent.\n\n🌙 Lesson: Every Quranic description has scientific precision."
      ,image: images['18.webp'],
    },
    {
      id: 19,
      title: "The Power of Forgiveness",
      content: "When Makkah was conquered, Prophet Muhammad ﷺ forgave those who had persecuted him for years, saying 'Go, you are free.'\n\n🌙 Lesson: True strength lies in forgiveness, not revenge."
      ,image: images['19.webp'],
    },
    {
      id: 20,
      title: "The Identity of Pharaoh",
      content: "🔹 The Quran mentioned that Pharaoh's body would be preserved (10:92).\n\n🌍 Historical Discovery: The mummy of Ramesses II, believed to be the Pharaoh of Exodus, was found preserved.\n\n🌙 Lesson: Quranic prophecies are fulfilled."
      ,image: images['20.webp'],
    },
    {
      id: 21,
      title: "The Honest Merchant",
      content: "A merchant discovered extra money after a sale. He traveled two days to return it to the customer.\n\n🌙 Lesson: Honesty in business brings Allah's blessings."
      ,image: images['21.webp'],
    },
    {
      id: 22,
      title: "The Cloud Formation",
      content: "🔹 The Quran describes stages of cloud formation (24:43).\n\n🌍 Meteorological Fact: Modern science confirms these exact stages of cloud formation and rain production.\n\n🌙 Lesson: The Quran describes atmospheric processes accurately."
      ,image: images['22.webp'],
    },
    {
      id: 23,
      title: "The Gift of Sight",
      content: "A blind man thanked Allah every day for his blindness. When asked why, he said, 'It protected me from seeing what Allah has forbidden.'\n\n🌙 Lesson: Every condition has hidden blessings."
      ,image: images['23.webp'],
    },
    {
      id: 24,
      title: "The Barrier Between Seas",
      content: "🔹 The Quran mentions a barrier between two seas that meet but don't mix (55:19-20).\n\n🌍 Oceanographic Discovery: Different seas have barriers of salinity and density.\n\n🌙 Lesson: The Quran describes marine phenomena accurately."
      ,image: images['24.webp'],
    },
    {
      id: 25,
      title: "The Young Believers",
      content: "The People of the Cave were young men who stood firm in their faith despite persecution.\n\n🌙 Lesson: Youth can be champions of truth."
      ,image: images['25.webp'],
    },
    {
      id: 26,
      title: "The Development of the Embryo",
      content: "🔹 The Quran describes embryonic development stages (23:14).\n\n🌍 Embryological Fact: Modern science confirms these stages exactly as described.\n\n🌙 Lesson: The Quran contains precise scientific knowledge."
      ,image: images['26.webp'],
    },
    {
      id: 27,
      title: "The Reward of Patience",
      content: "Prophet Ayyub (Job) remained grateful despite losing health, wealth, and family.\n\n🌙 Lesson: Patience in hardship leads to greater rewards."
      ,image: images['27.webp'],
    },
    {
      id: 28,
      title: "The Fingerprint Miracle",
      content: "🔹 The Quran mentions Allah's ability to perfectly reconstruct fingertips (75:4).\n\n🌍 Scientific Fact: Every fingerprint is unique, a fact discovered in the 19th century.\n\n🌙 Lesson: The Quran hints at scientific discoveries."
      ,image: images['28.webp'],
    },
    {
      id: 29,
      title: "The Night of Power",
      content: "Laylatul Qadr is better than a thousand months. One night of sincere worship equals over 83 years of worship.\n\n🌙 Lesson: Allah multiplies rewards beyond our imagination."
      ,image: images['29.webp'],
    },
    {
      id: 30,
      title: "The Final Hour",
      content: "Prophet Muhammad ﷺ said: 'If the Final Hour comes while you have a palm-cutting in your hands and it is possible to plant it before the Hour comes, you should plant it.'\n\n🌙 Lesson: Continue good works until your last breath.",
      image: images['30.webp'],
    },
  ];

  const handleStoryClick = (story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentIndex(index);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (currentIndex !== null) {
      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= 0 && newIndex < stories.length) {
        setSelectedStory(stories[newIndex]);
        setCurrentIndex(newIndex);
      }
    }
  };

  // Function to get the day of the week (starting from Monday)
  const getDayOfWeek = (index: number): string => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[index % 7]; // Start from Monday
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
      <h1 className="book-title">Scientific Miracles in the Quran</h1>
      <div className="stories-grid">
        {createCalendarArray().map((story, index) => {
          if (!story) return null; // Skip rendering for empty days

          return (
            <div
              key={index}
              className="story-card"
              style={{ '--i': index } as React.CSSProperties}
              onClick={() => handleStoryClick(story, index - 4)}
            >
              <>
                <h3>{story.title}</h3>
                <div className="story-number">{getDayOfWeek(index)}</div>
                <div className="date-number">{index - 3}</div>
              </>
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
    </div>
  );
};

export default Book;
