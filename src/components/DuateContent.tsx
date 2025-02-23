import React from 'react';
import './DuateContent.css';

const DuateContent: React.FC = () => {
  const duate = [
    {
      title: "Dua e Syfyrit",
      arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
      transliteration: "Nevejtus savme gadin min šehri Ramadane",
      translation: "Kam për qëllim të agjëroj nesër në muajin e Ramazanit për hir të Allahut të Madhëruar",
      time: "Para Syfyrit"
    },
    {
      title: "Dua e Iftarit",
      arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ وَعَلَيْكَ تَوَكَّلْتُ",
      transliteration: "Allahumme leke sumtu ve bike amentu ve ala rizkike eftertu ve alejke tevekkeltu",
      translation: "O Allah, për Ty agjërova, në Ty besova, me furnizimin Tënd e prisha agjërimin dhe në Ty u mbështeta",
      time: "Para Iftarit"
    }
  ];

  return (
    <div className="duate-container">
      <div className="duate-list">
        {duate.map((dua, index) => (
          <div key={index} className="dua-card">
            <h3 className="dua-title">{dua.title}</h3>
            <p className="dua-arabic">{dua.arabic}</p>
            <p className="dua-transliteration">{dua.transliteration}</p>
            <p className="dua-translation">{dua.translation}</p>
            <span className="dua-time">{dua.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuateContent; 