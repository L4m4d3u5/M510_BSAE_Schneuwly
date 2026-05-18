# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build
```

No test or lint commands are configured.

## Architecture

React 18 + TypeScript SPA built with Vite. Client-side routing via React Router 6. No backend, no API, no state management library — all data is static mock data read directly in components.

**Data layer:** `src/data/mockData.ts` is the single source of truth. It exports two TypeScript interfaces (`Course`, `Participant`) and two static arrays. Participants reference courses via `courseId`. This file is where new entities and data would be added.

**Routing:** `src/App.tsx` owns the `BrowserRouter` and `<Routes>`, alongside the sidebar navigation. Three routes: `/` (Dashboard), `/courses` (Courses), `/participants` (Participants).

**Pages:** Each page in `src/pages/` imports directly from `mockData.ts` and renders a read-only view. There is no shared state between pages — each derives what it needs from the mock arrays at render time.

**Styling:** All meaningful CSS lives in `src/index.css` (layout, sidebar, tables, badges, cards). `src/App.css` is intentionally empty.

## Context

This is an educational project with intentional gaps for students to implement — search/filter, CRUD operations, localStorage persistence, and API integration are explicitly missing. TypeScript strict mode is enabled.
