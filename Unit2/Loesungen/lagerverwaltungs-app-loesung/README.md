# Lagerverwaltungs-App – Lösung Unit 2

Vollständige Musterlösung zur Übung in `Unit2/Uebungen/lagerverwaltungs-app`.

---

## Projekt starten

```bash
npm install
npm run dev
```

Die App ist unter **http://localhost:3001** erreichbar.

---

## Was diese Lösung zeigt

### Navigation (`src/components/Sidebar.tsx`)
- Alle vier Navigationspunkte vorhanden: Dashboard, Artikel, Warnungen, Einstellungen
- `NavLink` mit `className`-Callback für aktiven Zustand
- `end`-Prop beim Dashboard-Link verhindert false-positives bei Unterrouten

### Artikelseite (`src/pages/Articles.tsx`)
- Vollständige Tabelle mit allen Feldern aus `mockData`
- **Suche**: `useState` + `String.includes()` für Live-Filterung nach Name
- **Filter**: drei kombinierbare `<select>`-Dropdowns (Kategorie, Status, Lagerort)
- **Kombination**: alle Kriterien mit `&&` verknüpft in einer einzigen `.filter()`-Methode
- **Kritische Artikel**: `isCritical`-Flag setzt CSS-Klassen für rote Zeile und roten Bestandswert
- **Dynamische Optionen**: `getUniqueValues()` liest die Optionen direkt aus den Daten

### Warnungsseite (`src/pages/Warnings.tsx`)
- Filtert mit `.filter(a => a.stock <= a.minStock)`
- Zeigt Differenzspalte (`stock - minStock`) für schnellen Überblick
- Conditional Rendering: Erfolgsmeldung wenn keine kritischen Artikel vorhanden

### Dashboard (`src/pages/Dashboard.tsx`)
- Berechnet Kennzahlen dynamisch: `articles.length`, `.filter()`, `new Set()`

---

## Projektstruktur

```
src/
├── components/
│   └── Sidebar.tsx        Vollständige Navigation (alle 4 Punkte)
├── data/
│   └── mockData.ts        Lokale Beispieldaten + TypeScript-Interface
└── pages/
    ├── Dashboard.tsx      Übersichtsseite mit Kennzahlen
    ├── Articles.tsx       Artikelliste mit Suche, Filtern und kritischen Beständen
    ├── Warnings.tsx       Nur kritische Artikel (Bestand ≤ Mindestbestand)
    └── Settings.tsx       Einstellungsseite (Platzhalter)
```

---

## Verwendete Technologien

| Technologie | Zweck |
|-------------|-------|
| React 18 | UI-Komponenten, `useState` |
| TypeScript | Typsicherheit, `interface Article` |
| React Router v6 | `NavLink`, `Routes`, `Route` |
| Vite | Build-Tool und Entwicklungsserver |
