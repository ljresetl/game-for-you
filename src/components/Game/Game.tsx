import React, { useState, useRef } from 'react';
import styles from './Game.module.css';
import type { Difficulty, DifficultySettings } from './types';
import { useFallingLetters } from './hooks/useFallingLetters';
import { useGameTimer } from './hooks/useGameTimer';
import Scoreboard from './../Scoreboard/Scoreboard';
import GameControls from './GameControls';
import PlayArea from './PlayArea';

const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { duration: 30, spawnMs: 700, fallSpeed: 1.8, goldenChance: 0.14, points: { normal: 10, golden: 20 } },
  medium: { duration: 20, spawnMs: 520, fallSpeed: 2.6, goldenChance: 0.12, points: { normal: 10, golden: 20 } },
  hard: { duration: 15, spawnMs: 380, fallSpeed: 3.4, goldenChance: 0.09, points: { normal: 10, golden: 20 } },
};

const Game: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const settings = difficultySettings[difficulty];

  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const [letters, setLetters] = useFallingLetters(gameStarted, settings.spawnMs, settings.fallSpeed);
  const scoreRef = useRef(0);
  const goldenRef = useRef(0);

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

  if (showScore) {
    return (
      <div className={styles.container}>
        <Scoreboard
          score={finalScore}
          goldenCount={goldenRef.current}
          goldenPrice={settings.points.golden}
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
      <GameControls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        setGameStarted={setGameStarted}
        scoreRef={scoreRef}
        goldenRef={goldenRef}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        setLetters={setLetters}
        settings={settings}
      />
      <PlayArea
        letters={letters}
        handleCollect={(id) => {
          setLetters(prev => {
            const idx = prev.findIndex(l => l.id === id);
            if (idx === -1) return prev;
            const L = prev[idx];
            scoreRef.current += L.golden ? settings.points.golden : settings.points.normal;
            if (L.golden) goldenRef.current += 1;
            return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
          });
        }}
      />
    </div>
  );
};

export default Game;
