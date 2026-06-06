import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function NewTicketPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { addTicket } = useTickets();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Niedrig' | 'Mittel' | 'Hoch'>('Mittel');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FIX Bug 1: location.state wird nicht mehr verwendet – Felder werden lokal initialisiert.

    // FIX Bug 2: createdBy wird korrekt als Objekt { id, name } gespeichert,
    // damit ticket.createdBy.name in der Tabelle funktioniert.
    const newTicket = {
      id: String(Date.now()),
      title,
      description,
      priority,
      status: 'Offen' as const,
      createdBy: {
        id: currentUser?.id ?? 'unbekannt',
        name: currentUser?.name ?? 'Unbekannt',
      },
      createdAt: new Date().toISOString(),
    };

    addTicket(newTicket);
    navigate('/tickets');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader
        title="Neues Ticket"
        userName={currentUser?.name ?? ''}
        onLogout={handleLogout}
        nav={[
          { label: 'Dashboard', onClick: () => navigate('/dashboard') },
          { label: 'Tickets', onClick: () => navigate('/tickets') },
        ]}
      />

      <main
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
              onChange={(e) => setPriority(e.target.value as 'Niedrig' | 'Mittel' | 'Hoch')}
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
            <PrimaryButton type="submit" label="Ticket anlegen" />
            <SecondaryButton type="button" label="Abbrechen" onClick={() => navigate('/tickets')} />
          </div>
        </form>
      </main>

      <AppFooter pageLabel="Neues Ticket" userName={currentUser?.name} />
    </div>
  );
}
