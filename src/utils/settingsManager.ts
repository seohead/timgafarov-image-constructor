import { TextStyle, HudSettings, ImageLayer, MarkerSettings, LogoTextLayer, BackgroundStyle } from '../components/types';

interface ThumbnailSettings {
  title: string;
  titleStyle: TextStyle;
  logoTextLayers: LogoTextLayer[];
  imageLayers: ImageLayer[];
  hudSettings: HudSettings;
  markerSettings: MarkerSettings;
  backgroundStyles: BackgroundStyle[];
}

export const exportSettings = (settings: ThumbnailSettings): void => {
  try {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportName = `thumbnail-settings-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  } catch (error) {
    console.error('Error exporting settings:', error);
  }
};

export const importSettings = async (file: File): Promise<ThumbnailSettings> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }
        
        const settings = JSON.parse(event.target.result as string);
        
        // Validate required fields
        const requiredFields = [
          'title',
          'titleStyle',
          'logoTextLayers',
          'imageLayers',
          'hudSettings',
          'markerSettings'
        ];
        
        for (const field of requiredFields) {
          if (!(field in settings)) {
            throw new Error(`Missing required field: ${field}`);
          }
        }

        // Add default backgroundStyles if not present
        if (!settings.backgroundStyles) {
          settings.backgroundStyles = [];
        }
        
        resolve(settings);
      } catch (error) {
        reject(new Error('Invalid settings file format'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};