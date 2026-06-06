import React from 'react';
import { artikel } from '../data/mockData';
import StatCard from '../components/StatCard';
import ArticleCard from '../components/ArticleCard';

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

      <div style={{ display: 'flex', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <StatCard variant="outlined" color="#ff9800" valueColor="#e65100" value={kritisch.length} label="Kritisch" centered />
        <StatCard variant="outlined" color="#f44336" valueColor="#d32f2f" value={nichtVerfuegbar.length} label="Nicht verfügbar" centered />
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
            <ArticleCard key={a.id} artikel={a} variant="kritisch" />
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
            <ArticleCard key={a.id} artikel={a} variant="nicht-verfügbar" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Warnungen;
