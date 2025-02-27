import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrayerAlarmSettings.css'; // Import the CSS file
import { getCityPrayerTimes } from '../data/prayerTimes'; // Import the function to get prayer times

interface PrayerAlarmSettingsProps {
  selectedCity: string;
}

const PrayerAlarmSettings: React.FC<PrayerAlarmSettingsProps> = ({ selectedCity }) => {
  const navigate = useNavigate();
  const [selectedPrayers, setSelectedPrayers] = useState<string[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Assume March 1st is the start of Ramadan, making March 29th the 29th day
    const specificDay = 29;
    const ramadanStartDate = new Date('2025-03-01'); // Start date of Ramadan
    const targetDate = new Date(ramadanStartDate);
    targetDate.setDate(ramadanStartDate.getDate() + specificDay - 1);

    const formattedDate = targetDate.toISOString().split('T')[0];
    const times = getCityPrayerTimes(selectedCity, formattedDate);
    setPrayerTimes(times || {});
  }, [selectedCity]);

  const handleCheckboxChange = (prayer: string) => {
    setSelectedPrayers(prevSelected =>
      prevSelected.includes(prayer)
        ? prevSelected.filter(p => p !== prayer)
        : [...prevSelected, prayer]
    );
  };

  const handleSave = () => {
    // Logic to save the selected alarms
    alert(`Alarms set for: ${selectedPrayers.join(', ')} in ${selectedCity}`);
    navigate(-1); // Navigate back after saving
  };

  return (
    <div className="prayer-alarm-settings">
      <h2>Set Alarm for {selectedCity}</h2>
      <ul>
        {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(prayer => (
          <li key={prayer}>
            <label>
              <input
                type="checkbox"
                checked={selectedPrayers.includes(prayer)}
                onChange={() => handleCheckboxChange(prayer)}
              />
              {` Set Alarm for ${prayer} (${prayerTimes[prayer.toLowerCase()] || 'N/A'})`}
            </label>
          </li>
        ))}
      </ul>
      <button className="save-button" onClick={handleSave}>Save</button>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default PrayerAlarmSettings; 