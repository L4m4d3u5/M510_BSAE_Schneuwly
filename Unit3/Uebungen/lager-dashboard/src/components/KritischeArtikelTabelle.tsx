import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import { Artikel, ArtikelStatus } from '../types'

interface KritischeArtikelTabelleProps {
  artikel: Artikel[]
}

// ─── Status-Chip Konfiguration ────────────────────────────────────────────────
// Jeder Status bekommt eine Farbe und ein Label
const statusConfig: Record<ArtikelStatus, { label: string; color: 'error' | 'warning' | 'success' }> = {
  critical: { label: 'Kritisch',  color: 'error'   },
  warning:  { label: 'Warnung',   color: 'warning'  },
  ok:       { label: 'OK',        color: 'success'  },
}

export default function KritischeArtikelTabelle({ artikel }: KritischeArtikelTabelleProps) {
  // Nur kritische und Warn-Artikel anzeigen, sortiert nach Status (kritisch zuerst)
  const anzeigeArtikel = artikel
    .filter(a => a.status === 'critical' || a.status === 'warning')
    .sort((a, b) => {
      const reihenfolge = { critical: 0, warning: 1, ok: 2 }
      return reihenfolge[a.status] - reihenfolge[b.status]
    })

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Kritische & Warn-Artikel
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {anzeigeArtikel.length} Artikel benötigen Aufmerksamkeit
        {' '}({artikel.filter(a => a.status === 'critical').length} kritisch,{' '}
        {artikel.filter(a => a.status === 'warning').length} Warnung)
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              {/* stickyHeader würde für sehr lange Tabellen nützlich sein */}
              <TableCell sx={{ fontWeight: 700 }}>Artikelname</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Artikelnummer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Kategorie</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Lagerort</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Bestand</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Mindestbestand</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {anzeigeArtikel.map((a) => {
              const cfg = statusConfig[a.status]
              const istKritisch = a.status === 'critical'
              return (
                <TableRow
                  key={a.id}
                  // Kritische Zeilen erhalten einen roten Hintergrund
                  sx={{
                    bgcolor: istKritisch ? 'error.50' : 'warning.50',
                    '&:hover': { bgcolor: istKritisch ? 'error.100' : 'warning.100' },
                  }}
                >
                  <TableCell>{a.name}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.8rem', color: '#555' }}>{a.articleNumber}</code>
                  </TableCell>
                  <TableCell>{a.category}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.8rem' }}>{a.location}</code>
                  </TableCell>
                  {/* Bestand rot wenn kritisch */}
                  <TableCell align="right" sx={{ color: istKritisch ? 'error.main' : 'warning.dark', fontWeight: 700 }}>
                    {a.stock}
                  </TableCell>
                  <TableCell align="right">{a.minStock}</TableCell>
                  <TableCell align="center">
                    {/* Chip: kompaktes Status-Label mit Farbe */}
                    <Chip
                      label={cfg.label}
                      color={cfg.color}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                </TableRow>
              )
            })}

            {anzeigeArtikel.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Alle Artikel sind ausreichend bevorratet ✓
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
