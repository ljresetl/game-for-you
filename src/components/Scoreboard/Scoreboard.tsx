import React from 'react';
import styles from './Scoreboard.module.css';

interface Props {
  score: number;
  goldenCount: number;
  goldenPrice: number;
  onRestart: () => void;
}

const Scoreboard: React.FC<Props> = ({ score, goldenCount, goldenPrice, onRestart }) => {
  const total = score + goldenCount * goldenPrice;
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Game Over</h2>
      <div className={styles.break}>
        <div><strong>Total points (collected)</strong>: {score}</div>
        <div className={styles.muted}>Golden letters collected: {goldenCount}</div>
        <div className={styles.muted}>Golden letter price: {goldenPrice} pts</div>
      </div>
      <div className={styles.formula}>Formula: total points + (total golden letters × golden letter price)</div>
      <div className={styles.result}>Result: {score} + ({goldenCount} × {goldenPrice}) = <strong>{total}</strong></div>

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onRestart}>Play again</button>
      </div>
    </div>
  );
};

export default Scoreboard;
