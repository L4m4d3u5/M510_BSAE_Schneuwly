import { Card, CardContent, Chip } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WarningIcon from '@mui/icons-material/Warning'
import { articles } from '../data/articles'

/*
 * ACCESSIBILITY-PROBLEME in dieser Komponente:
 *
 * 1. Überschriftenhierarchie: Sprung von <h1> direkt zu <h5> – h2, h3, h4 fehlen
 * 2. Niedriger Kontrast: Grauer Text (#bbb, #aaa) auf weißem/hellem Hintergrund
 * 3. Chips kommunizieren Status nur über Farbe – Label ist nur "●" ohne Bedeutung
 * 4. Warnungsbereich: Textfarbe (#ffb74d – helles Orange) auf hellem Hintergrund kaum lesbar
 * 5. Klickbare <div>-Elemente statt <button> für Schnellaktionen
 * 6. Unklarer Button-Text: "Hier klicken" sagt nichts über die Aktion
 */
export default function Dashboard() {
  const totalArticles = articles.length
  const lowStock = articles.filter((a) => a.status === 'low').length
  const emptyStock = articles.filter((a) => a.status === 'empty').length
  const okStock = articles.filter((a) => a.status === 'ok').length

  return (
    <div>
      {/* Problem #1: Überschriftenhierarchie – h1 vorhanden, nächste Überschriften sind h5 */}
      <h1>Dashboard</h1>

      {/* Problem #2: niedriger Kontrast – hellgrauer Text auf weißem Hintergrund */}
      <p style={{ color: '#bbb', marginBottom: 24 }}>
        Letzte Aktualisierung: 29.05.2025, 14:32 Uhr
      </p>

      {/* Kennzahlenkarten */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <Card style={{ minWidth: 160 }}>
          <CardContent>
            {/* Problem #1: Sprung zu h5 */}
            <h5 style={{ color: '#555', margin: 0 }}>Gesamt Artikel</h5>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0' }}>{totalArticles}</p>
          </CardContent>
        </Card>

        <Card style={{ minWidth: 160 }}>
          <CardContent>
            <h5 style={{ color: '#555', margin: 0 }}>Ausreichend</h5>
            {/* Problem #2: Zahl nur in Farbe Grün – kein Label */}
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0', color: '#4caf50' }}>
              {okStock}
            </p>
          </CardContent>
        </Card>

        <Card style={{ minWidth: 160 }}>
          <CardContent>
            <h5 style={{ color: '#555', margin: 0 }}>Knapper Bestand</h5>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0', color: '#ff9800' }}>
              {lowStock}
            </p>
          </CardContent>
        </Card>

        <Card style={{ minWidth: 160 }}>
          <CardContent>
            <h5 style={{ color: '#555', margin: 0 }}>Nicht verfügbar</h5>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0', color: '#f44336' }}>
              {emptyStock}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Problem #3: Statuslegende – Chips kommunizieren Bedeutung nur über Farbe */}
      <h5>Statusübersicht</h5>
      <div style={{ marginBottom: 24, marginTop: 8 }}>
        <Chip label="●" style={{ background: '#4caf50', color: '#fff', marginRight: 8 }} />
        <Chip label="●" style={{ background: '#ff9800', color: '#fff', marginRight: 8 }} />
        <Chip label="●" style={{ background: '#f44336', color: '#fff' }} />
      </div>

      {/* Problem #4: Warnungsbereich mit sehr geringem Kontrast */}
      <div
        style={{
          background: '#fff3e0',
          border: '1px solid #ffe0b2',
          borderRadius: 8,
          padding: 16,
          marginBottom: 24,
        }}
      >
        {/* Helles Orange (#ffb74d) auf hellem Hintergrund – WCAG Kontrastverhältnis < 3:1 */}
        <p style={{ color: '#ffb74d', display: 'flex', alignItems: 'center', gap: 8 }}>
          <WarningIcon style={{ fontSize: 18 }} />
          {lowStock + emptyStock} Artikel benötigen Aufmerksamkeit
        </p>
      </div>

      {/* Schnellaktionen */}
      <h5>Schnellaktionen</h5>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {/* Problem #5: klickbares div statt button */}
        <div
          onClick={() => alert('Bericht wird erstellt...')}
          style={{
            background: '#1976d2',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <TrendingUpIcon style={{ fontSize: 18 }} />
          Lagerbericht erstellen
        </div>

        {/* Problem #6: unklarer Button-Text "Hier klicken" */}
        <div
          onClick={() => alert('Statistiken werden geladen...')}
          style={{
            background: '#757575',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Hier klicken
        </div>
      </div>
    </div>
  )
}
