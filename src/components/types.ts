export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Background {
  color: string;
  opacity: number;
  width?: number;
  height?: number;
}

export interface TextStyle {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textTransform?: string;
  letterSpacing?: string;
  textShadow?: string;
  textAlign?: string;
  verticalAlign?: string;
  lineHeight?: string;
  position: Position;
  background: Background;
  padding?: {
    x: number;
    y: number;
  };
  zIndex?: number;
  rotation?: number;
}

export interface BackgroundStyle {
  id: number;
  name: string;
  gradient: string;
  pattern: string;
  patternSize: string;
  active: boolean;
}

export interface HudStyle {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textShadow: string;
  background: {
    color: string;
    opacity: number;
  };
  barColor: string;
  barHeight: string;
  barWidth: string;
  barGlow: string;
  lineHeight: string;
}

export interface HudSettings {
  visible: boolean;
  position: {
    x: number;
    y: number;
    width: number | 'auto';
    height: number | 'auto';
  };
  opacity: number;
  blur: number;
  zIndex: number;
  blendMode: string;
  style: HudStyle;
  order: string[];
  metrics: {
    [key: string]: {
      value: number;
      visible: boolean;
      color: string;
      label: string;
    };
  };
}

export interface ImageLayer {
  id: number;
  url: string;
  visible: boolean;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  opacity: number;
  blur: number;
  zIndex: number;
  blendMode: string;
  scale: number;
}

export interface MarkerSettings {
  visible: boolean;
  showLeft: boolean;
  showRight: boolean;
  leftPosition: Position;
  rightPosition: Position;
  leftRotation: number;
  rightRotation: number;
  leftColor: string;
  rightColor: string;
  size: number;
  zIndex: number;
}

export interface LogoTextLayer {
  id: number;
  text: string;
  visible: boolean;
  style: TextStyle;
  zIndex: number;
}

export interface FrameLayer {
  id: number;
  visible: boolean;
  position: Position;
  color: string;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  arrowHead: boolean;
}

export type ContentType = 'review-games' | 'comparison' | 'how-to' | 'listing';