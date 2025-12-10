'use client';

import { useState } from 'react';
import FarmCanvas from '@/components/FarmCanvas';
import ItemPalette from '@/components/ItemPalette';
import Toolbar from '@/components/Toolbar';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [showPalette, setShowPalette] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">🌾 Stardew Farm Planner</h1>
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="lg:hidden p-2 hover:bg-green-600 rounded-lg transition-colors"
          >
            {showPalette ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Mobile palette overlay */}
        {showPalette && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowPalette(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            lg:w-80 lg:static lg:block lg:translate-x-0
            fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] z-50
            transition-transform duration-300 ease-in-out
            ${showPalette ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="h-full overflow-y-auto bg-gray-50 p-4 space-y-4">
            <ItemPalette />
            
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">How to Use</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Select an item from the palette</li>
                <li>• Tap the grid to place it</li>
                <li>• Tap placed items to remove them</li>
                <li>• Pinch or scroll to zoom</li>
                <li>• Drag to pan around</li>
                <li>• Save your design when done!</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main canvas area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4">
            <Toolbar />
          </div>
          <div className="flex-1 overflow-hidden">
            <FarmCanvas />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-3 text-sm">
        <p>
          Stardew Valley is © ConcernedApe | Unofficial Fan Tool |{' '}
          <a
            href="https://github.com/yourusername/stardew-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
