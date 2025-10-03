// types.ts

// Літери, що падають
export interface FallingLetter {
  id: number;
  char: string;
  xPercent: number; // 0..100
  y: number;        // px
  vy: number;       // приблизна швидкість падіння (px/frame)
  golden: boolean;
}

// Рівні складності
export type Difficulty = 'easy' | 'medium' | 'hard';

// Налаштування складності
export interface DifficultySettings {
  duration: number;      // тривалість гри в секундах
  spawnMs: number;       // інтервал генерації літер (мс)
  fallSpeed: number;     // базова швидкість падіння
  goldenChance: number;  // ймовірність золотих літер
  points: {
    normal: number;      // очки за звичайну літеру
    golden: number;      // очки за золоту літеру
  };
}
