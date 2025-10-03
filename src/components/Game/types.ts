export interface FallingLetter {
  id: number;
  char: string;
  xPercent: number; // 0..100
  y: number; // px
  vy: number; // approx px per frame scale
  golden: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
