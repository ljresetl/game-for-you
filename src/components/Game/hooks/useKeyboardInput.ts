import { useEffect } from 'react';
import type { FallingLetter } from '../types';

interface Options {
  setLetters: React.Dispatch<React.SetStateAction<FallingLetter[]>>;
  scoreRef: React.MutableRefObject<number>;
  goldenRef: React.MutableRefObject<number>;
}

export const useKeyboardInput = ({ setLetters, scoreRef, goldenRef }: Options) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setLetters(prev => {
        let hit = false;
        const newLetters = prev.filter(letter => {
          if (!hit && e.key.toUpperCase() === letter.char) {
            hit = true;
            scoreRef.current += 1;
            if (letter.golden) goldenRef.current += 1;
            return false;
          }
          return true;
        });
        return newLetters;
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setLetters, scoreRef, goldenRef]);
};
