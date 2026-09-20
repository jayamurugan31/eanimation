import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = '/audio/dc_bgm.mpeg';
const STORAGE_KEY = 'greenwood-estates-music';
const DEFAULT_VOLUME = 0.18;

// Persistent module-level Audio singleton instance
let globalAudioInstance = null;

function getAudioInstance() {
  if (typeof window === 'undefined') return null;
  if (!globalAudioInstance) {
    globalAudioInstance = new Audio(AUDIO_SRC);
    globalAudioInstance.loop = true;
    globalAudioInstance.volume = DEFAULT_VOLUME;
    globalAudioInstance.preload = 'auto';
  }
  return globalAudioInstance;
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = getAudioInstance();
    if (!audio) return;

    // Check stored user preference
    const storedPref = localStorage.getItem(STORAGE_KEY);
    const initialShouldPlay = storedPref !== 'disabled';

    // If audio is already playing (e.g. across component mounts), update UI state
    if (!audio.paused) {
      setIsPlaying(true);
      return;
    }

    // Handler for first valid user interaction (click, touch, keydown)
    const handleFirstInteraction = () => {
      const currentPref = localStorage.getItem(STORAGE_KEY);
      if (currentPref !== 'disabled' && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Audio interaction playback info:', err);
          });
      }

      // Cleanup listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    if (initialShouldPlay) {
      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    const audio = getAudioInstance();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEY, 'disabled');
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem(STORAGE_KEY, 'enabled');
        })
        .catch((err) => {
          console.warn('Audio play toggle warning:', err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        aria-label="Toggle background music"
        title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-cream/90 hover:bg-brand-cream border border-brand-stone/80 hover:border-brand-bronze shadow-soft-luxury backdrop-blur-md text-brand-charcoal transition-all duration-300 active:scale-95"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <span className="absolute -inset-1 rounded-full bg-brand-bronze/30 animate-ping" />
              <Volume2 className="w-4 h-4 text-brand-bronze-dark relative z-10" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-brand-charcoal-muted relative z-10" />
          )}
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-charcoal">
          {isPlaying ? 'Music ON' : 'Music OFF'}
        </span>
      </button>
    </div>
  );
}
