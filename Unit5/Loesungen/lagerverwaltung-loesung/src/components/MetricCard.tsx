import React from 'react';

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  accentColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  accentColor = '#1976d2',
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderTop: `3px solid ${accentColor}`,
        borderRadius: '8px',
        padding: '20px 24px',
        minWidth: '160px',
        flex: '1',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '10px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: accentColor,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default MetricCard;
