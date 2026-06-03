import React from 'react';
import { artikel } from '../data/mockData';

// -----------------------------------------------------------------------
// Dashboard – absichtlich uneinheitliche Gestaltung (didaktisches Beispiel)
// -----------------------------------------------------------------------

const Dashboard: React.FC = () => {
  const gesamtArtikel = artikel.length;
  const kritischeArtikel = artikel.filter((a) => a.status === 'kritisch').length;
  const nichtVerfuegbar = artikel.filter((a) => a.status === 'nicht-verfügbar').length;
  const gesamtwert = artikel.reduce((sum, a) => sum + a.bestand * a.preis, 0);
  const lagerorte = [...new Set(artikel.map((a) => a.lagerort.charAt(0)))].length;

  const artikelMitHandlungsbedarf = artikel.filter(
    (a) => a.status === 'kritisch' || a.status === 'nicht-verfügbar',
  );

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '6px', color: '#333', fontSize: '24px' }}>Dashboard</h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '32px' }}>
        Übersicht des aktuellen Lagerstands
      </p>

      {/* ===== KENNZAHLENKARTEN – absichtlich vier verschiedene Designs ===== */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>

        {/* Karte 1: blauer Hintergrund, weisser Text, grosses Padding */}
        <div
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '20px 28px',
            borderRadius: '8px',
            minWidth: '170px',
            flex: '1',
          }}
        >
          <div style={{ fontSize: '40px', fontWeight: 'bold', lineHeight: 1 }}>{gesamtArtikel}</div>
          <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.9 }}>Artikel gesamt</div>
        </div>

        {/* Karte 2: roter Hintergrund, weniger Padding, anderer Radius, Box-Shadow */}
        <div
          style={{
            background: '#c62828',
            color: '#fff',
            padding: '16px',
            borderRadius: '4px',
            minWidth: '160px',
            flex: '1',
            boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
          }}
        >
          <p style={{ fontSize: '34px', fontWeight: 700, margin: '0 0 6px 0' }}>{kritischeArtikel}</p>
          <p style={{ fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Kritische Artikel
          </p>
        </div>

        {/* Karte 3: weisser Hintergrund mit Rahmen, ganz andere Typografie */}
        <div
          style={{
            background: 'white',
            border: '2px solid #e0e0e0',
            padding: '24px 20px',
            borderRadius: '12px',
            minWidth: '210px',
            flex: '1',
          }}
        >
          <h3
            style={{
              margin: '0 0 10px 0',
              fontSize: '11px',
              color: '#888',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Gesamtwert Lager
          </h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2e7d32' }}>
            CHF {gesamtwert.toFixed(2)}
          </div>
        </div>

        {/* Karte 4: grauer Hintergrund, farbiger linker Rand, wieder andere Grösse */}
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderLeft: '5px solid #ff9800',
            padding: '18px 16px',
            borderRadius: '0 6px 6px 0',
            minWidth: '150px',
            flex: '1',
          }}
        >
          <span style={{ display: 'block', fontSize: '38px', fontWeight: 900, color: '#e65100' }}>
            {lagerorte}
          </span>
          <span style={{ fontSize: '13px', color: '#666', display: 'block', marginTop: '6px' }}>
            Lagerorte aktiv
          </span>
        </div>
      </div>

      {/* ===== AKTIONSBEREICH – absichtlich uneinheitliche Buttons ===== */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ marginBottom: '14px', fontSize: '18px', color: '#333' }}>Schnellaktionen</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

          {/* Button 1: blauer Primär-Button, mittleres Padding */}
          <button
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '8px 18px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Bericht laden
          </button>

          {/* Button 2: Outline-Variante, gleicher Radius wie Button 1 */}
          <button
            style={{
              backgroundColor: 'white',
              color: '#1976d2',
              padding: '8px 18px',
              border: '1px solid #1976d2',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Exportieren
          </button>

          {/* Button 3: grau, Pill-Form, kleiner – wirkt wie Sekundär, ist aber anders */}
          <button
            style={{
              backgroundColor: '#9e9e9e',
              color: 'white',
              padding: '6px 14px',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Aktualisieren
          </button>
        </div>
      </div>

      {/* ===== STATUSÜBERSICHT – absichtlich inkonsistente Status-Chips ===== */}
      <div>
        <h2 style={{ marginBottom: '14px', fontSize: '18px', color: '#333' }}>
          Artikel mit Handlungsbedarf ({artikelMitHandlungsbedarf.length})
        </h2>
        <div
          style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {artikelMitHandlungsbedarf.map((a) => (
            <div
              key={a.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #f5f5f5',
              }}
            >
              <div>
                <div style={{ fontWeight: 500, marginBottom: '2px' }}>{a.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {a.kategorie} · {a.lagerort} · Bestand: {a.bestand}
                </div>
              </div>

              {/* Status-Chip "Kritisch": Pill-Badge mit Rahmen und Icon */}
              {a.status === 'kritisch' && (
                <span
                  style={{
                    backgroundColor: '#fff3e0',
                    color: '#e65100',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    border: '1px solid #ffcc80',
                  }}
                >
                  ⚠ Kritisch
                </span>
              )}

              {/* Status-Chip "Nicht verfügbar": absichtlich ganz anders – nur fetter Text */}
              {a.status === 'nicht-verfügbar' && (
                <span
                  style={{
                    color: '#d32f2f',
                    fontWeight: 'bold',
                    fontSize: '13px',
                  }}
                >
                  ✗ Nicht verfügbar
                </span>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '12px',
            fontSize: '13px',
            color: '#888',
          }}
        >
          Davon nicht verfügbar: <strong style={{ color: '#d32f2f' }}>{nichtVerfuegbar}</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
