import React from 'react';
import { Eye, EyeOff, Trash2, Plus } from 'lucide-react';
import { ImageLayer } from '../types';
import Accordion from '../common/Accordion';
import { defaultImageLayer } from '../../utils/defaults';

interface ImageLayerControlsProps {
  layers: ImageLayer[];
  onUpdate: (id: number, updates: Partial<ImageLayer>) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
}

const ImageLayerControls: React.FC<ImageLayerControlsProps> = ({
  layers,
  onUpdate,
  onAdd,
  onRemove,
}) => {
  const handleUrlChange = (id: number, url: string) => {
    if (url.includes('5na5.ru') && !url.startsWith('https://')) {
      url = 'https://' + url.replace(/^[^:]+:\/\//, '');
    }
    onUpdate(id, { url });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Plus className="w-4 h-4" />
        Add Image Layer
      </button>

      {layers.map((layer, index) => (
        <div key={layer.id} className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Image Layer {index + 1}</span>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={layer.url}
                onChange={(e) => handleUrlChange(layer.id, e.target.value)}
                placeholder="Enter image URL (e.g., https://5na5.ru/myapp/legion-go.png)"
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text.includes('5na5.ru') || text.startsWith('http')) {
                      handleUrlChange(layer.id, text);
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

          <Accordion title="Position & Size" defaultOpen={true}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">X Position (%)</label>
                  <input
                    type="number"
                    value={layer.position.x}
                    onChange={(e) => onUpdate(layer.id, {
                      position: { ...layer.position, x: parseInt(e.target.value) }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Y Position (%)</label>
                  <input
                    type="number"
                    value={layer.position.y}
                    onChange={(e) => onUpdate(layer.id, {
                      position: { ...layer.position, y: parseInt(e.target.value) }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (%)</label>
                  <input
                    type="number"
                    value={layer.position.width}
                    onChange={(e) => onUpdate(layer.id, {
                      position: { ...layer.position, width: parseInt(e.target.value) }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (%)</label>
                  <input
                    type="number"
                    value={layer.position.height}
                    onChange={(e) => onUpdate(layer.id, {
                      position: { ...layer.position, height: parseInt(e.target.value) }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion title="Style Settings" defaultOpen={false}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Z-Index</label>
                <input
                  type="number"
                  value={layer.zIndex}
                  onChange={(e) => onUpdate(layer.id, { zIndex: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opacity (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={layer.opacity}
                  onChange={(e) => onUpdate(layer.id, { opacity: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blur (px)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={layer.blur}
                  onChange={(e) => onUpdate(layer.id, { blur: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blend Mode</label>
                <select
                  value={layer.blendMode}
                  onChange={(e) => onUpdate(layer.id, { blendMode: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="normal">Normal</option>
                  <option value="multiply">Multiply</option>
                  <option value="screen">Screen</option>
                  <option value="overlay">Overlay</option>
                  <option value="darken">Darken</option>
                  <option value="lighten">Lighten</option>
                </select>
              </div>
            </div>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ImageLayerControls;