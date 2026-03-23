# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite landing page project. It's a minimal setup template for building React applications with Vite, featuring Hot Module Replacement (HMR) and ESLint rules.

## Common Development Commands

- **Development server**: `npm run dev` or `vite`
- **Build for production**: `npm run build` (runs TypeScript compilation and Vite build)
- **Linting**: `npm run lint` or `eslint .`
- **Preview production build**: `npm run preview`

## Code Architecture and Structure

### Core Technologies
- React 19 with TypeScript
- Vite 8 as the build tool
- ESLint 9 for code linting
- TypeScript 5.9 with strict type checking

### Project Structure
```
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point, renders App component
│   ├── assets/          # Static assets (images, icons)
│   ├── App.css          # Application styles
│   └── index.css        # Global styles
├── public/              # Static files served directly
├── index.html           # Main HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig*.json       # TypeScript configurations (app and node)
└── eslint.config.js     # ESLint configuration
```

### Key Components
1. **App.tsx**: Main application component featuring:
   - Hero section with logos
   - Interactive counter button
   - Documentation and social links sections
   - SVG icon usage via sprite sheets

2. **main.tsx**: Application entry point that:
   - Renders the App component within React's StrictMode
   - Mounts to the DOM element with id "root"

### Configuration Details
- **Vite**: Uses @vitejs/plugin-react for React support
- **TypeScript**:
  - Separate configs for app (`tsconfig.app.json`) and build tools (`tsconfig.node.json`)
  - Strict type checking enabled
  - ES2023 target with modern browser support
- **ESLint**:
  - React Hooks linting rules
  - React Refresh plugin for HMR
  - TypeScript ESLint recommended configs

### Asset Handling
- Images are imported as modules (e.g., `import reactLogo from './assets/react.svg'`)
- SVG icons are used via SVG sprites (`<use href="/icons.svg#icon-name"></use>`)
- Static assets in the `public/` directory are served at root path

## Development Workflow
1. Start development server with `npm run dev`
2. Edit files in `src/` - changes will hot reload automatically
3. Run `npm run lint` to check for code issues
4. Build production version with `npm run build`
5. Preview production build with `npm run preview`