import { create } from 'zustand';
import { FarmLayout, PlacedItem, ItemData, ViewportState, FarmType } from '@/types';
import { FARM_SIZES } from '@/data/items';

interface FarmStore {
  // Current farm state
  currentFarm: FarmLayout;
  savedFarms: FarmLayout[];
  
  // UI state
  selectedItem: ItemData | null;
  viewport: ViewportState;
  
  // Actions
  setFarmType: (farmType: FarmType) => void;
  setSelectedItem: (item: ItemData | null) => void;
  addItem: (item: PlacedItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<PlacedItem>) => void;
  clearFarm: () => void;
  setViewport: (viewport: Partial<ViewportState>) => void;
  
  // Farm management
  saveFarm: () => void;
  loadFarm: (farmId: string) => void;
  deleteFarm: (farmId: string) => void;
  updateFarmName: (name: string) => void;
  duplicateFarm: (farmId: string) => void;
  createNewFarm: (farmType?: FarmType) => void;
  importFarm: (farmData: FarmLayout) => void;
}

const createNewFarm = (farmType: FarmType = 'standard'): FarmLayout => ({
  id: Date.now().toString(),
  name: 'My Farm',
  farmType,
  gridSize: FARM_SIZES[farmType],
  items: [
    // Pre-place the farmhouse in the standard location (top-left area of farm)
    {
      id: 'farmhouse-initial',
      itemId: 'farmhouse',
      x: 58,
      y: 14,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useFarmStore = create<FarmStore>((set, get) => ({
  currentFarm: createNewFarm(),
  savedFarms: [],
  selectedItem: null,
  viewport: { x: 0, y: 0, scale: 1 },

  setFarmType: (farmType) => {
    set((state) => ({
      currentFarm: {
        ...state.currentFarm,
        farmType,
        gridSize: FARM_SIZES[farmType],
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  setSelectedItem: (item) => {
    set({ selectedItem: item });
  },

  addItem: (item) => {
    set((state) => ({
      currentFarm: {
        ...state.currentFarm,
        items: [...state.currentFarm.items, item],
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  removeItem: (id) => {
    set((state) => ({
      currentFarm: {
        ...state.currentFarm,
        items: state.currentFarm.items.filter((item) => item.id !== id),
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  updateItem: (id, updates) => {
    set((state) => ({
      currentFarm: {
        ...state.currentFarm,
        items: state.currentFarm.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  clearFarm: () => {
    set((state) => ({
      currentFarm: {
        ...state.currentFarm,
        items: [],
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  setViewport: (viewport) => {
    set((state) => ({
      viewport: { ...state.viewport, ...viewport },
    }));
  },

  saveFarm: () => {
    const { currentFarm, savedFarms } = get();
    const existingIndex = savedFarms.findIndex((f) => f.id === currentFarm.id);
    
    let newSavedFarms;
    if (existingIndex >= 0) {
      newSavedFarms = [...savedFarms];
      newSavedFarms[existingIndex] = currentFarm;
    } else {
      newSavedFarms = [...savedFarms, currentFarm];
    }
    
    set({ savedFarms: newSavedFarms });
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('stardew-farms', JSON.stringify(newSavedFarms));
    }
  },

  loadFarm: (farmId) => {
    const { savedFarms } = get();
    const farm = savedFarms.find((f) => f.id === farmId);
    if (farm) {
      set({ currentFarm: farm });
    }
  },

  deleteFarm: (farmId) => {
    set((state) => {
      const newSavedFarms = state.savedFarms.filter((f) => f.id !== farmId);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('stardew-farms', JSON.stringify(newSavedFarms));
      }
      
      return { savedFarms: newSavedFarms };
    });
  },

  updateFarmName: (name) => {
    set((state) => ({
      currentFarm: {
        ...state.currentFarm,
        name,
        updatedAt: new Date().toISOString(),
      },
    }));
  },

  duplicateFarm: (farmId) => {
    const { savedFarms } = get();
    const farmToDuplicate = savedFarms.find((f) => f.id === farmId);
    if (farmToDuplicate) {
      const newFarm: FarmLayout = {
        ...farmToDuplicate,
        id: Date.now().toString(),
        name: `${farmToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set({ currentFarm: newFarm });
    }
  },

  createNewFarm: (farmType = 'standard') => {
    set({ currentFarm: createNewFarm(farmType) });
  },

  importFarm: (farmData) => {
    const newFarm: FarmLayout = {
      ...farmData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set({ currentFarm: newFarm });
  },
}));

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('stardew-farms');
  if (saved) {
    try {
      const farms = JSON.parse(saved);
      useFarmStore.setState({ savedFarms: farms });
    } catch (e) {
      console.error('Failed to load saved farms:', e);
    }
  }
}
