import React from 'react';
import { ArtikelStatus } from '../types';

interface StatusChipProps {
  status: ArtikelStatus;
}

const statusConfig: Record<ArtikelStatus, { label: string; bg: string; color: string; border: string }> = {
  aktiv: {
    label: 'Aktiv',
    bg: '#e8f5e9',
    color: '#2e7d32',
    border: '#a5d6a7',
  },
  kritisch: {
    label: 'Kritisch',
    bg: '#fff3e0',
    color: '#e65100',
    border: '#ffcc80',
  },
  'nicht-verfügbar': {
    label: 'Nicht verfügbar',
    bg: '#ffebee',
    color: '#d32f2f',
    border: '#ef9a9a',
  },
  pausiert: {
    label: 'Pausiert',
    bg: '#f5f5f5',
    color: '#616161',
    border: '#e0e0e0',
  },
};

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        lineHeight: 1.6,
      }}
    >
      {config.label}
    </span>
  );
};

export default StatusChip;
