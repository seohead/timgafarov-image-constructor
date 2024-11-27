import React, { useState, useEffect } from 'react';
import { ImageLayer } from '../types';

interface ImageLayerDisplayProps {
  layer: ImageLayer;
}

const ImageLayerDisplay: React.FC<ImageLayerDisplayProps> = ({ layer }) => {
  const [imageUrl, setImageUrl] = useState<string>(layer.url);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!layer.url) return;
    
    setLoadError(false);
    setImageUrl(layer.url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      setLoadError(false);
    };

    img.onerror = () => {
      const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(layer.url)}`;
      setImageUrl(corsProxyUrl);
      setLoadError(false);
    };

    img.src = layer.url;
  }, [layer.url]);

  if (!layer.visible || !imageUrl) return null;

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${layer.position.x}%`,
        top: `${layer.position.y}%`,
        width: `${layer.position.width}%`,
        height: `${layer.position.height}%`,
        transform: `translate(-50%, -50%) scale(${layer.scale / 100})`,
        opacity: layer.opacity / 100,
        filter: `blur(${layer.blur}px)`,
        zIndex: layer.zIndex,
        mixBlendMode: layer.blendMode as any,
      }}
    >
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
        style={{
          imageRendering: 'high-quality',
        }}
        onError={(e) => {
          if (!loadError) {
            setLoadError(true);
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIExvYWQgRXJyb3I8L3RleHQ+PC9zdmc+';
          }
        }}
      />
    </div>
  );
};

export default ImageLayerDisplay;