import React from 'react';
import { artikel } from '../data/mockData';
import MetricCard from '../components/MetricCard';
import PrimaryButton from '../components/PrimaryButton';
import StatusChip from '../components/StatusChip';

const Warnungen: React.FC = () => {
  const kritisch = artikel.filter((a) => a.status === 'kritisch');
  const nichtVerfuegbar = artikel.filter((a) => a.status === 'nicht-verfügbar');
  const gesamtWarnungen = kritisch.length + nichtVerfuegbar.length;

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '6px', color: '#333', fontSize: '24px' }}>
        Warnungen
      </h1>
      <p style={{ color: '#777', marginTop: 0, marginBottom: '28px', fontSize: '14px' }}>
        {gesamtWarnungen} Artikel erfordern sofortige Aufmerksamkeit
      </p>

      {/* Statistik-Karten – einheitliches MetricCard-Design (wie Dashboard) */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <MetricCard label="Kritisch" value={kritisch.length} accentColor="#e65100" />
        <MetricCard label="Nicht verfügbar" value={nichtVerfuegbar.length} accentColor="#d32f2f" />
      </div>

      {/* Kritische Artikel */}
      <section style={{ marginBottom: '36px' }}>
        <h2 style={{ marginBottom: '14px', fontSize: '17px', color: '#333' }}>
          Kritischer Bestand ({kritisch.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {kritisch.map((a) => (
            <div
              key={a.id}
              style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Einheitlicher StatusChip */}
                <StatusChip status="kritisch" />
                {/* Einheitlicher PrimaryButton */}
                <PrimaryButton>Bestellen</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nicht verfügbare Artikel */}
      <section>
        <h2 style={{ marginBottom: '14px', fontSize: '17px', color: '#333' }}>
          Nicht verfügbar ({nichtVerfuegbar.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {nichtVerfuegbar.map((a) => (
            <div
              key={a.id}
              style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Einheitlicher StatusChip */}
                <StatusChip status="nicht-verfügbar" />
                {/* Einheitlicher PrimaryButton – konsistente Beschriftung */}
                <PrimaryButton>Bestellen</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Warnungen;
