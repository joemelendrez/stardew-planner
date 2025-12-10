'use client';

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import Konva from 'konva';
import { useFarmStore } from '@/store/farmStore';
import { TILE_SIZE, getItemById } from '@/data/items';
import { generateId, isWithinBounds } from '@/lib/utils';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { ExportOptions, FarmCanvasRef } from './FarmCanvas.types';

export type { FarmCanvasRef } from './FarmCanvas.types';

const FarmCanvas = forwardRef<FarmCanvasRef, {}>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const { currentFarm, selectedItem, addItem, removeItem, viewport, setViewport } = useFarmStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Expose export method to parent
  useImperativeHandle(ref, () => ({
    exportAsImage: (options: ExportOptions) => {
      if (!stageRef.current) return;

      const stage = stageRef.current;
      const originalScale = viewport.scale;
      const originalX = viewport.x;
      const originalY = viewport.y;

      // Temporarily reset viewport for clean export
      setViewport({ scale: 1, x: 0, y: 0 });

      // Wait for render to complete
      setTimeout(() => {
        const layer = stage.findOne('Layer');
        if (!layer) return;

        // Add metadata layer if requested
        if (options.includeMetadata || options.includeWatermark) {
          const metadataLayer = new Konva.Layer();
          const gridWidth = currentFarm.gridSize.width * TILE_SIZE;
          const gridHeight = currentFarm.gridSize.height * TILE_SIZE;

          // Add metadata text
          if (options.includeMetadata) {
            const date = new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            const titleText = new Konva.Text({
              x: 10,
              y: gridHeight + 20,
              text: `${currentFarm.name} - ${date}`,
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#333',
            });
            metadataLayer.add(titleText);
          }

          // Add watermark
          if (options.includeWatermark) {
            const gridWidth = currentFarm.gridSize.width * TILE_SIZE;
            const gridHeight = currentFarm.gridSize.height * TILE_SIZE;

            const watermark = new Konva.Text({
              x: gridWidth - 200,
              y: gridHeight + 20,
              text: 'Stardew Planner',
              fontSize: 18,
              fontFamily: 'Arial',
              fill: '#999',
              align: 'right',
            });
            metadataLayer.add(watermark);
          }

          stage.add(metadataLayer);
        }

        // Export with specified scale
        const dataURL = stage.toDataURL({
          pixelRatio: options.scale,
          mimeType: 'image/png',
        });

        // Remove metadata layer if added
        const metadataLayer = stage.findOne('.metadata-layer');
        if (metadataLayer) {
          metadataLayer.destroy();
        }

        // Download the image
        const link = document.createElement('a');
        link.download = `${currentFarm.name.replace(/\s+/g, '-')}-${Date.now()}.png`;
        link.href = dataURL;
        link.click();

        // Restore viewport
        setViewport({ scale: originalScale, x: originalX, y: originalY });
      }, 100);
    },
  }));

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
    if (!selectedItem) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    // Check if this was a drag or a click (distance threshold)
    const dragDistance = Math.sqrt(
      Math.pow(pointerPos.x - dragStartPos.x, 2) +
      Math.pow(pointerPos.y - dragStartPos.y, 2)
    );

    // If dragged more than 5 pixels, don't place item
    if (dragDistance > 5) return;

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
    const clampedScale = Math.max(0.01, Math.min(5, newScale)); // Allow zoom from 1% to 500%

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
      setDragStartPos(pos); // Record where the drag started
      setIsDragging(false); // Don't set to true yet
      setLastPos(pos);
    }
  };

  const handleDragMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    // Check if we've moved enough to consider this a drag
    if (!isDragging) {
      const distance = Math.sqrt(
        Math.pow(pos.x - dragStartPos.x, 2) +
        Math.pow(pos.y - dragStartPos.y, 2)
      );
      if (distance > 5) {
        setIsDragging(true);
      } else {
        return; // Not dragging yet
      }
    }

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
        ref={stageRef}
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
});

FarmCanvas.displayName = 'FarmCanvas';

export default FarmCanvas;
