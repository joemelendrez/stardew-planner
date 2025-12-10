# Stardew Valley Farm Planner - Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

## Quick Start

### 1. Install Dependencies
```bash
cd stardew-planner
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
stardew-planner/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/             # React components
│   │   ├── FarmCanvas.tsx     # Main canvas with Konva
│   │   ├── ItemPalette.tsx    # Item selection sidebar
│   │   └── Toolbar.tsx        # Action buttons
│   ├── data/                   # Static game data
│   │   └── items.ts           # Buildings, crops, etc.
│   ├── lib/                    # Utility functions
│   │   └── utils.ts           # Helper functions
│   ├── store/                  # State management
│   │   └── farmStore.ts       # Zustand store
│   └── types/                  # TypeScript types
│       └── index.ts           # Type definitions
├── public/                     # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── next.config.js             # Next.js config
└── README.md                  # Documentation
```

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **React-Konva**: Canvas rendering library
- **Lucide React**: Icon library

## Features Implemented

✅ Mobile-first responsive design
✅ Touch-optimized grid-based editor
✅ Drag-and-drop item placement
✅ Pan and zoom controls
✅ Local storage persistence
✅ Multiple item categories
✅ Export farm designs as JSON
✅ Clear and save functionality

## Development Commands

```bash
# Start development server
npm run dev

# Type check
npm run type-check

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Using with Claude Code

This project includes a `CLAUDE_CODE_PROMPT.md` file with detailed instructions for continuing development with Claude Code.

To use it:
```bash
claude-code chat
```

Then paste the contents of `CLAUDE_CODE_PROMPT.md` or reference it directly.

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Canvas not rendering
- Check that Konva is properly installed: `npm install konva react-konva`
- Ensure you're using `'use client'` directive in canvas component

### Touch events not working
- Verify viewport meta tag in layout.tsx
- Check for CSS that might be blocking pointer events

### LocalStorage issues
- Ensure browser supports localStorage
- Check for private browsing mode
- Clear browser cache if data seems corrupted

## Mobile Testing

### iOS Safari
- Test on real device for best results
- Check touch gestures (pinch-to-zoom, pan)
- Verify PWA functionality

### Android Chrome
- Test on various screen sizes
- Verify touch feedback
- Check performance on lower-end devices

## Future Enhancements

See `CLAUDE_CODE_PROMPT.md` for detailed roadmap including:
- Image export functionality
- Farm type selection
- Undo/redo system
- More items and categories
- Templates and blueprints
- Offline PWA support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile
5. Submit a pull request

## License

This is an unofficial fan tool. Stardew Valley is © ConcernedApe.

## Support

For issues or questions:
- Open a GitHub issue
- Check existing documentation
- Test in different browsers

## Credits

- Stardew Valley by ConcernedApe
- Built with Next.js, React, and Konva
- Icons by Lucide

---

Happy farm planning! 🌾
