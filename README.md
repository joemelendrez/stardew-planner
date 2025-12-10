# Stardew Valley Farm Planner

A mobile-first farm planning tool for Stardew Valley. Design your perfect farm layout before building it in-game!

## Features

- 🎨 Interactive grid-based farm editor
- 📱 Fully mobile-optimized with touch controls
- 💾 Save/load farm designs locally
- 🏗️ Place buildings, crops, paths, and decorations
- 🖼️ Export farm designs as images
- 🎯 Multiple farm types support

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React-Konva (canvas rendering)
- LocalStorage for persistence

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see your farm planner.

## Project Structure

```
stardew-planner/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript types
│   └── data/            # Game data (items, buildings, etc.)
├── public/              # Static assets
└── README.md
```

## Future Enhancements

- User authentication
- Cloud save/share functionality
- Season-based crop planning
- Cost calculator
- Community designs gallery

## Legal

Stardew Valley is © ConcernedApe. This is an unofficial fan tool.
