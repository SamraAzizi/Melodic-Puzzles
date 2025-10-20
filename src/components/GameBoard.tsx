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