import React, { useState, useRef } from 'react';
import { FrameLayer } from '../types';

interface DraggableFrameProps {
  frame: FrameLayer;
  onUpdate: (updates: Partial<FrameLayer>) => void;
}

const DraggableFrame: React.FC<DraggableFrameProps> = ({ frame, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; frameX: number; frameY: number; startRotation: number }>({
    startX: 0,
    startY: 0,
    frameX: frame.position.x || 50,
    frameY: frame.position.y || 50,
    startRotation: frame.rotation || 0
  });
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!frameRef.current) return;
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      frameX: frame.position.x || 50,
      frameY: frame.position.y || 50,
      startRotation: frame.rotation || 0
    };

    e.stopPropagation();
  };

  const handleRotateMouseDown = (e: React.MouseEvent) => {
    if (!frameRef.current) return;
    
    setIsRotating(true);
    const rect = frameRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    dragRef.current = {
      startX: Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI),
      startY: frame.rotation || 0,
      frameX: centerX,
      frameY: centerY,
      startRotation: frame.rotation || 0
    };

    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!frameRef.current?.parentElement) return;

    const parentRect = frameRef.current.parentElement.getBoundingClientRect();

    if (isDragging) {
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      const newX = dragRef.current.frameX + (deltaX / parentRect.width * 100);
      const newY = dragRef.current.frameY + (deltaY / parentRect.height * 100);

      onUpdate({
        position: {
          ...frame.position,
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY))
        }
      });
    } else if (isRotating && frameRef.current) {
      const rect = frameRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const deltaAngle = currentAngle - dragRef.current.startX;
      
      onUpdate({
        rotation: ((dragRef.current.startY + deltaAngle) % 360) || 0
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      dragRef.current.frameX = frame.position.x || 50;
      dragRef.current.frameY = frame.position.y || 50;
    }
    setIsDragging(false);
    setIsRotating(false);
  };

  React.useEffect(() => {
    if (isDragging || isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isRotating]);

  if (!frame.visible) return null;

  const width = frame.width || 200;
  const height = frame.height || 4;
  const arrowHeadPath = `M ${width - 10} -6 L ${width} 0 L ${width - 10} 6`;

  return (
    <div
      ref={frameRef}
      className="absolute cursor-move"
      style={{
        left: `${frame.position.x || 50}%`,
        top: `${frame.position.y || 50}%`,
        transform: `translate(-50%, -50%) rotate(${frame.rotation || 0}deg)`,
        zIndex: frame.zIndex || 42,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative">
        <svg
          width={width}
          height={height + 12}
          style={{
            overflow: 'visible',
            transform: 'translateY(-50%)'
          }}
        >
          <line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke={frame.color || '#ff0000'}
            strokeWidth={height}
          />
          {frame.arrowHead && (
            <path
              d={arrowHeadPath}
              fill={frame.color || '#ff0000'}
            />
          )}
        </svg>
        <div
          className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-white border-2 cursor-pointer hover:bg-gray-100"
          style={{ borderColor: frame.color || '#ff0000' }}
          onMouseDown={handleRotateMouseDown}
        />
      </div>
    </div>
  );
};

export default DraggableFrame;