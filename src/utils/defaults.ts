import { TextStyle, HudSettings, ImageLayer, MarkerSettings, LogoTextLayer, BackgroundStyle } from '../components/types';

export const defaultTitleStyle: TextStyle = {
  fontSize: '48px',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '0px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  textAlign: 'center',
  lineHeight: '1.4',
  position: {
    x: 50,
    y: 83
  },
  background: {
    color: '#000000',
    opacity: 80,
    width: 100
  },
  padding: {
    x: 16,
    y: 8
  },
  zIndex: 20,
  rotation: 0
};

export const defaultLogoTextStyle: TextStyle = {
  fontSize: '60px',
  fontFamily: 'Arial',
  fontWeight: '700',
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '0px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  textAlign: 'center',
  lineHeight: '1.2',
  position: {
    x: 12,
    y: 15
  },
  background: {
    color: '#000000',
    opacity: 79,
    width: 46
  },
  padding: {
    x: 16,
    y: 16
  },
  zIndex: 20,
  rotation: -33
};

export const defaultHudSettings: HudSettings = {
  visible: true,
  position: {
    x: 86,
    y: 22,
    width: 27,
    height: 'auto'
  },
  opacity: 100,
  blur: 0,
  zIndex: 30,
  blendMode: 'normal',
  style: {
    fontSize: '24px',
    fontFamily: 'Arial',
    fontWeight: '700',
    color: '#ffffff',
    textShadow: '0 0 10px #FFB81C',
    background: {
      color: '#000000',
      opacity: 17
    },
    barColor: '#FFB81C',
    barHeight: '10px',
    barWidth: '120px',
    barGlow: '10px',
    lineHeight: '129px'
  },
  order: ['fps', 'cpu', 'gpu', 'ram', 'power'],
  metrics: {
    fps: { value: 90, visible: true, color: '#4ade80', label: 'Достоверность' },
    cpu: { value: 83, visible: true, color: '#4ade80', label: 'Прибыль' },
    gpu: { value: 90, visible: true, color: '#4ade80', label: 'Риск потерь' },
    ram: { value: 85, visible: true, color: '#4ade80', label: 'Надежность' },
    power: { value: 85, visible: true, color: '#4ade80', label: 'Гибкость' }
  }
};

export const defaultMarkerSettings: MarkerSettings = {
  visible: true,
  showLeft: true,
  showRight: true,
  leftPosition: { x: 20, y: 46 },
  rightPosition: { x: 87, y: 49 },
  leftRotation: 42,
  rightRotation: 0,
  leftColor: '#4ade80',
  rightColor: '#4ade80',
  size: 2,
  zIndex: 100
};

export const defaultImageLayer: ImageLayer = {
  id: 1,
  url: 'https://5na5.ru/myapp/legion-go.png',
  visible: true,
  position: {
    x: 41,
    y: 50,
    width: 140,
    height: 141
  },
  opacity: 100,
  blur: 1,
  zIndex: 10,
  blendMode: 'normal',
  scale: 100
};

export const defaultBackgroundStyles: BackgroundStyle[] = [
  {
    id: 1,
    name: 'Gaming Performance',
    gradient: 'linear-gradient(45deg, #ff0000, #000000)',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
    patternSize: '20px 20px',
    active: true
  },
  {
    id: 2,
    name: 'Tech Review',
    gradient: 'linear-gradient(135deg, #00ff87, #60efff)',
    pattern: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 6px)',
    patternSize: '10px 10px',
    active: false
  },
  {
    id: 3,
    name: 'Cyberpunk',
    gradient: 'linear-gradient(90deg, #ff00ff, #00ffff)',
    pattern: 'linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%)',
    patternSize: '30px 30px',
    active: false
  },
  {
    id: 4,
    name: 'Professional',
    gradient: 'linear-gradient(180deg, #2c5364, #203a43, #0f2027)',
    pattern: 'none',
    patternSize: '0',
    active: false
  }
];