import React from 'react';
import { ImageLayerProps } from './types';

interface ImageLayerControlsProps {
  layer: ImageLayerProps;
  index: number;
  onUpdate: (id: number, updates: Partial<ImageLayerProps>) => void;
  onRemove: (id: number) => void;
}

const ImageLayerControls: React.FC<ImageLayerControlsProps> = ({
  layer,
  index,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-2 border border-gray-200">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Layer {index + 1}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate(layer.id, { visible: !layer.visible })}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              layer.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {layer.visible ? 'Visible' : 'Hidden'}
          </button>
          <button
            onClick={() => onRemove(layer.id)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={layer.url}
              onChange={(e) => onUpdate(layer.id, { url: e.target.value })}
              placeholder="Enter image URL or paste from clipboard"
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text.startsWith('http')) {
                    onUpdate(layer.id, { url: text });
                  }
                } catch (err) {
                  console.error('Failed to read clipboard:', err);
                }
              }}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              Paste
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Position & Size</label>
            <div className="grid grid-cols-2 gap-4">
              {['x', 'y', 'width', 'height'].map(prop => (
                <div key={prop}>
                  <label className="block text-xs text-gray-600">
                    {prop.charAt(0).toUpperCase() + prop.slice(1)} (%)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={layer.position[prop]}
                      onChange={(e) => onUpdate(layer.id, {
                        position: { ...layer.position, [prop]: parseInt(e.target.value) }
                      })}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={layer.position[prop]}
                      onChange={(e) => onUpdate(layer.id, {
                        position: { ...layer.position, [prop]: parseInt(e.target.value) }
                      })}
                      className="w-16 p-1 text-sm border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Opacity (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={layer.opacity}
                onChange={(e) => onUpdate(layer.id, { opacity: parseInt(e.target.value) })}
                className="flex-1"
              />
              <input
                type="number"
                value={layer.opacity}
                onChange={(e) => onUpdate(layer.id, { opacity: parseInt(e.target.value) })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Blur (px)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="10"
                value={layer.blur}
                onChange={(e) => onUpdate(layer.id, { blur: parseInt(e.target.value) })}
                className="flex-1"
              />
              <input
                type="number"
                value={layer.blur}
                onChange={(e) => onUpdate(layer.id, { blur: parseInt(e.target.value) })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Z-Index</label>
            <input
              type="number"
              value={layer.zIndex}
              onChange={(e) => onUpdate(layer.id, { zIndex: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Blend Mode</label>
            <select
              value={layer.blendMode}
              onChange={(e) => onUpdate(layer.id, { blendMode: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="multiply">Multiply</option>
              <option value="screen">Screen</option>
              <option value="overlay">Overlay</option>
              <option value="darken">Darken</option>
              <option value="lighten">Lighten</option>
              <option value="color-dodge">Color Dodge</option>
              <option value="color-burn">Color Burn</option>
              <option value="hard-light">Hard Light</option>
              <option value="soft-light">Soft Light</option>
              <option value="difference">Difference</option>
              <option value="exclusion">Exclusion</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLayerControls;