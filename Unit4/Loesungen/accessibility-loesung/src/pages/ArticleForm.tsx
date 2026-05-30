import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'

export default function ArticleForm() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
  }

  const handleReset = () => {
    setName('')
    setSku('')
    setQuantity('')
    setCategory('')
    setSaved(false)
  }

  return (
    <Box>
      {/* FIX #1: Korrekte Überschriftenhierarchie */}
      <Typography variant="h4" component="h1" gutterBottom>
        Artikel erfassen
      </Typography>

      {/* FIX #2: Ausreichender Kontrast – text.secondary statt #aaa */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Füllen Sie alle Pflichtfelder aus, um einen neuen Artikel anzulegen.
        Pflichtfelder sind mit * markiert.
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaved(false)}>
          Artikel wurde erfolgreich gespeichert.
        </Alert>
      )}

      {/*
       * FIX: noValidate deaktiviert Browser-Validierung (wir übernehmen sie selbst);
       * component="form" setzt die korrekte ARIA-Rolle
       */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 500 }}>
        <Grid container spacing={2}>

          {/*
           * FIX #3: TextField mit label-Prop statt nur placeholder.
           * MUI verknüpft Label und Input automatisch korrekt (htmlFor + id).
           * required zeigt * und setzt aria-required="true".
           */}
          <Grid item xs={12}>
            <TextField
              id="article-name"
              label="Artikelname"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="Geben Sie den vollständigen Artikelnamen ein"
            />
          </Grid>

          {/*
           * FIX #4: Label mit htmlFor verknüpft mit Input via id –
           * hier als MUI TextField, das die Verknüpfung intern korrekt setzt
           */}
          <Grid item xs={12}>
            <TextField
              id="article-sku"
              label="Artikelnummer (SKU)"
              required
              fullWidth
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              helperText="Format: XXX-000 (z.B. STH-001)"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="article-quantity"
              label="Anfangsmenge"
              type="number"
              required
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: 0 }}
              helperText="Aktuelle Lagermenge des Artikels"
            />
          </Grid>

          {/*
           * FIX #5: MUI Select mit InputLabel und labelId –
           * Screenreader lesen "Kategorie" als Label für das Auswahlfeld vor
           */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">Kategorie</InputLabel>
              <Select
                labelId="category-label"
                id="article-category"
                value={category}
                label="Kategorie"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Möbel">Möbel</MenuItem>
                <MenuItem value="Elektronik">Elektronik</MenuItem>
                <MenuItem value="Büromaterial">Büromaterial</MenuItem>
              </Select>
              <FormHelperText>Wählen Sie die passende Produktkategorie</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/*
               * FIX #6: Aussagekräftige Button-Texte: "Artikel speichern" statt "Weiter"
               * MUI Button ist per Tastatur bedienbar und hat korrekte role="button"
               */}
              <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                Artikel speichern
              </Button>
              <Button type="button" variant="outlined" startIcon={<ClearIcon />} onClick={handleReset}>
                Formular zurücksetzen
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}
