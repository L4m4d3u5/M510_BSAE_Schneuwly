import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

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
      <AppHeader
        title="Einstellungen"
        userName={currentUser?.name ?? ''}
        onLogout={handleLogout}
        nav={[
          { label: 'Dashboard', onClick: () => navigate('/dashboard') },
          { label: 'Tickets', onClick: () => navigate('/tickets') },
        ]}
      />

      <main style={{ flex: 1, padding: '32px', maxWidth: '560px' }}>
        <h2 style={{ marginTop: 0, color: '#333333', fontSize: '20px' }}>Benutzereinstellungen</h2>

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

        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            marginBottom: '28px',
          }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#333333' }}>
            {currentUser?.name}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#666666' }}>{currentUser?.email}</p>
          <span
            style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '2px 10px',
              backgroundColor: currentUser?.role === 'admin' ? '#1565c0' : '#757575',
              color: 'white',
              borderRadius: '10px',
              fontSize: '11px',
            }}
          >
            {currentUser?.role === 'admin' ? 'Administrator' : 'Benutzer'}
          </span>
        </div>

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
                border: '1px solid #cccccc',
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
                border: '1px solid #cccccc',
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
          <PrimaryButton label="Speichern" onClick={handleSave} />
          <SecondaryButton label="Zurück" onClick={() => navigate('/dashboard')} />
        </div>
      </main>

      <AppFooter pageLabel="Einstellungen" userName={currentUser?.name} />
    </div>
  );
}
