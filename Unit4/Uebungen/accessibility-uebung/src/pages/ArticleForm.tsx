import { useState } from 'react'
import { TextField, Button, MenuItem, Select, Snackbar } from '@mui/material'

/*
 * ACCESSIBILITY-PROBLEME in dieser Komponente:
 *
 * 1. TextField ohne Label – nur placeholder vorhanden; Screenreader lesen keinen Label vor
 * 2. <label> ohne htmlFor – nicht mit dem zugehörigen <input> verknüpft
 * 3. <input>-Felder ohne id – Verknüpfung per htmlFor unmöglich
 * 4. MUI Select ohne InputLabel / ohne Label-Prop – keine Beschriftung für Screenreader
 * 5. Unklarer Button-Text: "Weiter" beschreibt die Aktion Speichern nicht
 * 6. Pflichtfelder nicht als solche markiert (kein aria-required, kein visueller Hinweis)
 */
export default function ArticleForm() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSnackbarOpen(true)
  }

  return (
    <div>
      <h2>Artikel erfassen</h2>

      {/* Problem: niedriger Kontrast */}
      <p style={{ color: '#aaa', marginBottom: 24 }}>
        Füllen Sie das Formular aus, um einen neuen Artikel anzulegen.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        {/* Problem #1: TextField ohne label – nur placeholder */}
        <div style={{ marginBottom: 16 }}>
          <TextField
            fullWidth
            placeholder="Artikelname eingeben"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Problem #2 & #3: label ohne htmlFor, input ohne id */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
            Artikelnummer
          </label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: 4,
              fontSize: 16,
            }}
          />
        </div>

        {/* Problem #2 & #3: label ohne htmlFor, input ohne id */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Menge</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: 4,
              fontSize: 16,
            }}
          />
        </div>

        {/* Problem #4: MUI Select ohne Label */}
        <div style={{ marginBottom: 24 }}>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Kategorie wählen</MenuItem>
            <MenuItem value="Möbel">Möbel</MenuItem>
            <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Büromaterial">Büromaterial</MenuItem>
          </Select>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* Problem #5: Button-Text "Weiter" ist irreführend – Aktion ist Speichern */}
          <Button type="submit" variant="contained">
            Weiter
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setName('')
              setSku('')
              setQuantity('')
              setCategory('')
            }}
          >
            Löschen
          </Button>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Artikel gespeichert"
      />
    </div>
  )
}
