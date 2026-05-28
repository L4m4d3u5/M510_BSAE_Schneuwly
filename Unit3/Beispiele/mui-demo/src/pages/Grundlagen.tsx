import {
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Chip,
  Avatar,
  Badge,
  Divider,
  Stack,
  Tooltip,
  Container,
  Paper,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MailIcon from '@mui/icons-material/Mail'
import FaceIcon from '@mui/icons-material/Face'

export default function Grundlagen() {
  return (
    <Container maxWidth="md">
      {/* ── Typography ───────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        {/* variant bestimmt den HTML-Tag und die Schriftgrösse */}
        <Typography variant="h4" gutterBottom>
          Typography
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          MUI liefert vordefinierte Textvarianten, die dem Material-Design-System folgen.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Typography variant="h1">h1 – Überschrift</Typography>
          <Typography variant="h3">h3 – Unterüberschrift</Typography>
          <Typography variant="h5">h5 – Abschnittstitel</Typography>
          <Typography variant="body1">body1 – Normaler Fliesstext</Typography>
          <Typography variant="body2" color="text.secondary">
            body2 – Sekundärer Text (z.B. Beschreibungen)
          </Typography>
          <Typography variant="caption" display="block" color="text.disabled">
            caption – Kleiner Hilfstext
          </Typography>
          <Typography variant="overline">overline – Etikett</Typography>
        </Stack>
      </Paper>

      {/* ── Buttons ──────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Buttons
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Drei Varianten: <code>contained</code> (gefüllt), <code>outlined</code> (Rahmen),{' '}
          <code>text</code> (nur Text).
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* variant: Darstellungsart des Buttons */}
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
        </Stack>

        {/* Buttons mit Icons */}
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
          <Button variant="contained" startIcon={<SendIcon />}>
            Senden
          </Button>
          <Button variant="outlined" endIcon={<DeleteIcon />} color="error">
            Löschen
          </Button>
        </Stack>

        {/* ButtonGroup: gruppiert mehrere Buttons */}
        <ButtonGroup variant="outlined" aria-label="Grössen-Auswahl">
          <Button>Klein</Button>
          <Button>Mittel</Button>
          <Button>Gross</Button>
        </ButtonGroup>

        {/* IconButton: Button ohne Text, nur Icon */}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Tooltip title="Löschen">
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Favorit">
            <IconButton color="secondary">
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {/* ── Chips ────────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Chips & Badges
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Chip</strong>: kompaktes Element für Tags, Status oder Aktionen.{' '}
          <strong>Badge</strong>: zeigt einen Zähler auf einem anderen Element.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Chip-Varianten */}
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip label="Standard" />
          <Chip label="Primary" color="primary" />
          <Chip label="Success" color="success" />
          <Chip label="Warning" color="warning" />
          <Chip label="Error" color="error" />
          <Chip label="Löschbar" onDelete={() => alert('gelöscht')} />
          <Chip avatar={<Avatar>A</Avatar>} label="Mit Avatar" />
          <Chip icon={<FaceIcon />} label="Mit Icon" variant="outlined" />
        </Stack>

        {/* Badge: badgeContent = Zahl, color = Farbe des Badges */}
        <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
          <Badge badgeContent={99} color="error">
            <MailIcon />
          </Badge>
          {/* dot: zeigt nur einen Punkt ohne Zahl */}
          <Badge variant="dot" color="success">
            <MailIcon />
          </Badge>
        </Stack>
      </Paper>
    </Container>
  )
}
