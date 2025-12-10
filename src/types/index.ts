export type FarmType = 'standard' | 'riverland' | 'forest' | 'hilltop' | 'wilderness' | 'four-corners' | 'beach';

export type ItemCategory = 'buildings' | 'crops' | 'paths' | 'decorations' | 'misc';

export interface GridSize {
  width: number;
  height: number;
}

export interface ItemData {
  id: string;
  name: string;
  category: ItemCategory;
  size: GridSize;
  color: string;
  description?: string;
}

export interface PlacedItem {
  id: string;
  itemId: string;
  x: number;
  y: number;
  rotation?: number;
}

export interface FarmLayout {
  id: string;
  name: string;
  farmType: FarmType;
  gridSize: GridSize;
  items: PlacedItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ViewportState {
  x: number;
  y: number;
  scale: number;
}
