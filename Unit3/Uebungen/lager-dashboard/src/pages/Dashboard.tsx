import { useMemo } from 'react'
import { Container, Grid, Typography, Box, Divider } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CategoryIcon from '@mui/icons-material/Category'
import { artikel } from '../data/mockData'
import KpiCard from '../components/KpiCard'
import KategorieDiagramm from '../components/KategorieDiagramm'
import KritischeArtikelTabelle from '../components/KritischeArtikelTabelle'

export default function Dashboard() {
  // ─── Aggregationen ────────────────────────────────────────────────────────
  // useMemo: Berechnungen werden gecacht und nur neu ausgeführt wenn 'artikel' sich ändert
  const kpis = useMemo(() => ({
    gesamtArtikel:   artikel.length,
    kritischeArtikel: artikel.filter(a => a.status === 'critical').length,
    anzahlKategorien: new Set(artikel.map(a => a.category)).size,
  }), [])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      {/* ── Seitenheader ─────────────────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary">
          Lager-Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Übersicht aller Artikel · {new Date().toLocaleDateString('de-CH', { dateStyle: 'long' })}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* ── Ebene 1: KPI-Karten (oben, sofort sichtbar) ──────────────────── */}
      {/*
       * Grundprinzip: Wichtigste Informationen kommen zuerst.
       * KPIs geben einen schnellen Überblick ohne Details lesen zu müssen.
       */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <KpiCard
            titel="Artikel gesamt"
            wert={kpis.gesamtArtikel}
            beschreibung="Alle erfassten Lagerartikel"
            icon={<InventoryIcon fontSize="inherit" />}
            farbe="primary"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <KpiCard
            titel="Kritische Artikel"
            wert={kpis.kritischeArtikel}
            beschreibung="Bestand ≤ Mindestbestand"
            icon={<WarningAmberIcon fontSize="inherit" />}
            // Farbe signalisiert sofort: Handlungsbedarf!
            farbe="error"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <KpiCard
            titel="Kategorien"
            wert={kpis.anzahlKategorien}
            beschreibung="Verschiedene Artikelgruppen"
            icon={<CategoryIcon fontSize="inherit" />}
            farbe="success"
          />
        </Grid>
      </Grid>

      {/* ── Ebene 2: Diagramm ────────────────────────────────────────────── */}
      {/*
       * Das Balkendiagramm zeigt die Verteilung auf einen Blick.
       * Visuelle Darstellung hilft, Muster schneller zu erkennen als Zahlen.
       */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <KategorieDiagramm artikel={artikel} />
        </Grid>
      </Grid>

      {/* ── Ebene 3: Detailtabelle (kritische Artikel) ───────────────────── */}
      {/*
       * Die Tabelle zeigt die Details, die für eine Entscheidung nötig sind.
       * Sie steht unterhalb der Übersichten: erst Kontext, dann Details.
       */}
      <KritischeArtikelTabelle artikel={artikel} />

    </Container>
  )
}
