import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';

export default function TicketsPage() {
  const { currentUser, logout } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Statusanzeigen – absichtlich unterschiedlich je nach Position in der Liste
  const getStatusStyle = (status: string, index: number): CSSProperties => {
    if (index % 3 === 0) {
      const color =
        status === 'Offen'
          ? '#e65100'
          : status === 'In Bearbeitung'
          ? '#1565c0'
          : '#2e7d32';
      return { color, fontWeight: 600 };
    } else if (index % 3 === 1) {
      const bg =
        status === 'Offen'
          ? '#fff3e0'
          : status === 'In Bearbeitung'
          ? '#e3f2fd'
          : '#e8f5e9';
      const borderColor =
        status === 'Offen'
          ? '#ff9800'
          : status === 'In Bearbeitung'
          ? '#2196f3'
          : '#4caf50';
      return {
        display: 'inline-block',
        padding: '2px 8px',
        backgroundColor: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: '10px',
        fontSize: '12px',
      };
    } else {
      const bg =
        status === 'Offen'
          ? '#f44336'
          : status === 'In Bearbeitung'
          ? '#ff9800'
          : '#4caf50';
      return {
        display: 'inline-block',
        padding: '3px 8px',
        backgroundColor: bg,
        color: 'white',
        borderRadius: '3px',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
      };
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header (Tickets) ───────────────────────────────────────────────── */}
      <header
        style={{
          backgroundColor: 'white',
          borderBottom: '3px solid #1976d2',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 500, color: '#1976d2', letterSpacing: '1px' }}>
          TICKET-VERWALTUNG
        </h2>
        <nav style={{ display: 'flex', gap: '16px', marginLeft: 'auto' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
            style={{ color: '#555555', textDecoration: 'none', fontSize: '14px' }}
          >
            Dashboard
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('/einstellungen'); }}
            style={{ color: '#555555', textDecoration: 'none', fontSize: '14px' }}
          >
            Einstellungen
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleLogout(); }}
            style={{ color: '#e53935', textDecoration: 'none', fontSize: '14px' }}
          >
            Abmelden
          </a>
        </nav>
      </header>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '24px 32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ margin: 0, color: '#333333' }}>
            Alle Tickets ({tickets.length})
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid #999999',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Back
            </button>
            <button
              onClick={() => navigate('/tickets/new')}
              style={{
                padding: '8px 18px',
                backgroundColor: '#43a047',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              + Neues Ticket
            </button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: '#666666', fontWeight: 600 }}>
                Titel
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: '#666666', fontWeight: 600 }}>
                Status
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: '#666666', fontWeight: 600 }}>
                Priorität
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: '#666666', fontWeight: 600 }}>
                Erstellt von
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: '#666666', fontWeight: 600 }}>
                Datum
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                style={{
                  borderBottom: '1px solid #eeeeee',
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                }}
              >
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{ticket.title}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={getStatusStyle(ticket.status, index)}>{ticket.status}</span>
                </td>
                <td style={{ padding: '10px 12px' }}>{ticket.priority}</td>
                <td style={{ padding: '10px 12px' }}>
                  {/* Avatar-Initial + Name des Erstellers */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#e3f2fd',
                        color: '#1565c0',
                        fontWeight: 600,
                        fontSize: '12px',
                        flexShrink: 0,
                      }}
                    >
                      {ticket.createdBy.name.charAt(0)}
                    </span>
                    <span>{ticket.createdBy.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 12px', color: '#888888' }}>
                  {new Date(ticket.createdAt).toLocaleDateString('de-CH')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer (Tickets) ───────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: '4px solid #1976d2',
          padding: '14px 32px',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '13px',
          color: '#777777',
        }}
      >
        <span>Ticketliste &nbsp;|&nbsp; {currentUser?.name}</span>
        <span>{tickets.length} Tickets gesamt</span>
      </div>
    </div>
  );
}
