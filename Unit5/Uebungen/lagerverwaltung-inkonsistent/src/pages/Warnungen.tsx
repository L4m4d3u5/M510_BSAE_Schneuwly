import React from 'react';
import { artikel } from '../data/mockData';

// -----------------------------------------------------------------------
// Warnungen – absichtlich wieder andere Button- und Status-Darstellung
// -----------------------------------------------------------------------

const Warnungen: React.FC = () => {
  const kritisch = artikel.filter((a) => a.status === 'kritisch');
  const nichtVerfuegbar = artikel.filter((a) => a.status === 'nicht-verfügbar');
  const gesamtWarnungen = kritisch.length + nichtVerfuegbar.length;

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '6px', color: '#b71c1c', fontSize: '24px' }}>
        ⚠ Warnungen
      </h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '28px', fontSize: '14px' }}>
        {gesamtWarnungen} Artikel erfordern sofortige Aufmerksamkeit
      </p>

      {/* ===== STATISTIK-KARTEN – absichtlich anders als auf Dashboard ===== */}
      {/* Dashboard: gefüllte Karten · Warnungen: nur Rahmen, riesige Zahlen */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>

        {/* Karte: oranger Rahmen, kein Hintergrund, zentriert */}
        <div
          style={{
            border: '3px solid #ff9800',
            borderRadius: '8px',
            padding: '20px 28px',
            textAlign: 'center',
            minWidth: '150px',
          }}
        >
          <div style={{ fontSize: '52px', fontWeight: 'bold', color: '#e65100', lineHeight: 1 }}>
            {kritisch.length}
          </div>
          <div
            style={{
              color: '#ff9800',
              fontSize: '11px',
              fontWeight: 'bold',
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Kritisch
          </div>
        </div>

        {/* Karte: roter Rahmen – gleiche Struktur, aber andere Farbe */}
        <div
          style={{
            border: '3px solid #f44336',
            borderRadius: '8px',
            padding: '20px 28px',
            textAlign: 'center',
            minWidth: '150px',
          }}
        >
          <div style={{ fontSize: '52px', fontWeight: 'bold', color: '#d32f2f', lineHeight: 1 }}>
            {nichtVerfuegbar.length}
          </div>
          <div
            style={{
              color: '#f44336',
              fontSize: '11px',
              fontWeight: 'bold',
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Nicht verfügbar
          </div>
        </div>
      </div>

      {/* ===== KRITISCHE ARTIKEL ===== */}
      <section style={{ marginBottom: '36px' }}>
        <h2
          style={{
            marginBottom: '14px',
            fontSize: '17px',
            color: '#e65100',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ⚠ Kritischer Bestand ({kritisch.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {kritisch.map((a) => (
            <div
              key={a.id}
              style={{
                background: '#fff8e1',
                border: '1px solid #ffe082',
                borderRadius: '6px',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{a.name}</div>
                <div style={{ fontSize: '13px', color: '#777' }}>
                  Bestand:{' '}
                  <strong style={{ color: '#e65100' }}>{a.bestand}</strong> / Min: {a.minBestand} ·
                  Lager {a.lagerort}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Status-Label: nur farbiger Text in Grossbuchstaben – keine Badge-Form */}
                <span style={{ color: '#e65100', fontWeight: 'bold', fontSize: '13px' }}>
                  KRITISCH
                </span>

                {/* Button: orange, eckig, Grossbuchstaben – ganz anders als Dashboard */}
                <button
                  style={{
                    backgroundColor: '#e65100',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Bestellen
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NICHT VERFÜGBARE ARTIKEL ===== */}
      <section>
        <h2
          style={{
            marginBottom: '14px',
            fontSize: '17px',
            color: '#d32f2f',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ✗ Nicht verfügbar ({nichtVerfuegbar.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {nichtVerfuegbar.map((a) => (
            <div
              key={a.id}
              style={{
                background: '#ffebee',
                border: '1px solid #ef9a9a',
                borderRadius: '6px',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{a.name}</div>
                <div style={{ fontSize: '13px', color: '#777' }}>
                  Bestand: <strong style={{ color: '#d32f2f' }}>0</strong> / Min: {a.minBestand} ·
                  Lager {a.lagerort}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Status-Label: schwarze Box mit weissem Text – wieder andere Form */}
                <span
                  style={{
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Ausverkauft
                </span>

                {/* Button: rund, anderer Text als oben ("Jetzt bestellen" statt "Bestellen") */}
                <button
                  style={{
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    padding: '6px 20px',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Jetzt bestellen
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Warnungen;
