# Übung: UX-Erkenntnisse auswerten, Prototyp verbessern und UX-Validierungsbericht erstellen

## Ausgangslage

Für eine kleine **Terminbuchungs-App einer Autowerkstatt** liegt ein klickbarer Prototyp vor.  
Zusätzlich stehen **Beobachtungen aus einer vorherigen UX-Validierung** zur Verfügung (→ Datei `test-notes.md`).

Der Prototyp bildet den Ablauf **„Service-Termin buchen"** ab. Nun soll geprüft werden, welche Probleme sich aus den Beobachtungen ableiten lassen und wie der Prototyp gezielt verbessert werden kann.

---

## Ziel der Übung

Sie analysieren vorhandene UX-Beobachtungen, priorisieren die wichtigsten Probleme, überarbeiten den Prototyp gezielt und erstellen einen kurzen **UX-Validierungsbericht**.

---

## Prototyp starten

```bash
npm install
npm run dev
```

Die App ist danach unter [http://localhost:3008](http://localhost:3008) erreichbar.

### Kernprozess

> **„Service-Termin buchen"**

Dieser Ablauf soll im Zentrum der Analyse und der Verbesserungen stehen:

1. Nutzer öffnet die App (Übersicht / Dashboard)
2. Nutzer navigiert zur Terminübersicht
3. Nutzer öffnet das Formular für einen neuen Termin
4. Nutzer füllt das Formular aus und bucht den Termin
5. Nutzer sieht die Bestätigung und kehrt zur Übersicht zurück

---

## Teil 1 – Beobachtungen auswerten

Lesen Sie die bereitgestellten Testnotizen in `test-notes.md`.

**Aufgaben:**

1. Markieren Sie die **wichtigsten Beobachtungen** (mindestens 4)
2. Bündeln Sie ähnliche Beobachtungen zu Themenbereichen
3. Formulieren Sie daraus **mindestens 4 konkrete Erkenntnisse oder Probleme**

> Formulieren Sie Probleme möglichst konkret, z. B.:  
> *„Der Button ‚Neuen Termin buchen' befindet sich am Ende der Liste und wird von 2 von 3 Testpersonen nicht sofort gefunden."*  
> – statt nur: *„Navigation unklar"*

---

## Teil 2 – Probleme priorisieren

Ordnen Sie die identifizierten Probleme nach Wichtigkeit:

| Priorität | Bedeutung |
|---|---|
| **Kritisch** | Aufgabe kann nicht abgeschlossen werden |
| **Wichtig** | Aufgabe ist deutlich erschwert |
| **Mittel** | Verwirrt oder verzögert die Nutzung |
| **Gering** | Kleinigkeit, kaum spürbare Auswirkung |

Erstellen Sie eine **priorisierte Problemliste** mit mindestens 4 Einträgen.

---

## Teil 3 – Prototyp verbessern

Überarbeiten Sie den Prototyp gezielt auf Basis der priorisierten Probleme.

Mögliche Verbesserungen (Auswahl – nicht alle sind zwingend):

- **Button „Neuen Termin buchen"** prominent platzieren (z. B. oben auf der Seite)
- **Hauptaktion im Formular** visuell stärker hervorheben (z. B. grösserer Button, andere Farbe)
- **Bestätigungsseite** verbessern (z. B. auffälligeres Erfolgssymbol, deutliche Hauptaktion)
- **Rücknavigation** nach der Buchung klarer gestalten (z. B. Schaltfläche statt Textlink)
- **Pflichtfelder** im Formular kennzeichnen (z. B. mit `*` und kurzem Hinweis)
- **Datum- / Uhrzeitfelder** verständlicher beschriften oder ergänzen
- **Visuelle Hierarchie** auf einzelnen Seiten verbessern

> Leiten Sie Ihre Anpassungen direkt aus den Beobachtungen ab.  
> Dokumentieren Sie kurz, was Sie geändert haben und warum.

---

## Teil 4 – UX-Validierungsbericht erstellen

Erstellen Sie einen kurzen schriftlichen **UX-Validierungsbericht** mit folgenden Abschnitten:

### 1. Ziel
Was wurde betrachtet und warum?

### 2. Grundlage
Welche Testnotizen oder Beobachtungen lagen vor? Wie wurden sie erhoben?

### 3. Erkenntnisse / Probleme
Welche Probleme wurden aus den Beobachtungen abgeleitet?  
(Mindestens 4 konkrete Erkenntnisse)

### 4. Priorisierung
Welche Probleme sind am wichtigsten? Warum?

### 5. Anpassungen
Welche Änderungen wurden am Prototyp vorgenommen?  
(Was wurde geändert, wo, und aus welchem Grund?)

### 6. Erwartete Verbesserung
Warum sollte die überarbeitete Version eine bessere Nutzererfahrung bieten?

---

## Erwartetes Ergebnis

Am Ende der Übung sollen vorliegen:

1. Eine **priorisierte Liste** von UX-Problemen (mindestens 4 Einträge)
2. Ein **überarbeiteter klickbarer Prototyp** mit dokumentierten Anpassungen
3. Ein **kurzer UX-Validierungsbericht** (als Dokument oder Präsentation)

---

## Zeitrahmen

**Gesamtzeit: ca. 60 Minuten**

| Phase | Dauer |
|---|---|
| Beobachtungen analysieren | 10 Min |
| Probleme priorisieren | 10 Min |
| Prototyp überarbeiten | 25 Min |
| UX-Validierungsbericht erstellen | 15 Min |

---

## Hinweise

- Achten Sie auf **konkrete und nachvollziehbare Problemformulierungen**
- Leiten Sie Änderungen aus den **Beobachtungen** ab, nicht nur aus persönlichem Geschmack
- Verbessern Sie gezielt die **wichtigsten UX-Schwächen** – nicht alles auf einmal
- Dokumentieren Sie klar, **was Sie angepasst haben und warum**
- Der Code soll für andere Studierende **gut lesbar und verständlich** bleiben

---

## Projektstruktur (zur Orientierung)

```
terminbuchung-werkstatt/
├── test-notes.md             ← UX-Beobachtungen aus der Validierung
├── src/
│   ├── components/
│   │   ├── Header.tsx        ← Navigation
│   │   ├── StatCard.tsx      ← Kennzahlenkarte
│   │   └── AppointmentCard.tsx ← Einzelne Terminanzeige
│   ├── data/
│   │   ├── mockAppointments.ts ← Mock-Daten
│   │   └── testObservations.ts ← Strukturierte Beobachtungen (TypeScript)
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── AppointmentList.tsx
│   │   ├── NewAppointment.tsx
│   │   └── AppointmentConfirmation.tsx
│   └── types/
│       └── appointment.ts    ← TypeScript-Typen
```

---

## Ziel der Übung (Zusammenfassung)

Die Studierenden sollen lernen:

- wie aus **UX-Beobachtungen** konkrete Probleme abgeleitet werden
- wie Probleme **priorisiert** werden
- wie ein Prototyp **gezielt auf Basis von Erkenntnissen** verbessert wird
- wie ein kurzer **UX-Validierungsbericht** aufgebaut und formuliert wird
