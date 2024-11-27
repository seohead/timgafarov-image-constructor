import React, { useState, useRef } from 'react';
import { TextStyle, ImageLayer, HudSettings, MarkerSettings, LogoTextLayer, BackgroundStyle } from './types';
import Header from './layout/Header';
import HudControls from './controls/HudControls';
import HudDisplay from './hud/HudDisplay';
import CornerElement from './decorative/CornerElement';
import DraggableTextLayer from './DraggableTextLayer';
import LogoTextControls from './controls/LogoTextControls';
import ImageLayerControls from './controls/ImageLayerControls';
import ImageLayerDisplay from './layers/ImageLayerDisplay';
import TextControls from './controls/TextControls';
import MarkerSettingsPanel from './controls/MarkerSettings';
import CornerControls from './controls/CornerControls';
import BackgroundControls from './controls/BackgroundControls';
import { defaultTitleStyle, defaultLogoTextStyle, defaultHudSettings, defaultMarkerSettings, defaultImageLayer, defaultBackgroundStyles } from '../utils/defaults';
import { exportSettings, importSettings } from '../utils/settingsManager';

const ThumbnailGenerator: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [title, setTitle] = useState('Обзор Legion Go: 12 месяцев спустя');
  const [titleStyle, setTitleStyle] = useState<TextStyle>(defaultTitleStyle);
  const [logoTextLayers, setLogoTextLayers] = useState<LogoTextLayer[]>([{
    id: 1,
    text: 'T-GAMERS',
    visible: true,
    style: defaultLogoTextStyle,
    zIndex: 20
  }]);
  const [imageLayers, setImageLayers] = useState<ImageLayer[]>([defaultImageLayer]);
  const [hudSettings, setHudSettings] = useState<HudSettings>(defaultHudSettings);
  const [markerSettings, setMarkerSettings] = useState<MarkerSettings>(defaultMarkerSettings);
  const [backgroundStyles, setBackgroundStyles] = useState<BackgroundStyle[]>(defaultBackgroundStyles);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    exportSettings({
      title,
      titleStyle,
      logoTextLayers,
      imageLayers,
      hudSettings,
      markerSettings,
      backgroundStyles
    });
  };

  const handleImport = async (file: File) => {
    try {
      const settings = await importSettings(file);
      setTitle(settings.title);
      setTitleStyle(settings.titleStyle);
      setLogoTextLayers(settings.logoTextLayers);
      setImageLayers(settings.imageLayers);
      setHudSettings(settings.hudSettings);
      setMarkerSettings(settings.markerSettings);
      if (settings.backgroundStyles) {
        setBackgroundStyles(settings.backgroundStyles);
      }
    } catch (error) {
      console.error('Error importing settings:', error);
    }
  };

  const handleAddImageLayer = () => {
    const newId = Math.max(0, ...imageLayers.map(l => l.id)) + 1;
    setImageLayers([...imageLayers, { ...defaultImageLayer, id: newId }]);
  };

  const handleUpdateImageLayer = (id: number, updates: Partial<ImageLayer>) => {
    setImageLayers(layers => layers.map(layer => 
      layer.id === id ? { ...layer, ...updates } : layer
    ));
  };

  const handleRemoveImageLayer = (id: number) => {
    setImageLayers(layers => layers.filter(layer => layer.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        onExport={handleExport}
        onImport={handleImport}
        previewRef={previewRef}
      />

      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <div 
              ref={previewRef}
              className="thumbnail-preview absolute inset-0 bg-black rounded-lg overflow-hidden shadow-lg"
            >
              {backgroundStyles.map(style => style.active && (
                <div 
                  key={style.id}
                  className="absolute inset-0"
                  style={{
                    background: style.gradient,
                    backgroundSize: 'cover'
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
              ))}
              
              {imageLayers.map(layer => (
                <ImageLayerDisplay key={layer.id} layer={layer} />
              ))}
              
              <CornerElement position="top-left" />
              <CornerElement position="top-right" />
              <CornerElement position="bottom-left" />
              <CornerElement position="bottom-right" />
              
              {hudSettings.visible && (
                <HudDisplay settings={hudSettings} isPaused={isPaused} />
              )}
              
              {logoTextLayers.map(layer => (
                <DraggableTextLayer
                  key={layer.id}
                  text={layer.text}
                  style={layer.style}
                  type="logo"
                  onPositionChange={(x, y) => {
                    setLogoTextLayers(layers => layers.map(l => 
                      l.id === layer.id ? {
                        ...l,
                        style: {
                          ...l.style,
                          position: { ...l.style.position, x, y }
                        }
                      } : l
                    ));
                  }}
                />
              ))}
              
              <DraggableTextLayer
                text={title}
                style={titleStyle}
                type="title"
                onPositionChange={(x, y) => {
                  setTitleStyle(prev => ({
                    ...prev,
                    position: { ...prev.position, x, y }
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TextControls
              title="Title"
              text={title}
              style={titleStyle}
              onChange={setTitleStyle}
              onTextChange={setTitle}
            />

            <BackgroundControls 
              styles={backgroundStyles}
              onUpdate={setBackgroundStyles}
            />

            <ImageLayerControls
              layers={imageLayers}
              onUpdate={handleUpdateImageLayer}
              onAdd={handleAddImageLayer}
              onRemove={handleRemoveImageLayer}
            />
          </div>

          <div className="space-y-6">
            {logoTextLayers.map((layer, index) => (
              <LogoTextControls
                key={layer.id}
                layer={layer}
                index={index}
                onUpdate={(id, updates) => {
                  setLogoTextLayers(layers => layers.map(l => 
                    l.id === id ? { ...l, ...updates } : l
                  ));
                }}
                onRemove={(id) => {
                  setLogoTextLayers(layers => layers.filter(l => l.id !== id));
                }}
              />
            ))}

            <MarkerSettingsPanel
              settings={markerSettings}
              onUpdate={setMarkerSettings}
            />

            <HudControls
              settings={hudSettings}
              onUpdate={setHudSettings}
            />

            <CornerControls />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailGenerator;