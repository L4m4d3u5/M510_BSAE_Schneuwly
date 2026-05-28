# Fallstudie: Visualisierung und benutzerfreundliche Darstellung eines Lager-Dashboards

## Ausgangslage

Ein Unternehmen möchte für seine Lagerverwaltungs-App eine Übersichtsseite entwickeln. Diese Seite soll Mitarbeitenden helfen, wichtige Informationen schnell zu erkennen und kritische Situationen frühzeitig zu sehen. Dazu stehen Artikeldaten zur Verfügung, die sinnvoll visualisiert und benutzerfreundlich dargestellt werden sollen.

---

## Auftrag

Die Studierenden sollen die bereitgestellte React-Anwendung analysieren, verstehen und bei Bedarf erweitern. Im Zentrum steht die Frage, wie grosse Datenmengen sinnvoll verdichtet, visualisiert und übersichtlich dargestellt werden können.

---

## Aufgaben

### 1. Analysieren
Analysieren Sie die bestehende Dashboard-Seite (`src/pages/Dashboard.tsx`) und beantworten Sie folgende Fragen:

- Welche Informationen werden als Kennzahlen (KPIs) dargestellt?
- Welche Werte können Mitarbeitende auf einen Blick erkennen?
- Wie sind die drei Ebenen des Dashboards aufgebaut?

### 2. Kennzahlen erklären
Beschreiben Sie, welche Informationen als Kennzahlen dargestellt werden und warum genau diese Werte gewählt wurden. Überlegen Sie: Welche weiteren Kennzahlen könnten für eine Lagerverwaltung sinnvoll sein?

### 3. Diagramm begründen
Erklären Sie, warum das Balkendiagramm (Artikel pro Kategorie) in diesem Kontext sinnvoll ist. Welche anderen Diagrammtypen wären denkbar? Wann wären sie besser geeignet?

### 4. Tabelle erklären
Begründen Sie, warum die Tabelle nur kritische und Warnartikel anzeigt und nicht alle 80 Artikel. Welche Vorteile hat diese Filterung für die Benutzererfahrung?

### 5. Benutzerfreundlichkeit prüfen
Untersuchen Sie, ob die Seite benutzerfreundlich aufgebaut ist. Beantworten Sie:
- Sind wichtige Informationen gut sichtbar?
- Sind kritische Werte klar hervorgehoben?
- Ist die visuelle Hierarchie nachvollziehbar?

### 6. Verbesserungen vornehmen *(optional)*
Nehmen Sie mindestens eine sinnvolle Verbesserung an der App vor. Mögliche Ideen:
- Zweites Diagramm (z.B. Tortendiagramm der Status-Verteilung)
- Filter in der Tabelle (nach Kategorie oder Status)
- Trendanzeige in den KPI-Karten (Pfeil nach oben/unten)
- Responsivitätsverbesserungen
- Dark-Mode-Unterstützung

---

## Technische Ziele

| Ziel | Beschreibung |
|------|-------------|
| React-Komponenten verstehen | Wie sind Props, State und Rendering aufgebaut? |
| TypeScript-Strukturen nachvollziehen | Welche Typen werden wo definiert und verwendet? |
| MUI-Komponenten einsetzen | Wie werden `Grid`, `Card`, `Table`, `Chip` verwendet? |
| Aggregationen verstehen | Wie werden aus Rohdaten Kennzahlen berechnet? |
| Diagrammdaten vorbereiten | Wie werden Artikeldaten für Recharts aufbereitet? |
| Grosse Datenmengen übersichtlich darstellen | Wie filtert und priorisiert man relevante Informationen? |

---

## Projektstruktur

```
src/
├── types/
│   └── index.ts                    ← Typdefinitionen (Artikel, ArtikelStatus)
├── data/
│   └── mockData.ts                 ← 80 Beispielartikel + Status-Berechnung
├── components/
│   ├── KpiCard.tsx                 ← Wiederverwendbare Kennzahlenkarte
│   ├── KategorieDiagramm.tsx       ← Balkendiagramm (Recharts)
│   └── KritischeArtikelTabelle.tsx ← Tabelle mit kritischen Artikeln (MUI Table)
└── pages/
    └── Dashboard.tsx               ← Gesamtseite, verbindet alle Komponenten
```

---

## Datenstruktur

```typescript
interface Artikel {
  id:            number
  name:          string
  articleNumber: string        // z.B. "ELE-0001"
  category:      string        // z.B. "Elektronik"
  location:      string        // Lagerort, z.B. "A-02-05"
  stock:         number        // Aktueller Bestand
  minStock:      number        // Mindestbestand
  status:        ArtikelStatus // 'ok' | 'warning' | 'critical'
}
```

**Status-Logik:**

| Status     | Bedingung                         | Bedeutung              |
|------------|-----------------------------------|------------------------|
| `critical` | `stock <= minStock`               | Sofort nachbestellen!  |
| `warning`  | `stock <= minStock * 1.5`         | Bald nachbestellen     |
| `ok`       | `stock > minStock * 1.5`          | Ausreichend bevorratet |

---

## Verwendete Technologien

| Technologie | Zweck |
|------------|-------|
| **React 18** | UI-Framework, funktionale Komponenten |
| **TypeScript** | Typsicherheit, Interfaces, Enums |
| **MUI v5** | Layout (`Grid`, `Container`), Karten (`Card`, `Paper`), Tabellen (`Table`), Status (`Chip`) |
| **Recharts** | `BarChart` für die Kategorienverteilung |

---

## Projekt starten

```bash
npm install
npm run dev
```

Öffne [http://localhost:3006](http://localhost:3006)

---

## Erwartetes Ergebnis

Eine verständliche React-Anwendung mit Dashboard, Kennzahlen, Diagramm und Tabelle sowie eine nachvollziehbare benutzerfreundliche Darstellung. Die Studierenden sollen nach der Analyse in der Lage sein, das Dashboard eigenständig zu erweitern.

---

## Bewertungskriterien *(für Dozierende)*

| Kriterium | Gewichtung |
|-----------|-----------|
| Korrekte Analyse der bestehenden Komponenten | 30% |
| Begründung der Designentscheidungen | 30% |
| Qualität allfälliger Verbesserungen | 30% |
| Code-Qualität und TypeScript-Nutzung | 10% |
