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