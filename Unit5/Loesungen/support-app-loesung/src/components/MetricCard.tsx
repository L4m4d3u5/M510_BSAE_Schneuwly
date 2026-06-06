/**
 * MetricCard – einheitliche Kennzahlenkarte für das Dashboard.
 *
 * Props:
 *  - label: Beschriftung der Kennzahl
 *  - value: Anzeigewert (Zahl oder Text)
 *  - variant: Farbvariante – 'blue' | 'orange' | 'green' | 'grey'
 */

type Variant = 'blue' | 'orange' | 'green' | 'grey';

interface MetricCardProps {
  label: string;
  value: number | string;
  variant?: Variant;
}

const VARIANT_CONFIG: Record<Variant, { bg: string; valueColor: string; labelColor: string; border: string }> = {
  blue: {
    bg: '#e3f2fd',
    valueColor: '#1565c0',
    labelColor: '#1976d2',
    border: '#90caf9',
  },
  orange: {
    bg: '#fff3e0',
    valueColor: '#e65100',
    labelColor: '#f57c00',
    border: '#ffcc80',
  },
  green: {
    bg: '#e8f5e9',
    valueColor: '#2e7d32',
    labelColor: '#388e3c',
    border: '#a5d6a7',
  },
  grey: {
    bg: '#f5f5f5',
    valueColor: '#424242',
    labelColor: '#757575',
    border: '#e0e0e0',
  },
};

export default function MetricCard({ label, value, variant = 'blue' }: MetricCardProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      style={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: '8px',
        padding: '20px 24px',
        minWidth: '160px',
      }}
    >
      <div
        style={{
          fontSize: '36px',
          fontWeight: 700,
          color: config.valueColor,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: config.labelColor,
          marginTop: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}
