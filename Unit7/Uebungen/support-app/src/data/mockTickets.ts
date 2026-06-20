import { Ticket } from '../types/ticket';

export const mockTickets: Ticket[] = [
  {
    id: 'TK-001',
    title: 'Drucker im Büro 3 reagiert nicht',
    description:
      'Der Netzwerkdrucker im dritten Stockwerk nimmt keine Druckaufträge mehr an. Alle Mitarbeitenden im Büro sind betroffen.',
    priority: 'Mittel',
    category: 'Hardware',
    status: 'Offen',
    createdAt: '2024-06-10',
  },
  {
    id: 'TK-002',
    title: 'VPN-Verbindung bricht regelmäßig ab',
    description:
      'Die VPN-Verbindung trennt sich mehrmals täglich, besonders zwischen 9 und 11 Uhr. Homeoffice-Mitarbeitende sind stark betroffen.',
    priority: 'Hoch',
    category: 'Netzwerk',
    status: 'In Bearbeitung',
    createdAt: '2024-06-09',
  },
  {
    id: 'TK-003',
    title: 'Passwort zurücksetzen – Frau Meier',
    description:
      'Mitarbeiterin kann sich nach Urlaub nicht mehr anmelden. Passwort-Reset wurde telefonisch angefordert.',
    priority: 'Niedrig',
    category: 'Zugang',
    status: 'Geschlossen',
    createdAt: '2024-06-08',
  },
  {
    id: 'TK-004',
    title: 'Software-Update Version 3.2 fehlgeschlagen',
    description:
      'Das automatische Update auf Version 3.2 schlägt auf mehreren Rechnern mit Fehlercode 403 fehl. Manuelle Installation ebenfalls nicht möglich.',
    priority: 'Hoch',
    category: 'Software',
    status: 'Offen',
    createdAt: '2024-06-11',
  },
  {
    id: 'TK-005',
    title: 'Beamer im Konferenzraum B defekt',
    description:
      'Der Beamer zeigt seit heute Morgen kein Bild mehr an. Nächste Besprechung ist um 14 Uhr geplant.',
    priority: 'Mittel',
    category: 'Hardware',
    status: 'Offen',
    createdAt: '2024-06-12',
  },
  {
    id: 'TK-006',
    title: 'E-Mail-Weiterleitung funktioniert nicht',
    description:
      'Automatische Weiterleitungsregel im Mailsystem wird ignoriert. Mails kommen nicht beim Vertreter an.',
    priority: 'Mittel',
    category: 'Software',
    status: 'In Bearbeitung',
    createdAt: '2024-06-12',
  },
];
