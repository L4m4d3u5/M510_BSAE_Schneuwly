import { Alert, Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BarChartIcon from '@mui/icons-material/BarChart'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import { articles } from '../data/articles'

export default function Dashboard() {
  const totalArticles = articles.length
  const lowStock = articles.filter((a) => a.status === 'low').length
  const emptyStock = articles.filter((a) => a.status === 'empty').length
  const okStock = articles.filter((a) => a.status === 'ok').length

  return (
    <Box>
      {/*
       * FIX #1: Korrekte Überschriftenhierarchie – h1 → h2 → h2 (keine Sprünge)
       * Typography variant bestimmt das visuelle Aussehen, component die semantische Ebene.
       */}
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/*
       * FIX #2: text.secondary hat ausreichenden Kontrast (ca. 4.6:1 auf weissem Hintergrund)
       */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Letzte Aktualisierung: 29.05.2025, 14:32 Uhr
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Lagerbestand-Übersicht
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Gesamt Artikel', value: totalArticles, color: 'text.primary' },
          { label: 'Ausreichend', value: okStock, color: 'success.main' },
          { label: 'Knapper Bestand', value: lowStock, color: 'warning.dark' },
          { label: 'Nicht verfügbar', value: emptyStock, color: 'error.main' },
        ].map(({ label, value, color }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card>
              <CardContent>
                {/*
                 * FIX #3: Jede Karte hat eine sinnvolle Überschrift auf h3-Ebene.
                 * Der Zahlenwert hat einen ausreichenden Kontrast.
                 */}
                <Typography variant="subtitle2" color="text.secondary" component="h3">
                  {label}
                </Typography>
                <Typography variant="h3" component="p" sx={{ color, mt: 1, fontWeight: 'bold' }}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        Statuslegende
      </Typography>

      {/*
       * FIX #4: Chips haben Text-Label UND Icon – Status nicht mehr nur farbbasiert
       */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip icon={<CheckCircleIcon />} label="Ausreichend" color="success" />
        <Chip icon={<WarningIcon />} label="Knapper Bestand" color="warning" />
        <Chip icon={<ErrorIcon />} label="Nicht verfügbar" color="error" />
      </Box>

      {/*
       * FIX #5: MUI Alert hat ausreichenden Kontrast und kommuniziert Severity als Text + Icon.
       * Screenreader lesen "Warnung: X Artikel benötigen ..." vor.
       */}
      {lowStock + emptyStock > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>{lowStock + emptyStock} Artikel</strong> benötigen Aufmerksamkeit:{' '}
          {lowStock} mit knappem Bestand, {emptyStock} nicht verfügbar.
        </Alert>
      )}

      <Typography variant="h5" component="h2" gutterBottom>
        Schnellaktionen
      </Typography>

      {/*
       * FIX #6: Echte MUI Buttons statt klickbarer Divs.
       * Vollständig per Tastatur bedienbar, haben role="button", Fokus-Styles etc.
       * FIX #7: Aussagekräftige Button-Texte
       */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<TrendingUpIcon />}
          onClick={() => alert('Lagerbericht wird erstellt...')}
        >
          Lagerbericht erstellen
        </Button>
        <Button
          variant="outlined"
          startIcon={<BarChartIcon />}
          onClick={() => alert('Statistiken werden geladen...')}
        >
          Statistiken anzeigen
        </Button>
      </Box>
    </Box>
  )
}
