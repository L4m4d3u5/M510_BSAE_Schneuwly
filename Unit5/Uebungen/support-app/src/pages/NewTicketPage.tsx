import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';

export default function NewTicketPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { addTicket } = useTickets();

  // Navigationszustand auslesen: Vorbefüllung aus vorherigem Screen
  // FEHLER 1: location.state ist null, wenn direkt über den Button navigiert wird.
  // Der Zugriff auf .prefill wirft zur Laufzeit:
  //   TypeError: Cannot read properties of null (reading 'prefill')
  const navState = location.state as { prefill: { title: string; description: string } };
  const prefill = navState.prefill;

  const [title, setTitle] = useState(prefill.title);
  const [description, setDescription] = useState(prefill.description);
  const [priority, setPriority] = useState('Mittel');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FEHLER 2: createdBy wird als einfacher String (nur die ID) gespeichert.
    // Die TicketsPage erwartet jedoch: createdBy: { id: string; name: string }
    // Beim Rendern von ticket.createdBy.name.charAt(0) in der Tickets-Tabelle
    // führt dies zu: TypeError: Cannot read properties of undefined (reading 'charAt')
    const newTicket = {
      id: String(Date.now()),
      title,
      description,
      priority: priority as 'Niedrig' | 'Mittel' | 'Hoch',
      status: 'Offen' as const,
      createdBy: currentUser?.id ?? 'unbekannt',
      createdAt: new Date().toISOString(),
    };

    addTicket(newTicket);
    navigate('/tickets');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* ── Header (Neues Ticket) ──────────────────────────────────────────── */}
      <div
        style={{
          padding: '10px 20px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #dddddd',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '16px', color: '#555555' }}>Support App</span>
        <span style={{ margin: '0 8px', color: '#cccccc' }}>/</span>
        <span style={{ fontSize: '16px', color: '#222222', fontWeight: 600 }}>Neues Ticket</span>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: 'auto',
            padding: '4px 10px',
            background: 'none',
            border: '1px solid #dddddd',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#888888',
          }}
        >
          Abmelden
        </button>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: '32px',
          maxWidth: '620px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            padding: '28px',
            borderRadius: '6px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#222222', fontSize: '18px' }}>
            Neues Ticket anlegen
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}
            >
              Titel *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Kurze Beschreibung des Problems"
              style={{
                width: '100%',
                padding: '9px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}
            >
              Beschreibung
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Detaillierte Beschreibung des Problems..."
              style={{
                width: '100%',
                padding: '9px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label
              style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}
            >
              Priorität
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{
                width: '100%',
                padding: '9px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            >
              <option value="Niedrig">Niedrig</option>
              <option value="Mittel">Mittel</option>
              <option value="Hoch">Hoch</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 28px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Erstellen
            </button>
            <button
              type="button"
              onClick={() => navigate('/tickets')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#eeeeee',
                color: '#333333',
                border: '1px solid #bbbbbb',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>

      {/* ── Footer (Neues Ticket) ──────────────────────────────────────────── */}
      <div
        style={{ textAlign: 'center', padding: '20px', fontSize: '11px', color: '#aaaaaa' }}
      >
        Support App – Neues Ticket &nbsp;|&nbsp; {currentUser?.name ?? 'Nicht angemeldet'}
      </div>
    </div>
  );
}
