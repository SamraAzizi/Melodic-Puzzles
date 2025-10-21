import { useState, useEffect } from "react";
import { MusicTile } from "./MusicTile";
import { audioEngine, InstrumentType } from "@/lib/audioEngine";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

const instruments: InstrumentType[] = ['synth', 'bass', 'drums', 'melody'];
const GRID_SIZE = 8;

interface TileState {
  type: InstrumentType;
  index: number;
  active: boolean;
}

export function GameBoard() {
  const [tiles, setTiles] = useState<TileState[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [bpm] = useState(120);
  useEffect(() => {
    // Initialize audio engine
    audioEngine.initialize();

    // Initialize tiles
    const initialTiles: TileState[] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      initialTiles.push({
        type: instruments[Math.floor(i / 2) % instruments.length],
        index: i % 8,
        active: false,
      });
    }
    setTiles(initialTiles);

    return () => {
      audioEngine.stop();
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const beatDuration = (60 / bpm) * 1000;
    const interval = setInterval(() => {
      setCurrentBeat((prev) => {
        const nextBeat = (prev + 1) % GRID_SIZE;
        
        // Play active tiles at current beat
        tiles.forEach((tile, index) => {
          if (tile.active && index === nextBeat) {
            audioEngine.playNote(tile.type, tile.index, 0.3);
          }
        });

        return nextBeat;
      });
    }, beatDuration);

    return () => clearInterval(interval);
  }, [isPlaying, tiles, bpm]);
  const toggleTile = (index: number) => {
    setTiles((prev) =>
      prev.map((tile, i) =>
        i === index ? { ...tile, active: !tile.active } : tile
      )
    );
    
    // Play the note immediately when clicked
    const tile = tiles[index];
    audioEngine.playNote(tile.type, tile.index, 0.3);
  };

  const handleClear = () => {
    setTiles((prev) => prev.map((tile) => ({ ...tile, active: false })));
    setIsPlaying(false);
    setCurrentBeat(0);
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Melodic Puzzles
        </h1>
        <p className="text-muted-foreground text-lg">
          Click tiles to create music patterns • Play to hear your composition
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
        >
          {isPlaying ? (
            <></>


            <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Play
            </>
          )}
        </Button>
        
        <Button
          onClick={handleClear}
          size="lg"
          variant="outline"
          className="border-primary/50 hover:bg-primary/10"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Clear
        </Button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
          <Volume2 className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">{bpm} BPM</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm shadow-tile">
        {tiles.map((tile, index) => (
          <MusicTile
            key={index}
            type={tile.type}
            index={tile.index}
            isActive={tile.active}
            isPlaying={isPlaying && currentBeat === index}
            onClick={() => toggleTile(index)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        {instruments.map((type) => (