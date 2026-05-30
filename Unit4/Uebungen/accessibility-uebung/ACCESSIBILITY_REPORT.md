# Accessibility Report – Inventarverwaltungs-App

**Datum:** 30. Mai 2026  
**Branch:** `feature/unit-4`  
**Bearbeiter:** L4m4d3u5  
**WCAG-Zielversion:** 2.1 AA

---

## Zusammenfassung

Im Rahmen der Accessibility-Übung wurden insgesamt **24 Probleme** in 5 Dateien identifiziert und behoben. Die Änderungen verteilen sich auf zwei Commits:

| Commit | Beschreibung | Datum |
|--------|-------------|-------|
| `7dd8966` | feat: improved accessabilty | 30.05.2026 |
| `1b114d5` | feat: improved accessiblity | 30.05.2026 |

---

## Behobene Probleme nach Datei

### 1. `src/index.css` — Fokus-Indikator

**Problem:** Die globale CSS-Regel `*:focus { outline: none; }` entfernte den Fokus-Rahmen für alle interaktiven Elemente. Tastaturnutzer konnten nicht erkennen, welches Element aktuell fokussiert ist.

**WCAG-Kriterium:** [2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible) (Level AA)

**Behebung:**

```css
/* Entfernt: */
*:focus {
  outline: none;
}
```

Der Browser-Standard-Fokusrahmen ist jetzt wieder sichtbar für alle fokussierbaren Elemente.

---

### 2. `src/components/Navigation.tsx` — Navigation-Landmark & Interaktivität

#### Problem #1 – Falsches HTML-Element für Navigation
- **Vorher:** `<div>` als Container der Navigationsleiste
- **Nachher:** `<nav>` semantisches Landmark-Element
- **WCAG:** [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships) (Level A)

#### Problem #2 – Klickbare `<div>`-Elemente statt Buttons
Alle drei Navigationseinträge (Dashboard, Artikel, Neuer Artikel) waren als klickbare `<div>`-Elemente implementiert.
- **Vorher:** `<div onClick={...}>` — nicht per Tastatur fokussierbar, keine Semantik
- **Nachher:** `<button>` — nativ fokussierbar, korrekte Semantik, Screenreader-kompatibel
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #3 – Menü-Toggle-Button ohne `aria-label`
- **Vorher:** `<IconButton>` ohne Beschriftung — Screenreader konnte die Funktion nicht ansagen
- **Nachher:** `aria-label="Menü"` hinzugefügt
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #4 – Icon-Buttons ohne `aria-label`
Benachrichtigungs- und Einstellungs-Buttons hatten kein zugängliches Label.
- **Nachher:** `aria-label="Benachrichtigungen"` und `aria-label="Einstellungen"` hinzugefügt
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Zusatz – Aktiver Navigationseintrag
- `aria-current="page"` wird nun auf den aktiven Navigationseintrag gesetzt
- **WCAG:** [2.4.8 Location](https://www.w3.org/TR/WCAG21/#location) (Level AAA — Best Practice auf AA)

---

### 3. `src/components/StatusBadge.tsx` — Farbbasierte Statusanzeige

**Problem:** Der Status-Indikator war nur ein farbiger Punkt ohne Text oder zugängliches Label. Für farbenblinde Nutzer oder Screenreader-Nutzer war der Status nicht erkennbar.

- **Vorher:** Reiner farbiger `<span>`, kein `aria-label`
- **Nachher:** Neues Prop `ariaLabel: string` eingeführt, wird als `aria-label` am Element gesetzt
- **Verwendung in ArticleList:** `ariaLabel={`Status: ${article.status}`}`
- **WCAG:** [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) (Level A), [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

---

### 4. `src/pages/ArticleForm.tsx` — Formular-Zugänglichkeit

#### Problem #1 – Niedriger Kontrast (Beschreibungstext)
- **Vorher:** `color: '#aaa'` — Kontrastverhältnis ca. 2.3:1 (WCAG-Minimum: 4.5:1)
- **Nachher:** `color: '#000000'`
- **WCAG:** [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum) (Level AA)

#### Problem #2 – Artikelname-Input ohne `aria-label` und `required`
- **Nachher:** `aria-label="Artikelname (Pflichtfeld)"` und `required` hinzugefügt
- **WCAG:** [1.3.5 Identify Input Purpose](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA), [3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG21/#labels-or-instructions) (Level A)

#### Problem #3 – Labels ohne `htmlFor`, Inputs ohne `id` (Artikelnummer & Menge)
Labels und Inputs waren nicht programmatisch verknüpft.
- **Nachher:**
  - `<label htmlFor="sku-input">` + `<input id="sku-input">`
  - `<label htmlFor="quantity-input">` + `<input id="quantity-input">`
- **WCAG:** [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships) (Level A), [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #4 – MUI Select ohne Label
- **Nachher:** `<label htmlFor="category-select">Kategorie</label>` + `id="category-select"` auf dem Select
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #5 – Irreführender Button-Text
- **Vorher:** Button-Beschriftung `"Weiter"` — suggeriert einen mehrstufigen Prozess
- **Nachher:** `"Speichern"` — beschreibt die tatsächliche Aktion klar
- **WCAG:** [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG21/#headings-and-labels) (Level AA)

---

### 5. `src/pages/ArticleList.tsx` — Tabellen-Zugänglichkeit & Interaktivität

#### Problem #1 – `<th>` ohne `scope="col"`
Alle 6 Tabellen-Header-Zellen hatten kein `scope`-Attribut. Screenreader können Tabellenspalten nicht korrekt zuordnen.
- **Nachher:** `scope="col"` auf allen `<th>`-Elementen
- **WCAG:** [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships) (Level A)

#### Problem #2 – StatusBadge ohne zugängliches Label
- **Nachher:** `ariaLabel={`Status: ${article.status}`}` übergeben
- **WCAG:** [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) (Level A)

#### Problem #3 – Icon-Buttons ohne `aria-label`
Edit- und Delete-Buttons hatten keine Beschriftung.
- **Nachher:**
  - `aria-label={`Artikel "${article.name}" bearbeiten`}`
  - `aria-label={`Artikel "${article.name}" löschen`}`
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #4 – Niedriger Kontrast (Infotext & SKU)
- Beschreibungstext: `color: '#aaa'` → `color: '#000000'`
- SKU-Spalte: `color: '#888'` → `color: '#000000'`
- **WCAG:** [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum) (Level AA)

#### Problem #5 – InfoIcon ohne `aria-label`
- **Nachher:** `aria-label="Information"` hinzugefügt
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #6 – Klickbares `<div>` als "Schliessen"-Button im Dialog
- **Vorher:** `<div onClick={...}>` — per Tastatur nicht aktivierbar
- **Nachher:** `<button>` mit Reset-Styling (`background: none`, `border: none`, `padding: 0`, `font: inherit`)
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

---

### 6. `src/pages/Dashboard.tsx` — Dashboard-Zugänglichkeit

#### Problem #1 – Fehlerhafte Überschriftenhierarchie
Alle Karten-Überschriften verwendeten `<h5>` direkt nach `<h1>` — ein Sprung von Level 1 zu Level 5.
- **Nachher:** Karten-Überschriften → `<h2>`, Abschnitts-Überschriften → `<h3>`
- **WCAG:** [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships) (Level A), [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG21/#headings-and-labels) (Level AA)

#### Problem #2 – Niedriger Kontrast (mehrere Stellen)
| Element | Vorher | Nachher |
|---------|--------|---------|
| Aktualisierungszeit | `#bbb` | `#000000` |
| Warnungstext | `#ffb74d` | `#000000` |

- **WCAG:** [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum) (Level AA)

#### Problem #3 – Status-Chips kommunizieren Bedeutung nur über Farbe
- **Vorher:** `<Chip label="●">` — kein semantisches Label
- **Nachher:** `aria-label="Ausreichend"`, `aria-label="Knapper Bestand"`, `aria-label="Nicht verfügbar"`
- **WCAG:** [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) (Level A)

#### Problem #4 – Klickbare `<div>`-Elemente statt Buttons (Schnellaktionen)
- **Vorher:** `<div onClick={...}>` für beide Schnellaktions-Buttons
- **Nachher:** `<button>` für beide Elemente
- **WCAG:** [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

#### Problem #5 – Unklarer Button-Text
- **Vorher:** `"Hier klicken"` — gibt keine Information über die Aktion
- **Nachher:** `"Statistiken laden"` — beschreibt die Aktion klar
- **WCAG:** [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG21/#headings-and-labels) (Level AA)

---

## Übersicht der WCAG-Kriterien

| WCAG-Kriterium | Level | Anzahl Fixes |
|----------------|-------|-------------|
| 1.3.1 Info and Relationships | A | 5 |
| 1.4.1 Use of Color | A | 3 |
| 1.4.3 Contrast (Minimum) | AA | 5 |
| 2.4.7 Focus Visible | AA | 1 |
| 4.1.2 Name, Role, Value | A | 11 |
| 2.4.6 Headings and Labels | AA | 3 |
| 3.3.2 Labels or Instructions | A | 1 |

---

## Nachträglich behobene Punkte

### A. StatusBadge — menschenlesbare Labels

**Problem:** Der `aria-label`-Wert wurde aus dem technischen Status-String (`ok`, `low`, `empty`) generiert und war für Screenreader-Nutzer nicht verständlich.

**Behebung in `ArticleList.tsx`:** Eine Mapping-Tabelle `statusLabels` übersetzt die technischen Werte in deutsche Begriffe:

```tsx
const statusLabels: Record<string, string> = {
  ok: 'Ausreichend',
  low: 'Knapper Bestand',
  empty: 'Nicht verfügbar',
}
// Verwendung:
ariaLabel={`Status: ${statusLabels[article.status]}`}
```

**WCAG:** [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) (Level A), [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value) (Level A)

---

### B. Dashboard — farbbasierte Statuszahlen

**Problem:** Die Kennzahlen (Ausreichend, Knapper Bestand, Nicht verfügbar) wurden in Farben dargestellt. Ohne zusätzlichen Text konnte die Bedeutung nur über die Farbe erkannt werden.

**Behebung in `Dashboard.tsx`:** `aria-label` auf den `<p>`-Elementen mit Klartextbeschreibung:

```tsx
<p aria-label={`${okStock} Artikel ausreichend`} style={{ color: '#4caf50' }}>{okStock}</p>
<p aria-label={`${lowStock} Artikel mit knappem Bestand`} style={{ color: '#ff9800' }}>{lowStock}</p>
<p aria-label={`${emptyStock} Artikel nicht verfügbar`} style={{ color: '#f44336' }}>{emptyStock}</p>
```

**WCAG:** [1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) (Level A)

---

### C. Skip-Link für Tastaturnavigation

**Problem:** Tastaturnutzer mussten bei jedem Seitenaufruf die gesamte Seitennavigation durchblättern, bevor sie den Hauptinhalt erreichten.

**Behebung:**

In `App.tsx` wurde ein versteckter Skip-Link vor der Navigation eingefügt, der bei Fokus sichtbar wird:

```tsx
<a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>
// ...
<main id="main-content" className="main-content">
```

In `index.css` wurde folgendes CSS ergänzt:

```css
.skip-link {
  position: absolute;
  top: -48px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

**WCAG:** [2.4.1 Bypass Blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks) (Level A)

---

### D. Live-Region für Statusmeldungen

**Problem:** Das Speichern eines Artikels löste eine MUI `Snackbar` aus, die von Screenreadern nicht zuverlässig angekündigt wird.

**Behebung in `ArticleForm.tsx`:** Eine visuell versteckte `aria-live`-Region mit `role="status"` kündigt die Speichermeldung für Screenreader an:

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
>
  {snackbarOpen ? 'Artikel wurde erfolgreich gespeichert.' : ''}
</div>
```

**WCAG:** [4.1.3 Status Messages](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA)

---

## Aktueller Stand

Alle ursprünglich identifizierten Probleme sowie alle nachträglichen offenen Punkte wurden behoben. Die Anwendung erfüllt nun die WCAG 2.1 AA-Anforderungen in den getesteten Bereichen.

### Aktualisierte WCAG-Kriterienübersicht

| WCAG-Kriterium | Level | Anzahl Fixes |
|----------------|-------|-------------|
| 1.3.1 Info and Relationships | A | 5 |
| 1.4.1 Use of Color | A | 5 |
| 1.4.3 Contrast (Minimum) | AA | 5 |
| 2.4.1 Bypass Blocks | A | 1 |
| 2.4.7 Focus Visible | AA | 1 |
| 4.1.2 Name, Role, Value | A | 12 |
| 4.1.3 Status Messages | AA | 1 |
| 2.4.6 Headings and Labels | AA | 3 |
| 3.3.2 Labels or Instructions | A | 1 |
