import React from 'react';

interface CircularMarkerProps {
  position: { x: number; y: number };
  rotate?: number;
  size?: number;
  color?: string;
  isPaused?: boolean;
  zIndex?: number;
}

const CircularMarker: React.FC<CircularMarkerProps> = ({
  position,
  rotate = 0,
  size = 1,
  color = '#ff0000',
  isPaused = false,
  zIndex = 20
}) => (
  <div className="absolute" style={{ 
    top: `${position.y}%`,
    left: `${position.x}%`,
    transform: `translate(-50%, -50%)`,
    zIndex
  }}>
    <svg 
      viewBox="0 0 100 100" 
      className="transform"
      style={{ 
        width: `${48 * size}px`, 
        height: `${48 * size}px`,
        transform: `rotate(${rotate}deg)`,
        filter: `drop-shadow(0 0 2px ${color}88)`
      }}
    >
      <path
        d="M50 5 A45 45 0 1 1 49.9 5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="8 4"
        className={isPaused ? '' : 'animate-spin'}
        style={{ animationDuration: '8s' }}
      />
      <path
        d="M65 35 L50 45 L65 55"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  </div>
);

export default CircularMarker;