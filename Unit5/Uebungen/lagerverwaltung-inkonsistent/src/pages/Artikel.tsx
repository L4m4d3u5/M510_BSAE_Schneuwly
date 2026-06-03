import React, { useState } from 'react';
import { artikel as alleArtikel } from '../data/mockData';
import { Artikel, ArtikelStatus } from '../types';

// -----------------------------------------------------------------------
// Artikelseite – absichtlich andere Button- und Status-Chip-Stile als Dashboard
// -----------------------------------------------------------------------

const ArtikelSeite: React.FC = () => {
  const [artikelListe] = useState<Artikel[]>(alleArtikel);
  const [filter, setFilter] = useState<string>('alle');

  const gefilterteArtikel =
    filter === 'alle'
      ? artikelListe
      : artikelListe.filter((a) => a.status === filter);

  const filterOptionen: { label: string; wert: string }[] = [
    { label: 'Alle', wert: 'alle' },
    { label: 'Aktiv', wert: 'aktiv' },
    { label: 'Kritisch', wert: 'kritisch' },
    { label: 'Nicht verfügbar', wert: 'nicht-verfügbar' },
    { label: 'Pausiert', wert: 'pausiert' },
  ];

  return (
    <div style={{ padding: '24px' }}>

      {/* Header mit Titel und Haupt-Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#222' }}>Artikel</h1>
          <p style={{ margin: '4px 0 0 0', color: '#777', fontSize: '14px' }}>
            {artikelListe.length} Artikel im System
          </p>
        </div>

        {/* Primär-Button: grün, grösser, fett – absichtlich anders als blau auf Dashboard */}
        <button
          style={{
            backgroundColor: '#2e7d32',
            color: 'white',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          + Neuer Artikel
        </button>
      </div>

      {/* Filter-Buttons: Pill-Form, wieder anderes Styling */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {filterOptionen.map((f) => (
          <button
            key={f.wert}
            onClick={() => setFilter(f.wert)}
            style={{
              padding: '5px 14px',
              border: filter === f.wert ? '2px solid #1976d2' : '1px solid #ccc',
              borderRadius: '16px',
              backgroundColor: filter === f.wert ? '#e3f2fd' : 'white',
              color: filter === f.wert ? '#1976d2' : '#555',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Artikel-Tabelle */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            border: '1px solid #e0e0e0',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              {['#', 'Artikelname', 'Kategorie', 'Bestand', 'Minimum', 'Preis', 'Lagerort', 'Status', 'Aktionen'].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: '11px 14px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#444',
                      borderBottom: '2px solid #ddd',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {gefilterteArtikel.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#999' }}>{a.id}</td>
                <td style={{ padding: '10px 14px', fontWeight: 500 }}>{a.name}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#666' }}>{a.kategorie}</td>
                <td
                  style={{
                    padding: '10px 14px',
                    fontWeight: a.bestand < a.minBestand ? 'bold' : 'normal',
                    color:
                      a.bestand === 0
                        ? '#d32f2f'
                        : a.bestand < a.minBestand
                        ? '#e65100'
                        : '#222',
                  }}
                >
                  {a.bestand}
                </td>
                <td style={{ padding: '10px 14px', color: '#888', fontSize: '13px' }}>{a.minBestand}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px' }}>
                  CHF {a.preis.toFixed(2)}
                </td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#555' }}>{a.lagerort}</td>

                {/* Status-Chips: absichtlich eckige Badges (kein Radius) – anders als Dashboard-Pills */}
                <td style={{ padding: '10px 14px' }}>
                  <StatusBadge status={a.status} />
                </td>

                {/* Aktions-Buttons: kleine Outline-Buttons – wieder andere Variante */}
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #1976d2',
                        color: '#1976d2',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      Bearbeiten
                    </button>
                    <button
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #d32f2f',
                        color: '#d32f2f',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      Löschen
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {gefilterteArtikel.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#999',
            background: 'white',
            border: '1px solid #e0e0e0',
          }}
        >
          Keine Artikel gefunden.
        </div>
      )}
    </div>
  );
};

// Hilfsfunktion: Status-Badge – eckig, flach, ohne Radius (absichtlich anders als Dashboard)
function StatusBadge({ status }: { status: ArtikelStatus }) {
  const config: Record<ArtikelStatus, { label: string; bg: string; color: string }> = {
    aktiv: { label: 'Aktiv', bg: '#4caf50', color: 'white' },
    kritisch: { label: 'Kritisch', bg: '#ff9800', color: 'white' },
    'nicht-verfügbar': { label: 'Nicht verfügbar', bg: '#f44336', color: 'white' },
    pausiert: { label: 'Pausiert', bg: '#9e9e9e', color: 'white' },
  };
  const c = config[status];
  return (
    <span
      style={{
        backgroundColor: c.bg,
        color: c.color,
        padding: '2px 8px',
        fontSize: '11px',
        borderRadius: '2px',
        display: 'inline-block',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {c.label}
    </span>
  );
}

export default ArtikelSeite;
