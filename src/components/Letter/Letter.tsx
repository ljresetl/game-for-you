import React from 'react';
import styles from './Letter.module.css';
import type { FallingLetter } from '../Game/types';

interface Props {
  letter: FallingLetter;
  onClick?: () => void;
}

const Letter: React.FC<Props> = ({ letter, onClick }) => {
  // convert xPercent to style left; use top = letter.y px
  const style: React.CSSProperties = {
    left: `${letter.xPercent}%`,
    top: `${letter.y}px`,
    transform: 'translate(-50%, -50%)',
  };

  const cls = letter.golden ? `${styles.letter} ${styles.golden}` : styles.letter;

  return (
    <div className={cls} style={style} onClick={onClick} role="button" tabIndex={0} aria-label={`Letter ${letter.char}`}>
      {letter.char}
    </div>
  );
};

export default Letter;
