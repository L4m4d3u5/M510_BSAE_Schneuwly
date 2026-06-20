import { Link } from 'react-router-dom';
import { mockTickets } from '../data/mockTickets';
import TicketCard from '../components/TicketCard';

export default function TicketList() {
  return (
    <div className="page">
      <div className="page__header">
        <h1>Ticketübersicht</h1>
        <Link to="/tickets/new" className="btn btn-secondary">
          + Neues Ticket
        </Link>
      </div>

      <p className="page__subtitle">
        {mockTickets.length} Tickets insgesamt
      </p>

      <div className="ticket-list">
        {mockTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
