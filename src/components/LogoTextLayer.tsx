import React from 'react';
import { LogoTextLayer } from './types';

interface LogoTextLayerProps {
  layer: LogoTextLayer;
}

const LogoTextLayerComponent: React.FC<LogoTextLayerProps> = ({ layer }) => {
  if (!layer.visible) return null;

  const {
    text,
    style: {
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
    }
  } = layer;

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    transformOrigin: 'center center',
    zIndex: layer.zIndex,
    display: 'table',
    width: `${background.width}%`,
    backgroundColor: `${background.color}${Math.round(background.opacity * 2.55).toString(16).padStart(2, '0')}`,
    tableLayout: 'fixed',
  };

  const textContainerStyle: React.CSSProperties = {
    display: 'table-cell',
    padding: `${padding.y}px ${padding.x}px`,
    verticalAlign: verticalAlign || 'middle',
    textAlign: textAlign as any,
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
  };

  return (
    <div className="text-layer" style={containerStyle}>
      <div className="text-container" style={textContainerStyle}>
        <div className="text-content" style={textStyle}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default LogoTextLayerComponent;