import React, { createContext, useContext, useState } from 'react';

interface CornerSettings {
  color: string;
  opacity: number;
  size: number;
  visible: boolean;
}

interface CornerContextType {
  settings: CornerSettings;
  updateSettings: (updates: Partial<CornerSettings>) => void;
}

const defaultSettings: CornerSettings = {
  color: '#FFB81C',
  opacity: 100,
  size: 24,
  visible: true,
};

const CornerContext = createContext<CornerContextType | undefined>(undefined);

export function CornerProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CornerSettings>(defaultSettings);

  const updateSettings = (updates: Partial<CornerSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <CornerContext.Provider value={{ settings, updateSettings }}>
      {children}
    </CornerContext.Provider>
  );
}

export function useCornerSettings() {
  const context = useContext(CornerContext);
  if (!context) {
    throw new Error('useCornerSettings must be used within a CornerProvider');
  }
  return context;
}