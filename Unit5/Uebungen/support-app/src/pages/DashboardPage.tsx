import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();

  const offeneTickets = tickets.filter((t) => t.status === 'Offen').length;
  const inBearbeitung = tickets.filter((t) => t.status === 'In Bearbeitung').length;
  const geschlossene = tickets.filter((t) => t.status === 'Geschlossen').length;
  const eigeneTickets = tickets.filter((t) => t.createdBy.id === currentUser?.id).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}
    >
      {/* ── Header (Dashboard) ─────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          borderBottom: '2px solid #e0e0e0',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#444444' }}>
            📋 Support App
          </span>
          <span style={{ marginLeft: '8px', fontSize: '13px', color: '#888888' }}>Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#555555' }}>Hallo, {currentUser?.name}</span>
          <button
            onClick={() => navigate('/tickets')}
            style={{
              padding: '6px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #aaaaaa',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Tickets
          </button>
          <button
            onClick={() => navigate('/einstellungen')}
            style={{
              padding: '6px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #aaaaaa',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Einstellungen
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 14px',
              backgroundColor: '#e53935',
              border: 'none',
              borderRadius: '3px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Abmelden
          </button>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        <h2 style={{ marginTop: 0, color: '#333333', fontSize: '22px' }}>Übersicht</h2>

        {/* Kennzahlenkarten – bewusst unterschiedlich gestaltet */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>

          {/* Karte 1 – orange Akzent */}
          <div
            style={{
              backgroundColor: '#fff3e0',
              border: '1px solid #ffcc02',
              borderRadius: '4px',
              padding: '20px 28px',
              minWidth: '160px',
            }}
          >
            <div style={{ fontSize: '38px', fontWeight: 700, color: '#e65100' }}>
              {offeneTickets}
            </div>
            <div style={{ fontSize: '12px', color: '#bf360c', marginTop: '4px', textTransform: 'uppercase' }}>
              Offene Tickets
            </div>
          </div>

          {/* Karte 2 – blau, andere Anordnung */}
          <div
            style={{
              backgroundColor: '#1976d2',
              borderRadius: '12px',
              padding: '16px 20px',
              minWidth: '160px',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.85 }}>
              In Bearbeitung
            </div>
            <div style={{ fontSize: '42px', fontWeight: 800 }}>{inBearbeitung}</div>
          </div>

          {/* Karte 3 – grün, nur Rahmen */}
          <div
            style={{
              border: '2px solid #4caf50',
              borderRadius: '8px',
              padding: '24px',
              minWidth: '160px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#388e3c', textTransform: 'uppercase' }}>
              Geschlossen
            </p>
            <p style={{ margin: 0, fontSize: '34px', fontWeight: 600, color: '#2e7d32' }}>
              {geschlossene}
            </p>
          </div>

          {/* Karte 4 – grau, kompakt, ohne Rahmen */}
          <div
            style={{
              backgroundColor: '#607d8b',
              padding: '12px 18px',
              color: 'white',
              minWidth: '140px',
            }}
          >
            <span style={{ display: 'block', fontSize: '30px', fontWeight: 700 }}>
              {eigeneTickets}
            </span>
            <span style={{ fontSize: '12px' }}>Meine Tickets</span>
          </div>
        </div>

        {/* Aktions-Buttons – unterschiedliche Stile */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/tickets')}
            style={{
              padding: '10px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Alle Tickets anzeigen
          </button>
          <button
            onClick={() => navigate('/tickets/new')}
            style={{
              padding: '10px 24px',
              backgroundColor: 'white',
              color: '#1976d2',
              border: '2px solid #1976d2',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            + Neues Ticket
          </button>
        </div>
      </div>

      {/* ── Footer (Dashboard) ─────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#eeeeee',
          padding: '10px 24px',
          textAlign: 'right',
          fontSize: '13px',
          color: '#666666',
          borderTop: '1px solid #dddddd',
        }}
      >
        Support App v1.0 &nbsp;|&nbsp; {currentUser?.name}
      </div>
    </div>
  );
}
