# MUI Demo – Material UI Komponenten

Eine React + TypeScript Demo-App, die die wichtigsten Komponenten von **Material UI (MUI)** zeigt und erklärt.

## Was ist MUI?

[Material UI](https://mui.com/) ist eine React-Komponentenbibliothek, die Googles **Material Design** umsetzt. Sie liefert fertige, zugängliche und anpassbare UI-Komponenten, die mit der `sx`-Prop direkt im JSX gestylt werden können.

### Installation in einem eigenen Projekt

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material   # optional: Icons
```

---

## Projektstruktur

```
mui-demo/
├── src/
│   ├── main.tsx              # ThemeProvider + BrowserRouter
│   ├── App.tsx               # Routing (4 Seiten)
│   ├── components/
│   │   └── Navigation.tsx    # AppBar + Tabs
│   └── pages/
│       ├── Grundlagen.tsx    # Typography, Button, Chip, Badge
│       ├── Eingaben.tsx      # TextField, Select, Checkbox, Radio, Slider
│       ├── Layout.tsx        # Box, Stack, Grid, Card
│       └── Feedback.tsx      # Alert, Snackbar, Dialog, Progress, Skeleton
└── ...
```

---

## Demo-Seiten

### 1. Grundlagen
Grundlegende Anzeigekomponenten:
- **Typography** – Textvarianten (`h1`–`h6`, `body1`, `body2`, `caption`, ...)
- **Button** – Varianten `contained`, `outlined`, `text`; mit Icons
- **ButtonGroup** – Mehrere Buttons als Gruppe
- **IconButton** – Button mit Icon ohne Text
- **Chip** – Tags, Labels; löschbar, mit Avatar
- **Badge** – Zähler auf einem anderen Element

### 2. Eingaben
Formular-Steuerelemente:
- **TextField** – Texteingabe; Varianten `outlined`, `filled`, `standard`; multiline, error
- **Select** – Dropdown mit `FormControl` und `InputLabel`
- **Checkbox** – Mehrfachauswahl
- **Switch** – Ein/Aus-Umschalter
- **RadioGroup** – Einfachauswahl
- **Slider** – Schieberegler mit `min`, `max`, `step`, `marks`

### 3. Layout
Layoutkomponenten:
- **Box** – Universelles Layout-Element; `sx`-Prop für Theme-Werte
- **Stack** – Flexbox-Wrapper; `direction`, `spacing`
- **Grid** – 12-Spalten-System; responsive Breakpoints (`xs`, `sm`, `md`)
- **Paper** – Erhöhte Fläche mit Schatten (`elevation`)
- **Card** – Karte mit `CardMedia`, `CardContent`, `CardActions`

### 4. Feedback
Benutzer-Feedback und Ladeanimationen:
- **Alert** – Informationsmeldungen; `severity`: `success`, `info`, `warning`, `error`
- **Snackbar** – Temporäre Nachricht am Bildschirmrand
- **Dialog** – Modale Dialoge mit Bestätigung
- **LinearProgress** – Horizontaler Ladebalken; `determinate` / `indeterminate`
- **CircularProgress** – Runder Ladeindikator
- **Skeleton** – Ladeplatzhalter für Texte, Bilder, Kreise

---

## Kernkonzepte

### ThemeProvider & createTheme
Das Theme wird in `main.tsx` definiert und mit `ThemeProvider` bereitgestellt:

```tsx
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary:   { main: '#1565c0' },
    secondary: { main: '#ef6c00' },
  },
})

<ThemeProvider theme={theme}>
  <CssBaseline />   {/* CSS-Normalisierung */}
  <App />
</ThemeProvider>
```

### sx-Prop
Die `sx`-Prop erlaubt direktes Styling mit Theme-Werten:

```tsx
<Box
  sx={{
    p: 2,                     // padding: 2 * 8px = 16px
    mt: 3,                    // margin-top: 3 * 8px = 24px
    bgcolor: 'primary.main',  // Theme-Farbe
    borderRadius: 2,          // 2 * 4px = 8px
    color: 'white',
  }}
>
  Inhalt
</Box>
```

### Responsive Breakpoints
MUI verwendet 5 Breakpoints: `xs` (0px), `sm` (600px), `md` (900px), `lg` (1200px), `xl` (1536px):

```tsx
<Grid item xs={12} sm={6} md={4}>
  {/* Volle Breite mobil, halb ab 600px, ein Drittel ab 900px */}
</Grid>
```

---

## App starten

```bash
npm install
npm run dev
```

Die App läuft auf [http://localhost:3002](http://localhost:3002).

---

## Weiterführende Links

- [MUI Dokumentation](https://mui.com/material-ui/getting-started/)
- [MUI Komponentenübersicht](https://mui.com/material-ui/all-components/)
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [sx-Prop Referenz](https://mui.com/system/getting-started/the-sx-prop/)
