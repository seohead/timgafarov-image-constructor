import React from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { FrameLayer } from '../types';
import Accordion from '../common/Accordion';

interface FrameControlsProps {
  frame: FrameLayer;
  index: number;
  onUpdate: (updates: Partial<FrameLayer>) => void;
  onRemove: () => void;
}

const FrameControls: React.FC<FrameControlsProps> = ({
  frame,
  index,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700">Frame {index + 1}</span>
          <button
            onClick={() => onUpdate({ visible: !frame.visible })}
            className={`p-1.5 rounded transition-colors ${
              frame.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {frame.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <Accordion title="Style Settings" defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              type="color"
              value={frame.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="w-full h-10 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
            <input
              type="number"
              value={frame.width}
              onChange={(e) => onUpdate({ width: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
            <input
              type="number"
              value={frame.height}
              onChange={(e) => onUpdate({ height: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={frame.arrowHead}
                onChange={(e) => onUpdate({ arrowHead: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Show Arrow Head</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Z-Index</label>
            <input
              type="number"
              value={frame.zIndex}
              onChange={(e) => onUpdate({ zIndex: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default FrameControls;