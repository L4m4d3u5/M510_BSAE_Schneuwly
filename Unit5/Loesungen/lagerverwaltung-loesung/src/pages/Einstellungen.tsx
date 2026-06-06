import React, { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const Einstellungen: React.FC = () => {
  const [firma, setFirma] = useState('Muster AG');
  const [email, setEmail] = useState('admin@muster.ch');
  const [minBestand, setMinBestand] = useState('10');
  const [benachrichtigungen, setBenachrichtigungen] = useState(true);
  const [sprache, setSprache] = useState('de');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    color: '#555',
    marginBottom: '6px',
    fontWeight: 500,
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '24px',
    overflow: 'hidden',
  };

  const cardHeaderStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderBottom: '1px solid #e0e0e0',
    background: '#f9fafb',
  };

  return (
    <div style={{ padding: '24px', maxWidth: '720px' }}>
      <h1 style={{ marginBottom: '6px', color: '#333', fontSize: '24px' }}>Einstellungen</h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '28px', fontSize: '14px' }}>
        Konfigurieren Sie die Anwendung nach Ihren Bedürfnissen.
      </p>

      {/* Info-Banner */}
      <div
        style={{
          background: '#e8f5e9',
          borderLeft: '4px solid #43a047',
          borderRadius: '4px',
          padding: '12px 16px',
          marginBottom: '28px',
          fontSize: '14px',
          color: '#2e7d32',
        }}
      >
        Änderungen werden nach dem Klick auf «Speichern» übernommen.
      </div>

      {/* Karte 1: Firmendaten */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Firmendaten</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Firmenname</label>
            <input
              type="text"
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>E-Mail-Adresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Einheitliche Buttons – SecondaryButton + PrimaryButton */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <SecondaryButton>Abbrechen</SecondaryButton>
            <PrimaryButton>Speichern</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Karte 2: Lager-Einstellungen */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Lager-Einstellungen</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Standard-Warnschwelle (Mindestbestand)</label>
            <input
              type="number"
              value={minBestand}
              onChange={(e) => setMinBestand(e.target.value)}
              style={{ ...inputStyle, width: '120px' }}
            />
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="benachrichtigungen"
              checked={benachrichtigungen}
              onChange={(e) => setBenachrichtigungen(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label
              htmlFor="benachrichtigungen"
              style={{ fontSize: '14px', color: '#555', cursor: 'pointer' }}
            >
              Warnmeldungen anzeigen
            </label>
          </div>

          {/* Einheitlicher PrimaryButton – gleiche Beschriftung wie oben */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton>Speichern</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Karte 3: Darstellung */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Darstellung</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Sprache</label>
            <select
              value={sprache}
              onChange={(e) => setSprache(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', minWidth: '180px' }}
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* Einheitlicher PrimaryButton – konsistente Beschriftung */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton>Speichern</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Einstellungen;
