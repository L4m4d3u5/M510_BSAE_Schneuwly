import { Ticket } from '../types';

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Login funktioniert nicht',
    description:
      'Beim Einloggen erscheint eine Fehlermeldung. Das Problem tritt in Chrome und Firefox auf.',
    priority: 'Hoch',
    status: 'Offen',
    createdBy: { id: '2', name: 'Benutzer 1' },
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Dashboard lädt sehr langsam',
    description:
      'Das Dashboard braucht über 10 Sekunden zum Laden. Besonders nach dem ersten Login.',
    priority: 'Mittel',
    status: 'In Bearbeitung',
    createdBy: { id: '3', name: 'Benutzer 2' },
    createdAt: '2024-01-16T14:00:00Z',
  },
  {
    id: '3',
    title: 'Passwort vergessen Funktion fehlt',
    description:
      'Es gibt keinen Link für vergessenes Passwort auf der Login-Seite.',
    priority: 'Niedrig',
    status: 'Offen',
    createdBy: { id: '2', name: 'Benutzer 1' },
    createdAt: '2024-01-17T09:15:00Z',
  },
  {
    id: '4',
    title: 'Tabelle auf mobilen Geräten nicht lesbar',
    description:
      'Auf Smartphones wird die Ticket-Tabelle abgeschnitten und kann nicht gescrollt werden.',
    priority: 'Mittel',
    status: 'Offen',
    createdBy: { id: '1', name: 'Admin' },
    createdAt: '2024-01-18T11:45:00Z',
  },
  {
    id: '5',
    title: 'Export-Funktion erzeugt fehlerhafte CSV-Datei',
    description:
      'Beim Export als CSV werden Umlaute und Sonderzeichen falsch kodiert.',
    priority: 'Hoch',
    status: 'Geschlossen',
    createdBy: { id: '3', name: 'Benutzer 2' },
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '6',
    title: 'Benachrichtigungs-E-Mails kommen nicht an',
    description:
      'Nach dem Schliessen eines Tickets erhalten Benutzer keine E-Mail-Benachrichtigung.',
    priority: 'Mittel',
    status: 'In Bearbeitung',
    createdBy: { id: '1', name: 'Admin' },
    createdAt: '2024-01-19T16:20:00Z',
  },
];
