import { Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import { Article } from '../data/articles'

/*
 * FIX: Status wird über Text UND Farbe UND Icon kommuniziert.
 * Screenreader lesen den Label-Text vor. Farbenblinde erkennen den Status am Text.
 */

type Status = Article['status']

interface StatusChipProps {
  status: Status
}

const statusConfig: Record<Status, { label: string; color: 'success' | 'warning' | 'error'; icon: React.ReactElement }> = {
  ok: { label: 'Ausreichend', color: 'success', icon: <CheckCircleIcon /> },
  low: { label: 'Knapper Bestand', color: 'warning', icon: <WarningIcon /> },
  empty: { label: 'Nicht verfügbar', color: 'error', icon: <ErrorIcon /> },
}

export default function StatusChip({ status }: StatusChipProps) {
  const { label, color, icon } = statusConfig[status]
  return <Chip label={label} color={color} size="small" icon={icon} />
}
