import React from 'react';
import { TextStyle } from '../types';
import Accordion from '../common/Accordion';

interface TextControlsProps {
  text: string;
  style: TextStyle;
  onChange: (style: TextStyle) => void;
  onTextChange: (text: string) => void;
  title: string;
}

const TextControls: React.FC<TextControlsProps> = ({
  text,
  style,
  onChange,
  onTextChange,
  title,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{title} Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <Accordion title="Text Style" defaultOpen={true}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="text"
              value={style.fontSize}
              onChange={(e) => onChange({ ...style, fontSize: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <select
              value={style.fontFamily}
              onChange={(e) => onChange({ ...style, fontFamily: e.target.value })}
              className="w-full p-2 border rounded"
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
              onChange={(e) => onChange({ ...style, fontWeight: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="600">Semi Bold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="color"
              value={style.color}
              onChange={(e) => onChange({ ...style, color: e.target.value })}
              className="w-full p-2 h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Letter Spacing</label>
            <input
              type="text"
              value={style.letterSpacing}
              onChange={(e) => onChange({ ...style, letterSpacing: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
            <input
              type="text"
              value={style.lineHeight}
              onChange={(e) => onChange({ ...style, lineHeight: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Transform</label>
            <select
              value={style.textTransform}
              onChange={(e) => onChange({ ...style, textTransform: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
            <select
              value={style.textAlign}
              onChange={(e) => onChange({ ...style, textAlign: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </Accordion>

      <Accordion title="Position & Rotation" defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Z-Index</label>
            <input
              type="number"
              value={style.zIndex || 0}
              onChange={(e) => onChange({ ...style, zIndex: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rotation (degrees)</label>
            <input
              type="number"
              value={style.rotation || 0}
              onChange={(e) => onChange({ ...style, rotation: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default TextControls;