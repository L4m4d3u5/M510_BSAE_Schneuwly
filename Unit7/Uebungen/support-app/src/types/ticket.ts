export type TicketStatus = 'Offen' | 'In Bearbeitung' | 'Geschlossen';
export type TicketPriority = 'Niedrig' | 'Mittel' | 'Hoch';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  category: string;
  status: TicketStatus;
  createdAt: string;
}
