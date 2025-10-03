1. Describe a way to create multiple games from corresponding sources (code, images, sounds). What tools do you have experience with?

To create multiple games from a shared set of resources:

Modular architecture: game logic is separated into reusable modules.

Media assets: sprites, images, and audio are stored separately and loaded depending on the game.

Game engine/framework: a common engine (e.g., Phaser.js, PixiJS, Unity) can handle multiple games.

Tools used:

JavaScript (ES6) and TypeScript

React for UI

Canvas API / WebGL for animations

TexturePacker for sprites

Web Audio API for sounds

In our project, we used React + TypeScript, DOM elements for letters with Canvas-like absolute positioning, and CSS modules for styling with minimal dependencies.

2. Describe issues related to mobile device’s browsers and mobile development in general. What ways of solving such problems do you know?

Issues:

Browsers differ in support for Canvas, WebGL, and audio APIs.

Touch controls instead of mouse or keyboard.

Small screens and various aspect ratios.

Lower mobile device performance → complex animations may lag.

Solutions:

Mobile-first responsive design (CSS Flex/Grid, media queries).

Graphics optimization: sprite sheets, reduce number of DOM elements.

Use unified libraries: Howler.js for audio, Pointer events for touch.

Testing on different devices and browsers.

Simplifying animations and FPS for smooth mobile performance.

3. Describe issues related to code minification and ways of solving them

Issues:

Minification can break logic if global variables or incorrect imports are used.

Variable names get obfuscated in production → harder to debug.

Solutions:

Use source maps for production debugging.

Use modern bundlers: Vite, Webpack, Rollup.

Maintain modular code structure.

Linting and testing before minification.

4. Describe approaches to create an animation of 100 falling coins from the top edge of the screen. What pros and cons each approach has?

Approaches:

DOM elements (div/span + CSS/JS):

Easy to integrate with UI and clickable.

Performance drops with 100+ elements, especially on mobile.

Canvas 2D API:

Flexible, precise control over trajectories and physics.

Need to manually handle collisions and animation.

WebGL / Three.js:

GPU acceleration, supports 3D effects and lighting.

More complex code, longer development time, harder to integrate with DOM UI.

CSS Keyframes / Transitions:

Simple syntax, hardware accelerated.

Less control over motion and interactions.

In our project, we used DOM elements + absolute positioning via JS, so letters are clickable and scoring is easy to implement.

![Gameplay Screenshot](assets/images/22.png)
