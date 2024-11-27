import React from 'react';

const TechPattern: React.FC = () => (
  <div className="absolute inset-0 opacity-10">
    <div className="w-full h-full" style={{
      backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
    }} />
  </div>
);

export default TechPattern;