import React, { useEffect, useState, useRef } from 'react';
import './RamadanDaysList.css';
import { ramadanTimes, getCityPrayerTimes } from '../data/prayerTimes';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { BsSunset } from "react-icons/bs";
import { IoClose } from "react-icons/io5";


interface RamadanDay {
  dayNumber: number;
  date: string;
  weekday: string;
  syfyr: string;
  iftar: string;
  special?: string;
}

interface RamadanDaysListProps {
  selectedCity: string;
}

const RamadanDaysList: React.FC<RamadanDaysListProps> = ({ selectedCity }) => {
  const [visibleDays, setVisibleDays] = useState<RamadanDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const currentDayRef = useRef<HTMLDivElement>(null);
  const [expandedDua, setExpandedDua] = useState<'syfyr' | 'iftar' | null>(null);
  
  // Current day for highlighting
  const currentDay: number = 15;
  
  const duas = {
    syfyr: {
      title: "Dua e Syfyrit",
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
      transliteration: "Nevejtus savme gadin min šehri Ramadane",
      translation: "Kam për qëllim të agjëroj nesër në muajin e Ramazanit për hir të Allahut të Madhëruar."
    },
    iftar: {
      title: "Dua e Iftarit",
      arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ وَعَلَيْكَ تَوَكَّلْتُ",
      transliteration: "Allahumme leke sumtu ve bike amentu ve ala rizkike eftertu ve alejke tevekkeltu",
      translation: "O Allah, për Ty agjërova, në Ty besova, me furnizimin Tënd e prisha agjërimin dhe në Ty u mbështeta."
    }
  };

  useEffect(() => {
    const allDays = ramadanTimes.map((day, index) => {
      const cityTimes = getCityPrayerTimes(selectedCity, day.date);
      return {
        dayNumber: index + 1,
        date: day.date,
        weekday: day.weekday,
        syfyr: cityTimes?.fajr || day.fajr,
        iftar: cityTimes?.maghrib || day.maghrib,
        special: day.special
      };
    });
    setVisibleDays(allDays);

    // Scroll to current day after render
    setTimeout(() => {
      if (currentDayRef.current) {
        currentDayRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  }, [selectedCity]);

  const getDayStatus = (dayNumber: number) => {
    if (dayNumber < currentDay) {
      return 'past-day completed';
    } else if (dayNumber === currentDay) {
      return 'current-day';
    }
    return '';
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="dua-buttons-container">
        <button 
          className="dua-button"
          onClick={() => setExpandedDua(expandedDua === 'syfyr' ? null : 'syfyr')}
        >
          <IoMoonOutline className="dua-button-icon" />
          <span className="dua-button-text">Dua e Syfyrit</span>
        </button>
        <button 
          className="dua-button"
          onClick={() => setExpandedDua(expandedDua === 'iftar' ? null : 'iftar')}
        >
          <IoSunnyOutline className="dua-button-icon" />
          <span className="dua-button-text">Dua e Iftarit</span>
        </button>
      </div>

      {expandedDua && (
        <div className="dua-content-wrapper">
          <div className="dua-header">
            <h3 className="dua-title">{duas[expandedDua].title}</h3>
            <button className="close-button" onClick={() => setExpandedDua(null)}>
              <IoClose size={18} />
            </button>
          </div>
          <div className="dua-content">
            <div className="arabic-text">{duas[expandedDua].arabic}</div>
            <div className="transliteration">{duas[expandedDua].transliteration}</div>
            <div className="translation">{duas[expandedDua].translation}</div>
          </div>
        </div>
      )}

      <div className="schedule">
        <div className="schedule-list">
          {visibleDays.map((day, index) => (
            <div 
              key={day.dayNumber} 
              ref={day.dayNumber === currentDay ? currentDayRef : null}
              className={`schedule-item 
                ${selectedDay === day.dayNumber ? 'selected' : ''} 
                ${getDayStatus(day.dayNumber)}
                ${day.special ? 'laylatul-qadr' : ''}`}
              onClick={() => setSelectedDay(day.dayNumber)}
              style={{ '--index': index } as React.CSSProperties}
            >
              {day.dayNumber === currentDay && !day.special && <span className="today-badge">SOT</span>}
              <div className="item-left">
                <div className="day-number">{day.dayNumber}</div>
                <div className="day-text">
                  {day.weekday}
                  {day.special && <span className="special-night">{day.special}</span>}
                </div>
              </div>
              <div className="item-right">
                <div className="time">
                  <span className="time-label">
                    <IoMoonOutline className="time-icon" />
                  </span>
                  <span className="time-value">{day.syfyr}</span>
                </div>
                <div className="time">
                  <span className="time-label">
                    <BsSunset className="time-icon" />
                  </span>
                  <span className="time-value">{day.iftar}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RamadanDaysList; 