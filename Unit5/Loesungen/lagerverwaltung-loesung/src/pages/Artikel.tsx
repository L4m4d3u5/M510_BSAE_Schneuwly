import React, { useState } from 'react';
import { artikel as alleArtikel } from '../data/mockData';
import { Artikel, ArtikelStatus } from '../types';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StatusChip from '../components/StatusChip';

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

      {/* Header mit Titel und einheitlichem PrimaryButton */}
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
        <PrimaryButton>+ Neuer Artikel</PrimaryButton>
      </div>

      {/* Filter-Buttons – einheitliche Pill-Form via SecondaryButton */}
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
              fontWeight: filter === f.wert ? 600 : 400,
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

                {/* Einheitlicher StatusChip für alle Zeilen */}
                <td style={{ padding: '10px 14px' }}>
                  <StatusChip status={a.status as ArtikelStatus} />
                </td>

                {/* Aktions-Buttons via SecondaryButton */}
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <SecondaryButton>Bearbeiten</SecondaryButton>
                    <button
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #d32f2f',
                        color: '#d32f2f',
                        borderRadius: '6px',
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

export default ArtikelSeite;
