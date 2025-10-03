import { useEffect, useRef } from 'react';

interface Options {
  gameStarted: boolean;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  gameDuration?: number;
  onEnd: () => void;
}

/**
 * Robust timer: sets timeLeft once on start, decrements every second.
 * Uses ref to store onEnd to avoid effect restarts when parent recreates callback.
 */
export const useGameTimer = ({ gameStarted, setTimeLeft, gameDuration = 20, onEnd }: Options) => {
  const onEndRef = useRef(onEnd);
  useEffect(() => { onEndRef.current = onEnd; }, [onEnd]);

  useEffect(() => {
    if (!gameStarted) return;
    setTimeLeft(gameDuration);
    const start = Date.now();
    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const rem = Math.max(gameDuration - elapsed, 0);
      setTimeLeft(rem);
      if (rem <= 0) {
        window.clearInterval(id);
        // call latest onEnd
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { onEndRef.current(); } catch (e) { /* ignore */ }
      }
    }, 250);
    return () => { window.clearInterval(id); };
  }, [gameStarted, setTimeLeft, gameDuration]);
};
