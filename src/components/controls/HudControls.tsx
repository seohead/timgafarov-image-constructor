import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { HudSettings } from '../types';
import Accordion from '../common/Accordion';

interface HudControlsProps {
  settings: HudSettings;
  onUpdate: (settings: HudSettings) => void;
}

const HudControls: React.FC<HudControlsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-gray-900">HUD Settings</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.visible}
            onChange={(e) => onUpdate({ ...settings, visible: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Show HUD</span>
        </label>
      </div>

      <Accordion title="Position & Size" defaultOpen={true}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X Position (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.position.x}
                onChange={(e) => onUpdate({
                  ...settings,
                  position: { ...settings.position, x: parseInt(e.target.value) }
                })}
                className="flex-1"
              />
              <input
                type="number"
                value={settings.position.x}
                onChange={(e) => onUpdate({
                  ...settings,
                  position: { ...settings.position, x: parseInt(e.target.value) }
                })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y Position (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.position.y}
                onChange={(e) => onUpdate({
                  ...settings,
                  position: { ...settings.position, y: parseInt(e.target.value) }
                })}
                className="flex-1"
              />
              <input
                type="number"
                value={settings.position.y}
                onChange={(e) => onUpdate({
                  ...settings,
                  position: { ...settings.position, y: parseInt(e.target.value) }
                })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="50"
                value={settings.position.width === 'auto' ? 30 : settings.position.width}
                onChange={(e) => onUpdate({
                  ...settings,
                  position: { ...settings.position, width: parseInt(e.target.value) }
                })}
                className="flex-1"
              />
              <input
                type="number"
                value={settings.position.width === 'auto' ? 30 : settings.position.width}
                onChange={(e) => onUpdate({
                  ...settings,
                  position: { ...settings.position, width: parseInt(e.target.value) }
                })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion title="Progress Bar Style" defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bar Color</label>
            <input
              type="color"
              value={settings.style.barColor || '#FFB81C'}
              onChange={(e) => onUpdate({
                ...settings,
                style: { ...settings.style, barColor: e.target.value }
              })}
              className="w-full h-10 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bar Height (px)</label>
            <input
              type="range"
              min="2"
              max="8"
              value={parseInt(settings.style.fontSize) || 4}
              onChange={(e) => onUpdate({
                ...settings,
                style: { ...settings.style, fontSize: `${e.target.value}px` }
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bar Width (px)</label>
            <input
              type="range"
              min="80"
              max="200"
              value={parseInt(settings.style.lineHeight) || 120}
              onChange={(e) => onUpdate({
                ...settings,
                style: { ...settings.style, lineHeight: `${e.target.value}px` }
              })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bar Glow Intensity</label>
            <input
              type="range"
              min="0"
              max="20"
              value={parseInt(settings.style.textShadow?.split('px')[0] || '0')}
              onChange={(e) => onUpdate({
                ...settings,
                style: { 
                  ...settings.style, 
                  textShadow: `0 0 ${e.target.value}px ${settings.style.barColor || '#FFB81C'}`
                }
              })}
              className="w-full"
            />
          </div>
        </div>
      </Accordion>

      <Accordion title="Background Style" defaultOpen={false}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <input
              type="color"
              value={settings.style.background.color}
              onChange={(e) => onUpdate({
                ...settings,
                style: {
                  ...settings.style,
                  background: { ...settings.style.background, color: e.target.value }
                }
              })}
              className="w-full h-10 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Background Opacity (%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.style.background.opacity}
              onChange={(e) => onUpdate({
                ...settings,
                style: {
                  ...settings.style,
                  background: {
                    ...settings.style.background,
                    opacity: parseInt(e.target.value)
                  }
                }
              })}
              className="w-full"
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default HudControls;