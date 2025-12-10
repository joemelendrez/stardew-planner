import { PlacedItem } from '@/types';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function checkCollision(
  newItem: { x: number; y: number; width: number; height: number },
  existingItems: PlacedItem[],
  itemsData: Map<string, { width: number; height: number }>
): boolean {
  for (const existing of existingItems) {
    const existingSize = itemsData.get(existing.itemId);
    if (!existingSize) continue;

    const collision = !(
      newItem.x + newItem.width <= existing.x ||
      newItem.x >= existing.x + existingSize.width ||
      newItem.y + newItem.height <= existing.y ||
      newItem.y >= existing.y + existingSize.height
    );

    if (collision) return true;
  }
  return false;
}

export function isWithinBounds(
  x: number,
  y: number,
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): boolean {
  return x >= 0 && y >= 0 && x + width <= maxWidth && y + height <= maxHeight;
}

export function snapToGrid(value: number, gridSize: number = 1): number {
  return Math.floor(value / gridSize) * gridSize;
}
