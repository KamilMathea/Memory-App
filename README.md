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

- **HTML5**: Semantic layout with native `<dialog>` elements for accessibility (WCAG compliant).
- **TypeScript**: Strictly typed game logic, state management, and DOM manipulation.
- **SCSS**: Modular styles organized via BEM methodology and custom CSS animations.

## Getting Started

This is a web application built with modern tooling. Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed on your machine.

### Installation

1. Clone the repository:
git clone https://github.com/KamilMathea/Memory-App.git
cd Memory-App

2. Install project dependencies:
npm install

### Local Development

To start the local development server with hot-reloading:
npm run dev

Open your browser and navigate to http://localhost:5173 (or the URL provided in your terminal).

### Build for Production

To compile TypeScript, bundle assets, and generate the static build files:
npm run build

The compiled output will be generated in the dist/ directory, ready to be hosted on any web server.

### Project Structure

├── assets/             # Icons, illustrations, and theme graphic assets
├── src/
│   ├── scss/           # SCSS modules, mixins, and theme styling
│   └── ts/
│       ├── main.ts     # Application entry point
│       └── ...         # Modular game logic files
├── index.html          # Single Page Application structure
├── package.json        # Project dependencies and build scripts
└── README.md