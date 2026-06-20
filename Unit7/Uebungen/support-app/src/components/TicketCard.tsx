import { Ticket } from '../types/ticket';

interface TicketCardProps {
  ticket: Ticket;
}

const statusClass: Record<Ticket['status'], string> = {
  Offen: 'badge badge--open',
  'In Bearbeitung': 'badge badge--progress',
  Geschlossen: 'badge badge--closed',
};

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="ticket-card">
      <div className="ticket-card__header">
        <span className="ticket-card__id">{ticket.id}</span>
        <span className={statusClass[ticket.status]}>{ticket.status}</span>
      </div>
      <h3 className="ticket-card__title">{ticket.title}</h3>
      <p className="ticket-card__desc">{ticket.description}</p>
      <div className="ticket-card__meta">
        <span className="ticket-card__category">{ticket.category}</span>
        <span className="ticket-card__priority">Priorität: {ticket.priority}</span>
        <span className="ticket-card__date">{ticket.createdAt}</span>
      </div>
    </div>
  );
}
