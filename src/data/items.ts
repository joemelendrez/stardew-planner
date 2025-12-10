import { ItemData, FarmType } from '@/types';

export const TILE_SIZE = 32; // pixels per tile

export const FARM_SIZES: Record<FarmType, { width: number; height: number }> = {
  standard: { width: 80, height: 65 },
  riverland: { width: 80, height: 65 },
  forest: { width: 80, height: 65 },
  hilltop: { width: 80, height: 65 },
  wilderness: { width: 80, height: 65 },
  'four-corners': { width: 80, height: 65 },
  beach: { width: 80, height: 65 },
};

export const ITEMS: ItemData[] = [
  // Buildings
  {
    id: 'coop',
    name: 'Coop',
    category: 'buildings',
    size: { width: 6, height: 3 },
    color: '#8B4513',
    description: 'Houses chickens and ducks',
  },
  {
    id: 'barn',
    name: 'Barn',
    category: 'buildings',
    size: { width: 7, height: 4 },
    color: '#A0522D',
    description: 'Houses cows, goats, and pigs',
  },
  {
    id: 'shed',
    name: 'Shed',
    category: 'buildings',
    size: { width: 7, height: 3 },
    color: '#CD853F',
    description: 'Storage and crafting space',
  },
  {
    id: 'silo',
    name: 'Silo',
    category: 'buildings',
    size: { width: 3, height: 3 },
    color: '#696969',
    description: 'Stores hay for animals',
  },
  {
    id: 'well',
    name: 'Well',
    category: 'buildings',
    size: { width: 3, height: 3 },
    color: '#4682B4',
    description: 'Decorative well',
  },
  
  // Crops/Farming
  {
    id: 'scarecrow',
    name: 'Scarecrow',
    category: 'crops',
    size: { width: 1, height: 1 },
    color: '#DEB887',
    description: 'Protects crops from crows',
  },
  {
    id: 'sprinkler',
    name: 'Sprinkler',
    category: 'crops',
    size: { width: 1, height: 1 },
    color: '#4169E1',
    description: 'Waters adjacent tiles',
  },
  {
    id: 'quality-sprinkler',
    name: 'Quality Sprinkler',
    category: 'crops',
    size: { width: 1, height: 1 },
    color: '#1E90FF',
    description: 'Waters 8 surrounding tiles',
  },
  {
    id: 'iridium-sprinkler',
    name: 'Iridium Sprinkler',
    category: 'crops',
    size: { width: 1, height: 1 },
    color: '#9370DB',
    description: 'Waters 24 surrounding tiles',
  },
  {
    id: 'crop-plot',
    name: 'Crop Plot',
    category: 'crops',
    size: { width: 1, height: 1 },
    color: '#8B4726',
    description: 'Tilled soil for planting',
  },
  
  // Paths
  {
    id: 'wood-path',
    name: 'Wood Path',
    category: 'paths',
    size: { width: 1, height: 1 },
    color: '#D2691E',
    description: 'Wooden flooring',
  },
  {
    id: 'stone-path',
    name: 'Stone Path',
    category: 'paths',
    size: { width: 1, height: 1 },
    color: '#808080',
    description: 'Stone flooring',
  },
  {
    id: 'gravel-path',
    name: 'Gravel Path',
    category: 'paths',
    size: { width: 1, height: 1 },
    color: '#A9A9A9',
    description: 'Gravel flooring',
  },
  {
    id: 'cobblestone-path',
    name: 'Cobblestone Path',
    category: 'paths',
    size: { width: 1, height: 1 },
    color: '#696969',
    description: 'Cobblestone flooring',
  },
  
  // Decorations
  {
    id: 'fence-wood',
    name: 'Wood Fence',
    category: 'decorations',
    size: { width: 1, height: 1 },
    color: '#8B7355',
    description: 'Wooden fence post',
  },
  {
    id: 'fence-stone',
    name: 'Stone Fence',
    category: 'decorations',
    size: { width: 1, height: 1 },
    color: '#708090',
    description: 'Stone fence post',
  },
  {
    id: 'lamp-post',
    name: 'Lamp Post',
    category: 'decorations',
    size: { width: 1, height: 1 },
    color: '#FFD700',
    description: 'Provides light at night',
  },
  {
    id: 'chest',
    name: 'Chest',
    category: 'misc',
    size: { width: 1, height: 1 },
    color: '#8B4513',
    description: 'Storage container',
  },
];

export const getItemById = (id: string): ItemData | undefined => {
  return ITEMS.find(item => item.id === id);
};

export const getItemsByCategory = (category: ItemCategory): ItemData[] => {
  return ITEMS.filter(item => item.category === category);
};
