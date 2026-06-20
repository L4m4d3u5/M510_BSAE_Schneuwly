import { useLocation, useNavigate } from 'react-router-dom';
import { Ticket } from '../types/ticket';

interface LocationState {
  ticket: Ticket;
}

export default function TicketConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.ticket) {
    return (
      <div className="page">
        <p>Kein Ticket gefunden.</p>
        <button className="btn btn-primary" onClick={() => navigate('/tickets')}>
          Zur Übersicht
        </button>
      </div>
    );
  }

  const { ticket } = state;

  return (
    <div className="page">
      <div className="confirmation">
        <div className="confirmation__icon">✓</div>
        <h1 className="confirmation__heading">Ticket erfasst</h1>
        <p className="confirmation__message">
          Ihr Ticket wurde erfolgreich erstellt und wird bearbeitet.
        </p>

        <div className="confirmation__details">
          <div className="confirmation__row">
            <span className="confirmation__key">Ticket-ID</span>
            <span className="confirmation__value confirmation__value--id">{ticket.id}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Titel</span>
            <span className="confirmation__value">{ticket.title}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Kategorie</span>
            <span className="confirmation__value">{ticket.category}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Priorität</span>
            <span className="confirmation__value">{ticket.priority}</span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Status</span>
            <span className="confirmation__value">
              <span className="badge badge--open">{ticket.status}</span>
            </span>
          </div>
          <div className="confirmation__row">
            <span className="confirmation__key">Erstellt am</span>
            <span className="confirmation__value">{ticket.createdAt}</span>
          </div>
        </div>

        <div className="confirmation__actions">
          <button className="btn btn-primary" onClick={() => navigate('/tickets')}>
            Zur Ticketübersicht
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Zum Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
