# Lagerverwaltung – Übung: Tabelle mit Paginierung UNIT 3.1-3.2

## Aufgabenstellung

Du arbeitest an einer Lagerverwaltungsapplikation. Das Backend hat bereits **1 200 Produkte** als Datensatz geliefert (siehe `src/data/mockData.ts`). Deine Aufgabe ist es, diese Daten in einer übersichtlichen Tabelle mit Paginierung darzustellen.

---

## Datenstruktur

Jedes Produkt (`Produkt`) hat folgende Felder:

| Feld            | Typ     | Beschreibung                        | Beispiel        |
|-----------------|---------|-------------------------------------|-----------------|
| `id`            | number  | Eindeutige ID                       | 1               |
| `artikelnummer` | string  | Interne Artikelnummer               | `ELE-00001`     |
| `name`          | string  | Produktname inkl. Variante          | `Kondensator 100nF` |
| `kategorie`     | string  | Produktkategorie                    | `Elektronik`    |
| `lagerbestand`  | number  | Aktuelle Lagermenge                 | 482             |
| `mindestbestand`| number  | Untergrenze – darunter = Warnung    | 150             |
| `einheit`       | string  | Mengeneinheit                       | `Stk`           |
| `preis`         | number  | Preis in CHF                        | 3.75            |
| `lieferant`     | string  | Lieferantenname                     | `Würth Elektronik` |
| `standort`      | string  | Regal-Standort (Reihe-Regal-Fach)  | `A-01-03`       |

Die Daten sind in `src/data/mockData.ts` als `produkte` exportiert.

---

## Wie werden die Produkte generiert?

Die 1 200 Produkte werden **beim Start der App automatisch generiert** – es gibt keine externe Datei (kein JSON, keine Datenbank). Alles passiert in `src/data/mockData.ts`.

### Prinzip: Kategorien × Varianten

Es gibt **12 Kategorien** (z.B. Elektronik, Werkzeug, Befestigung). Jede Kategorie hat:
- 10 **Basisnamen** (z.B. `Kondensator`, `Widerstand`, `Transistor` …)
- 10 **Varianten** (z.B. `100nF`, `470nF`, `1µF` …)

10 Basisnamen × 10 Varianten × 12 Kategorien = **1 200 Produkte**

Aus Basisname + Variante entsteht der vollständige Produktname:
```
"Kondensator" + "100nF"  →  "Kondensator 100nF"
"Schraube"    + "M6×20"  →  "Sechskantschraube M6×20"
```

### Deterministischer Zufallsgenerator (Seeded RNG)

Zahlen wie Lagerbestand, Preis oder Lieferant werden **pseudozufällig** berechnet – aber mit einem **fixen Startwert (Seed = 42)**. Das bedeutet: Die Daten sind bei jedem Programmstart **immer identisch**, auch ohne gespeicherte Datei.

```ts
// Vereinfachtes Prinzip eines Seeded RNG
function erstelleRNG(seed: number) {
  let s = seed
  return {
    next(): number {
      // Bitoperationen mischen den Seed → Zahl zwischen 0 und 1
      s = Math.imul(s ^ (s >>> 16), 0x45d9f3b)
      return (s >>> 0) / 0xffffffff
    },
    int(min: number, max: number): number {
      return Math.floor(this.next() * (max - min + 1)) + min
    },
  }
}

const rng = erstelleRNG(42) // Seed 42 → immer dieselbe Sequenz
rng.int(0, 500)  // z.B. immer 312
rng.int(0, 500)  // z.B. immer 87
```

### Standort-Schema

Der Standort wird aus **Regal + Reihe + Fach** zusammengesetzt:
```
A-01-03  →  Regal A, Reihe 01, Fach 03
G-04-07  →  Regal G (Maschinenteile), Reihe 04, Fach 07
```

Jede Kategorie hat ihr eigenes Regal (A–L).

### Warum kein JSON?

- Kein grosses File im Repository (~200 KB gespart)
- Die Daten sind reproduzierbar und leicht anpassbar
- Gutes Beispiel für **TypeScript-Typen** und **Algorithmen**

---

## Pflichtanforderungen

### 1. Tabelle mit allen Spalten
Zeige alle Produkte in einer Tabelle mit mindestens folgenden Spalten:
- Artikelnummer
- Name
- Kategorie
- Lagerbestand + Einheit
- Mindestbestand
- Preis (CHF)
- Standort

### 2. Paginierung
- Der Benutzer kann zwischen **10 / 25 / 50 Zeilen pro Seite** wählen
- Es gibt **Vor / Zurück** Buttons zum Blättern
- Die aktuelle Seite und Gesamtanzahl der Seiten werden angezeigt (z.B. *Seite 3 von 48*)
- Der Gesamtanzahl der Produkte wird angezeigt (z.B. *1 200 Produkte*)

### 3. Bestandswarnung
- Zeilen, bei denen `lagerbestand < mindestbestand`, werden **farblich hervorgehoben** (z.B. roter/oranger Hintergrund)

---

## Bonus-Aufgaben

| Aufgabe | Beschreibung |
|---------|-------------|
| Suche | Textfeld zum Filtern nach Name oder Artikelnummer |
| Sortierung | Klick auf Spaltenüberschrift sortiert die Tabelle auf- / absteigend |
| Kategoriefilter | Dropdown zum Filtern nach Kategorie |
| Statistik | Zeige Anzahl Produkte mit Unterbestand |

---

## Lösungsansätze

Du kannst die Aufgabe **auf zwei Arten** lösen:

### Option A – Reines HTML + TypeScript (ohne externe Bibliotheken)
Implementiere die Tabelle mit einem `<table>` Element und steuere die Paginierung mit React-States.

```tsx
// src/components/Produkttabelle.tsx
import { useState } from 'react'
import { produkte } from '../data/mockData'

export default function Produkttabelle() {
  const [seite, setSeite] = useState(1)
  const [zeilenProSeite, setZeilenProSeite] = useState(25)

  // TODO: Sortierung, Filterung, Paginierung implementieren
  const gesamtSeiten = Math.ceil(produkte.length / zeilenProSeite)
  const aktuelleZeilen = produkte.slice(
    (seite - 1) * zeilenProSeite,
    seite * zeilenProSeite
  )

  return (
    <table>
      {/* ... */}
    </table>
  )
}
```

### Option B – Mit MUI DataGrid
Installiere MUI und nutze den `DataGrid` aus `@mui/x-data-grid`:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/x-data-grid@7
```

```tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { produkte } from '../data/mockData'

const spalten: GridColDef[] = [
  { field: 'artikelnummer', headerName: 'Artikelnummer', width: 130 },
  { field: 'name', headerName: 'Name', flex: 1 },
  // weitere Spalten...
]

export default function ProduktDataGrid() {
  return (
    <DataGrid
      rows={produkte}
      columns={spalten}
      pageSizeOptions={[10, 25, 50]}
    />
  )
}
```

---

## Projekt starten

```bash
npm install
npm run dev
```

Öffne [http://localhost:3003](http://localhost:3003)

---

## Hinweis zur Lösung

Musterlösungen für beide Ansätze findest du in:
- `Unit3/Loesungen/lagerverwaltung-loesung-html/` → Option A (ohne MUI)
- `Unit3/Loesungen/lagerverwaltung-loesung-mui/`  → Option B (mit MUI DataGrid)

> Schaue die Lösung erst an, nachdem du es selbst versucht hast!
