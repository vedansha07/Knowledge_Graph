# Knowledge Graph

Knowledge Graph is a frontend web application designed to allow users to build and interact with a personal knowledge base. Users can map topics and relationships between them over a dynamic, interactive canvas.

## Overview

The application features an editorial-inspired interface, emphasizing typography and high-contrast visual elements. It is entirely a frontend project, ensuring low latency and immediate visual feedback. All graph states are automatically saved to your local environment, making it a reliable tool for persistent brainstorming and diagramming.

## Features

- Interactive Canvas: Render nodes and directed edges on a scalable interface.
- Complete Operations: Add, edit, and delete nodes and their relationships effortlessly.
- Inline Editing: Select any node to access a sidebar for editing titles, descriptions, and viewing identification details.
- Data Persistence: Graph state is synchronized with browser local storage and restores completely on page refresh.
- Empty State Handing: Loads a comprehensive set of seed data automatically if no local data exists.
- Self-Loop Prevention: Validations inside the relationship creation flow prevent creating logic errors in the graph.

## Technologies Used

- Vite: Build tool and development server.
- React: Component composition and application flow.
- TypeScript: Static type definitions for strict data handling.
- React Flow: Engine for rendering node-based components and interactions.
- Tailwind CSS: Utility-first styling for layout and thematic overrides.

## Setup and Deployment

### Running Locally

Ensure Node.js is installed, then proceed with the following steps in your terminal:

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Open the provided localhost link in your web browser.

### Building for Production

To create an optimized production build:

npm run build

This command executes TypeScript validation before bundling files with Vite. The resulting output will be available in the dist directory.

### Deployment on Vercel

This repository is optimized for immediate deployment via Vercel. 
- Import this project repository on your Vercel dashboard.
- Vercel will automatically detect the Vite workflow.
- Ensure the Build Command is set to "npm run build" and the Output Directory is set to "dist".
- Deploy.

## Architecture

- Graph Canvas: The central workspace managing interaction routing from React Flow.
- State Context: A centralized context provider that manages data across components, heavily optimized to resist redundant renders.
- UI Components: Discrete, reusable modules handling specific user interactions like forms, toolbars, and dynamic sidebars.

## License

This project is intended for educational and personal use.
