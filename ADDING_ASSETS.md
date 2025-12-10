# Adding Stardew Valley Assets

This guide explains how to add actual Stardew Valley sprites/assets to the planner, similar to stardewvalley.info.

## ⚠️ Important Legal Note

Stardew Valley assets are copyrighted by ConcernedApe. Before using official game assets:
- For **personal use only**: Generally acceptable
- For **public websites**: You need explicit permission from ConcernedApe
- Consider creating original artwork inspired by the game aesthetic as an alternative

## Option 1: Extract from Game Files (Personal Use)

### Requirements
- Own a copy of Stardew Valley
- Node.js installed
- `xnbcli` tool for extracting XNB files

### Steps

1. **Install xnbcli**
```bash
npm install -g xnbcli
```

2. **Locate Game Files**
- **Windows**: `C:\Program Files (x86)\Steam\steamapps\common\Stardew Valley\Content`
- **Mac**: `~/Library/Application Support/Steam/steamapps/common/Stardew Valley/Contents/Resources/Content`
- **Linux**: `~/.steam/steam/steamapps/common/Stardew Valley/Content`

3. **Extract Sprites**
```bash
# Extract Buildings spritesheet
xnbcli unpack "Content/Buildings/Barn.xnb" output/

# Extract Objects
xnbcli unpack "Content/Objects" output/Objects/

# Extract Maps
xnbcli unpack "Content/Maps" output/Maps/
```

4. **Process Images**
- Extracted files will be PNG images
- Use an image editor to crop individual sprites
- Buildings are typically in `Content/Buildings/`
- Items are in `Content/LooseSprites/Craftables.png`

## Option 2: Use Community Asset Packs

Several community members have created Stardew-inspired assets:

1. **Check OpenGameArt.org** for Stardew-style assets
2. **Stardew Valley Wiki** has some extracted sprites for reference
3. **Create your own** using pixel art tools like Aseprite or Piskel

## Option 3: Fan-made Recreation (Recommended for Public Sites)

Create your own assets inspired by Stardew Valley:

1. **Study the style**:
   - 16x16 pixel tiles for most objects
   - Limited color palette
   - Soft outlines
   - Top-down perspective

2. **Tools**:
   - **Aseprite** (paid): Professional pixel art editor
   - **Piskel** (free): Browser-based pixel art tool
   - **GraphicsGale** (free): Windows pixel art editor

## Implementation in the App

Once you have your assets, here's how to add them:

### 1. Create Assets Folder
```bash
mkdir -p public/assets/buildings
mkdir -p public/assets/crops
mkdir -p public/assets/decorations
```

### 2. Update Item Data Structure

Edit `src/data/items.ts`:

```typescript
export interface ItemData {
  id: string;
  name: string;
  category: ItemCategory;
  size: GridSize;
  color: string; // Keep as fallback
  sprite?: string; // Add this line - path to sprite image
  description?: string;
}

// Example updated item:
{
  id: 'barn',
  name: 'Barn',
  category: 'buildings',
  size: { width: 7, height: 4 },
  color: '#A0522D', // Fallback color
  sprite: '/assets/buildings/barn.png', // Add sprite path
  description: 'Houses cows and goats',
}
```

### 3. Update FarmCanvas to Render Sprites

Edit `src/components/FarmCanvas.tsx`:

```typescript
// Instead of rendering Rect, use Image
import { Stage, Layer, Rect, Line, Text, Image } from 'react-konva';
import useImage from 'use-image';

// Create a component for rendering items
function FarmItem({ item, itemData }: { item: PlacedItem; itemData: ItemData }) {
  const [image] = useImage(itemData.sprite || '');

  if (image && itemData.sprite) {
    return (
      <Image
        x={item.x * TILE_SIZE}
        y={item.y * TILE_SIZE}
        width={itemData.size.width * TILE_SIZE}
        height={itemData.size.height * TILE_SIZE}
        image={image}
      />
    );
  }

  // Fallback to colored rectangle
  return (
    <Rect
      x={item.x * TILE_SIZE}
      y={item.y * TILE_SIZE}
      width={itemData.size.width * TILE_SIZE}
      height={itemData.size.height * TILE_SIZE}
      fill={itemData.color}
      stroke="#000"
      strokeWidth={1}
    />
  );
}
```

### 4. Install use-image package

```bash
npm install use-image
```

## Example: StardewValley.info Approach

The stardewvalley.info website uses:
1. Extracted sprites from the game files
2. Custom sprite atlas for performance
3. Canvas rendering with sprite sheets
4. Tile-based grid system (same as our TILE_SIZE concept)

To replicate their approach:
1. Extract sprites and create a sprite atlas (combine multiple sprites into one image)
2. Use canvas coordinates to draw specific sprites from the atlas
3. Implement sprite caching for performance

## Next Steps

1. **Test with one building first** - Add just the barn sprite to test the system
2. **Create a sprite loader utility** - Preload all images on app startup
3. **Add loading states** - Show placeholders while images load
4. **Optimize with sprite sheets** - Combine sprites for better performance
5. **Add sprite variants** - Different seasons, upgrades, etc.

## Resources

- **Stardew Valley Wiki**: https://stardewvalleywiki.com/
- **xnbcli GitHub**: https://github.com/LeonBlade/xnbcli
- **Stardew Asset Viewer**: https://www.nexusmods.com/stardewvalley/mods/7645
- **Pixel Art Tutorial**: https://lospec.com/pixel-art-tutorials

## Legal Template for Public Sites

If you want to use official assets publicly, contact ConcernedApe:
```
Subject: Permission Request for Stardew Valley Fan Site

Dear ConcernedApe,

I am developing a non-commercial fan tool for Stardew Valley
that helps players plan their farm layouts. I would like to
request permission to use official game sprites in this tool.

[Explain your project details]

This is purely for fan use and will include proper attribution
to you as the copyright holder.

Thank you for your consideration.
```

Send to: contact@stardewvalley.net (check official site for current contact)
