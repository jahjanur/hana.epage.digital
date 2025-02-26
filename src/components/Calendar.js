import React, { useState, useEffect, useRef } from 'react';
import './Calendar.css';
import { ramadanTimes, getCityPrayerTimes } from '../data/prayerTimes';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Calendar = ({ onClose, selectedCity }) => {
  const [fastingStatus, setFastingStatus] = useState({});
  const [prayerTimes, setPrayerTimes] = useState([]);
  const calendarRef = useRef(null);

  const headers = [
    'Data Islame', 'Dita', 'Syfyri/Sabahu', 
    'Dreka', 'Ikindia', 'Iftari/Akshami', 'Jacia', 'Agjërova'
  ];

  // Update prayer times when city changes
  useEffect(() => {
    const updatedPrayerTimes = ramadanTimes.map((day, index) => {
      const cityTimes = getCityPrayerTimes(selectedCity, day.date);
      return {
        islamicDate: (index + 1).toString(),
        day: day.date,
        suhoorFajr: cityTimes?.fajr || day.fajr,
        dhuhr: cityTimes?.dhuhr || day.dhuhr,
        asr: cityTimes?.asr || day.asr,
        iftarMaghrib: cityTimes?.maghrib || day.maghrib,
        isha: cityTimes?.isha || day.isha
      };
    });
    setPrayerTimes(updatedPrayerTimes);
  }, [selectedCity]);  // Re-run when selectedCity changes

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00c853', '#69f0ae', '#00e676']
    });
  };

  const handleFastingStatus = (dayIndex, status) => {
    setFastingStatus(prev => ({
      ...prev,
      [dayIndex]: status
    }));
    
    if (status === 'yes') {
      triggerCelebration();
    }
  };

  const handlePdfDownload = async () => {
    const calendar = calendarRef.current;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const canvas = await html2canvas(calendar, {
      scale: 2,
      backgroundColor: '#ffffff',
      windowWidth: calendar.scrollWidth,
      windowHeight: calendar.scrollHeight,
      width: calendar.scrollWidth,
      height: calendar.scrollHeight,
      useCORS: true,
      logging: false,
      onclone: (document) => {
        const clonedCalendar = document.querySelector('.prayer-times-table');
        if (clonedCalendar) {
          clonedCalendar.style.height = 'auto';
          clonedCalendar.style.overflow = 'visible';
          clonedCalendar.style.maxHeight = 'none';
          clonedCalendar.style.display = 'block';
          clonedCalendar.style.fontSize = '10px';
          clonedCalendar.style.lineHeight = '1';
          
          const cells = clonedCalendar.querySelectorAll('.cell, .header-cell');
          cells.forEach(cell => {
            cell.style.padding = '6px 4px';
          });

          const buttons = clonedCalendar.querySelectorAll('.fasting-btn');
          buttons.forEach(button => {
            button.style.padding = '1px 4px';
            button.style.fontSize = '9px';
          });

          const statusCells = clonedCalendar.querySelectorAll('.fasting-status');
          statusCells.forEach(cell => {
            cell.style.fontSize = '12px';
          });
        }
      }
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      hotfixes: ['px_scaling']
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const margins = {
      top: 12,
      bottom: 8,
      left: 5,
      right: 5
    };

    const usableWidth = pdfWidth - (margins.left + margins.right);
    const usableHeight = pdfHeight - (margins.top + margins.bottom);
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = Math.min(
      usableWidth / imgWidth,
      usableHeight / imgHeight
    ) * 0.99;
    
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;
    
    const imgX = (pdfWidth - finalWidth) / 2;
    const imgY = margins.top;
    
    // Add title
    pdf.setTextColor(51, 51, 51);
    pdf.setFontSize(12);
    pdf.text(`${selectedCity.toUpperCase()} - Ramadan Calendar 2025`, pdfWidth/2, 8, { align: 'center' });
    
    // Add main image
    pdf.addImage(imgData, 'PNG', imgX, imgY, finalWidth, finalHeight);
    
    // Add centered watermark text
    pdf.setTextColor(245, 245, 245);  // Almost white for maximum transparency
    pdf.setFontSize(45);  // Slightly bigger to compensate for transparency
    pdf.setFont('helvetica', 'bold');
    
    // Calculate center position, but move up by adjusting Y coordinate
    const centerY = (pdfHeight / 2) - 80;
    const centerX = pdfWidth / 2;
    
    // Add single centered text with angle
    pdf.text('hana.epage.digital', centerX, centerY, {
      align: 'center',
      angle: -49,
      baseline: 'middle'
    });
    
    pdf.save(`ramadan-calendar-${selectedCity.toLowerCase()}.pdf`);
  };

  const renderFastingButton = (dayIndex) => {
    if (fastingStatus[dayIndex]) {
      return (
        <div className="fasting-status">
          {fastingStatus[dayIndex] === 'yes' ? '✓' : '✕'}
        </div>
      );
    }

    return (
      <div className="fasting-buttons">
        <button 
          className="fasting-btn yes"
          onClick={() => handleFastingStatus(dayIndex, 'yes')}
        >
          Po
        </button>
        <button 
          className="fasting-btn no"
          onClick={() => handleFastingStatus(dayIndex, 'no')}
        >
          Jo
        </button>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="back-button" onClick={onClose}>
          ←
        </button>
        <h2>
          {selectedCity.toUpperCase()} Ramadan Kerim <span className="year">2025</span>
        </h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div ref={calendarRef} className="prayer-times-table">
        <div className="table-header">
          {headers.map(header => (
            <div key={header} className="header-cell">{header}</div>
          ))}
        </div>
        <div className="table-body">
          {prayerTimes.map((day, index) => (
            <div 
              key={index} 
              className={`table-row ${index === 25 ? 'laylatul-qadr' : ''}`}
            >
              <div className="cell">
                {day.islamicDate}
                {index === 25 && <span className="qadr-label">Nata e Kadrit</span>}
              </div>
              <div className="cell">{day.day}</div>
              <div className="cell important-time">{day.suhoorFajr}</div>
              <div className="cell">{day.dhuhr}</div>
              <div className="cell">{day.asr}</div>
              <div className="cell important-time">{day.iftarMaghrib}</div>
              <div className="cell">{day.isha}</div>
              <div className="cell fasting-cell">
                {renderFastingButton(index)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="calendar-footer">
        <div className="footer-buttons">
          <button className="close-calendar-btn" onClick={onClose}>
            Mbyll
          </button>
          <button className="download-btn" onClick={handlePdfDownload}>
            Shkarko PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 