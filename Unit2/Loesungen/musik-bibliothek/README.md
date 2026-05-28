# Musikbibliothek – Fullstack-App (React + Node.js + SQLite)

Eine vollständige Fullstack-Anwendung als Unterrichtsbeispiel.
Zeigt die Kommunikation zwischen einem React-Frontend und einem Node.js-Backend mit SQLite-Datenbank.

---

## Architektur

```
musik-bibliothek/
├── backend/     Node.js + Express + SQLite (Port 4000)
└── frontend/    React + TypeScript + Vite  (Port 3000)
```

Das Frontend kommuniziert über HTTP-Requests mit dem Backend.
Vite leitet im Entwicklungsmodus alle `/api`-Anfragen automatisch an Port 4000 weiter (Proxy).

---

## Setup & Start

### Schritt 1 – Backend starten

```bash
cd backend
npm install
npm run dev
```

> Backend läuft auf **http://localhost:4000**

### Schritt 2 – Frontend starten (neues Terminal)

```bash
cd frontend
npm install
npm run dev
```

> App läuft auf **http://localhost:3000**

---

## API-Endpunkte (Backend)

| Methode  | URL                          | Beschreibung               |
|----------|------------------------------|----------------------------|
| `GET`    | `/api/songs`                 | Alle Songs laden           |
| `GET`    | `/api/songs?search=Queen`    | Songs nach Name filtern    |
| `GET`    | `/api/songs?genre=Rock`      | Songs nach Genre filtern   |
| `GET`    | `/api/songs?favorite=true`   | Nur Favoriten              |
| `POST`   | `/api/songs`                 | Neuen Song anlegen         |
| `DELETE` | `/api/songs/:id`             | Song löschen               |
| `PATCH`  | `/api/songs/:id/favorite`    | Favorit umschalten         |

---

## Projektstruktur

### Backend (`backend/`)

```
server.js        Express-Server, Middleware, Routen-Registrierung
database.js      SQLite-Verbindung, Tabelle erstellen, Seed-Daten
routes/
  songs.js       CRUD-Routen für Songs (GET, POST, DELETE, PATCH)
musik.db         Datenbankdatei (wird automatisch erstellt)
```

### Frontend (`frontend/src/`)

```
types/
  song.ts          TypeScript-Interface: Song, NewSong
services/
  api.ts           HTTP-Funktionen: getSongs, createSong, deleteSong, toggleFavorite
components/
  Sidebar.tsx      Navigation mit NavLink
pages/
  Dashboard.tsx    Kennzahlen: Songs, Favoriten, Genres
  Songs.tsx        Tabelle + Suche + Filter + Formular + Löschen
  Favorites.tsx    Nur favorisierte Songs
App.tsx            Router + Layout
```

---

## Wichtige Konzepte im Code

| Konzept | Wo zu sehen |
|---------|-------------|
| `useEffect` – Daten beim Laden abrufen | `Dashboard.tsx`, `Songs.tsx` |
| `useState` – Reaktive Liste + Filter | `Songs.tsx` |
| Client-seitige Filterung | `Songs.tsx` – `filteredSongs` |
| Optimistic UI Update | `Songs.tsx` – `handleToggleFavorite` |
| REST API mit Express | `backend/routes/songs.js` |
| SQLite (synchron) | `backend/database.js` |
| Vite Proxy | `frontend/vite.config.ts` |
| TypeScript Typen für API | `frontend/src/types/song.ts` |

---

## Verwendete Technologien

| Technologie | Zweck |
|-------------|-------|
| React 18 + TypeScript | Frontend, Komponenten, State |
| React Router v6 | Seitennavigation |
| Vite | Dev-Server mit API-Proxy |
| Node.js + Express | REST-API Backend |
| better-sqlite3 | SQLite-Datenbank (synchron) |
| nodemon | Automatischer Neustart bei Änderungen |
