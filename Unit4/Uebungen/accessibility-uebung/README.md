# Übung: Accessibility-Probleme analysieren und beheben

## Ausgangslage

Sie erhalten eine React-Applikation (Lagerverwaltungs-App), in der absichtlich verschiedene Probleme bezüglich Barrierefreiheit eingebaut wurden. Die Anwendung enthält sowohl MUI-Komponenten als auch klassische HTML-Elemente. Ziel ist es, diese Probleme systematisch zu analysieren und anschliessend zu beheben.

### Projekt starten

```bash
npm install
npm run dev
```

---

## Teil 1 – Analyse

Analysieren Sie die bereitgestellte React-Applikation mit einem Tool Ihrer Wahl.

### Mögliche Tools

| Tool | Art |
|---|---|
| **Lighthouse** | Automatisch (in Chrome DevTools unter „Lighthouse") |
| **axe DevTools** | Browser-Extension (Chrome/Firefox) |
| **WAVE** | Browser-Extension oder wave.webaim.org |
| **Browser DevTools** | Manuell (Accessibility-Tab im Inspector) |
| **Tastaturtests** | Manuell (nur Tab, Enter, Pfeiltasten) |

### Beschreiben Sie

Für jedes gefundene Problem:

1. **Wo** befindet sich das Problem? (Komponente / Bereich)
2. **Was** genau ist das Problem?
3. **Wie** haben Sie es gefunden? (Tool oder manuelle Methode)
4. **Warum** ist es ein Problem? (Wen betrifft es, welche Konsequenz hat es?)
5. **Wie** könnte man es beheben?

---

## Teil 2 – Umsetzung

Beheben Sie die festgestellten Probleme in der Anwendung.

### Sie sollen

- Problematische HTML-Elemente durch korrekte semantische Elemente ersetzen
- Fehlende Labels, `htmlFor`-Verknüpfungen und `id`-Attribute ergänzen
- MUI-Komponenten korrekt mit Labels und `aria-label` versehen
- Fokus und Tastaturbedienbarkeit sicherstellen
- Kontrast und Lesbarkeit verbessern
- Statusanzeigen auch ohne Farbe verständlich machen
- Unklare Buttontexte durch aussagekräftige Beschriftungen ersetzen
- Die Navigation mit korrekter semantischer Rolle versehen

---

## Bekannte Problembereiche (Hinweise)

Die Probleme sind in **vier Bereichen** verteilt:

### Navigation (`src/components/Navigation.tsx`)
- Fehlende semantische Rolle der Sidebar
- Klickbare Elemente ohne Tastaturzugänglichkeit
- IconButtons ohne Beschriftung

### Dashboard (`src/pages/Dashboard.tsx`)
- Unstrukturierte Überschriftenhierarchie
- Texte mit ungenügendem Kontrast
- Statusanzeigen ohne Textbeschriftung
- Interaktive Elemente mit falscher HTML-Semantik

### Formular (`src/pages/ArticleForm.tsx`)
- Fehlende Label-Verknüpfungen
- Formularfelder ohne sinnvolle Beschriftung
- Unklarer Absende-Button

### Artikelliste (`src/pages/ArticleList.tsx`)
- Tabellenkopfzellen ohne `scope`-Attribut
- Statusanzeigen rein farbbasiert
- Aktionsbuttons ohne Beschriftung
- Modaler Dialog mit eingeschränkter Zugänglichkeit

### Globales CSS (`src/index.css`)
- Eine kritische Einstellung, die die gesamte Tastaturbedienung beeinträchtigt

---

## Anforderungen

- Sowohl Probleme in klassischen HTML-Elementen als auch in MUI-Komponenten müssen betrachtet werden
- Die Analyse soll nachvollziehbar dokumentiert werden (z.B. in einem separaten Dokument oder als Kommentare im Code)
- Die technische Korrektur soll sauber im Code umgesetzt werden
- Die überarbeitete Oberfläche soll verständlicher und zugänglicher sein

---

## Erwartetes Ergebnis

Am Ende sollen vorliegen:

- ✅ Eine Analyse der gefundenen Probleme mit Begründung
- ✅ Eine Beschreibung, wie diese gefunden wurden (Tool / Methode)
- ✅ Eine technisch verbesserte React-Anwendung
- ✅ Eine nachvollziehbare Verbesserung der Accessibility

---

## Hinweise

- Nicht alle Probleme werden automatisch von nur einem Tool gefunden – ergänzen Sie automatische Analyse mit manuellen Tests
- Achten Sie besonders auf: **Labels**, **Kontrast**, **Fokus**, **Tastaturbedienung**, **Statuskommunikation** und **semantisches HTML**
- Testen Sie die Navigation ausschliesslich mit der Tastatur (Tab, Shift+Tab, Enter, Leertaste)
- Prüfen Sie alle interaktiven Elemente: Sind sie per Tastatur erreichbar und bedienbar?
- WCAG 2.1 Level AA ist der anzustrebende Standard

---

## Projektstruktur

```
src/
├── components/
│   ├── Navigation.tsx     # Sidebar-Navigation
│   └── StatusBadge.tsx    # Statusanzeige-Komponente
├── data/
│   └── articles.ts        # Lokale Beispieldaten
├── pages/
│   ├── Dashboard.tsx      # Übersichtsseite
│   ├── ArticleForm.tsx    # Erfassungsformular
│   └── ArticleList.tsx    # Artikel-Tabelle mit Dialog
├── App.tsx
├── main.tsx
└── index.css
```
