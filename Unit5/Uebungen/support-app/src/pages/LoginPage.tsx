import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/users';

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

      {/* ── Header (Login) ─────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#1565c0',
          color: 'white',
          padding: '24px 32px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>Support Portal</h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.8 }}>
          Internes Ticketsystem
        </p>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
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

          <button
            onClick={handleLogin}
            disabled={!selectedUserId}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: selectedUserId ? '#1565c0' : '#cccccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: selectedUserId ? 'pointer' : 'not-allowed',
              fontWeight: 600,
            }}
          >
            Einloggen
          </button>
        </div>
      </div>

      {/* ── Footer (Login) ─────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#222222',
          color: '#aaaaaa',
          padding: '16px 32px',
          textAlign: 'center',
          fontSize: '12px',
        }}
      >
        &copy; 2024 Support Portal – Internes System
      </div>
    </div>
  );
}
