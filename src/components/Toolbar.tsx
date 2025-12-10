'use client';

import { useFarmStore } from '@/store/farmStore';
import { Save, Trash2, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function Toolbar() {
  const { currentFarm, saveFarm, clearFarm, viewport, setViewport } = useFarmStore();

  const handleSave = () => {
    saveFarm();
    alert('Farm saved successfully!');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all items from your farm?')) {
      clearFarm();
    }
  };

  const handleZoomIn = () => {
    setViewport({ scale: Math.min(viewport.scale * 1.2, 3) });
  };

  const handleZoomOut = () => {
    setViewport({ scale: Math.max(viewport.scale / 1.2, 0.2) });
  };

  const handleResetView = () => {
    setViewport({ x: 0, y: 0, scale: 1 });
  };

  const handleExport = () => {
    // For now, just download farm data as JSON
    const dataStr = JSON.stringify(currentFarm, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${currentFarm.name.replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-3">
      <div className="flex flex-wrap gap-2">
        {/* Save button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Save size={18} />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Clear button */}
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <Trash2 size={18} />
          <span className="hidden sm:inline">Clear</span>
        </button>

        {/* Export button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Export</span>
        </button>

        <div className="w-px bg-gray-300 hidden sm:block" />

        {/* Zoom controls */}
        <button
          onClick={handleZoomIn}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          <ZoomIn size={18} />
          <span className="hidden sm:inline">Zoom In</span>
        </button>

        <button
          onClick={handleZoomOut}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          <ZoomOut size={18} />
          <span className="hidden sm:inline">Zoom Out</span>
        </button>

        <button
          onClick={handleResetView}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          <RotateCcw size={18} />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Farm info */}
        <div className="ml-auto flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
          <span className="font-medium">Items:</span>
          <span>{currentFarm.items.length}</span>
        </div>
      </div>
    </div>
  );
}
