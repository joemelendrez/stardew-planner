'use client';

import { useState, useRef } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { Save, Trash2, Download, ZoomIn, ZoomOut, RotateCcw, FolderOpen, Upload, Image, FileJson, Plus } from 'lucide-react';
import MyFarmsModal from './MyFarmsModal';
import ExportImageModal from './ExportImageModal';
import type { ExportOptions, FarmCanvasRef } from './FarmCanvas.types';

interface ToolbarProps {
  canvasRef?: React.RefObject<FarmCanvasRef>;
}

export default function Toolbar({ canvasRef }: ToolbarProps) {
  const { currentFarm, saveFarm, clearFarm, viewport, setViewport, importFarm, createNewFarm } = useFarmStore();
  const [showMyFarmsModal, setShowMyFarmsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(currentFarm, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${currentFarm.name.replace(/\s+/g, '-')}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleExportImage = (options: ExportOptions) => {
    if (canvasRef?.current) {
      canvasRef.current.exportAsImage(options);
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const farmData = JSON.parse(event.target?.result as string);
        importFarm(farmData);
        alert('Farm imported successfully!');
      } catch (error) {
        alert('Failed to import farm. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewFarm = () => {
    if (confirm('Create a new farm? Any unsaved changes will be lost.')) {
      createNewFarm();
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-3">
        <div className="flex flex-wrap gap-2">
          {/* New Farm button */}
          <button
            onClick={handleNewFarm}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            title="Create New Farm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New</span>
          </button>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Save size={18} />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* My Farms button */}
          <button
            onClick={() => setShowMyFarmsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
            title="My Farms"
          >
            <FolderOpen size={18} />
            <span className="hidden sm:inline">My Farms</span>
          </button>

          <div className="w-px bg-gray-300 hidden sm:block" />

          {/* Import button */}
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            title="Import Farm (JSON)"
          >
            <Upload size={18} />
            <span className="hidden sm:inline">Import</span>
          </button>

          {/* Export Image button */}
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            title="Export as Image"
          >
            <Image size={18} />
            <span className="hidden sm:inline">Export IMG</span>
          </button>

          {/* Export JSON button */}
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
            title="Export as JSON"
          >
            <FileJson size={18} />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <div className="w-px bg-gray-300 hidden sm:block" />

          {/* Clear button */}
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <div className="w-px bg-gray-300 hidden sm:block" />

          {/* Zoom controls */}
          <button
            onClick={handleZoomIn}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={handleZoomOut}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>

          <button
            onClick={handleResetView}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            title="Reset View"
          >
            <RotateCcw size={18} />
          </button>

          {/* Farm info */}
          <div className="ml-auto flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
            <span className="font-medium">Items:</span>
            <span>{currentFarm.items.length}</span>
          </div>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Modals */}
      <MyFarmsModal
        isOpen={showMyFarmsModal}
        onClose={() => setShowMyFarmsModal(false)}
      />
      <ExportImageModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportImage}
      />
    </>
  );
}
