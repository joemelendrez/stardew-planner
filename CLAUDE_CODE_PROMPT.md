# Stardew Valley Farm Planner - Development Prompt for Claude Code

## Project Overview
This is a mobile-first web application for planning Stardew Valley farm layouts. Users can place buildings, crops, paths, and decorations on a grid before building them in-game.

## Current State
The basic framework is set up with:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Zustand for state management
- React-Konva for canvas rendering
- Mobile-optimized touch controls

## Your Tasks

### 1. Initial Setup
```bash
cd stardew-planner
npm install
npm run dev
```

### 2. Priority Enhancements

#### A. Improve Mobile UX
- Add haptic feedback for item placement (if supported)
- Implement better touch gesture handling (pinch-to-zoom refinement)
- Add a floating action button for quick access to common actions
- Improve the item palette with better mobile scrolling
- Add swipe gestures to dismiss mobile palette

#### B. Add More Items
Expand the items database in `src/data/items.ts`:
- Add more buildings (Fish Pond, Slime Hutch, Mill, Stable)
- Add fruit trees
- Add more decoration options
- Add water features (ponds, lakes)
- Add seasonal crop categories

#### C. Save/Load Features
- Create a "My Farms" modal to view all saved farms
- Add ability to duplicate existing farm designs
- Add import functionality for JSON files
- Add better visual previews of saved farms

#### D. Image Export
Implement proper image export in `Toolbar.tsx`:
- Use Konva's `toDataURL()` to export canvas as PNG
- Add option to export at different resolutions
- Include farm name and date in exported image
- Add watermark option

#### E. Farm Type Selection
- Add farm type selector (Standard, Riverland, Forest, etc.)
- Each farm type should have different grid sizes/layouts
- Consider adding pre-placed immovable obstacles for each farm type

#### F. Undo/Redo System
- Implement action history in Zustand store
- Add undo/redo buttons to Toolbar
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y)

#### G. Grid Enhancements
- Add toggleable grid lines
- Add coordinate indicators
- Add ruler/measurement tools
- Add alignment guides when placing items

#### H. Polish & Testing
- Test on various mobile devices and browsers
- Improve loading states
- Add error boundaries
- Optimize performance for large farms
- Add keyboard shortcuts info modal

### 3. Nice-to-Have Features (Lower Priority)

#### Search & Filter
- Add search bar in ItemPalette
- Filter items by name, category, or size

#### Templates & Blueprints
- Pre-made farm layout templates
- Community-shared designs (requires backend)

#### Advanced Planning
- Season visualization (show what crops grow when)
- Profit calculator for crop layouts
- Optimal sprinkler placement calculator

#### Accessibility
- Keyboard-only navigation
- Screen reader support
- High contrast mode
- Larger touch targets option

## Development Guidelines

### Code Style
- Use TypeScript strictly (no `any` types)
- Follow existing component structure
- Keep components small and focused
- Use Tailwind for all styling
- Mobile-first responsive design

### Testing Strategy
- Test on Chrome, Safari, Firefox mobile
- Test on iOS and Android devices
- Verify touch gestures work smoothly
- Ensure localStorage persists correctly

### Performance Considerations
- Lazy load components where possible
- Optimize Konva rendering for many items
- Consider virtualization for large item lists
- Minimize re-renders in canvas

## File Structure Reference
```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components
│   ├── FarmCanvas.tsx
│   ├── ItemPalette.tsx
│   └── Toolbar.tsx
├── data/            # Game data
│   └── items.ts
├── lib/             # Utilities
│   └── utils.ts
├── store/           # Zustand state
│   └── farmStore.ts
└── types/           # TypeScript types
    └── index.ts
```

## Getting Assets (Future)
For now, we use colored rectangles as placeholders. To add real sprites:
1. Extract from game files using xnbcli (personal use only)
2. Contact ConcernedApe for permission to use official assets
3. Create original artwork inspired by game aesthetic
4. Use community asset packs with proper attribution

## Questions to Consider
- Should we add user authentication for cloud saves?
- Do we want seasonal themes/colors for the UI?
- Should we support multiple languages?
- Do we need a tutorial/onboarding flow?

## Success Metrics
- App loads in < 2 seconds on mobile
- Touch interactions feel smooth (60fps)
- Users can save and export their farms
- Works offline as PWA
- Intuitive enough to use without tutorial

## Next Steps
Start with improving mobile UX and adding the save/load UI, as these are most critical for user experience. Then work on adding more items and implementing image export.

Focus on making it feel polished and professional - smooth animations, clear feedback, and intuitive interactions.

Good luck! 🌾
