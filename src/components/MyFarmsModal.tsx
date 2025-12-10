'use client';

import { useFarmStore } from '@/store/farmStore';
import { X, Copy, Trash2, FolderOpen, Calendar } from 'lucide-react';

interface MyFarmsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyFarmsModal({ isOpen, onClose }: MyFarmsModalProps) {
  const { savedFarms, loadFarm, deleteFarm, duplicateFarm } = useFarmStore();

  if (!isOpen) return null;

  const handleLoadFarm = (farmId: string) => {
    loadFarm(farmId);
    onClose();
  };

  const handleDuplicateFarm = (farmId: string) => {
    duplicateFarm(farmId);
    onClose();
  };

  const handleDeleteFarm = (farmId: string, farmName: string) => {
    if (confirm(`Are you sure you want to delete "${farmName}"?`)) {
      deleteFarm(farmId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FolderOpen className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">My Farms</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {savedFarms.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">No saved farms yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Create and save your first farm design!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedFarms.map((farm) => (
                <div
                  key={farm.id}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Farm Preview Placeholder */}
                  <div className="bg-green-100 rounded-lg mb-3 h-32 flex items-center justify-center border-2 border-green-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {farm.items.length}
                      </div>
                      <div className="text-xs text-green-700 mt-1">
                        items placed
                      </div>
                    </div>
                  </div>

                  {/* Farm Info */}
                  <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                    {farm.name}
                  </h3>

                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span className="text-xs">{formatDate(farm.updatedAt)}</span>
                    </div>
                    <div className="capitalize text-xs">
                      {farm.farmType} farm • {farm.gridSize.width}x{farm.gridSize.height}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoadFarm(farm.id)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDuplicateFarm(farm.id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Duplicate"
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteFarm(farm.id, farm.name)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600 text-center">
            {savedFarms.length} {savedFarms.length === 1 ? 'farm' : 'farms'} saved
          </p>
        </div>
      </div>
    </div>
  );
}
