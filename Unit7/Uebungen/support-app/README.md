# Übung: UX-Test und Auswertung eines Prototyps

## Ausgangslage

Für eine kleine interne **Support-App** liegt ein klickbarer Prototyp vor.  
Die App soll Mitarbeitenden helfen, Support-Tickets zu erfassen und zu verwalten.

Bevor die Lösung weiterentwickelt wird, soll geprüft werden, wie gut die Nutzererfahrung im aktuellen Stand ist.

---

## Ziel der Übung

Sie führen einen kleinen UX-Test durch, werten die Beobachtungen aus und leiten daraus die wichtigsten Erkenntnisse ab.

---

## Prototyp starten

```bash
npm install
npm run dev
```

Die App ist danach unter [http://localhost:3007](http://localhost:3007) erreichbar.

---

## Kernprozess im Test

> **„Neues Ticket erfassen"**

Dieser Ablauf soll im UX-Test geprüft werden:

1. Nutzer öffnet die App (Dashboard)
2. Nutzer navigiert zur Ticketübersicht
3. Nutzer öffnet das Formular für ein neues Ticket
4. Nutzer füllt das Formular aus und speichert
5. Nutzer sieht die Bestätigung und kehrt zurück

---

## Teil 1 – Testmethode festlegen

Arbeiten Sie in **2er- oder 3er-Gruppen**. Optional

Legen Sie vor dem Test fest:

- **Welche Testmethode** Sie verwenden
- **Warum** diese Methode für diesen Kontext passend ist

Geeignete Methoden sind zum Beispiel:

| Methode | Kurzbeschreibung |
|---|---|
| **Moderierter Mini-Usability-Test** | Eine Person führt Aufgaben durch, eine Person beobachtet und notiert |
| **Cognitive Walkthrough** | Die Gruppe geht den Ablauf Schritt für Schritt durch und stellt Fragen aus Nutzerperspektive |

---

## Teil 2 – Testaufgaben durchführen

Prüfen Sie den Prototyp anhand von **3 konkreten Aufgaben**.

### Vorgeschlagene Aufgaben

1. **Aufgabe 1:** Verschaffen Sie sich einen Überblick über den aktuellen Stand der Support-Tickets.
2. **Aufgabe 2:** Öffnen Sie den Bereich, um ein neues Ticket zu erstellen.
3. **Aufgabe 3:** Erfassen Sie ein neues Ticket mit Titel, Beschreibung, Priorität und Kategorie – und schliessen Sie den Vorgang ab.

> Sie können die Aufgaben selbst anpassen oder ergänzen.

---

## Teil 3 – Beobachtungen festhalten

Dokumentieren Sie **während oder direkt nach dem Test**:

- Wo zögert der Nutzer?
- Wo entsteht Unsicherheit?
- Wo wird falsch geklickt oder gesucht?
- Welche Elemente werden übersehen?
- Wo fehlt eine Rückmeldung?
- Was wirkt verständlich und funktioniert gut?

Verwenden Sie eine einfache Tabelle oder Liste:

| # | Stelle in der App | Beobachtung |
|---|---|---|
| 1 | | |
| 2 | | |
| … | | |

---

## Teil 4 – Ergebnisse auswerten

Formulieren Sie aus Ihren Beobachtungen:

- Mindestens **4 konkrete Erkenntnisse oder Probleme**
- Eine **Priorisierung** der Probleme nach folgendem Schema:

| Priorität | Bedeutung |
|---|---|
| **Kritisch** | Aufgabe kann nicht abgeschlossen werden |
| **Wichtig** | Aufgabe ist deutlich erschwert |
| **Mittel** | Verwirrt oder verzögert die Nutzung |
| **Gering** | Kleinigkeit, kaum spürbare Auswirkung |

---

## Teil 5 – Kurzfazit

Formulieren Sie kurz:

- Was funktioniert **gut**?
- Was sollte **verbessert** werden?
- Welche **zwei Probleme** haben die höchste Priorität?

---

## Erwartetes Ergebnis

Am Ende soll jede Gruppe **abgeben oder vorstellen**:

1. Die gewählte Testmethode und Begründung
2. Die 3 Testaufgaben (ggf. angepasst)
3. Die dokumentierten Beobachtungen
4. Mindestens 4 Erkenntnisse oder Probleme
5. Die Priorisierung der Probleme
6. Ein kurzes Fazit (ca. 5 Sätze)

---

## Zeitrahmen

**Gesamtzeit: ca. 60 Minuten**

| Phase | Dauer |
|---|---|
| Methode und Aufgaben festlegen | 10 Min |
| Test durchführen | 15 Min |
| Beobachtungen auswerten | 20 Min |
| Priorisierung | 10 Min |
| Kurzfazit formulieren | 5 Min |

---

## Hinweise

- Achten Sie nicht nur auf Funktion, sondern auf die **Nutzererfahrung**
- Beobachten Sie auch Unsicherheit, Zögern und Missverständnisse – nicht nur Fehler
- Formulieren Sie Probleme möglichst **konkret** (nicht: „unübersichtlich", sondern: „Der Speichern-Button ist schwer zu finden, weil …")
- Leiten Sie aus den Beobachtungen **klare Erkenntnisse** ab
- Der Prototyp ist absichtlich nicht perfekt – das gehört zur Übung

---

## Projektstruktur (zur Orientierung)

```
src/
├── components/       # Wiederverwendbare UI-Komponenten
│   ├── Header.tsx    # Navigation
│   ├── StatCard.tsx  # Kennzahlenkarte (Dashboard)
│   └── TicketCard.tsx # Einzelne Ticket-Anzeige
├── data/
│   └── mockTickets.ts # Lokale Mock-Daten
├── pages/            # Seiten der App
│   ├── Dashboard.tsx
│   ├── TicketList.tsx
│   ├── NewTicket.tsx
│   └── TicketConfirmation.tsx
└── types/
    └── ticket.ts     # TypeScript-Typen
```
