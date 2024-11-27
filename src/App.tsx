import React from 'react';
import ThumbnailGenerator from './components/ThumbnailGenerator';
import { CornerProvider } from './contexts/CornerContext';

function App() {
  return (
    <CornerProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Генератор превью изображений
          </h1>
          <ThumbnailGenerator />
        </div>
      </div>
    </CornerProvider>
  );
}

export default App;