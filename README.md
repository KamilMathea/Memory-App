# Memory App

A responsive, dynamic browser-based Memory card game built with TypeScript, HTML5, and SCSS. Customise your game setup with different themes, board sizes, and player colors.

## Features

- **Custom Themes**: Switch between Gaming and Food themes (updates visual cards and end-screen trophies).
- **Flexible Board Sizes**: Play with 16, 24, or 36 cards.
- **Player Selection & Turn Tracking**: Support for two players (Blue vs. Orange) with live score tracking and active turn badges.
- **Game Flow Screens**:
  - **Home**: Intro landing screen.
  - **Settings**: Configuration panel with live preview.
  - **Game Board**: Dynamic memory card grid with animated tile interactions.
  - **Game Over & Winner**: Dedicated result screens with dynamic fly-in animations and victory announcements.
- **Exit Modal**: Accessible native `<dialog>` overlay to confirm exiting an ongoing match.

## Tech Stack

- **HTML5**: Semantic layout with native `<dialog>` elements.
- **TypeScript**: Strictly typed game logic, state management, and DOM manipulation.
- **SCSS**: Modular styles organized via BEM methodology and custom animations.

## Project Structure

```text
├── assets/             # Icons, illustrations, and theme graphic assets
├── src/
│   └── ts/
│       ├── main.ts     # Application entry point
│       └── ...         # Modular game logic files
├── index.html          # Single Page Application structure
└── README.md