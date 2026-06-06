import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('hell');
  const [language, setLanguage] = useState('de');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header (Einstellungen) ─────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(90deg, #e8f5e9 0%, #c8e6c9 100%)',
          padding: '20px 40px 20px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            color: '#2e7d32',
            marginRight: 'auto',
            fontStyle: 'italic',
          }}
        >
          ⚙ Einstellungen
        </span>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
          style={{ color: '#388e3c', fontSize: '14px' }}
        >
          Dashboard
        </a>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/tickets'); }}
          style={{ color: '#388e3c', fontSize: '14px' }}
        >
          Tickets
        </a>
        <button
          onClick={handleLogout}
          style={{
            padding: '5px 14px',
            backgroundColor: '#c62828',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '32px', maxWidth: '560px' }}>
        <h2 style={{ marginTop: 0, color: '#2e7d32', fontSize: '20px' }}>
          Benutzereinstellungen
        </h2>

        {saved && (
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              borderRadius: '4px',
              padding: '10px 16px',
              marginBottom: '16px',
              color: '#2e7d32',
              fontSize: '14px',
            }}
          >
            ✓ Einstellungen wurden gespeichert.
          </div>
        )}

        {/* Benutzerinformation */}
        <div
          style={{
            backgroundColor: '#f1f8e9',
            padding: '16px',
            borderRadius: '6px',
            marginBottom: '28px',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#33691e' }}>
            {currentUser?.name}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#558b2f' }}>{currentUser?.email}</p>
          <span
            style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '2px 10px',
              backgroundColor: currentUser?.role === 'admin' ? '#1b5e20' : '#558b2f',
              color: 'white',
              borderRadius: '10px',
              fontSize: '11px',
            }}
          >
            {currentUser?.role === 'admin' ? 'Administrator' : 'Benutzer'}
          </span>
        </div>

        {/* Einstellungs-Formular */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '14px', color: '#333333' }}>
                E-Mail-Benachrichtigungen aktivieren
              </span>
            </label>
          </div>

          <div>
            <label
              style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}
            >
              Erscheinungsbild
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #a5d6a7',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <option value="hell">Hell</option>
              <option value="dunkel">Dunkel</option>
              <option value="system">Systemstandard</option>
            </select>
          </div>

          <div>
            <label
              style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444444' }}
            >
              Sprache
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #a5d6a7',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="fr">Französisch</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '11px 32px',
              backgroundColor: '#388e3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '15px',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            Speichern
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '11px 24px',
              backgroundColor: 'transparent',
              color: '#555555',
              border: '2px solid #cccccc',
              borderRadius: '4px',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Zurück
          </button>
        </div>
      </div>

      {/* ── Footer (Einstellungen) ─────────────────────────────────────────── */}
      <div
        style={{
          borderTop: '3px solid #81c784',
          backgroundColor: '#f9fbe7',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#558b2f', fontSize: '13px' }}>Einstellungen</span>
        <span style={{ color: '#aaaaaa', fontSize: '12px' }}>Support App &bull; v1.0.0</span>
        <span style={{ color: '#558b2f', fontSize: '13px' }}>{currentUser?.name}</span>
      </div>
    </div>
  );
}
