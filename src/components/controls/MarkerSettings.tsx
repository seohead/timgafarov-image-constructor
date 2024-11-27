import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { MarkerSettings } from '../types';

interface MarkerSettingsProps {
  settings: MarkerSettings;
  onUpdate: (settings: MarkerSettings) => void;
}

const MarkerSettingsPanel: React.FC<MarkerSettingsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Marker Settings</h3>
        <button
          onClick={() => onUpdate({ ...settings, visible: !settings.visible })}
          className={`p-1.5 rounded transition-colors ${
            settings.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
          }`}
        >
          {settings.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-4">
        {/* Global Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Z-Index</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.zIndex}
                onChange={(e) => onUpdate({
                  ...settings,
                  zIndex: parseInt(e.target.value)
                })}
                className="flex-1"
              />
              <input
                type="number"
                value={settings.zIndex}
                onChange={(e) => onUpdate({
                  ...settings,
                  zIndex: parseInt(e.target.value)
                })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.size}
                onChange={(e) => onUpdate({
                  ...settings,
                  size: parseFloat(e.target.value)
                })}
                className="flex-1"
              />
              <input
                type="number"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.size}
                onChange={(e) => onUpdate({
                  ...settings,
                  size: parseFloat(e.target.value)
                })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>
        </div>

        {/* Left Marker */}
        <div className="p-3 bg-white rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showLeft}
                onChange={(e) => onUpdate({
                  ...settings,
                  showLeft: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Left Marker</span>
            </label>
            <input
              type="color"
              value={settings.leftColor}
              onChange={(e) => onUpdate({
                ...settings,
                leftColor: e.target.value
              })}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-sm text-gray-600">Horizontal Position (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.leftPosition.x}
                  onChange={(e) => onUpdate({
                    ...settings,
                    leftPosition: {
                      ...settings.leftPosition,
                      x: parseInt(e.target.value)
                    }
                  })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.leftPosition.x}
                  onChange={(e) => onUpdate({
                    ...settings,
                    leftPosition: {
                      ...settings.leftPosition,
                      x: parseInt(e.target.value)
                    }
                  })}
                  className="w-16 p-1 text-sm border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Vertical Position (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.leftPosition.y}
                  onChange={(e) => onUpdate({
                    ...settings,
                    leftPosition: {
                      ...settings.leftPosition,
                      y: parseInt(e.target.value)
                    }
                  })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.leftPosition.y}
                  onChange={(e) => onUpdate({
                    ...settings,
                    leftPosition: {
                      ...settings.leftPosition,
                      y: parseInt(e.target.value)
                    }
                  })}
                  className="w-16 p-1 text-sm border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Rotation (degrees)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={settings.leftRotation}
                  onChange={(e) => onUpdate({
                    ...settings,
                    leftRotation: parseInt(e.target.value)
                  })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="-180"
                  max="180"
                  value={settings.leftRotation}
                  onChange={(e) => onUpdate({
                    ...settings,
                    leftRotation: parseInt(e.target.value)
                  })}
                  className="w-16 p-1 text-sm border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Marker */}
        <div className="p-3 bg-white rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showRight}
                onChange={(e) => onUpdate({
                  ...settings,
                  showRight: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Right Marker</span>
            </label>
            <input
              type="color"
              value={settings.rightColor}
              onChange={(e) => onUpdate({
                ...settings,
                rightColor: e.target.value
              })}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-sm text-gray-600">Horizontal Position (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.rightPosition.x}
                  onChange={(e) => onUpdate({
                    ...settings,
                    rightPosition: {
                      ...settings.rightPosition,
                      x: parseInt(e.target.value)
                    }
                  })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.rightPosition.x}
                  onChange={(e) => onUpdate({
                    ...settings,
                    rightPosition: {
                      ...settings.rightPosition,
                      x: parseInt(e.target.value)
                    }
                  })}
                  className="w-16 p-1 text-sm border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Vertical Position (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.rightPosition.y}
                  onChange={(e) => onUpdate({
                    ...settings,
                    rightPosition: {
                      ...settings.rightPosition,
                      y: parseInt(e.target.value)
                    }
                  })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.rightPosition.y}
                  onChange={(e) => onUpdate({
                    ...settings,
                    rightPosition: {
                      ...settings.rightPosition,
                      y: parseInt(e.target.value)
                    }
                  })}
                  className="w-16 p-1 text-sm border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Rotation (degrees)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={settings.rightRotation}
                  onChange={(e) => onUpdate({
                    ...settings,
                    rightRotation: parseInt(e.target.value)
                  })}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="-180"
                  max="180"
                  value={settings.rightRotation}
                  onChange={(e) => onUpdate({
                    ...settings,
                    rightRotation: parseInt(e.target.value)
                  })}
                  className="w-16 p-1 text-sm border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerSettingsPanel;