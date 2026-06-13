import React from 'react';
import { Artikel } from '../types';
import Button from './Button';
import StatusBadge from './StatusBadge';

interface ArticleCardProps {
  artikel: Artikel;
  variant: 'kritisch' | 'nicht-verfügbar';
}

const cardConfig = {
  kritisch: {
    background: '#fff8e1',
    border: '1px solid #ffe082',
    bestandColor: '#e65100',
    buttonLabel: 'Bestellen',
    buttonVariant: 'warning' as const,
    buttonShape: 'square' as const,
  },
  'nicht-verfügbar': {
    background: '#ffebee',
    border: '1px solid #ef9a9a',
    bestandColor: '#d32f2f',
    buttonLabel: 'Jetzt bestellen',
    buttonVariant: 'danger' as const,
    buttonShape: 'pill' as const,
  },
};

const ArticleCard: React.FC<ArticleCardProps> = ({ artikel: a, variant }) => {
  const c = cardConfig[variant];
  return (
    <div
      style={{
        background: c.background,
        border: c.border,
        borderRadius: '6px',
        padding: '14px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div>
        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{a.name}</div>
        <div style={{ fontSize: '13px', color: '#777' }}>
          Bestand:{' '}
          <strong style={{ color: c.bestandColor }}>{a.bestand}</strong> / Min: {a.minBestand} ·
          Lager {a.lagerort}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <StatusBadge status={variant} />
        <Button label={c.buttonLabel} variant={c.buttonVariant} size="sm" shape={c.buttonShape} />
      </div>
    </div>
  );
};

export default ArticleCard;
