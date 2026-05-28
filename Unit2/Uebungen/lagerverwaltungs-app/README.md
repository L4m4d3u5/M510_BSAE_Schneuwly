# Lagerverwaltungs-App – Übung Unit 2

Eine einfache interne Lagerverwaltungs-App als React-Unterrichtsbeispiel.

---

## Projekt starten

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Entwicklungsserver starten

```bash
npm run dev
```

Die App ist anschliessend unter **http://localhost:3000** erreichbar.

---

## Projektstruktur

```
src/
├── components/
│   └── Sidebar.tsx        Seitennavigation (auf allen Seiten sichtbar)
├── data/
│   └── mockData.ts        Lokale Beispieldaten + TypeScript-Interface
└── pages/
    ├── Dashboard.tsx      Übersichtsseite mit Kennzahlen
    ├── Articles.tsx       Artikelliste mit Suche und Filtern
    ├── Warnings.tsx       Kritische Artikel (Bestand ≤ Mindestbestand)
    └── Settings.tsx       Einstellungsseite (Platzhalter)
```

---

## Was bereits vorhanden ist

- React Router mit 4 Seiten (Dashboard, Artikel, Warnungen, Einstellungen)
- Sidebar-Navigation mit Hervorhebung des aktiven Menüpunkts
- 10 Beispielartikel in `src/data/mockData.ts`
- Artikelliste mit Suchfeld und drei kombinierbaren Filtern (Kategorie, Status, Lagerort)
- Automatische Hervorhebung kritischer Artikel (Bestand ≤ Mindestbestand)
- Warnungsseite zeigt nur Artikel mit kritischem Bestand
- Einfaches, modernes Business-Layout

---

## Verwendete Technologien

| Technologie | Zweck |
|-------------|-------|
| React 18 | UI-Komponenten |
| TypeScript | Typsicherheit |
| React Router v6 | Seitennavigation |
| Vite | Build-Tool und Entwicklungsserver |

---

## Verfügbare Skripte

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Entwicklungsserver starten (Port 3000) |
| `npm run build` | Produktions-Build erstellen |
| `npm run preview` | Produktions-Build lokal vorschauen |
