import { ReactNode } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'

interface KpiCardProps {
  titel: string
  wert: number | string
  beschreibung?: string
  icon: ReactNode
  // Farbakzent für den oberen Balken der Karte
  farbe?: 'primary' | 'warning' | 'error' | 'success'
}

// Farb-Map: Schlüssel → MUI-Systemfarbe
const farbMap: Record<string, SxProps<Theme>> = {
  primary: { bgcolor: 'primary.main' },
  warning: { bgcolor: 'warning.main' },
  error:   { bgcolor: 'error.main' },
  success: { bgcolor: 'success.main' },
}

export default function KpiCard({ titel, wert, beschreibung, icon, farbe = 'primary' }: KpiCardProps) {
  return (
    // elevation: Schattenstärke der Karte
    <Card elevation={2} sx={{ height: '100%' }}>
      {/* Farbiger Streifen oben – signalisiert sofort den Typ der Kennzahl */}
      <Box sx={{ height: 6, ...farbMap[farbe] }} />

      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            {/* Kennzahlenwert – gross und auffällig */}
            <Typography variant="h3" fontWeight={700} color={`${farbe}.main`}>
              {wert}
            </Typography>
            {/* Titel der Kennzahl */}
            <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 0.5 }}>
              {titel}
            </Typography>
            {/* Optionale Zusatzinformation */}
            {beschreibung && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {beschreibung}
              </Typography>
            )}
          </Box>
          {/* Icon rechts oben – visueller Anker */}
          <Box sx={{ color: `${farbe}.main`, opacity: 0.7, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
