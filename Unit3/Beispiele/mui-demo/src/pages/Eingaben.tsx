import { useState } from 'react'
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Divider,
  Stack,
  Container,
  Paper,
  SelectChangeEvent,
} from '@mui/material'

export default function Eingaben() {
  // Lokale States für die kontrollierten Eingabekomponenten
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [sprache, setSprache] = useState('typescript')
  const [checked, setChecked] = useState(false)
  const [radio, setRadio] = useState('option1')
  const [toggled, setToggled] = useState(false)
  const [sliderWert, setSliderWert] = useState<number>(30)

  return (
    <Container maxWidth="md">
      {/* ── TextField ────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          TextField
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Texteingabefelder in den Varianten <code>outlined</code>, <code>filled</code> und{' '}
          <code>standard</code>.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={3}>
          {/* label: Beschriftung des Feldes, value/onChange: kontrollierte Eingabe */}
          <TextField
            label="Name (outlined)"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            helperText="helperText: Hinweis unter dem Feld"
          />
          <TextField
            label="E-Mail (filled)"
            variant="filled"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Passwort (standard)"
            variant="standard"
            type="password"
          />
          {/* multiline: mehrzeiliges Eingabefeld, rows: Anzahl sichtbarer Zeilen */}
          <TextField
            label="Beschreibung (multiline)"
            multiline
            rows={3}
            variant="outlined"
          />
          {/* error + helperText: Fehlerzustand anzeigen */}
          <TextField
            label="Pflichtfeld"
            required
            error={text === ''}
            helperText={text === '' ? 'Dieses Feld darf nicht leer sein' : ''}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Stack>
      </Paper>

      {/* ── Select ───────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Select (Dropdown)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <code>FormControl</code> + <code>InputLabel</code> + <code>Select</code> arbeiten zusammen.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* FormControl kapselt Label + Select für korrekte Beschriftung */}
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="sprache-label">Programmiersprache</InputLabel>
          <Select
            labelId="sprache-label"
            value={sprache}
            label="Programmiersprache"
            onChange={(e: SelectChangeEvent) => setSprache(e.target.value)}
          >
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="typescript">TypeScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="java">Java</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Ausgewählt: <strong>{sprache}</strong>
        </Typography>
      </Paper>

      {/* ── Checkbox & Switch ────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkbox & Switch
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          {/* FormControlLabel verbindet ein Label mit dem Steuerelement */}
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                color="primary"
              />
            }
            label="Ich stimme den Bedingungen zu"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="secondary" />}
            label="Standard aktiviert"
          />
          <FormControlLabel
            control={<Checkbox disabled />}
            label="Deaktiviert"
          />

          <Divider sx={{ my: 1 }} />

          {/* Switch: Ein/Aus-Umschalter */}
          <FormControlLabel
            control={
              <Switch
                checked={toggled}
                onChange={(e) => setToggled(e.target.checked)}
                color="primary"
              />
            }
            label={`Benachrichtigungen: ${toggled ? 'AN' : 'AUS'}`}
          />
        </Stack>
      </Paper>

      {/* ── Radio ────────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Radio Buttons
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* RadioGroup stellt sicher, dass nur ein Button gleichzeitig aktiv ist */}
        <FormControl>
          <FormLabel>Zahlungsart</FormLabel>
          <RadioGroup
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
          >
            <FormControlLabel value="option1" control={<Radio />} label="Kreditkarte" />
            <FormControlLabel value="option2" control={<Radio />} label="TWINT" />
            <FormControlLabel value="option3" control={<Radio />} label="Rechnung" />
            <FormControlLabel value="option4" control={<Radio />} label="Deaktiviert" disabled />
          </RadioGroup>
        </FormControl>
      </Paper>

      {/* ── Slider ───────────────────────────────────────────── */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Slider
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography gutterBottom>
          Wert: <strong>{sliderWert}</strong>
        </Typography>
        {/* min/max: Wertebereich, step: Schrittgrösse, marks: Markierungen */}
        <Slider
          value={sliderWert}
          onChange={(_e, val) => setSliderWert(val as number)}
          min={0}
          max={100}
          step={10}
          marks
          valueLabelDisplay="auto"
          color="secondary"
          sx={{ maxWidth: 400 }}
        />
      </Paper>
    </Container>
  )
}
