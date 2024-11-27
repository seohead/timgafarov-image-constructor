import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useCornerSettings } from '../../contexts/CornerContext';
import Accordion from '../common/Accordion';

const CornerControls: React.FC = () => {
  const { settings, updateSettings } = useCornerSettings();

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Corner Settings</h3>
        <button
          onClick={() => updateSettings({ visible: !settings.visible })}
          className={`p-1.5 rounded transition-colors ${
            settings.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
          }`}
        >
          {settings.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      <Accordion title="Style Settings" defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corner Color</label>
            <input
              type="color"
              value={settings.color}
              onChange={(e) => updateSettings({ color: e.target.value })}
              className="w-full h-10 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opacity (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.opacity}
                onChange={(e) => updateSettings({ opacity: parseInt(e.target.value) })}
                className="flex-1"
              />
              <input
                type="number"
                value={settings.opacity}
                onChange={(e) => updateSettings({ opacity: parseInt(e.target.value) })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size (px)</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="12"
                max="48"
                value={settings.size}
                onChange={(e) => updateSettings({ size: parseInt(e.target.value) })}
                className="flex-1"
              />
              <input
                type="number"
                value={settings.size}
                onChange={(e) => updateSettings({ size: parseInt(e.target.value) })}
                className="w-16 p-1 text-sm border rounded"
              />
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default CornerControls;