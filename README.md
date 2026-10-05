# Circles App

![demo-ready](https://img.shields.io/badge/Demo-Ready-00C853?style=for-the-badge)
![tests-passing](https://img.shields.io/badge/Tests-Passing-0A84FF?style=for-the-badge)
![build-passing](https://img.shields.io/badge/Build-Passing-111111?style=for-the-badge)
![coverage](https://img.shields.io/badge/Coverage-100%25-00C853?style=for-the-badge)
![deploy-pages](https://github.com/LEO0331/circles-app/actions/workflows/deploy-pages.yml/badge.svg)

## Getting Started

Use Node.js 24 LTS (minimum 22.12) and npm. The app uses Vite for development
and production builds, with Jest for tests.

This is a simple React application that fetches data from the provided URLs and updates the UI based on the wireframe design.

### Fetch Data

- Fetch data from the given URLs.
- Display loading status (success or failure) for each dataset.

### Filter Colors

- Display colored circles based on the fetched data.
- Implement the functionality to hide all circles of the same color and add them to the "Filtered Colors" section.
- Implement the "Clear All" button to remove all filters.

## Ready for Demo

- Editorial Neon frontend refresh applied (UI-only, no behavior changes).
- Integration test added for app flow: fetch, filter, and clear.
- GitHub Actions workflow added for auto-deploy to GitHub Pages on push to `main`.
- Verified locally:
  - `npm test -- --runInBand`
  - `npm run build`

### Wireframe Design
![image](https://github.com/LEO0331/circles-app/blob/main/src/Images/wireframe.png?raw=true)

### Actual Site
![image](https://github.com/LEO0331/circles-app/blob/main/src/Images/actualPage.png)

### Video Showcase
https://github.com/LEO0331/circles-app/assets/25032781/bc899802-257f-4050-b729-fa82c2a2c026

## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm install`

Install all dependencies.

Use `npm ci` for a reproducible install from the lockfile.

### `npm run check`

Runs lint, all Jest tests, and the production build.

### `npm run build` and `npm run preview`

Builds static files into `build/` with the `/circles-app/` GitHub Pages base path.
Preview the build at `http://127.0.0.1:4173/circles-app/`.
For relative asset URLs (such as Lighthouse CI), set `PUBLIC_URL=.` when building.
Development and preview servers bind to localhost.

Production JavaScript targets ES2015 syntax and requires modern browsers;
the build does not add legacy browser polyfills.

The former Create React App toolchain was replaced to remove vulnerable
webpack development-server and build dependencies. Jest's Babel dependencies
are now declared explicitly. Vite replaces the former `eject` command.

### `npm run test`

Run Jest tests. `npm run test -- --coverage`

![image](https://github.com/LEO0331/circles-app/blob/main/src/Images/test.png?raw=true)
