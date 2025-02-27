import React from 'react';
import './CircularProgressWithLabel.css';

interface CircularProgressWithLabelProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  color?: string;
}

export const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
  label,
  icon,
  color = '#00ff87'
}) => {
  const circumference = 2 * Math.PI * 30; // radius = 30
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg className="progress-ring" width="70" height="70">
        <circle
          className="progress-ring-circle-bg"
          strokeWidth="4"
          fill="transparent"
          r="30"
          cx="35"
          cy="35"
        />
        <circle
          className="progress-ring-circle"
          strokeWidth="4"
          fill="transparent"
          r="30"
          cx="35"
          cy="35"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
            stroke: color
          }}
        />
      </svg>
      <div className="progress-icon" style={{ color }}>{icon}</div>
      <div className="progress-label">{label}</div>
    </div>
  );
}; 