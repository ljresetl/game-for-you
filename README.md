# Typing Keyboard Game

## Overview

React + TypeScript typing game. Letters fall from top of play area; player clicks letters or types keys to collect them. Session lasts 20s (adjustable via difficulty). Golden letters are rarer and give double points.

## How to run (dev)

1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Vite.

## Technical choices

- React + TypeScript
- Canvas-like animation logic (letters are DOM elements positioned absolutely, updated via rAF for smooth motion)
- Hooks split: `useFallingLetters`, `useGameTimer`
- Minimal dependencies (no external game libraries) to keep bundle small
- Mobile-first styles via CSS modules

## Production notes

- Build with `npm run build` (Vite) and serve static files via a CDN-enabled server.
- Minify and produce source maps; enable HTTP caching for assets.
- For large populations (100+ objects) consider switching letter rendering to Canvas 2D or WebGL for performance.
- Add metrics and error logging; consider saving scores via secure API (axios + backend).

## Extensibility

- Add local leaderboard via `localStorage` or remote API.
- Add sound (Howler.js) for clicks and end-of-game.
- Move rendering to Canvas/WebGL for high object counts.
