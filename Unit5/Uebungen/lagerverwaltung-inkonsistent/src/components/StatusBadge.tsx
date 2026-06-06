import React from 'react';
import { ArtikelStatus } from '../types';

interface StatusBadgeProps {
  status: ArtikelStatus;
}

const config: Record<ArtikelStatus, { label: string; bg: string; color: string; border: string; icon?: string }> = {
  aktiv:           { label: 'Aktiv',           bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
  kritisch:        { label: 'Kritisch',         bg: '#fff3e0', color: '#e65100', border: '#ffcc80', icon: '⚠' },
  'nicht-verfügbar': { label: 'Nicht verfügbar', bg: '#ffebee', color: '#d32f2f', border: '#ef9a9a', icon: '✗' },
  pausiert:        { label: 'Pausiert',         bg: '#f5f5f5', color: '#616161', border: '#bdbdbd' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const c = config[status];
  return (
    <span
      style={{
        backgroundColor: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {c.icon ? `${c.icon} ${c.label}` : c.label}
    </span>
  );
};

export default StatusBadge;
