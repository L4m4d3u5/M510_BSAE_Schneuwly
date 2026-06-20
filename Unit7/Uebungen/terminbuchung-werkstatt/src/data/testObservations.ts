// UX-Beobachtungen aus einer vorherigen Validierungsrunde
// Diese Datei dient als Ausgangsmaterial für die Übung.
// Die Studierenden sollen die Beobachtungen auswerten, priorisieren
// und den Prototyp darauf basierend verbessern.

export interface UxObservation {
  id: number;
  area: string;
  observation: string;
  affectedUsers: string;
  severity: 'hoch' | 'mittel' | 'gering';
}

export const testObservations: UxObservation[] = [
  {
    id: 1,
    area: 'Terminübersicht – Navigation',
    observation:
      '2 von 3 Testpersonen fanden den Button „Neuen Termin buchen" nicht sofort. ' +
      'Zwei von ihnen suchten zunächst in der Navigation oben, bevor sie den Button in der Liste entdeckten.',
    affectedUsers: '2/3',
    severity: 'hoch',
  },
  {
    id: 2,
    area: 'Neuer-Termin-Formular – Datum und Uhrzeit',
    observation:
      '2 von 3 Testpersonen waren unsicher, welches Feld (Datum oder Uhrzeit) sie zuerst ausfüllen sollen. ' +
      'Eine Person fragte, ob das Datum im Format TT.MM.JJJJ oder JJJJ-MM-TT eingegeben werden soll.',
    affectedUsers: '2/3',
    severity: 'hoch',
  },
  {
    id: 3,
    area: 'Bestätigungsseite – Rückmeldung',
    observation:
      '1 von 3 Testpersonen wusste nach dem Speichern nicht mit Sicherheit, ob der Termin ' +
      'wirklich erfolgreich gebucht wurde. Die Bestätigungsmeldung wurde als zu unauffällig wahrgenommen.',
    affectedUsers: '1/3',
    severity: 'mittel',
  },
  {
    id: 4,
    area: 'Bestätigungsseite – Weiternavigation',
    observation:
      '2 von 3 Testpersonen suchten nach der Buchung nach einem klareren Weg zurück zur Terminübersicht. ' +
      'Eine Person klickte auf den Browser-Zurück-Button statt auf den Link in der App.',
    affectedUsers: '2/3',
    severity: 'mittel',
  },
  {
    id: 5,
    area: 'Terminübersicht – Statusanzeige',
    observation:
      'Die Terminübersicht wurde grundsätzlich als verständlich wahrgenommen. ' +
      'Die Statusanzeigen (Gebucht, Bestätigt, Ausstehend) wurden von allen 3 Testpersonen richtig interpretiert.',
    affectedUsers: '0/3',
    severity: 'gering',
  },
  {
    id: 6,
    area: 'Neuer-Termin-Formular – Hauptaktion',
    observation:
      '2 von 3 Testpersonen zögerten kurz beim Abschluss des Formulars. ' +
      'Der „Buchen"-Button war optisch nicht stark genug von der Seite abgegrenzt ' +
      'und wurde nicht sofort als Hauptaktion erkannt.',
    affectedUsers: '2/3',
    severity: 'hoch',
  },
  {
    id: 7,
    area: 'Dashboard – Einstieg',
    observation:
      'Alle 3 Testpersonen konnten das Dashboard schnell verstehen. ' +
      'Die Kennzahlenkarten wurden als nützlich bewertet. ' +
      'Der Weg zur Terminübersicht über das Dashboard war intuitiv.',
    affectedUsers: '0/3',
    severity: 'gering',
  },
  {
    id: 8,
    area: 'Neuer-Termin-Formular – Pflichtfelder',
    observation:
      '1 von 3 Testpersonen versuchte, das Formular ohne Fahrzeugmodell abzuschicken. ' +
      'Sie hatte nicht erkannt, dass das Feld obligatorisch ist, da keine Pflichtfeldmarkierung vorhanden war.',
    affectedUsers: '1/3',
    severity: 'mittel',
  },
];
