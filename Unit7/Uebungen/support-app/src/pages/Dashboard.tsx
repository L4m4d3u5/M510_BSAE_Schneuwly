import { Link } from 'react-router-dom';
import { mockTickets } from '../data/mockTickets';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const offene = mockTickets.filter((t) => t.status === 'Offen').length;
  const inBearbeitung = mockTickets.filter((t) => t.status === 'In Bearbeitung').length;
  const geschlossene = mockTickets.filter((t) => t.status === 'Geschlossen').length;

  return (
    <div className="page">
      <div className="page__header">
        <h1>Dashboard</h1>
        <p className="page__subtitle">Übersicht aller Support-Tickets</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Offene Tickets" value={offene} color="#e74c3c" />
        <StatCard label="In Bearbeitung" value={inBearbeitung} color="#f39c12" />
        <StatCard label="Geschlossen" value={geschlossene} color="#27ae60" />
      </div>

      <div className="dashboard-actions">
        <Link to="/tickets" className="btn btn-primary">
          Zur Ticketübersicht
        </Link>
      </div>
    </div>
  );
}
