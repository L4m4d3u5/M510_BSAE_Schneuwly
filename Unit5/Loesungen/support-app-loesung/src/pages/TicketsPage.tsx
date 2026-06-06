import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StatusChip from '../components/StatusChip';
import { Ticket } from '../types';

export default function TicketsPage() {
  const { currentUser, logout } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader
        title="Tickets"
        userName={currentUser?.name ?? ''}
        onLogout={handleLogout}
        nav={[
          { label: 'Dashboard', onClick: () => navigate('/dashboard') },
          { label: 'Einstellungen', onClick: () => navigate('/einstellungen') },
        ]}
      />

      <main style={{ flex: 1, padding: '24px 32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ margin: 0, color: '#333333' }}>Alle Tickets ({tickets.length})</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <SecondaryButton label="Zurück" onClick={() => navigate('/dashboard')} />
            <PrimaryButton label="+ Neues Ticket" onClick={() => navigate('/tickets/new')} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
              {['Titel', 'Status', 'Priorität', 'Erstellt von', 'Datum'].map((col) => (
                <th
                  key={col}
                  style={{ padding: '10px 12px', textAlign: 'left', color: '#666666', fontWeight: 600 }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket: Ticket, index) => (
              <tr
                key={ticket.id}
                style={{
                  borderBottom: '1px solid #eeeeee',
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                }}
              >
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{ticket.title}</td>
                <td style={{ padding: '10px 12px' }}>
                  <StatusChip status={ticket.status} />
                </td>
                <td style={{ padding: '10px 12px' }}>{ticket.priority}</td>
                <td style={{ padding: '10px 12px' }}>
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
      </main>

      <AppFooter pageLabel="Tickets" userName={currentUser?.name} />
    </div>
  );
}
