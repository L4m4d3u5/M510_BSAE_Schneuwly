import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/users';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginPage() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = mockUsers.find((u) => u.id === selectedUserId);
    if (user) {
      login(user);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* AppHeader wird auf der Login-Seite nicht verwendet – eigene, vereinfachte Variante */}
      <div
        style={{
          backgroundColor: '#1565c0',
          color: 'white',
          padding: '24px 32px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Support Portal</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.8 }}>
          Internes Ticketsystem
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f4f8',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            width: '360px',
          }}
        >
          <h2 style={{ marginTop: 0, color: '#333', fontSize: '20px' }}>Anmelden</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Bitte wählen Sie einen Benutzer aus:</p>

          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '15px',
              boxSizing: 'border-box',
            }}
          >
            <option value="">– Benutzer wählen –</option>
            {mockUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role === 'admin' ? 'Administrator' : 'Benutzer'})
              </option>
            ))}
          </select>

          <PrimaryButton
            label="Einloggen"
            onClick={handleLogin}
            disabled={!selectedUserId}
            style={{ width: '100%', padding: '12px' }}
          />
        </div>
      </div>

      <footer
        style={{
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          padding: '10px 24px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#888888',
        }}
      >
        Support App v1.0
      </footer>
    </div>
  );
}
