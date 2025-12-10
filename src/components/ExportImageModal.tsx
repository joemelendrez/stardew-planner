'use client';

import { useState } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { X, Download, Image as ImageIcon } from 'lucide-react';

interface ExportImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
}

export interface ExportOptions {
  scale: number;
  includeMetadata: boolean;
  includeWatermark: boolean;
}

const RESOLUTION_PRESETS = [
  { name: '1x (Low)', scale: 1 },
  { name: '2x (Medium)', scale: 2 },
  { name: '3x (High)', scale: 3 },
  { name: '4x (Very High)', scale: 4 },
];

export default function ExportImageModal({ isOpen, onClose, onExport }: ExportImageModalProps) {
  const { currentFarm } = useFarmStore();
  const [scale, setScale] = useState(2);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(true);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport({
      scale,
      includeMetadata,
      includeWatermark,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Export as Image</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Resolution Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Resolution
            </label>
            <div className="grid grid-cols-2 gap-2">
              {RESOLUTION_PRESETS.map((preset) => (
                <button
                  key={preset.scale}
                  onClick={() => setScale(preset.scale)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    scale === preset.scale
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Higher resolution = larger file size but better quality
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  Include farm name and date
                </div>
                <div className="text-xs text-gray-500">
                  Add farm name and export date to the image
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWatermark}
                onChange={(e) => setIncludeWatermark(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  Include watermark
                </div>
                <div className="text-xs text-gray-500">
                  Add "Stardew Planner" watermark
                </div>
              </div>
            </label>
          </div>

          {/* Preview Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Farm:</span>
                <span className="font-medium">{currentFarm.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Grid Size:</span>
                <span className="font-medium">
                  {currentFarm.gridSize.width} x {currentFarm.gridSize.height}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-medium">{currentFarm.items.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
