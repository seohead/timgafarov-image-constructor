import React, { useRef } from 'react';
import { Play, Pause, Download, Upload } from 'lucide-react';
import { toPng } from 'html-to-image';
import { THUMBNAIL_DIMENSIONS, EXPORT_SETTINGS } from '../../utils/constants';

interface HeaderProps {
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  previewRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({
  isPaused,
  setIsPaused,
  onExport,
  onImport,
  previewRef
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      event.target.value = '';
    }
  };

  const handleDownloadThumbnail = async () => {
    if (!previewRef.current) return;

    try {
      const wasPaused = isPaused;
      setIsPaused(true);

      const dataUrl = await toPng(previewRef.current, {
        width: THUMBNAIL_DIMENSIONS.width,
        height: THUMBNAIL_DIMENSIONS.height,
        pixelRatio: EXPORT_SETTINGS.scale,
        backgroundColor: EXPORT_SETTINGS.backgroundColor,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${THUMBNAIL_DIMENSIONS.width}px`,
          height: `${THUMBNAIL_DIMENSIONS.height}px`
        }
      });

      const link = document.createElement('a');
      link.download = `thumbnail-${new Date().toISOString().slice(0,10)}.png`;
      link.href = dataUrl;
      link.click();

      if (!wasPaused) {
        setIsPaused(false);
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPaused(!isPaused)} 
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadThumbnail}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Download className="w-4 h-4" />
              <span>Download Thumbnail</span>
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              <Upload className="w-4 h-4" />
              <span>Import JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;