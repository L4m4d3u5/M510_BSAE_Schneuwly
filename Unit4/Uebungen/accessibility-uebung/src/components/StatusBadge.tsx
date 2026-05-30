/*
 * ACCESSIBILITY-PROBLEM:
 * Der Status wird ausschliesslich über Farbe kommuniziert.
 * Es gibt keinen Text, kein Icon, kein aria-label.
 * Farbenblinde Personen oder Screenreader-Nutzer erhalten keine Information.
 */

interface StatusBadgeProps {
  status: 'ok' | 'low' | 'empty'
}

const statusColors: Record<string, string> = {
  ok: '#4caf50',
  low: '#ff9800',
  empty: '#f44336',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Problem: nur ein Farbpunkt – kein Text, kein aria-label, keine Textbeschriftung
  return (
    <span
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: statusColors[status],
      }}
    />
  )
}
