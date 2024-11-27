import React, { useState, useRef } from 'react';
import { TextStyle } from './types';

interface DraggableTextLayerProps {
  text: string;
  style: TextStyle;
  type: 'title' | 'logo';
  onPositionChange: (x: number, y: number) => void;
}

const DraggableTextLayer: React.FC<DraggableTextLayerProps> = ({
  text,
  style,
  type,
  onPositionChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; layerX: number; layerY: number }>({
    startX: 0,
    startY: 0,
    layerX: style.position.x,
    layerY: style.position.y
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      layerX: style.position.x,
      layerY: style.position.y
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current?.parentElement) return;

    const parentRect = containerRef.current.parentElement.getBoundingClientRect();
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    const newX = dragRef.current.layerX + (deltaX / parentRect.width * 100);
    const newY = dragRef.current.layerY + (deltaY / parentRect.height * 100);

    onPositionChange(
      Math.max(0, Math.min(100, newX)),
      Math.max(0, Math.min(100, newY))
    );
  };

  const handleMouseUp = () => {
    if (isDragging) {
      dragRef.current.layerX = style.position.x;
      dragRef.current.layerY = style.position.y;
    }
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

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
    background = { color: '#000000', opacity: 80, width: 100 },
    padding = { x: 16, y: 8 },
    rotation = 0,
    zIndex = type === 'title' ? 20 : 30
  } = style;

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    transformOrigin: 'center center',
    zIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${background.width || 100}%`,
    cursor: 'move',
    userSelect: 'none',
    backgroundColor: `${background.color}${Math.round((background.opacity || 80) * 2.55).toString(16).padStart(2, '0')}`,
  };

  const textContainerStyle: React.CSSProperties = {
    width: '100%',
    padding: `${padding.y}px ${padding.x}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: textAlign === 'center' ? 'center' : 
                   textAlign === 'right' ? 'flex-end' : 'flex-start'
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
    textAlign: textAlign as any,
    width: '100%'
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="text-layer"
      style={containerStyle}
    >
      <div className="text-container" style={textContainerStyle}>
        <div className="text-content" style={textStyle}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default DraggableTextLayer;