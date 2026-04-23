# Feature 001: Project Scaffolding

## Summary
Set up the monorepo structure for the Advanced Todo application with a Node.js/Express backend and a React frontend. The backend stores all data in local JSON files. This is the foundation every other feature builds on.

## Acceptance criteria
- Repository contains two top-level directories: `backend/` and `frontend/`
- `backend/` is an Express app (Node.js) that starts with `npm start` on port 3001
- `frontend/` is a React app (Vite) that starts with `npm start` on port 3000
- Backend has a `data/` directory with a `todos.json` file (initially an empty array `[]`)
- Backend exposes a health-check endpoint `GET /api/health` returning `{ status: "ok" }`
- Frontend proxies API requests to the backend (Vite proxy config)
- Root `package.json` has scripts: `dev` (starts both), `install:all` (installs all deps)
- A `README.md` explains how to run the project

## Technical notes
- Use `concurrently` in the root package.json to run both servers in parallel
- Backend file storage helper: a module `backend/src/storage.js` that reads/writes `data/todos.json` synchronously using `fs`
- Frontend uses plain `fetch` for API calls — no extra HTTP libraries
- No authentication, no database, no Docker required

## Out of scope
- Any actual todo CRUD — just the skeleton
- CSS frameworks or design systems
- Environment variables beyond NODE_ENV
