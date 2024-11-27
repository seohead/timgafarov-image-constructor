import React from 'react';
import { BackgroundStyle } from '../types';
import Accordion from '../common/Accordion';

interface BackgroundControlsProps {
  styles: BackgroundStyle[];
  onUpdate: (styles: BackgroundStyle[]) => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({ styles, onUpdate }) => {
  const handleStyleSelect = (selectedId: number) => {
    onUpdate(styles.map(style => ({
      ...style,
      active: style.id === selectedId
    })));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="font-bold text-lg">Background Style</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {styles.map(style => (
          <button
            key={style.id}
            onClick={() => handleStyleSelect(style.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              style.active 
                ? 'border-blue-500 shadow-lg scale-105' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div 
              className="w-full h-24 rounded-md mb-2"
              style={{
                background: style.gradient,
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {style.pattern !== 'none' && (
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: style.pattern,
                    backgroundSize: style.patternSize
                  }}
                />
              )}
            </div>
            <p className="text-sm font-medium text-center">{style.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundControls;