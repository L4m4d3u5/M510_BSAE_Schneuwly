export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'Niedrig' | 'Mittel' | 'Hoch';
  status: 'Offen' | 'In Bearbeitung' | 'Geschlossen';
  createdBy: { id: string; name: string };
  createdAt: string;
}
