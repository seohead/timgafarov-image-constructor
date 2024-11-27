import React, { useEffect, useRef } from 'react';
import { TextStyle } from './types';
import { THUMBNAIL_DIMENSIONS } from '../utils/constants';

export const TextLayer: React.FC<{
  text: string;
  style: TextStyle;
  type: 'title' | 'subtitle';
}> = ({ text, style, type }) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const {
    fontSize,
    fontFamily,
    fontWeight,
    color,
    textTransform,
    letterSpacing,
    textShadow,
    textAlign,
    verticalAlign = 'middle',
    lineHeight,
    position,
    background,
    padding = { x: 16, y: 8 },
    rotation = 0
  } = style;

  useEffect(() => {
    if (layerRef.current) {
      const rect = layerRef.current.getBoundingClientRect();
      console.log(`TextLayer (${type}) Position:`, {
        position,
        boundingRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        },
        computedStyle: window.getComputedStyle(layerRef.current)
      });
    }
  }, [position, type]);

  const backgroundStyle = {
    ...background,
    offset: background.offset || { x: 0, y: 0 },
    extend: background.extend || { top: 0, right: 0, bottom: 0, left: 0 }
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: `translate(-50%, -50%) ${rotation ? `rotate(${rotation}deg)` : ''}`,
    transformOrigin: 'center center',
    zIndex: type === 'title' ? 20 : 10,
    display: 'table',
    width: `${backgroundStyle.width}%`,
    backgroundColor: `${backgroundStyle.color}${Math.round(backgroundStyle.opacity * 2.55).toString(16).padStart(2, '0')}`,
    tableLayout: 'fixed',
    maxWidth: `${THUMBNAIL_DIMENSIONS.width}px`,
    boxSizing: 'border-box',
    willChange: 'transform'
  };

  const textContainerStyle: React.CSSProperties = {
    display: 'table-cell',
    padding: `${padding.y}px ${padding.x}px`,
    verticalAlign: verticalAlign || 'middle',
    textAlign: textAlign as any,
    boxSizing: 'border-box'
  };

  const textStyle: React.CSSProperties = {
    fontSize,
    fontFamily,
    fontWeight,
    color,
    textTransform: textTransform as any,
    letterSpacing,
    textShadow,
    lineHeight,
    margin: 0,
    display: 'block',
    boxSizing: 'border-box',
    wordWrap: 'break-word'
  };

  return (
    <div ref={layerRef} className="text-layer" style={containerStyle}>
      <div className="text-container" style={textContainerStyle}>
        <div className="text-content" style={textStyle}>
          {text}
        </div>
      </div>
    </div>
  );
};