# Übung: Support-App refactoren, Fehler beheben und Standard-Komponenten einsetzen

## Ausgangslage

Sie erhalten eine React-Applikation einer kleinen internen Support-App. Die Anwendung enthält mehrere Seiten, Mock-Benutzer und eine Ticketverwaltung. Die App ist grundsätzlich aufgebaut, weist jedoch gestalterische Inkonsistenzen auf. Wiederkehrende Elemente wie Header, Footer, Buttons, Statusanzeigen und Kennzahlenkarten sind auf den einzelnen Seiten unterschiedlich umgesetzt. Zusätzlich enthält die Anwendung **zwei Fehler** im Bereich der Ticketerstellung.

## Erste Schritte

Abhängigkeiten installieren und Anwendung starten:

```bash
npm install
npm run dev
```

Melden Sie sich anschliessend mit einem der Mock-Benutzer an (z. B. **Admin**).

---

## Teil 1 – Fehleranalyse und Bugfixing

Untersuchen Sie die Anwendung und beheben Sie die **beiden Fehler** im Bereich der Ticketerstellung.

**Zu prüfen:**

1. Beim Klick auf **«Neues Ticket»** stürzt die Anwendung ab.
2. Nach dem Anlegen eines neuen Tickets stürzt die **Anzeige der Ticketliste** erneut ab.

> **Hinweis:** Fehler 2 ist erst sichtbar, nachdem Fehler 1 behoben wurde.

**Beschreiben Sie nach dem Bugfixing:**

- Wie Sie den Fehler gefunden haben (z. B. Fehlermeldung in der Konsole, Codeanalyse)
- Worin die Ursache des Fehlers lag
- Wie Sie den Fehler behoben haben

---

## Teil 2 – UI vereinheitlichen

Überarbeiten Sie die Anwendung so, dass wiederkehrende UI-Elemente konsistent umgesetzt sind.

**Erstellen und verwenden Sie mindestens folgende Standard-Komponenten:**

| Komponente       | Verwendungszweck                                           |
|------------------|------------------------------------------------------------|
| `AppHeader`      | Einheitlicher Header auf allen Seiten                      |
| `AppFooter`      | Einheitlicher Footer auf allen Seiten                      |
| `PrimaryButton`  | Primäre Aktionen (z. B. Speichern, Erstellen, Einloggen)   |
| `SecondaryButton`| Sekundäre Aktionen (z. B. Abbrechen, Zurück)               |
| `StatusChip`     | Statusanzeige bei Tickets (Offen / In Bearbeitung / ...)   |
| `MetricCard`     | Kennzahlenkarten auf dem Dashboard                         |

Ersetzen Sie die bestehenden, inkonsistenten Inline-Implementierungen durch diese Komponenten.

---

## Teil 3 – Änderung nachvollziehen

Ändern Sie nach dem Refactoring **bewusst eine zentrale Eigenschaft**, zum Beispiel:

- Die Hintergrundfarbe des primären Buttons

Prüfen Sie anschliessend, ob sich die Änderung auf **allen Seiten** korrekt und einheitlich auswirkt.

---

## Anforderungen

- [ ] Fehler 1 (Absturz beim Klick auf «Neues Ticket») behoben
- [ ] Fehler 2 (Absturz nach Anlegen eines Tickets) behoben
- [ ] Header auf allen Seiten einheitlich (`AppHeader`)
- [ ] Footer auf allen Seiten einheitlich (`AppFooter`)
- [ ] Buttons konsistent in primäre und sekundäre Aktionen aufgeteilt
- [ ] Statusanzeigen überall gleich dargestellt (`StatusChip`)
- [ ] Kennzahlenkarten nach gemeinsamem Muster (`MetricCard`)
- [ ] Code sauber strukturiert und verständlich

---

## Erwartetes Ergebnis

Am Ende der Übung liegt eine überarbeitete React-Anwendung vor, in der:

- die beiden Fehler behoben sind
- Header und Footer als wiederverwendbare Komponenten umgesetzt sind
- Buttons, Status-Chips und Kennzahlenkarten konsistent dargestellt werden
- eine zentrale Änderung (z. B. an der Primärfarbe) einfach und überall wirksam möglich ist

---

## Technische Anforderungen

- React (funktionale Komponenten)
- TypeScript
- React Router
- Wiederverwendbare Komponenten in `src/components/`
- Saubere Komponentenstruktur

---

## Hinweise

- Achten Sie auf **Wiederverwendbarkeit**: Eine Komponente soll auf mehreren Seiten einsetzbar sein.
- Verwenden Sie nicht auf jeder Seite eigene Einzellösungen für dasselbe UI-Element.
- Prüfen Sie nach dem Refactoring, ob globale Änderungen einfacher geworden sind als vorher.

---

## Vorgeschlagene Projektstruktur nach dem Refactoring

```
src/
├── components/
│   ├── AppHeader.tsx
│   ├── AppFooter.tsx
│   ├── PrimaryButton.tsx
│   ├── SecondaryButton.tsx
│   ├── StatusChip.tsx
│   └── MetricCard.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TicketsPage.tsx
│   ├── NewTicketPage.tsx
│   └── SettingsPage.tsx
├── context/
│   ├── AuthContext.tsx
│   └── TicketsContext.tsx
├── data/
│   ├── users.ts
│   └── tickets.ts
└── types/
    └── index.ts
```

---

## Ziel der Übung

Die Studierenden sollen lernen, wie man eine bestehende React-Anwendung analysiert, Fehler behebt, die Oberfläche vereinheitlicht und den praktischen Nutzen von Standard-Komponenten in einem realen Anwendungskontext erlebt.
