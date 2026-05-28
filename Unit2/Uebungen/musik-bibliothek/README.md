# Musikbibliothek – Übung: Suchfunktion implementieren

Eine Fullstack-Anwendung mit React-Frontend und Node.js-Backend.  
Die App zeigt eine Musikbibliothek mit Songs, Favoriten und einem Dashboard.

**Aufgabe:** Die Suchfunktion fehlt noch – du sollst sie selbst implementieren!

---

## Architektur

```
musik-bibliothek/
├── backend/     Node.js + Express  (Port 4000)
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

### Schritt 2 – Frontend starten (neues Terminal)

```bash
cd frontend
npm install
npm run dev
```

Die App ist dann unter **http://localhost:3000** erreichbar.

---

## Aufgabe: Suche implementieren

Die Suche soll es ermöglichen, Songs nach **Titel** oder **Interpret** zu filtern.  
Sie muss an zwei Stellen implementiert werden:

### Teil 1 – Backend (`backend/routes/songs.js`)

Die Route `GET /api/songs` akzeptiert bereits die Query-Parameter `?genre=` und `?favorite=`.  
Ergänze die Unterstützung für `?search=`.

- Lies den Query-Parameter `req.query.search` aus
- Filtere die Songs so, dass **Titel** oder **Interpret** den Suchbegriff enthalten
- Die Suche soll **case-insensitive** sein (Gross-/Kleinschreibung ignorieren)

**Beispiel-Aufruf:**  
`GET /api/songs?search=queen` → gibt alle Songs zurück, bei denen Titel oder Interpret "queen" enthält

---

### Teil 2 – Frontend (`frontend/src/services/api.ts`)

Ergänze eine neue Funktion `searchSongs`:

```ts
export async function searchSongs(query: string): Promise<Song[]>
```

- Sie soll `GET /api/songs?search=<query>` aufrufen
- Das Ergebnis (Array von Songs) zurückgeben

---

### Teil 3 – Frontend `Songs`-Seite (`frontend/src/pages/Songs.tsx`)

- Füge einen `search`-State (`useState('')`) hinzu
- Ergänze ein Texteingabefeld (`className="search-input"`) in der `filter-bar`
- Erweitere `filteredSongs` so, dass auch nach Titel und Interpret gefiltert wird  
  (client-seitig, analog zum Genre-Filter)

---

### Teil 4 – Frontend `Favoriten`-Seite (`frontend/src/pages/Favorites.tsx`)

- Füge ebenfalls einen `search`-State und ein Suchfeld hinzu
- Erweitere die Favoriten-Filterung um die Suche nach Titel und Interpret

---

## Hinweise

- Die CSS-Klassen `.search-input` und `.filter-bar` sind bereits vorhanden
- Schau dir die Lösung unter `Unit2/Loesungen/musik-bibliothek` an, wenn du nicht weiterkommst
- Die Suche kann entweder **client-seitig** (im Frontend filtern) oder **server-seitig** (Backend-Parameter nutzen) implementiert werden – beide Ansätze sind korrekt
