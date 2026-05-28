import { useState } from 'react'
import {
  Typography,
  Alert,
  AlertTitle,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Divider,
  Stack,
  Container,
  Paper,
} from '@mui/material'

export default function Feedback() {
  // States für interaktive Komponenten
  const [snackbarOffen, setSnackbarOffen] = useState(false)
  const [dialogOffen, setDialogOffen] = useState(false)
  const [ladeAnimation, setLadeAnimation] = useState(false)
  const [fortschritt] = useState(65)

  const handleLaden = () => {
    setLadeAnimation(true)
    // Simulation: nach 2 Sekunden fertig
    setTimeout(() => setLadeAnimation(false), 2000)
  }

  return (
    <Container maxWidth="md">
      {/* ── Alert ────────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Alert
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Alerts informieren den Benutzer über wichtige Zustände. Vier Schweregrade:
          <code> success</code>, <code>info</code>, <code>warning</code>, <code>error</code>.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {/* severity: Schweregrad bestimmt Farbe und Icon */}
          <Alert severity="success">
            <AlertTitle>Erfolg</AlertTitle>
            Die Daten wurden erfolgreich gespeichert.
          </Alert>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Das System wird morgen um 22:00 Uhr gewartet.
          </Alert>
          <Alert severity="warning">
            <AlertTitle>Warnung</AlertTitle>
            Der Lagerbestand ist unter den Mindestbestand gefallen.
          </Alert>
          <Alert severity="error">
            <AlertTitle>Fehler</AlertTitle>
            Die Verbindung zum Server konnte nicht hergestellt werden.
          </Alert>
          {/* variant="filled": ausgefüllte Variante */}
          <Alert severity="success" variant="filled">
            Filled-Variante (ausgefüllt)
          </Alert>
          {/* variant="outlined": Rahmen-Variante */}
          <Alert severity="info" variant="outlined">
            Outlined-Variante (Rahmen)
          </Alert>
          {/* onClose: Schliessen-Button anzeigen */}
          <Alert severity="warning" onClose={() => {}}>
            Diese Alert kann geschlossen werden.
          </Alert>
        </Stack>
      </Paper>

      {/* ── Snackbar ─────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Snackbar
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Snackbars erscheinen kurz am Rand des Bildschirms und verschwinden automatisch.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Button variant="contained" onClick={() => setSnackbarOffen(true)}>
          Snackbar anzeigen
        </Button>

        {/* open: sichtbar/versteckt, autoHideDuration: ms bis automatisch schliessen */}
        <Snackbar
          open={snackbarOffen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOffen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {/* Alert als Inhalt der Snackbar */}
          <Alert
            onClose={() => setSnackbarOffen(false)}
            severity="success"
            variant="filled"
          >
            Aktion erfolgreich ausgeführt!
          </Alert>
        </Snackbar>
      </Paper>

      {/* ── Dialog ───────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dialog (Modal)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Dialoge erscheinen über dem restlichen Inhalt und fordern Benutzerentscheidungen.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Button variant="outlined" onClick={() => setDialogOffen(true)}>
          Dialog öffnen
        </Button>

        {/* open: sichtbar/versteckt, onClose: wird beim Klick ausserhalb aufgerufen */}
        <Dialog open={dialogOffen} onClose={() => setDialogOffen(false)}>
          <DialogTitle>Eintrag löschen?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie diesen Eintrag wirklich löschen? Diese Aktion kann nicht rückgängig
              gemacht werden.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOffen(false)}>Abbrechen</Button>
            <Button
              onClick={() => setDialogOffen(false)}
              color="error"
              variant="contained"
              autoFocus
            >
              Löschen
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>

      {/* ── Progress ─────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Progress (Ladebalken)
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={3}>
          <div>
            <Typography variant="subtitle2" gutterBottom>
              LinearProgress – determinate (bestimmter Fortschritt: {fortschritt}%)
            </Typography>
            {/* variant="determinate" + value: zeigt konkreten Fortschritt */}
            <LinearProgress variant="determinate" value={fortschritt} />
          </div>

          <div>
            <Typography variant="subtitle2" gutterBottom>
              LinearProgress – indeterminate (unbekannte Dauer)
            </Typography>
            {/* variant="indeterminate": animierter Balken ohne festen Endpunkt */}
            <LinearProgress color="secondary" />
          </div>

          <Stack direction="row" spacing={4} alignItems="center">
            <div>
              <Typography variant="subtitle2" gutterBottom>
                CircularProgress – indeterminate
              </Typography>
              <CircularProgress />
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                CircularProgress – determinate ({fortschritt}%)
              </Typography>
              <CircularProgress variant="determinate" value={fortschritt} color="secondary" />
            </div>
          </Stack>

          <div>
            <Button variant="contained" onClick={handleLaden} disabled={ladeAnimation}>
              Laden simulieren (2s)
            </Button>
            {ladeAnimation && <LinearProgress sx={{ mt: 1 }} />}
          </div>
        </Stack>
      </Paper>

      {/* ── Skeleton ─────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Skeleton (Ladeplatzhalter)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Skeletons zeigen Ladeplatzhalter an, bevor echte Daten verfügbar sind.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          {/* variant="text": Textzeilen-Platzhalter */}
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '60%' }} />
          <Skeleton variant="text" sx={{ width: '80%' }} />
          <Skeleton variant="text" sx={{ width: '40%' }} />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {/* variant="circular": runder Platzhalter (z.B. für Avatare) */}
            <Skeleton variant="circular" width={60} height={60} />
            {/* variant="rectangular": rechteckiger Platzhalter (z.B. für Bilder) */}
            <Skeleton variant="rectangular" width={200} height={60} />
            {/* variant="rounded": abgerundeter Platzhalter */}
            <Skeleton variant="rounded" width={120} height={60} />
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
