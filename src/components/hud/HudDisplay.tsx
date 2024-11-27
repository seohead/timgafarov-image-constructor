import React from 'react';
import { HudSettings } from '../types';

interface HudDisplayProps {
  settings: HudSettings;
  isPaused?: boolean;
}

const HudDisplay: React.FC<HudDisplayProps> = ({ settings, isPaused = false }) => {
  const { position, opacity, blur, zIndex, blendMode, style, order, metrics } = settings;

  return (
    <div 
      className="absolute flex flex-col space-y-4"
      style={{ 
        top: `${position.y}%`,
        left: `${position.x}%`,
        width: position.width === 'auto' ? 'auto' : `${position.width}%`,
        height: position.height === 'auto' ? 'auto' : `${position.height}%`,
        transform: 'translate(-50%, -50%)',
        opacity: opacity / 100,
        filter: `blur(${blur}px)`,
        zIndex,
        mixBlendMode: blendMode as any,
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        color: style.color,
        textShadow: style.textShadow,
        backgroundColor: `${style.background.color}${Math.round(style.background.opacity * 2.55).toString(16).padStart(2, '0')}`,
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {order.map((metricKey) => {
        const metric = metrics[metricKey];
        if (!metric.visible) return null;
        
        return (
          <div 
            key={metricKey}
            className="flex items-center"
            style={{ height: '36px' }}
          >
            <div 
              className="relative flex items-center"
              style={{ width: '24px', marginRight: '12px' }}
            >
              <div
                className={`absolute w-3 h-3 rounded-full ${!isPaused ? 'animate-pulse' : ''}`}
                style={{ 
                  backgroundColor: metric.color,
                  boxShadow: `0 0 8px ${metric.color}`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <div
                className="absolute w-3 h-3 rounded-full animate-ping"
                style={{ 
                  backgroundColor: metric.color,
                  opacity: 0.2,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            
            <span className="flex-1 whitespace-nowrap text-[24px] leading-none" style={{ 
              minWidth: '180px',
              paddingTop: '2px'
            }}>{metric.label}</span>
            
            <div 
              className="overflow-hidden mx-4 rounded-full"
              style={{
                width: style.barWidth,
                height: style.barHeight,
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${metric.value}%`,
                  backgroundColor: style.barColor,
                  boxShadow: `0 0 ${style.barGlow} ${style.barColor}`,
                }}
              />
            </div>
            
            <div 
              className="w-12 text-right font-bold text-[24px] leading-none rounded px-2"
              style={{
                backgroundColor: style.barColor,
                color: '#000000',
                paddingTop: '2px'
              }}
            >
              {metric.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HudDisplay;