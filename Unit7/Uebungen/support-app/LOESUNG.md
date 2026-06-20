# Lösung: UX-Test und Auswertung des Support-App-Prototyps

> Bearbeitung der Aufgabe aus [`README.md`](./README.md).
> Modul M510 · Unit 7 · Sebastian Schneuwly
>
> **Gewählte Methode:** Moderierter Mini-Usability-Test (Think-Aloud)
> **Geprüfter Kernprozess:** „Neues Ticket erfassen"

---

## Wichtiger Hinweis zur Nutzung dieses Dokuments

Dieses Dokument ist zu ca. 80 % ausgearbeitet. Die mit 🟧 **SELBST ZU ERLEDIGEN**
markierten Stellen erfordern einen **echten Test mit einer realen Testperson** –
diese Beobachtungen lassen sich nicht seriös am Schreibtisch erfinden.

- ✅ **Vorbereitet (fertig):** Teil 1 (Methode), Teil 2 (Aufgaben), Teil 3a (heuristische Vorab‑Analyse), Teil 4 (Erkenntnisse + Priorisierung), Teil 5 (Fazit)
- 🟧 **Selbst zu erledigen:** Teil 3b (Beobachtungstabelle aus echtem Test) – Vorlage liegt bereit
- 📎 Die Checkliste der selbst zu erledigenden Schritte steht zusätzlich am Ende der [`README.md`](./README.md).

---

## Teil 1 – Testmethode festlegen

### Gewählte Methode: Moderierter Mini-Usability-Test (Thinking Aloud)

Eine **Testperson** löst die drei Aufgaben am laufenden Prototyp und spricht
dabei laut aus, was sie denkt, sucht und erwartet (*Think-Aloud-Protokoll*). Eine
**zweite Person moderiert/beobachtet** und protokolliert, greift aber nicht ein.

### Begründung – warum diese Methode in diesem Kontext passt

| Kriterium | Begründung |
|---|---|
| **Klar definierter Kernprozess** | Die Aufgabe gibt einen konkreten End-to-End-Flow vor („Neues Ticket erfassen", Dashboard → Liste → Formular → Bestätigung). Ein aufgabenbasierter Usability-Test bildet genau diesen Pfad ab. |
| **Klickbarer Prototyp vorhanden** | Die App ist real bedienbar (`npm run dev`). Damit ist ein echter Bedien-Test möglich – nicht nur eine theoretische Inspektion. |
| **Aufdecken statt Vermuten** | Think-Aloud macht **Zögern, Unsicherheit und falsche Erwartungen** sichtbar – also genau das, was die Aufgabe in Teil 3 verlangt (nicht nur Fehler, sondern Nutzererfahrung). |
| **Wenig Aufwand, hoher Ertrag** | Schon **1–2 Testpersonen** decken laut Nielsen den Großteil der gravierenden Usability-Probleme auf – ideal für den 60-Minuten-Rahmen. |

> **Ergänzend genutzt:** Vor dem Test wurde ein kurzer **Cognitive Walkthrough**
> als Experten-Vorab-Analyse durchgeführt (siehe Teil 3a), um Hypothesen zu
> bilden. Der moderierte Test (Teil 3b) **validiert** diese Hypothesen mit einer
> realen Person.

**Referenzen:**
- Nielsen, J. (2000): *Why You Only Need to Test with 5 Users* – https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- Nielsen Norman Group: *Thinking Aloud – The #1 Usability Tool* – https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/
- Interaction Design Foundation: *Usability Testing* – https://www.interaction-design.org/literature/topics/usability-testing

---

## Teil 2 – Testaufgaben

Die drei Aufgaben decken den kompletten Kernprozess ab. Sie sind als **Szenarien**
formuliert (Kontext + Ziel), **nicht** als Klick-Anleitung – damit die Testperson
selbst den Weg finden muss.

| # | Szenario / Auftrag an die Testperson | Erfolgskriterium |
|---|---|---|
| **1** | *„Sie kommen morgens an den Arbeitsplatz. Verschaffen Sie sich einen Überblick: Wie viele Support-Tickets sind aktuell offen, in Bearbeitung und geschlossen?"* | Person liest die drei Kennzahlen auf dem Dashboard korrekt ab. |
| **2** | *„Ein Kollege meldet ein neues Problem. Finden Sie die Stelle in der App, an der Sie ein neues Ticket erfassen können."* | Person gelangt zum Formular `/tickets/new` (über Dashboard → Liste oder Header). |
| **3** | *„Erfassen Sie ein neues Ticket: Titel, Beschreibung, Priorität **Hoch**, Kategorie **Software**. Schließen Sie den Vorgang vollständig ab und nennen Sie die Ticket-Nummer."* | Ticket wird gespeichert, Bestätigung erscheint, Person kann die Ticket-ID benennen. |

> **Bewusst eingebaute Stolperstellen** in Aufgabe 3: Pflichtfelder ohne `*`-Markierung,
> Fehler erst nach Klick auf „Ticket erstellen", unauffällige Ticket-ID auf der Bestätigung.

---

## Teil 3 – Beobachtungen

### Teil 3a – Heuristische Vorab-Analyse (Experten-Inspektion) ✅

Diese Befunde stammen aus einer code- und oberflächennahen Experten-Inspektion
und dienen als **Hypothesen**. Jede Zeile verweist auf die konkrete Stelle im
Code, an der die Ursache liegt. Bewertet nach den
**[10 Usability-Heuristiken von Jakob Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/)**.

| # | Stelle in der App | Beobachtung / vermutetes Problem | Verletzte Heuristik | Code-Referenz |
|---|---|---|---|---|
| H1 | Header-Navigation | Der aktive Menüpunkt ist kaum hervorgehoben – Nutzer wissen nicht sicher, auf welcher Seite sie sind. | #1 Sichtbarkeit des Systemstatus | `src/components/Header.tsx`, `src/index.css:73` |
| H2 | Formular „Neues Ticket" | Pflichtfelder sind nicht als solche erkennbar (kein `*`), Nutzer erkennen erst beim Absenden, was Pflicht ist. | #5 Fehlervermeidung | `src/pages/NewTicket.tsx:31`, `src/index.css:310` |
| H3 | Formular-Validierung | Fehlermeldungen erscheinen **erst nach** Klick auf „Ticket erstellen", nicht beim Tippen → spätes Feedback. | #1 Systemstatus / #9 Fehler erkennen | `src/pages/NewTicket.tsx:41`, `src/index.css:347` |
| H4 | Buttons (Formular & Listen) | Primär- und Sekundär-Button wirken optisch ähnlich; „Abbrechen" ist von „Ticket erstellen" schwer zu unterscheiden. Zudem ist „+ Neues Ticket" in der Liste als **sekundärer** (grauer) Button gestaltet, obwohl es die Hauptaktion ist. | #6 Wiedererkennung / #4 Konsistenz | `src/pages/NewTicket.tsx:138`, `src/pages/TicketList.tsx:10`, `src/index.css:188` |
| H5 | Ticketliste (Prioritäts-Anzeige) | Priorität (Hoch/Mittel/Niedrig) hat **keine Farbcodierung** – „Hoch" und „Niedrig" sehen identisch aus, dringende Tickets fallen nicht auf. | #8 Ästhetik & minimalistisches Design (Signalwirkung) | `src/components/TicketCard.tsx:24`, `src/index.css:257` |
| H6 | Bestätigungsseite | Die Ticket-ID ist nicht hervorgehoben (kleine Mono-Schrift in einer Detailzeile) – Nutzer übersehen die wichtigste Information für Rückfragen. | #1 Systemstatus / #6 Wiedererkennung | `src/pages/TicketConfirmation.tsx:38`, `src/index.css:429` |
| H7 | Datenfluss nach dem Speichern | **Strukturell:** Ein neu erfasstes Ticket wird **nicht** in die Liste übernommen (Liste liest statische Mock-Daten). Geht der Nutzer nach dem Speichern „Zur Ticketübersicht", fehlt sein Ticket → Vertrauensbruch. | #1 Systemstatus | `src/pages/TicketList.tsx:5`, `src/data/mockTickets.ts` |
| H8 | Bestätigungsseite nach Reload | **Strukturell:** Lädt der Nutzer die Bestätigungsseite neu (F5), erscheint nur „Kein Ticket gefunden." – kein erklärender, hilfreicher Zustand. | #9 Hilfe bei Fehlern | `src/pages/TicketConfirmation.tsx:13` |
| H9 | Dashboard / Navigation | Der vorgegebene Pfad führt Dashboard → Liste → Formular. Vom Dashboard gibt es keinen direkten „Neues Ticket"-Einstieg (nur über Header-Link, leicht zu übersehen). | #7 Flexibilität & Effizienz | `src/pages/Dashboard.tsx:23` |
| H10 | Ticketkarten | Tickets in der Liste sind nicht anklickbar – keine Detailansicht. Nutzer erwarten oft, eine Karte öffnen zu können. | #7 Flexibilität / Erwartungskonformität | `src/components/TicketCard.tsx:14` |

### Teil 3b – Beobachtungen aus dem echten Test 🟧 SELBST ZU ERLEDIGEN

> **Das musst du selbst tun:** App mit `npm run dev` starten, eine reale Testperson
> die drei Aufgaben aus Teil 2 laut denkend lösen lassen und **währenddessen**
> beobachten. Trage deine Beobachtungen hier ein. Achte auf **Zögern, Unsicherheit,
> Fehlklicks, Übersehenes, fehlendes Feedback** – nicht nur auf Fehler.
> Tipp: Vergleiche, welche der Hypothesen H1–H10 sich bestätigen.

| # | Aufgabe | Stelle in der App | Beobachtung (was tat/sagte die Testperson?) | Bestätigt Hypothese? |
|---|---|---|---|---|
| 1 | Übersicht über alle Tickets verschaffen | Dashboard | ... | Ja/Nein |
| 2 | Suchen der Seite um neue Tickets zu erfassen | Header/Neues Ticket Seite | ... | Ja/Nein |
| 3 | Neues Ticket erfassen | Neues Ticket Seite | ... | Ja/Nein |
| 4 | | | | |
| 5 | | | | |
| … | | | | |

**Rahmendaten des Tests** (selbst ausfüllen):
- Testperson (Rolle/Erfahrung): ________________
- Datum / Dauer: ________________
- Beobachter/Moderator: ________________

---

## Teil 4 – Ergebnisse auswerten

### Konkrete Erkenntnisse / Probleme (≥ 4)

Formuliert nach dem Muster *„Problem, weil Ursache → Folge für den Nutzer"*.
Quelle ist die heuristische Analyse (Teil 3a); nach deinem realen Test bitte mit
den tatsächlichen Beobachtungen abgleichen und ggf. ergänzen.

1. **Neu erfasstes Ticket verschwindet.** Nach dem Speichern taucht das Ticket
   nicht in der Übersicht auf, weil die Liste statische Mock-Daten anzeigt
   (`TicketList.tsx`). Folge: Der Nutzer zweifelt, ob das Ticket wirklich
   gespeichert wurde – der Kernprozess wirkt unzuverlässig.
2. **Pflichtfelder und Validierung kommen zu spät.** Es ist nicht erkennbar,
   welche Felder Pflicht sind (kein `*`), und Fehlermeldungen erscheinen erst
   nach dem Absenden (`NewTicket.tsx`). Folge: Der Nutzer füllt das Formular
   „auf Verdacht" aus und wird erst am Ende korrigiert.
3. **Priorität ist visuell nicht unterscheidbar.** Hoch/Mittel/Niedrig werden
   in derselben grauen Schrift dargestellt (`TicketCard.tsx`, `index.css:257`).
   Folge: Dringende Tickets fallen in der Liste nicht auf – die wichtigste
   Triage-Information geht unter.
4. **Ticket-ID auf der Bestätigung wird übersehen.** Die ID steht klein in einer
   Detailzeile statt prominent (`index.css:429`). Folge: Der Nutzer kann seine
   Ticket-Nummer für Rückfragen nicht nennen.
5. **Orientierung in der Navigation fehlt.** Der aktive Menüpunkt ist kaum
   hervorgehoben (`index.css:73`). Folge: Unsicherheit, wo man sich befindet.
6. **Haupt- und Abbrechen-Aktion sind schwer zu unterscheiden** und die
   „Neues Ticket"-Schaltfläche ist als grauer Sekundär-Button gestaltet
   (`index.css:188`, `TicketList.tsx:10`). Folge: Die wichtigste Aktion wird
   optisch nicht als solche erkannt.

### Priorisierung

| Priorität | Erkenntnis | Begründung |
|---|---|---|
| **Kritisch** | (1) Neu erfasstes Ticket erscheint nicht in der Liste | Der Nutzer kann nicht überprüfen, ob seine Aufgabe (Ticket erfassen) erfolgreich war – Kernprozess untergräbt das Vertrauen. |
| **Wichtig** | (2) Pflichtfelder/Validierung zu spät | Aufgabe deutlich erschwert: mehrfaches Korrigieren, Frust beim ersten Speichern. |
| **Wichtig** | (3) Priorität ohne Farbcodierung | Zentrale Triage-Information geht verloren; erschwert die eigentliche Support-Arbeit spürbar. |
| **Mittel** | (4) Ticket-ID unauffällig | Verzögert/erschwert Rückfragen, blockiert die Aufgabe aber nicht. |
| **Mittel** | (6) Button-Hierarchie unklar | Verwirrt kurz, Aktion ist aber auffindbar. |
| **Gering** | (5) Aktiver Nav-Link kaum sichtbar | Kleinigkeit, kaum spürbare Auswirkung auf den Kernprozess. |

> 🟧 **Nach deinem realen Test:** Priorität ggf. anpassen – z. B. hochstufen,
> wenn die Testperson an einer Stelle tatsächlich gescheitert ist.

---

## Teil 5 – Kurzfazit

**Was funktioniert gut?** Der Kernprozess ist insgesamt schlüssig: Die App ist
aufgeräumt, der Pfad Dashboard → Liste → Formular → Bestätigung ist logisch, die
Pflichtfeld-Prüfung verhindert leere Tickets, und der Erfolg wird durch eine eigene
Bestätigungsseite mit grünem Häkchen klar quittiert. **Was sollte verbessert werden?**
Vor allem die Rückmeldung an den Nutzer: Das neu erstellte Ticket muss in der Liste
erscheinen, Pflichtfelder und Validierung müssen früher sichtbar sein, und wichtige
Informationen (Priorität, Ticket-ID) brauchen visuelles Gewicht. **Die zwei
Probleme mit der höchsten Priorität** sind (1) das **nicht in der Liste auftauchende
neue Ticket** (kritisch, weil der Nutzer den Erfolg seiner Aufgabe nicht verifizieren
kann) und (2) die **zu späte, unmarkierte Pflichtfeld-Validierung** (wichtig, weil
sie das Erfassen unnötig erschwert).

---

## Anhang: Mini-Glossar (Ubiquitous Language)

Begriffe aus der Domäne, wie sie im Prototyp verwendet werden
(Quelle: `src/types/ticket.ts`):

| Begriff | Bedeutung im Prototyp |
|---|---|
| **Ticket** | Ein erfasster Support-Vorgang mit `id`, `title`, `description`, `priority`, `category`, `status`, `createdAt`. |
| **Status** | Lebenszyklus eines Tickets: `Offen` → `In Bearbeitung` → `Geschlossen`. |
| **Priorität** | Dringlichkeit: `Niedrig` \| `Mittel` \| `Hoch`. |
| **Kategorie** | Themengebiet: Hardware, Software, Netzwerk, Zugang, Sonstiges. |

---

## Referenzen (gesamt)

1. Nielsen, J.: *10 Usability Heuristics for User Interface Design* – https://www.nngroup.com/articles/ten-usability-heuristics/
2. Nielsen, J.: *Why You Only Need to Test with 5 Users* – https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
3. Nielsen Norman Group: *Thinking Aloud: The #1 Usability Tool* – https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/
4. Nielsen Norman Group: *How to Conduct a Cognitive Walkthrough* – https://www.nngroup.com/articles/cognitive-walkthrough-workshop/
5. Interaction Design Foundation: *Usability Testing* – https://www.interaction-design.org/literature/topics/usability-testing
6. ISO 9241-11: *Ergonomics of human-system interaction – Usability: Definitions and concepts*
