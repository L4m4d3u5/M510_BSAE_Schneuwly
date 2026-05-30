import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { articles, Article } from '../data/articles'
import StatusChip from '../components/StatusChip'

export default function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleClose = () => setSelectedArticle(null)

  return (
    <Box>
      {/* FIX #1: Korrekte Überschriftenhierarchie */}
      <Typography variant="h4" component="h1" gutterBottom>
        Artikelübersicht
      </Typography>

      {/*
       * FIX #2: Ausreichender Kontrast (text.secondary) und Icon mit aria-hidden,
       * da der Hinweistext den Inhalt bereits beschreibt
       */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}
      >
        <InfoOutlinedIcon fontSize="small" aria-hidden="true" />
        Wählen Sie einen Artikel aus, um Details anzuzeigen oder ihn zu bearbeiten.
      </Typography>

      {/*
       * FIX #3: TableContainer mit MUI Paper, Table mit aria-label
       */}
      <TableContainer component={Paper}>
        <Table aria-label="Artikelübersicht">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              {/*
               * FIX #4: Alle <th> haben scope="col" –
               * Screenreader können Zellen korrekt den Spaltenköpfen zuordnen
               */}
              <TableCell component="th" scope="col">Artikel</TableCell>
              <TableCell component="th" scope="col">SKU</TableCell>
              <TableCell component="th" scope="col">Kategorie</TableCell>
              <TableCell component="th" scope="col" align="right">Menge</TableCell>
              <TableCell component="th" scope="col" align="center">Status</TableCell>
              <TableCell component="th" scope="col" align="center">Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} hover>
                <TableCell>{article.name}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{article.sku}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell align="right">{article.quantity}</TableCell>
                <TableCell align="center">
                  {/*
                   * FIX #5: StatusChip kommuniziert Status via Text + Farbe + Icon
                   */}
                  <StatusChip status={article.status} />
                </TableCell>
                <TableCell align="center">
                  {/*
                   * FIX #6: IconButtons mit aussagekräftigem aria-label und Tooltip.
                   * Screenreader lesen z.B. "Bürostuhl Comfort Pro bearbeiten" vor.
                   */}
                  <Tooltip title={`${article.name} bearbeiten`}>
                    <IconButton
                      size="small"
                      aria-label={`${article.name} bearbeiten`}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={`${article.name} löschen`}>
                    <IconButton
                      size="small"
                      aria-label={`${article.name} löschen`}
                      onClick={() => alert(`Artikel "${article.name}" gelöscht`)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*
       * FIX #7: Dialog mit aria-labelledby und aria-describedby –
       * Screenreader lesen beim Öffnen den Titel vor und wissen, was der Dialog tut.
       * FIX #8: DialogActions mit echtem MUI Button statt klickbarem Div
       */}
      <Dialog
        open={selectedArticle !== null}
        onClose={handleClose}
        aria-labelledby="article-detail-title"
        aria-describedby="article-detail-description"
      >
        <DialogTitle id="article-detail-title">
          Artikeldetails: {selectedArticle?.name}
        </DialogTitle>
        <DialogContent id="article-detail-description" dividers>
          {selectedArticle && (
            <Table size="small" aria-label={`Details für ${selectedArticle.name}`}>
              <TableBody>
                {[
                  { label: 'Name', value: selectedArticle.name },
                  { label: 'SKU', value: selectedArticle.sku },
                  { label: 'Kategorie', value: selectedArticle.category },
                  { label: 'Menge', value: String(selectedArticle.quantity) },
                  { label: 'Mindestmenge', value: String(selectedArticle.minQuantity) },
                ].map(({ label, value }) => (
                  <TableRow key={label}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '40%' }}>
                      {label}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    Status
                  </TableCell>
                  <TableCell>
                    <StatusChip status={selectedArticle.status} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          {/* FIX: Echter Button statt klickbares Div */}
          <Button onClick={handleClose} variant="contained">
            Schliessen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
