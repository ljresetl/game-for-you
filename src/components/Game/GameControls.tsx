import React from 'react';
import styles from './Game.module.css';
import type { Difficulty, DifficultySettings, FallingLetter } from './types';

interface Props {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  setGameStarted: (b: boolean) => void;
  scoreRef: React.MutableRefObject<number>;
  goldenRef: React.MutableRefObject<number>;
  timeLeft: number;
  setTimeLeft: (t: number) => void;
  setLetters: React.Dispatch<React.SetStateAction<FallingLetter[]>>;
  settings: DifficultySettings;
}

const GameControls: React.FC<Props> = ({
  difficulty,
  setDifficulty,
  setGameStarted,
  scoreRef,
  goldenRef,
  timeLeft,
  setTimeLeft,
  setLetters,
  settings
}) => (
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
        }}
      >
        Start
      </button>
      <button
        className={styles.btnStop}
        onClick={() => {
          setGameStarted(false);
          setTimeLeft(settings.duration);
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
);

export default GameControls;
