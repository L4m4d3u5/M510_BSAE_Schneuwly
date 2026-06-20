import { Link } from 'react-router-dom';
import { mockAppointments } from '../data/mockAppointments';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const freieTermine = 5;
  const gebucht = mockAppointments.filter((a) => a.status === 'Gebucht').length;
  const bestätigt = mockAppointments.filter((a) => a.status === 'Bestätigt').length;

  return (
    <div className="page">
      <div className="page__header">
        <h1>Übersicht</h1>
        <p className="page__subtitle">Terminverwaltung der Werkstatt</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Freie Termine diese Woche" value={freieTermine} color="#2563eb" />
        <StatCard label="Gebuchte Termine" value={gebucht} color="#f59e0b" />
        <StatCard label="Bestätigte Termine" value={bestätigt} color="#16a34a" />
      </div>

      <div className="dashboard-actions">
        <Link to="/termine" className="btn btn-primary">
          Zur Terminübersicht
        </Link>
      </div>
    </div>
  );
}
