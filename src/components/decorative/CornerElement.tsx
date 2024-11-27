import React from 'react';
import { useCornerSettings } from '../../contexts/CornerContext';

interface CornerElementProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CornerElement: React.FC<CornerElementProps> = ({ position }) => {
  const { settings } = useCornerSettings();
  
  if (!settings.visible) return null;

  const baseClasses = "absolute";
  const positionClasses = {
    'top-left': "top-0 left-0",
    'top-right': "top-0 right-0 rotate-90",
    'bottom-left': "bottom-0 left-0 -rotate-90",
    'bottom-right': "bottom-0 right-0 rotate-180"
  };

  const opacity = settings.opacity / 100;
  const size = settings.size;
  
  return (
    <div 
      className={`${baseClasses} ${positionClasses[position]}`}
      style={{ width: size * 2, height: size * 2 }}
    >
      {/* Main corner lines */}
      <div 
        className="absolute w-full h-2"
        style={{ 
          background: `linear-gradient(to right, ${settings.color}, ${settings.color} 70%, transparent)`,
          opacity 
        }} 
      />
      <div 
        className="absolute w-2 h-full"
        style={{ 
          background: `linear-gradient(to bottom, ${settings.color}, ${settings.color} 70%, transparent)`,
          opacity 
        }} 
      />
      
      {/* Decorative elements */}
      <div 
        className="absolute transform -rotate-45"
        style={{ 
          width: size * 1.3,
          height: size * 1.3,
          border: `2px solid ${settings.color}`,
          opacity: opacity * 0.3,
          background: `linear-gradient(to bottom right, ${settings.color}1A, transparent)`
        }}
      />
      
      <div 
        className="absolute transform -rotate-45 translate-x-2 translate-y-2"
        style={{ 
          width: size,
          height: size,
          border: `1px solid ${settings.color}`,
          opacity: opacity * 0.2,
          background: `linear-gradient(to bottom right, ${settings.color}0D, transparent)`
        }}
      />
      
      {/* Accent dots */}
      <div 
        className="absolute rounded-full"
        style={{ 
          width: size * 0.08,
          height: size * 0.08,
          background: settings.color,
          top: size * 0.17,
          left: size * 0.17,
          opacity
        }}
      >
        <div 
          className="absolute w-full h-full animate-ping rounded-full"
          style={{ 
            background: settings.color,
            opacity: 0.5
          }}
        />
      </div>
      
      <div 
        className="absolute rounded-full"
        style={{ 
          width: size * 0.06,
          height: size * 0.06,
          background: settings.color,
          top: size * 0.29,
          left: size * 0.29,
          opacity: opacity * 0.5
        }}
      />
      
      {/* Tech pattern overlay */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: 0.2,
          backgroundImage: `
            linear-gradient(45deg, transparent 45%, ${settings.color} 45%, ${settings.color} 55%, transparent 55%),
            linear-gradient(-45deg, transparent 45%, ${settings.color} 45%, ${settings.color} 55%, transparent 55%)
          `,
          backgroundSize: '8px 8px',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default CornerElement;