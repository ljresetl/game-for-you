import { useEffect, useRef, useState } from 'react';
import type { FallingLetter } from '../types';

/**
 * Hook that manages the array of falling letters.
 * - starts/stops generation and animation when gameStarted changes.
 * - returns tuple [letters, setLetters] to allow Game to manipulate on hits.
 */
export const useFallingLetters = (gameStarted: boolean, spawnMs: number, baseFallSpeed: number) => {
  const [letters, setLetters] = useState<FallingLetter[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    if (!gameStarted) {
      // stop animation
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
      return;
    }

    runningRef.current = true;
    // spawn interval
    const id = window.setInterval(() => {
      setLetters(prev => {
        const idNew = prev.length ? (prev[prev.length - 1].id + 1) : 1;
        const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const golden = Math.random() < 0.12; // default chance (can be adjusted by Game)
        const padding = 8;
        const x = Math.random() * (100 - padding * 2) + padding;
        const vy = baseFallSpeed + Math.random() * 1.2;
        const letter: FallingLetter = { id: idNew, char, xPercent: x, y: -20, vy, golden };
        return [...prev, letter];
      });
    }, spawnMs);

    // animation loop via rAF — updates positions smoothly
    const loop = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.06); // seconds, clamp
      lastRef.current = now;
      setLetters(prev =>
        prev
          .map(l => ({ ...l, y: l.y + l.vy * (60 * dt) })) // scale vy approx px/frame
          .filter(l => l.y < 1000) // cull very far ones; Game will limit on canvas height
      );
      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(id);
    };
  }, [gameStarted, spawnMs, baseFallSpeed]);

  return [letters, setLetters] as const;
};
