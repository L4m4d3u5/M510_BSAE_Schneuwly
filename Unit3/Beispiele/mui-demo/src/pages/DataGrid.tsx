import { useState } from 'react'
import {
  Typography,
  Container,
  Paper,
  Divider,
  Stack,
  Button,
  Chip,
} from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid'

// Typdefinition einer Zeile
interface Kurs {
  id: number
  titel: string
  kategorie: string
  teilnehmer: number
  dauer: number   // in Stunden
  aktiv: boolean
}

// Beispieldaten
const kurse: Kurs[] = [
  { id: 1, titel: 'React Grundlagen',     kategorie: 'Frontend',  teilnehmer: 24, dauer: 16, aktiv: true  },
  { id: 2, titel: 'TypeScript Einführung',kategorie: 'Sprache',   teilnehmer: 18, dauer: 8,  aktiv: true  },
  { id: 3, titel: 'Node.js & Express',    kategorie: 'Backend',   teilnehmer: 12, dauer: 20, aktiv: false },
  { id: 4, titel: 'CSS & Flexbox',        kategorie: 'Frontend',  teilnehmer: 30, dauer: 6,  aktiv: true  },
  { id: 5, titel: 'SQL Datenbanken',      kategorie: 'Datenbank', teilnehmer: 15, dauer: 12, aktiv: true  },
  { id: 6, titel: 'REST API Design',      kategorie: 'Backend',   teilnehmer: 9,  dauer: 10, aktiv: false },
  { id: 7, titel: 'Git & GitHub',         kategorie: 'Werkzeuge', teilnehmer: 35, dauer: 4,  aktiv: true  },
  { id: 8, titel: 'Docker Grundlagen',    kategorie: 'DevOps',    teilnehmer: 8,  dauer: 14, aktiv: false },
  { id: 9, titel: 'MUI Komponenten',      kategorie: 'Frontend',  teilnehmer: 22, dauer: 8,  aktiv: true  },
  { id: 10,titel: 'Agile & Scrum',        kategorie: 'Methodik',  teilnehmer: 40, dauer: 6,  aktiv: true  },
]

// Spaltendefinitionen
// field: Schlüssel aus der Datenzeile
// headerName: Spaltenüberschrift
// width: Spaltenbreite in Pixeln
// flex: anteilige Breite (ähnlich wie CSS flex)
const spalten: GridColDef<Kurs>[] = [
  { field: 'id',          headerName: 'ID',          width: 60 },
  { field: 'titel',       headerName: 'Kurstitel',   flex: 1, minWidth: 160 },
  {
    field: 'kategorie',
    headerName: 'Kategorie',
    width: 130,
    // renderCell: eigenes JSX für die Zelle rendern
    renderCell: (params) => (
      <Chip label={params.value} size="small" color="primary" variant="outlined" />
    ),
  },
  {
    field: 'teilnehmer',
    headerName: 'Teilnehmer',
    type: 'number',   // type: ermöglicht numerische Sortierung
    width: 110,
  },
  {
    field: 'dauer',
    headerName: 'Dauer (h)',
    type: 'number',
    width: 100,
  },
  {
    field: 'aktiv',
    headerName: 'Status',
    width: 110,
    // renderCell: Status als farbigen Chip anzeigen
    renderCell: (params) =>
      params.value ? (
        <Chip label="Aktiv" size="small" color="success" />
      ) : (
        <Chip label="Inaktiv" size="small" color="default" />
      ),
  },
]

export default function DataGridSeite() {
  // Ausgewählte Zeilen-IDs
  const [auswahl, setAuswahl] = useState<GridRowSelectionModel>([])

  return (
    <Container maxWidth="lg">
      {/* ── Einfacher DataGrid ────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          DataGrid – Grundlagen
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Der <code>DataGrid</code> aus <code>@mui/x-data-grid</code> zeigt tabellarische Daten
          mit eingebauter Sortierung, Paginierung und Filterung.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* rows: Array von Datenobjekten (jedes braucht ein 'id'-Feld)
            columns: Spaltendefinitionen (GridColDef)
            autoHeight: Tabelle passt sich der Zeilenzahl an */}
        <DataGrid
          rows={kurse}
          columns={spalten}
          autoHeight
          // initialState: Startzustand (z.B. Seite und Zeilenzahl)
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          // pageSizeOptions: wählbare Zeilenzahlen pro Seite
          pageSizeOptions={[5, 10]}
        />
      </Paper>

      {/* ── DataGrid mit Zeilenauswahl ────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          DataGrid – Zeilenauswahl (checkboxSelection)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Mit <code>checkboxSelection</code> können eine oder mehrere Zeilen markiert werden.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Ausgewählt: <strong>{auswahl.length}</strong> Zeile(n)
          </Typography>
          {auswahl.length > 0 && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setAuswahl([])}
            >
              Auswahl aufheben
            </Button>
          )}
        </Stack>

        <DataGrid
          rows={kurse}
          columns={spalten}
          autoHeight
          // checkboxSelection: Checkbox-Spalte für Mehrfachauswahl
          checkboxSelection
          // rowSelectionModel + onRowSelectionModelChange: kontrollierte Auswahl
          rowSelectionModel={auswahl}
          onRowSelectionModelChange={(neu) => setAuswahl(neu)}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>

      {/* ── DataGrid mit Toolbar ──────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          DataGrid – Toolbar (Suche & Export)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Die eingebaute <code>GridToolbar</code> liefert Spaltenfilter, Suche, Dichte-Auswahl
          und CSV-Export.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <DataGrid
          rows={kurse}
          columns={spalten}
          autoHeight
          // slots: Einbaupunkte für eigene oder vorgefertigte Komponenten
          slots={{ toolbar: GridToolbar }}
          // slotProps: Props für die eingebundenen Slot-Komponenten
          slotProps={{
            toolbar: {
              showQuickFilter: true,  // Suchfeld in der Toolbar anzeigen
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </Container>
  )
}
