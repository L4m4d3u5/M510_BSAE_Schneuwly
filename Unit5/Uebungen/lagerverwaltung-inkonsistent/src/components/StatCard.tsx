import React from 'react';

interface StatCardProps {
  value: React.ReactNode;
  label: string;
  variant: 'filled' | 'outlined' | 'accent';
  color?: string;
  valueColor?: string;
  accentColor?: string;
  centered?: boolean;
  labelPosition?: 'top' | 'bottom';
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  variant,
  color,
  valueColor,
  accentColor = '#ff9800',
  centered = false,
  labelPosition = 'bottom',
}) => {
  const textAlign = centered ? ('center' as const) : ('left' as const);

  if (variant === 'filled') {
    const bg = color ?? '#1976d2';
    const valueEl = (
      <div style={{ fontSize: '38px', fontWeight: 'bold', lineHeight: 1 }}>{value}</div>
    );
    const labelEl = (
      <div style={{ fontSize: '13px', marginTop: '8px', opacity: 0.9 }}>{label}</div>
    );
    return (
      <div style={{ backgroundColor: bg, color: 'white', padding: '20px 24px', borderRadius: '8px', minWidth: '160px', flex: '1', textAlign }}>
        {labelPosition === 'top' ? <>{labelEl}{valueEl}</> : <>{valueEl}{labelEl}</>}
      </div>
    );
  }

  if (variant === 'outlined') {
    const borderColor = color ?? '#e0e0e0';
    const resolvedValueColor = valueColor ?? (color ?? '#222');
    const labelColor = color ?? '#888';
    const fontSize = centered ? '52px' : '28px';
    const valueEl = (
      <div style={{ fontSize, fontWeight: 'bold', color: resolvedValueColor, lineHeight: centered ? 1 : undefined }}>{value}</div>
    );
    const labelEl = (
      <div style={{ fontSize: '11px', color: labelColor, fontWeight: 'bold', marginTop: '8px', textTransform: 'uppercase' as const, letterSpacing: '1px' }}>{label}</div>
    );
    return (
      <div style={{ background: 'white', border: `2px solid ${borderColor}`, padding: '20px 24px', borderRadius: '8px', minWidth: '150px', flex: '1', textAlign }}>
        {labelPosition === 'top' ? <>{labelEl}{valueEl}</> : <>{valueEl}{labelEl}</>}
      </div>
    );
  }

  // accent variant
  const resolvedValueColor = valueColor ?? accentColor;
  return (
    <div style={{ backgroundColor: '#f5f5f5', borderLeft: `5px solid ${accentColor}`, padding: '18px 16px', borderRadius: '0 6px 6px 0', minWidth: '150px', flex: '1', textAlign }}>
      <span style={{ display: 'block', fontSize: '38px', fontWeight: 900, color: resolvedValueColor }}>{value}</span>
      <span style={{ fontSize: '13px', color: '#666', display: 'block', marginTop: '6px' }}>{label}</span>
    </div>
  );
};

export default StatCard;
