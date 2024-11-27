import React from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { LogoTextLayer } from '../types';
import { defaultTitleStyle } from '../../utils/defaults';

interface LogoTextControlsProps {
  layer: LogoTextLayer;
  index: number;
  onUpdate: (id: number, updates: Partial<LogoTextLayer>) => void;
  onRemove: (id: number) => void;
}

const LogoTextControls: React.FC<LogoTextControlsProps> = ({
  layer,
  index,
  onUpdate,
  onRemove,
}) => {
  const style = {
    ...defaultTitleStyle,
    ...layer.style,
    background: {
      ...defaultTitleStyle.background,
      ...layer.style.background
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700">LOGOTEXT Layer {index + 1}</span>
          <button
            onClick={() => onUpdate(layer.id, { visible: !layer.visible })}
            className={`p-1.5 rounded transition-colors ${
              layer.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <button
          onClick={() => onRemove(layer.id)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
          <input
            type="text"
            value={layer.text}
            onChange={(e) => onUpdate(layer.id, { text: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Position Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X Position (%)</label>
            <input
              type="number"
              value={style.position.x}
              onChange={(e) => onUpdate(layer.id, {
                style: {
                  ...style,
                  position: { ...style.position, x: parseInt(e.target.value) }
                }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y Position (%)</label>
            <input
              type="number"
              value={style.position.y}
              onChange={(e) => onUpdate(layer.id, {
                style: {
                  ...style,
                  position: { ...style.position, y: parseInt(e.target.value) }
                }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Style Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="text"
              value={style.fontSize}
              onChange={(e) => onUpdate(layer.id, {
                style: { ...style, fontSize: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <select
              value={style.fontFamily}
              onChange={(e) => onUpdate(layer.id, {
                style: { ...style, fontFamily: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
            <select
              value={style.fontWeight}
              onChange={(e) => onUpdate(layer.id, {
                style: { ...style, fontWeight: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="normal">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semibold</option>
              <option value="700">Bold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Transform</label>
            <select
              value={style.textTransform}
              onChange={(e) => onUpdate(layer.id, {
                style: { ...style, textTransform: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="color"
              value={style.color}
              onChange={(e) => onUpdate(layer.id, {
                style: { ...style, color: e.target.value }
              })}
              className="w-full p-2 h-10 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
            <select
              value={style.textAlign}
              onChange={(e) => onUpdate(layer.id, {
                style: { ...style, textAlign: e.target.value }
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>

        {/* Background Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
            <input
              type="color"
              value={style.background.color}
              onChange={(e) => onUpdate(layer.id, {
                style: {
                  ...style,
                  background: { ...style.background, color: e.target.value }
                }
              })}
              className="w-full p-2 h-10 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Opacity (%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={style.background.opacity}
              onChange={(e) => onUpdate(layer.id, {
                style: {
                  ...style,
                  background: {
                    ...style.background,
                    opacity: parseInt(e.target.value)
                  }
                }
              })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Width (%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={style.background.width || 100}
              onChange={(e) => onUpdate(layer.id, {
                style: {
                  ...style,
                  background: {
                    ...style.background,
                    width: parseInt(e.target.value)
                  }
                }
              })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rotation (degrees)</label>
            <input
              type="range"
              min="-180"
              max="180"
              value={style.rotation || 0}
              onChange={(e) => onUpdate(layer.id, {
                style: {
                  ...style,
                  rotation: parseInt(e.target.value)
                }
              })}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Z-Index</label>
          <input
            type="number"
            value={style.zIndex || 30}
            onChange={(e) => onUpdate(layer.id, {
              style: {
                ...style,
                zIndex: parseInt(e.target.value)
              }
            })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoTextControls;