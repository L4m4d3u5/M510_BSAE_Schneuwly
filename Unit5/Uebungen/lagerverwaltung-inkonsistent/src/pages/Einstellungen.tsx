import React, { useState } from 'react';
import './Einstellungen.css';

// -----------------------------------------------------------------------
// Einstellungen – CSS-Klassen-Buttons statt Inline-Styles (andere Herangehensweise)
// Auch die Karten sehen anders aus als auf Dashboard und Warnungen
// -----------------------------------------------------------------------

const Einstellungen: React.FC = () => {
  const [firma, setFirma] = useState('Muster AG');
  const [email, setEmail] = useState('admin@muster.ch');
  const [minBestand, setMinBestand] = useState('10');
  const [benachrichtigungen, setBenachrichtigungen] = useState(true);
  const [sprache, setSprache] = useState('de');

  return (
    <div style={{ padding: '24px', maxWidth: '720px' }}>
      <h1 style={{ marginBottom: '6px', color: '#333', fontSize: '24px' }}>Einstellungen</h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '28px', fontSize: '14px' }}>
        Konfigurieren Sie die Anwendung nach Ihren Bedürfnissen.
      </p>

      {/* Info-Banner – andere Karten-Optik als auf Dashboard */}
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
        Änderungen werden nach dem Klick auf «Sichern» übernommen.
      </div>

      {/* ===== KARTE 1: FIRMENDATEN – flaches Design mit Header-Balken ===== */}
      <div
        style={{
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '24px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e0e0e0',
            background: '#fafafa',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Firmendaten</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}
            >
              Firmenname
            </label>
            <input
              type="text"
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}
            >
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Buttons via CSS-Klassen – «Sichern» statt «Speichern»! */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn-abbrechen">Abbrechen</button>
            <button className="btn-sichern">Sichern</button>
          </div>
        </div>
      </div>

      {/* ===== KARTE 2: LAGER-EINSTELLUNGEN ===== */}
      <div
        style={{
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '24px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e0e0e0',
            background: '#fafafa',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Lager-Einstellungen</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}
            >
              Standard-Warnschwelle (Mindestbestand)
            </label>
            <input
              type="number"
              value={minBestand}
              onChange={(e) => setMinBestand(e.target.value)}
              style={{
                width: '120px',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
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

          {/* Inline-Style-Button «Speichern» – absichtlich andere Beschriftung als «Sichern» oben */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                padding: '9px 24px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Speichern
            </button>
          </div>
        </div>
      </div>

      {/* ===== KARTE 3: DARSTELLUNG ===== */}
      <div
        style={{
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e0e0e0',
            background: '#fafafa',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Darstellung</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '6px' }}
            >
              Sprache
            </label>
            <select
              value={sprache}
              onChange={(e) => setSprache(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                minWidth: '180px',
              }}
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* Noch eine weitere Button-Variante: grüner Outline-Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                padding: '7px 20px',
                backgroundColor: 'transparent',
                color: '#2e7d32',
                border: '2px solid #2e7d32',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Einstellungen;
