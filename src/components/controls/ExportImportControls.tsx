import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';

interface ExportImportControlsProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

const ExportImportControls: React.FC<ExportImportControlsProps> = ({
  onExport,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset input so the same file can be selected again
      event.target.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export Settings
      </button>
      <button
        onClick={handleImportClick}
        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Upload className="w-4 h-4" />
        Import Settings
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ExportImportControls;