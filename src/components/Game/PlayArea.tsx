import React from 'react';
import styles from './Game.module.css';
import Letter from './../Letter/Letter';
import type { FallingLetter } from './types';

interface Props {
  letters: FallingLetter[];
  handleCollect: (id: number) => void;
}

const PlayArea: React.FC<Props> = ({ letters, handleCollect }) => (
  <div className={styles.playArea}>
    {letters.map(l => (
      <Letter key={l.id} letter={l} onClick={() => handleCollect(l.id)} />
    ))}
  </div>
);

export default PlayArea;
