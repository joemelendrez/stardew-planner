'use client';

import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import { useFarmStore } from '@/store/farmStore';
import { TILE_SIZE, getItemById } from '@/data/items';
import { generateId, isWithinBounds } from '@/lib/utils';
import type { KonvaEventObject } from 'konva/lib/Node';

export default function FarmCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  const { currentFarm, selectedItem, addItem, removeItem, viewport, setViewport } = useFarmStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Handle responsive canvas sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleCanvasClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!selectedItem || isDragging) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Convert screen coordinates to grid coordinates
    const x = Math.floor((pointerPos.x - viewport.x) / (TILE_SIZE * viewport.scale));
    const y = Math.floor((pointerPos.y - viewport.y) / (TILE_SIZE * viewport.scale));

    // Check if placement is valid
    if (isWithinBounds(x, y, selectedItem.size.width, selectedItem.size.height, 
        currentFarm.gridSize.width, currentFarm.gridSize.height)) {
      
      const newItem = {
        id: generateId(),
        itemId: selectedItem.id,
        x,
        y,
      };
      
      addItem(newItem);
    }
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    if (!stage) return;

    const oldScale = viewport.scale;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - viewport.x) / oldScale,
      y: (pointer.y - viewport.y) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const clampedScale = Math.max(0.2, Math.min(3, newScale));

    setViewport({
      scale: clampedScale,
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    });
  };

  const handleDragStart = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    
    const pos = stage.getPointerPosition();
    if (pos) {
      setIsDragging(true);
      setLastPos(pos);
    }
  };

  const handleDragMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDragging) return;
    
    const stage = e.target.getStage();
    if (!stage) return;
    
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const dx = pos.x - lastPos.x;
    const dy = pos.y - lastPos.y;

    setViewport({
      x: viewport.x + dx,
      y: viewport.y + dy,
    });

    setLastPos(pos);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const gridWidth = currentFarm.gridSize.width * TILE_SIZE;
  const gridHeight = currentFarm.gridSize.height * TILE_SIZE;

  return (
    <div ref={containerRef} className="w-full h-full bg-green-100">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onClick={handleCanvasClick}
        onTap={handleCanvasClick}
        onWheel={handleWheel}
      >
        <Layer
          x={viewport.x}
          y={viewport.y}
          scaleX={viewport.scale}
          scaleY={viewport.scale}
        >
          {/* Grid background */}
          <Rect
            x={0}
            y={0}
            width={gridWidth}
            height={gridHeight}
            fill="#7cb342"
          />
          
          {/* Grid lines */}
          {Array.from({ length: currentFarm.gridSize.width + 1 }).map((_, i) => (
            <Line
              key={`v-${i}`}
              points={[i * TILE_SIZE, 0, i * TILE_SIZE, gridHeight]}
              stroke="#558b2f"
              strokeWidth={0.5}
              opacity={0.3}
            />
          ))}
          {Array.from({ length: currentFarm.gridSize.height + 1 }).map((_, i) => (
            <Line
              key={`h-${i}`}
              points={[0, i * TILE_SIZE, gridWidth, i * TILE_SIZE]}
              stroke="#558b2f"
              strokeWidth={0.5}
              opacity={0.3}
            />
          ))}

          {/* Placed items */}
          {currentFarm.items.map((placedItem) => {
            const itemData = getItemById(placedItem.itemId);
            if (!itemData) return null;

            return (
              <Rect
                key={placedItem.id}
                x={placedItem.x * TILE_SIZE}
                y={placedItem.y * TILE_SIZE}
                width={itemData.size.width * TILE_SIZE}
                height={itemData.size.height * TILE_SIZE}
                fill={itemData.color}
                stroke="#000"
                strokeWidth={1}
                onClick={(e) => {
                  e.cancelBubble = true;
                  removeItem(placedItem.id);
                }}
                onTap={(e) => {
                  e.cancelBubble = true;
                  removeItem(placedItem.id);
                }}
              />
            );
          })}
          
          {/* Item labels */}
          {currentFarm.items.map((placedItem) => {
            const itemData = getItemById(placedItem.itemId);
            if (!itemData) return null;

            return (
              <Text
                key={`label-${placedItem.id}`}
                x={placedItem.x * TILE_SIZE}
                y={placedItem.y * TILE_SIZE + (itemData.size.height * TILE_SIZE) / 2 - 8}
                width={itemData.size.width * TILE_SIZE}
                text={itemData.name}
                fontSize={12}
                fill="#fff"
                align="center"
                listening={false}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
