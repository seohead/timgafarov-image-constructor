// Previous imports remain the same

const MarkerControls: React.FC<MarkerControlsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      {/* Previous controls remain the same */}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size Multiplier</label>
          <select
            value={settings.size}
            onChange={(e) => onUpdate({
              ...settings,
              size: parseFloat(e.target.value)
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="1">Normal (x1)</option>
            <option value="4">Large (x4)</option>
            <option value="8">Extra Large (x8)</option>
          </select>
        </div>
      </div>

      {/* Rest of the controls remain the same */}
    </div>
  );
};

export default MarkerControls;