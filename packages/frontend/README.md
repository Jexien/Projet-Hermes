# Hermes frontend - quickstart

Prereqs
- Node 18+ (recommended)

Install

```powershell
cd "F:\IA TESTS\Projet Hermes - BASE NEUTRE"
npm ci --prefix packages/frontend
```

Run app

```powershell
npm run dev --prefix packages/frontend
```

Run Storybook

```powershell
npm run storybook --prefix packages/frontend
```

Lint

```powershell
npm run lint --prefix packages/frontend
```

Tests

```powershell
npm run test --prefix packages/frontend
```

Notes
- This project uses Vite + React. Storybook is configured with the Vite adapter.
- If you plan to work on multiple packages, consider using npm workspaces or pnpm.
# Hermes Frontend (dev)

Minimal Vite + React scaffold for Hermes editor. Run from repository root:

```powershell
cd packages/frontend
npm install
npm run dev
```

Open http://localhost:5173 and use the editor to import images.
