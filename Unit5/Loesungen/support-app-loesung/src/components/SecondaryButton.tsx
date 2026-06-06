/**
 * SecondaryButton – sekundäre Aktion (Outline, grau).
 */

import { ButtonHTMLAttributes } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function SecondaryButton({ label, disabled, ...rest }: SecondaryButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        padding: '10px 24px',
        backgroundColor: 'white',
        color: disabled ? '#b0bec5' : '#555555',
        border: `1px solid ${disabled ? '#e0e0e0' : '#bbbbbb'}`,
        borderRadius: '4px',
        fontSize: '14px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '0.3px',
      }}
    >
      {label}
    </button>
  );
}
