export type InstrumentType = 'synth' | 'bass' | 'drums' | 'melody';

export interface Note {
  frequency: number;
  duration: number;
  type: InstrumentType;
}

class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  initialize() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.3;
    }
  }

  private getFrequency(type: InstrumentType, index: number): number {
    // Different scales for different instruments
    const scales: Record<InstrumentType, number[]> = {
      synth: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25], // C major scale
      bass: [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63], // C major bass
      drums: [80, 100, 120, 140, 160, 180, 200, 220], // Percussive frequencies
      melody: [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50], // C major high
    };
    
    return scales[type][index % scales[type].length];
  }

  playNote(type: InstrumentType, index: number, duration: number = 0.3) {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const frequency = this.getFrequency(type, index);

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Different waveforms for different instruments
    const waveforms: Record<InstrumentType, OscillatorType> = {
      synth: 'sine',
      bass: 'sawtooth',
      drums: 'square',
      melody: 'triangle',
    };

    oscillator.type = waveforms[type];
    oscillator.frequency.setValueAtTime(frequency, now);

    // ADSR envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01); // Attack
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Decay
    gainNode.gain.setValueAtTime(0.3, now + duration - 0.05); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  playSequence(sequence: Array<{ type: InstrumentType; index: number }>, bpm: number = 120) {
    if (!this.audioContext) return;

    const beatDuration = 60 / bpm;
    sequence.forEach((note, i) => {
      setTimeout(() => {
        this.playNote(note.type, note.index, beatDuration * 0.8);
      }, i * beatDuration * 1000);
    });
  }

  stop() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.masterGain = null;
    }
  }
}

export const audioEngine = new AudioEngine();
