/**
 * StatusChip – einheitliche Statusanzeige für Tickets.
 *
 * Unterstützte Statuswerte: 'Offen' | 'In Bearbeitung' | 'Geschlossen'
 */

type Status = 'Offen' | 'In Bearbeitung' | 'Geschlossen';

interface StatusChipProps {
  status: Status;
}

const STATUS_CONFIG: Record<Status, { bg: string; color: string; border: string }> = {
  Offen: { bg: '#fff3e0', color: '#e65100', border: '#ff9800' },
  'In Bearbeitung': { bg: '#e3f2fd', color: '#1565c0', border: '#2196f3' },
  Geschlossen: { bg: '#e8f5e9', color: '#2e7d32', border: '#4caf50' },
};

export default function StatusChip({ status }: StatusChipProps) {
  const config = STATUS_CONFIG[status] ?? { bg: '#f5f5f5', color: '#555', border: '#ccc' };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  );
}
