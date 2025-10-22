import { cn } from "@/lib/utils";
import { InstrumentType } from "@/lib/audioEngine";

interface MusicTileProps {
  type: InstrumentType;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

const tileColors: Record<InstrumentType, string> = {
  synth: 'bg-synth hover:bg-synth/80',
  bass: 'bg-bass hover:bg-bass/80',
  drums: 'bg-drums hover:bg-drums/80',
  melody: 'bg-melody hover:bg-melody/80',
};

const tileLabels: Record<InstrumentType, string> = {
  synth: '🎹',
  bass: '🎸',
  drums: '🥁',
  melody: '🎵',
};

export function MusicTile({ type, index, isActive, isPlaying, onClick }: MusicTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full h-24 rounded-xl transition-all duration-300 ease-out",
        "flex items-center justify-center text-4xl",
        "border-2 border-border/50",
        tileColors[type],
        isActive && "shadow-glow scale-105 border-primary animate-pulse-glow",
        isPlaying && !isActive && "opacity-50",
        !isActive && "opacity-70 hover:opacity-100",
        "transform hover:scale-105 active:scale-95",
        "backdrop-blur-sm"
      )}
    ></button>