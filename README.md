# Music Pattern Game

An interactive web-based music sequencer that lets you create musical patterns and beats by activating tiles on a grid.

## About This Project

This is a musical pattern game where users can:
- Create music patterns by clicking on tiles representing different instruments
- Play back their compositions with adjustable BPM (beats per minute)
- Mix four different instrument types: Synth, Bass, Drums, and Melody
- See visual feedback with glowing animations when tiles are active
- Clear patterns and start fresh at any time

The application uses the Web Audio API to generate sounds in real-time, creating a seamless and responsive musical experience directly in your browser.

## Features

- **Interactive Grid**: Click tiles to activate different instruments
- **Real-time Playback**: Hear your patterns play back instantly
- **Four Instrument Types**: 
  - 🎹 Synth (Purple)
  - 🎸 Bass (Blue)
  - 🥁 Drums (Orange)
  - 🎵 Melody (Pink)
- **Visual Feedback**: Active tiles glow and pulse with animations
- **BPM Control**: Fixed at 120 BPM for consistent rhythm
- **Clear Function**: Reset the board and start over
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

This project is built with modern web technologies:

- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - Component library
- **Web Audio API** - Real-time audio synthesis
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

Install Node.js: [Download from nodejs.org](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd <PROJECT_DIRECTORY>
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

### Build for Production

To create a production build:
```sh
npm run build
```

The optimized files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── GameBoard.tsx      # Main game board component
│   ├── MusicTile.tsx      # Individual tile component
│   └── ui/                # shadcn-ui components
├── lib/
│   ├── audioEngine.ts     # Web Audio API implementation
│   └── utils.ts           # Utility functions
├── pages/
│   ├── Index.tsx          # Home page
│   └── NotFound.tsx       # 404 page
├── App.tsx                # Root component
├── main.tsx               # Application entry point
└── index.css              # Global styles and design tokens
```

## How It Works

The application uses a grid-based sequencer pattern:

1. **Audio Engine**: Generates sounds using Web Audio API with different waveforms for each instrument
2. **Tile System**: Each tile represents a note that can be activated/deactivated
3. **Playback Loop**: When playing, the system cycles through beats and triggers active tiles
4. **Visual Feedback**: Active tiles show glowing animations synchronized with the beat

## Contributing

Feel free to fork this project and make your own modifications. Some ideas:
- Add more instrument types
- Implement save/load functionality
- Add recording and export features
- Create preset patterns
- Add tempo adjustment controls

## License

This project is open source and available for educational purposes.