import { useMemo } from 'react'
import { Typography, Box, Paper } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Artikel } from '../types'

interface KategorieDiagrammProps {
  artikel: Artikel[]
}

// Farben für die Balken – eine Farbe pro Kategorie
const BALKEN_FARBEN = ['#1565c0', '#ef6c00', '#2e7d32', '#6a1b9a', '#c62828', '#00838f']

export default function KategorieDiagramm({ artikel }: KategorieDiagrammProps) {
  // Aggregation: Anzahl Artikel pro Kategorie zählen
  // useMemo: wird nur neu berechnet wenn sich 'artikel' ändert
  const daten = useMemo(() => {
    const zaehler: Record<string, number> = {}

    for (const a of artikel) {
      zaehler[a.category] = (zaehler[a.category] ?? 0) + 1
    }

    // In Array umwandeln und absteigend sortieren
    return Object.entries(zaehler)
      .map(([kategorie, anzahl]) => ({ kategorie, anzahl }))
      .sort((a, b) => b.anzahl - a.anzahl)
  }, [artikel])

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Artikel pro Kategorie
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Verteilung der {artikel.length} Artikel auf {daten.length} Kategorien
      </Typography>

      {/*
       * ResponsiveContainer: Diagramm passt sich der Containerbreite an.
       * Wichtig: Immer verwenden, damit das Diagramm responsiv ist.
       */}
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={daten} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
          {/* Rasterlinien im Hintergrund */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* X-Achse: Kategoriename, schräg damit er lesbar bleibt */}
          <XAxis
            dataKey="kategorie"
            tick={{ fontSize: 12 }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />

          {/* Y-Achse: Anzahl Artikel */}
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

          {/* Tooltip: Infofenster beim Hover */}
          <Tooltip
            formatter={(value: number) => [`${value} Artikel`, 'Anzahl']}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          />

          {/* Bar: die eigentlichen Balken */}
          <Bar dataKey="anzahl" radius={[4, 4, 0, 0]}>
            {/* Cell: individuelle Farbe pro Balken */}
            {daten.map((_, index) => (
              <Cell
                key={index}
                fill={BALKEN_FARBEN[index % BALKEN_FARBEN.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legende: manuell, damit sie kompakt bleibt */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
        {daten.map((d, i) => (
          <Box key={d.kategorie} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '2px',
                bgcolor: BALKEN_FARBEN[i % BALKEN_FARBEN.length],
                flexShrink: 0,
              }}
            />
            <Typography variant="caption">{d.kategorie}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
