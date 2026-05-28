import { useMemo } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid'
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { produkte, Produkt } from '../data/mockData'

// ─── Spaltendefinitionen ──────────────────────────────────────────────────────
const spalten: GridColDef<Produkt>[] = [
  {
    field: 'artikelnummer',
    headerName: 'Artikelnummer',
    width: 130,
    // renderCell: eigene Darstellung pro Zelle
    renderCell: (params: GridRenderCellParams<Produkt, string>) => (
      <code style={{ fontSize: '0.8rem', color: '#555' }}>{params.value}</code>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'kategorie',
    headerName: 'Kategorie',
    width: 150,
    renderCell: (params: GridRenderCellParams<Produkt, string>) => (
      <Chip label={params.value} size="small" color="primary" variant="outlined" />
    ),
  },
  {
    field: 'lagerbestand',
    headerName: 'Lagerbestand',
    type: 'number',
    width: 130,
    // Bestandswarnung direkt in der Zelle anzeigen
    renderCell: (params: GridRenderCellParams<Produkt, number>) => {
      const unterbestand = params.value! < (params.row.mindestbestand ?? 0)
      return (
        <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end" width="100%">
          <Typography variant="body2" color={unterbestand ? 'error' : 'text.primary'} fontWeight={unterbestand ? 700 : 400}>
            {params.value?.toLocaleString('de-CH')}
          </Typography>
          {unterbestand
            ? <Tooltip title="Unter Mindestbestand"><WarningAmberIcon color="error" sx={{ fontSize: 16 }} /></Tooltip>
            : <CheckCircleOutlineIcon color="success" sx={{ fontSize: 16, opacity: 0.5 }} />
          }
        </Stack>
      )
    },
  },
  {
    field: 'mindestbestand',
    headerName: 'Mindestbestand',
    type: 'number',
    width: 140,
    renderCell: (params: GridRenderCellParams<Produkt, number>) => (
      <Typography variant="body2" textAlign="right" width="100%">
        {params.value?.toLocaleString('de-CH')}
      </Typography>
    ),
  },
  {
    field: 'einheit',
    headerName: 'Einheit',
    width: 80,
  },
  {
    field: 'preis',
    headerName: 'Preis (CHF)',
    type: 'number',
    width: 110,
    // valueFormatter: Wert formatieren ohne eigenes JSX
    valueFormatter: (value: number) =>
      value.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    field: 'lieferant',
    headerName: 'Lieferant',
    width: 160,
  },
  {
    field: 'standort',
    headerName: 'Standort',
    width: 100,
    renderCell: (params: GridRenderCellParams<Produkt, string>) => (
      <Chip label={params.value} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: '0.78rem' }} />
    ),
  },
]

// ─── Statistik-Kacheln ────────────────────────────────────────────────────────
function StatKachel({ label, wert, farbe }: { label: string; wert: number | string; farbe?: string }) {
  return (
    <Paper elevation={1} sx={{ px: 2.5, py: 1.5, minWidth: 140, borderLeft: `4px solid ${farbe ?? '#1565c0'}` }}>
      <Typography variant="h6" fontWeight={700} color={farbe ?? 'primary.main'}>
        {typeof wert === 'number' ? wert.toLocaleString('de-CH') : wert}
      </Typography>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Paper>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────
export default function ProduktDataGrid() {
  // Statistiken einmalig berechnen
  const stats = useMemo(() => {
    const unterbestand = produkte.filter(p => p.lagerbestand < p.mindestbestand).length
    const kategorien   = new Set(produkte.map(p => p.kategorie)).size
    const gesamtwert   = produkte.reduce((s, p) => s + p.lagerbestand * p.preis, 0)
    return { unterbestand, kategorien, gesamtwert }
  }, [])

  return (
    <Box>
      {/* ── Statistik-Leiste ─────────────────────────────────── */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
        <StatKachel label="Produkte gesamt"    wert={produkte.length} />
        <StatKachel label="Kategorien"         wert={stats.kategorien} farbe="#7b1fa2" />
        <StatKachel label="Unter Mindestbestand" wert={stats.unterbestand} farbe="#c62828" />
        <StatKachel
          label="Gesamtwert Lager"
          wert={`CHF ${stats.gesamtwert.toLocaleString('de-CH', { maximumFractionDigits: 0 })}`}
          farbe="#2e7d32"
        />
      </Stack>

      {/* ── DataGrid ─────────────────────────────────────────── */}
      <Paper elevation={2}>
        <DataGrid
          rows={produkte}
          columns={spalten}
          autoHeight

          // Startzustand: 25 Zeilen pro Seite
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          // Wählbare Zeilenzahlen pro Seite
          pageSizeOptions={[10, 25, 50, 100]}

          // Toolbar mit Suche, Spaltenfilter und CSV-Export
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: { showQuickFilter: true },
          }}

          // Zeilen mit Unterbestand farblich hervorheben
          getRowClassName={(params) =>
            params.row.lagerbestand < params.row.mindestbestand
              ? 'zeile-unterbestand'
              : ''
          }

          sx={{
            border: 'none',
            // CSS für die Fehlerzeile (getRowClassName)
            '& .zeile-unterbestand': {
              backgroundColor: '#fff8f8',
              '&:hover': { backgroundColor: '#ffebee' },
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'primary.main',
              color: '#fff',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
            },
            '& .MuiDataGrid-sortIcon': {
              color: '#fff',
            },
            '& .MuiDataGrid-menuIconButton': {
              color: '#fff',
            },
          }}
        />
      </Paper>
    </Box>
  )
}
