import React from 'react';
import { artikel } from '../data/mockData';
import MetricCard from '../components/MetricCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StatusChip from '../components/StatusChip';

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

      {/* Kennzahlenkarten – einheitliches MetricCard-Design */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <MetricCard label="Artikel gesamt" value={gesamtArtikel} accentColor="#1976d2" />
        <MetricCard label="Kritische Artikel" value={kritischeArtikel} accentColor="#e65100" />
        <MetricCard
          label="Gesamtwert Lager"
          value={`CHF ${gesamtwert.toFixed(2)}`}
          accentColor="#2e7d32"
        />
        <MetricCard label="Lagerorte aktiv" value={lagerorte} accentColor="#9c27b0" />
      </div>

      {/* Schnellaktionen – einheitliche Button-Komponenten */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ marginBottom: '14px', fontSize: '18px', color: '#333' }}>Schnellaktionen</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <PrimaryButton>Bericht laden</PrimaryButton>
          <SecondaryButton>Exportieren</SecondaryButton>
          <SecondaryButton variant="ghost">Aktualisieren</SecondaryButton>
        </div>
      </div>

      {/* Artikel mit Handlungsbedarf – einheitliche StatusChip-Komponente */}
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
              <StatusChip status={a.status} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '12px', fontSize: '13px', color: '#888' }}>
          Davon nicht verfügbar:{' '}
          <strong style={{ color: '#d32f2f' }}>{nichtVerfuegbar}</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
