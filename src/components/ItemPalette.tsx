'use client';

import { useState } from 'react';
import { useFarmStore } from '@/store/farmStore';
import { ITEMS, getItemsByCategory } from '@/data/items';
import { ItemCategory } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES: { id: ItemCategory; name: string }[] = [
  { id: 'buildings', name: 'Buildings' },
  { id: 'crops', name: 'Farming' },
  { id: 'paths', name: 'Paths' },
  { id: 'decorations', name: 'Decorations' },
  { id: 'misc', name: 'Misc' },
];

export default function ItemPalette() {
  const { selectedItem, setSelectedItem } = useFarmStore();
  const [expandedCategory, setExpandedCategory] = useState<ItemCategory>('buildings');
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = (category: ItemCategory) => {
    setExpandedCategory(expandedCategory === category ? 'buildings' : category);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="bg-green-600 text-white p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold text-lg">Item Palette</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="max-h-[60vh] overflow-y-auto">
          {CATEGORIES.map((category) => {
            const items = getItemsByCategory(category.id);
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id} className="border-b border-gray-200">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-700">{category.name}</span>
                  <span className="text-gray-500 text-sm">
                    {items.length} {isExpanded ? '−' : '+'}
                  </span>
                </button>

                {/* Category items */}
                {isExpanded && (
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedItem?.id === item.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded mb-2 mx-auto"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.size.width}×{item.size.height}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Selected item info */}
      {selectedItem && (
        <div className="p-4 bg-blue-50 border-t-2 border-blue-200">
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 rounded"
              style={{ backgroundColor: selectedItem.color }}
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{selectedItem.name}</h3>
              <p className="text-sm text-gray-600">{selectedItem.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Size: {selectedItem.size.width}×{selectedItem.size.height} tiles
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedItem(null)}
            className="w-full mt-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium text-gray-700 transition-colors"
          >
            Deselect
          </button>
        </div>
      )}
    </div>
  );
}
