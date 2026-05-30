import { useState } from 'react'
import { IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import { articles, Article } from '../data/articles'
import StatusBadge from '../components/StatusBadge'

const statusLabels: Record<string, string> = {
  ok: 'Ausreichend',
  low: 'Knapper Bestand',
  empty: 'Nicht verfügbar',
}

/*
 * ACCESSIBILITY-PROBLEME in dieser Komponente:
 *
 * 1. <th>-Elemente ohne scope-Attribut – Screenreader können Tabellenzellen nicht korrekt Spalten zuordnen
 * 2. StatusBadge kommuniziert Status nur über Farbe (siehe StatusBadge.tsx)
 * 3. IconButtons ohne aria-label – Screenreader sagen nur "Button"
 * 4. Dialog: Keine explizite Verbindung zwischen Titel und Dialog-Rolle (kein aria-labelledby)
 * 5. Klickbares <div> im Dialog zum Schliessen statt Button
 * 6. Niedriger Kontrast: Hinweistext in hellem Grau (#aaa)
 * 7. InfoIcon ohne Beschriftung – Icon-Bedeutung für Screenreader unklar
 */
export default function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <div>
      <h2>Artikelübersicht</h2>

      {/* Problem #6 & #7: niedriger Kontrast, InfoIcon ohne aria-label */}
      <p style={{ color: '#000000', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
        <InfoIcon style={{ fontSize: 16, color: '#64b5f6' }} aria-label="Information" />
        Klicken Sie auf einen Artikel für Details
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            {/* Problem #1: th ohne scope="col" */}
            <th scope="col" style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              Artikel
            </th>
            <th scope="col" style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              SKU
            </th>
            <th scope="col" style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              Kategorie
            </th>
            <th scope="col" style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '2px solid #e0e0e0' }}>
              Menge
            </th>
            <th scope="col" style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '2px solid #e0e0e0' }}>
              Status
            </th>
            <th scope="col" style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '2px solid #e0e0e0' }}>
              Aktionen
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px' }}>{article.name}</td>
              <td style={{ padding: '12px 16px', color: '#000000' }}>{article.sku}</td>
              <td style={{ padding: '12px 16px' }}>{article.category}</td>
              <td style={{ padding: '12px 16px', textAlign: 'right' }}>{article.quantity}</td>
              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                {/* Problem #2: StatusBadge nur mit Farbe */}
                <StatusBadge status={article.status} ariaLabel={`Status: ${statusLabels[article.status]}`} />
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                {/* Problem #3: IconButtons ohne aria-label */}
                <IconButton size="small" onClick={() => setSelectedArticle(article)} aria-label={`Artikel "${article.name}" bearbeiten`}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => alert(`Artikel "${article.name}" gelöscht`)} aria-label={`Artikel "${article.name}" löschen`}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Problem #4: Dialog ohne aria-labelledby gesetzt */}
      <Dialog open={selectedArticle !== null} onClose={() => setSelectedArticle(null)}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {selectedArticle && (
            <div>
              <p>
                <strong>Name:</strong> {selectedArticle.name}
              </p>
              <p>
                <strong>SKU:</strong> {selectedArticle.sku}
              </p>
              <p>
                <strong>Kategorie:</strong> {selectedArticle.category}
              </p>
              <p>
                <strong>Menge:</strong> {selectedArticle.quantity}
              </p>
              <p>
                <strong>Mindestmenge:</strong> {selectedArticle.minQuantity}
              </p>
              {/* Problem #5: klickbares div zum Schliessen statt Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  marginTop: 16,
                  color: '#1976d2',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                Schliessen
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
