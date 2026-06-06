# Übung: Inkonsistente UI vereinheitlichen mit wiederverwendbaren Komponenten

## Ausgangslage

Sie erhalten eine React-Applikation mit mehreren Seiten. Die Anwendung ist grundsätzlich funktionsfähig, weist jedoch verschiedene gestalterische Inkonsistenzen auf. Buttons, Status-Chips und Kennzahlenkarten sind auf den einzelnen Seiten unterschiedlich umgesetzt. Dadurch wirkt die Anwendung uneinheitlich und wenig systematisch.

## Projekt starten

```bash
npm install
npm run dev
```

Die App läuft danach unter [http://localhost:3000](http://localhost:3000).

---

## Ziel

Ziel der Übung ist es, die Oberfläche zu analysieren und anschliessend konsistent zu überarbeiten. Dazu sollen wiederverwendbare UI-Komponenten erstellt und in der bestehenden Anwendung eingesetzt werden.

---

## Teil 1 – Analyse

Untersuchen Sie die bestehende Anwendung und identifizieren Sie gestalterische Inkonsistenzen.

Navigieren Sie durch alle vier Seiten (Dashboard, Artikel, Warnungen, Einstellungen) und achten Sie insbesondere auf:

### Buttons
- Welche Farben haben Buttons für ähnliche Hauptaktionen?
- Unterscheiden sich Grösse, Padding und Border-Radius?
- Werden ähnliche Aktionen unterschiedlich beschriftet (z. B. «Speichern», «Sichern», «Save»)?
- Gibt es Buttons als Inline-Style und Buttons als CSS-Klassen?

### Status-Chips
- Wie wird der Status «Kritisch» auf dem Dashboard dargestellt?
- Wie wird «Kritisch» auf der Artikelseite dargestellt?
- Wie wird «Kritisch» auf der Warnungsseite dargestellt?
- Sind die Darstellungen einheitlich?

### Kennzahlenkarten
- Welche Gemeinsamkeiten und Unterschiede gibt es zwischen den Karten auf dem Dashboard?
- Wie sehen die Statistik-Karten auf der Warnungsseite aus?
- Folgen die Karten einem gemeinsamen Muster?

### Farben
- Gibt es eine konsistente Farbsprache für primäre und sekundäre Aktionen?
- Werden gleiche Statuswerte überall mit derselben Farbe dargestellt?

**Halten Sie Ihre Beobachtungen schriftlich fest**, bevor Sie mit der Umsetzung beginnen.

---

## Teil 2 – Umsetzung

Erstellen Sie wiederverwendbare Komponenten und ersetzen Sie die uneinheitlichen Stellen in der Anwendung.

### Mindestens zu erstellende Komponenten

| Komponente | Beschreibung |
|---|---|
| `PrimaryButton` | Einheitlicher Primär-Button für Hauptaktionen |
| `SecondaryButton` | Einheitlicher Sekundär-Button für Nebenaktionen |
| `StatusChip` | Einheitliche Statusanzeige für alle Statuswerte |
| `MetricCard` | Einheitliche Kennzahlenkarte |

> **Hinweis:** Legen Sie die Komponenten unter `src/components/` ab.

### Wahlmöglichkeit

Sie dürfen selbst entscheiden, ob Sie:

- **eigene wiederverwendbare React-Komponenten** mit eigenem Styling erstellen, oder
- **MUI (Material UI)** verwenden, um die Komponenten sauber und konsistent umzusetzen

Wenn Sie MUI verwenden möchten, installieren Sie es mit:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

---

## Anforderungen

- Ähnliche Aktionen sollen konsistent dargestellt werden
- Statuswerte sollen überall gleich aussehen
- Kennzahlenkarten sollen einheitlich aufgebaut sein
- Komponenten sollen wiederverwendbar und sauber typisiert sein (TypeScript Props)
- Die Anwendung soll insgesamt ruhiger, konsistenter und professioneller wirken

---

## Erwartetes Ergebnis

Am Ende soll eine überarbeitete React-Anwendung vorliegen, in der:

- Buttons konsistent gestaltet und einheitlich beschriftet sind
- Status-Chips auf allen Seiten gleich aussehen
- Kennzahlenkarten einem gemeinsamen Muster folgen
- Wiederverwendbare Komponenten eingesetzt und auf mehreren Seiten verwendet werden

---

## Technische Anforderungen

- React mit funktionalen Komponenten
- TypeScript (Props korrekt typisieren)
- Wiederverwendbare Komponenten in `src/components/`
- Saubere Komponentenstruktur

---

## Projektstruktur

```
src/
├── components/        ← Wiederverwendbare Komponenten (hier erstellen)
│   ├── Navigation.tsx
│   ├── PrimaryButton.tsx    ← neu zu erstellen
│   ├── SecondaryButton.tsx  ← neu zu erstellen
│   ├── StatusChip.tsx       ← neu zu erstellen
│   └── MetricCard.tsx       ← neu zu erstellen
├── data/
│   └── mockData.ts    ← Beispieldaten
├── pages/
│   ├── Dashboard.tsx
│   ├── Artikel.tsx
│   ├── Warnungen.tsx
│   └── Einstellungen.tsx
├── types/
│   └── index.ts       ← TypeScript-Typen
├── App.tsx
└── main.tsx
```

---

## Hinweise

- Achten Sie nicht nur auf Optik, sondern auch auf Konsistenz und Wiederverwendbarkeit
- Überlegen Sie, welche Regeln für primäre und sekundäre Aktionen gelten sollen
- Verwenden Sie für Statuswerte immer dieselbe Logik und Darstellung
- Denken Sie daran, dass gute UI-Komponenten später auf mehreren Seiten einsetzbar sein müssen
- TypeScript-Props helfen dabei, Komponenten korrekt zu verwenden – typisieren Sie alle Props

---

## Ziel der Übung

Die Studierenden sollen lernen, wie Gestaltungsrichtlinien praktisch umgesetzt werden, indem aus uneinheitlichen Oberflächen wiederverwendbare und konsistente UI-Komponenten entstehen.
