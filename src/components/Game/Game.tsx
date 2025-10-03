import React, { useRef, useState, useCallback } from 'react';
import styles from './Game.module.css';
import Letter from './../Letter/Letter';
import type { Difficulty } from './types';
import { useFallingLetters } from './hooks/useFallingLetters';
import { useGameTimer } from './hooks/useGameTimer';
import Scoreboard from './../Scoreboard/Scoreboard';

const difficultySettings: Record<
  Difficulty,
  { duration: number; spawnMs: number; fallSpeed: number; goldenChance: number; points: { normal: number; golden: number } }
> = {
  easy: { duration: 30, spawnMs: 700, fallSpeed: 1.8, goldenChance: 0.14, points: { normal: 10, golden: 20 } },
  medium: { duration: 20, spawnMs: 520, fallSpeed: 2.6, goldenChance: 0.12, points: { normal: 10, golden: 20 } },
  hard: { duration: 15, spawnMs: 380, fallSpeed: 3.4, goldenChance: 0.09, points: { normal: 10, golden: 20 } },
};

const Game: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const settings = difficultySettings[difficulty];

  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(settings.duration);
  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const [letters, setLetters] = useFallingLetters(gameStarted, settings.spawnMs, settings.fallSpeed);

  const scoreRef = useRef(0);
  const goldenRef = useRef(0);

  // Таймер
  useGameTimer({
    gameStarted,
    setTimeLeft,
    gameDuration: settings.duration,
    onEnd: () => {
      setFinalScore(scoreRef.current);
      setShowScore(true);
      setGameStarted(false);
    },
  });

  // Функція збору літери
  const handleCollect = useCallback(
    (id: number) => {
      setLetters(prev => {
        const idx = prev.findIndex(p => p.id === id);
        if (idx === -1) return prev;
        const L = prev[idx];
        const pts = L.golden ? settings.points.golden : settings.points.normal;
        scoreRef.current += pts;
        if (L.golden) goldenRef.current += 1;
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
    },
    [setLetters, settings.points]
  );

  // Клавіатурне введення
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      const key = e.key.toUpperCase();
      for (let i = letters.length - 1; i >= 0; i--) {
        if (letters[i].char === key) {
          handleCollect(letters[i].id);
          e.preventDefault();
          return;
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameStarted, letters, handleCollect]);

  if (showScore) {
    const goldenPrice = settings.points.golden;
    return (
      <div className={styles.container}>
        <Scoreboard
          score={finalScore}
          goldenCount={goldenRef.current}
          goldenPrice={goldenPrice}
          onRestart={() => {
            scoreRef.current = 0;
            goldenRef.current = 0;
            setFinalScore(0);
            setShowScore(false);
            setTimeLeft(settings.duration);
            setLetters([]);
            setGameStarted(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.leftControls}>
          <button
            className={styles.btnStart}
            onClick={() => {
              scoreRef.current = 0;
              goldenRef.current = 0;
              setLetters([]);
              setGameStarted(true);
              setTimeLeft(settings.duration);
              setShowScore(false);
            }}
            aria-label="Start game"
          >
            Start
          </button>
          <button
            className={styles.btnStop}
            onClick={() => {
              setGameStarted(false);
              setFinalScore(scoreRef.current);
              setShowScore(true);
            }}
          >
            Stop
          </button>
          <label className={styles.label}>
            Difficulty:
            <select
              className={styles.select}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        <div className={styles.hud}>
          <div className={styles.hudItem}>Time: {timeLeft}s</div>
          <div className={styles.hudItem}>Score: {scoreRef.current}</div>
          <div className={styles.hudItem}>Golden: {goldenRef.current}</div>
        </div>
      </div>

      <div className={styles.playArea}>
        {letters.map(l => (
          <Letter key={l.id} letter={l} onClick={() => handleCollect(l.id)} />
        ))}
      </div>
    </div>
  );
};

export default Game;
