import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Stack,
  Divider,
} from '@mui/material'

// Beispieldaten für die Karten
const produkte = [
  { id: 1, name: 'React Kurs', kategorie: 'Frontend', preis: 49 },
  { id: 2, name: 'Node.js Kurs', kategorie: 'Backend', preis: 39 },
  { id: 3, name: 'TypeScript Kurs', kategorie: 'Sprache', preis: 29 },
]

export default function Layout() {
  return (
    <Container maxWidth="lg">
      {/* ── Box & sx-Prop ────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Box & sx-Prop
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <code>Box</code> ist ein universelles Layout-Element. Mit der <code>sx</code>-Prop werden
          CSS-Eigenschaften direkt mit MUI-Theme-Werten kombiniert.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* sx: Inline-Styling mit Theme-Zugriff (spacing, colors, etc.) */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,          // gap: 2 = 2 * 8px = 16px (MUI spacing unit)
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',  // Theme-Farbe als String
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1,          // borderRadius: 1 = 4px (theme.shape.borderRadius)
            }}
          >
            Box 1
          </Box>
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'secondary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            Box 2
          </Box>
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',  // Kreis
            }}
          >
            Box 3
          </Box>
        </Box>
      </Paper>

      {/* ── Stack ────────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Stack
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <code>Stack</code> ordnet Elemente in einer Richtung an (<code>direction</code>) mit
          gleichmässigem Abstand (<code>spacing</code>).
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Horizontal (direction="row"):
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          {['A', 'B', 'C', 'D'].map((item) => (
            <Paper key={item} elevation={3} sx={{ px: 3, py: 1 }}>
              {item}
            </Paper>
          ))}
        </Stack>

        <Typography variant="subtitle1" gutterBottom>
          Vertikal (direction="column"):
        </Typography>
        <Stack direction="column" spacing={1} sx={{ maxWidth: 200 }}>
          {['Eintrag 1', 'Eintrag 2', 'Eintrag 3'].map((item) => (
            <Paper key={item} elevation={1} sx={{ px: 2, py: 1 }}>
              {item}
            </Paper>
          ))}
        </Stack>
      </Paper>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Grid
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          MUI Grid basiert auf einem 12-Spalten-System. <code>xs</code>/<code>sm</code>/
          <code>md</code> etc. steuern die Breite pro Breakpoint.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* container: Grid-Container, spacing: Abstand zwischen Items */}
        <Grid container spacing={2}>
          {/* xs=12: volle Breite auf kleinen Screens, md=4: ein Drittel ab md */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
              Spalte 1 (xs=12, md=4)
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
              Spalte 2 (xs=12, md=4)
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: 'success.light' }}>
              Spalte 3 (xs=12, md=4)
            </Paper>
          </Grid>
          {/* xs=6: halbe Breite */}
          <Grid item xs={6} md={3}>
            <Paper elevation={1} sx={{ p: 2 }}>xs=6 md=3</Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper elevation={1} sx={{ p: 2 }}>xs=6 md=3</Paper>
          </Grid>
          {/* xs=12 md=6: volle Breite auf kleinen, halbe Breite ab md */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2 }}>xs=12 md=6</Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Card ─────────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Card
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Cards gruppieren zusammengehörige Informationen mit optionalem Bild, Inhalt und
          Aktionsbereich.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          {produkte.map((produkt) => (
            <Grid item xs={12} sm={6} md={4} key={produkt.id}>
              {/* Card: elevation steuert Schatten */}
              <Card elevation={3}>
                {/* CardMedia: Bild oder farbiger Platzhalter */}
                <CardMedia
                  sx={{
                    height: 120,
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h3" color="white">
                    {produkt.id}
                  </Typography>
                </CardMedia>

                {/* CardContent: Hauptinhalt der Karte */}
                <CardContent>
                  <Typography variant="h6">{produkt.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kategorie: {produkt.kategorie}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                    CHF {produkt.preis}.–
                  </Typography>
                </CardContent>

                {/* CardActions: Buttons am unteren Rand der Karte */}
                <CardActions>
                  <Button size="small" variant="contained">
                    Kaufen
                  </Button>
                  <Button size="small" variant="text">
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  )
}
